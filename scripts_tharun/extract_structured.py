from __future__ import annotations

import re
import sys
from pathlib import Path
from typing import List, Optional

import msgspec

from models_tharun.schema import ParsedDocument, ExtractedPolicy, CoverageRecord, EvidenceSpan


DRUG_CANONICAL = {
    "avastin": "bevacizumab",
    "mvasi": "bevacizumab",
    "zirabev": "bevacizumab",
    "alymsys": "bevacizumab",
    "jobevne": "bevacizumab",
    "avzivi": "bevacizumab",
    "vegzelma": "bevacizumab",
    "rituxan": "rituximab",
    "riabni": "rituximab",
    "ruxience": "rituximab",
    "truxima": "rituximab",
    "botox": "onabotulinumtoxinA",
    "dysport": "abobotulinumtoxinA",
    "xeomin": "incobotulinumtoxinA",
    "myobloc": "rimabotulinumtoxinB",
    "daxxify": "daxibotulinumtoxinA-lanm",
}

PREFERRED_WORDS = ["preferred", "unrestricted"]
NON_PREFERRED_WORDS = ["non-preferred", "restricted"]
STEP_THERAPY_WORDS = [
    "inadequate response",
    "failure",
    "contraindication",
    "intolerance",
]
SITE_OF_CARE_WORDS = [
    "site of service",
    "site-of-care",
    "infusion center",
    "hospital outpatient",
    "home infusion",
]


def find_drugs(text: str) -> List[tuple[str, str]]:
    found = []
    lower = text.lower()
    for raw_name, canonical in DRUG_CANONICAL.items():
        if raw_name in lower:
            found.append((raw_name, canonical))
    return found


def infer_prior_auth(text: str) -> Optional[bool]:
    lower = text.lower()
    if "prior authorization" in lower or "prior review" in lower or re.search(r"\bPA\b", text):
        return True
    return None


def infer_step_therapy(text: str) -> tuple[Optional[bool], Optional[str]]:
    lower = text.lower()
    for phrase in STEP_THERAPY_WORDS:
        if phrase in lower:
            # capture a nearby snippet
            m = re.search(rf"([^.:\n]*{re.escape(phrase)}[^.:\n]*)", text, flags=re.IGNORECASE)
            return True, m.group(1).strip() if m else phrase
    return None, None


def infer_preferred_status(text: str, drug_raw: str) -> Optional[str]:
    lower = text.lower()

    # crude but works for first pass
    if "preferred" in lower and drug_raw.lower() in lower:
        if "non-preferred" in lower:
            # can't decide reliably from whole section
            return None
        return "preferred"
    if "non-preferred" in lower and drug_raw.lower() in lower:
        return "non_preferred"
    return None


def infer_site_of_care(text: str) -> Optional[str]:
    lower = text.lower()
    for phrase in SITE_OF_CARE_WORDS:
        if phrase in lower:
            return phrase
    return None


def extract_records(doc: ParsedDocument) -> ExtractedPolicy:
    records: List[CoverageRecord] = []

    for section in doc.sections:
        drugs = find_drugs(section.text)
        if not drugs:
            continue

        for raw_name, canonical in drugs:
            prior_auth = infer_prior_auth(section.text)
            step_required, step_details = infer_step_therapy(section.text)
            preferred_status = infer_preferred_status(section.text, raw_name)
            site_of_care = infer_site_of_care(section.text)

            evidence = []

            if prior_auth:
                evidence.append(EvidenceSpan(
                    field_name="prior_auth_required",
                    snippet="Detected prior authorization language in section text",
                    page_number=section.page_start,
                    section=section.section_title,
                ))

            if step_required and step_details:
                evidence.append(EvidenceSpan(
                    field_name="step_therapy_details",
                    snippet=step_details,
                    page_number=section.page_start,
                    section=section.section_title,
                ))

            if preferred_status:
                evidence.append(EvidenceSpan(
                    field_name="preferred_status",
                    snippet=f"{raw_name} appears in a preferred/non-preferred section",
                    page_number=section.page_start,
                    section=section.section_title,
                ))

            records.append(
                CoverageRecord(
                    payer=doc.payer or "Unknown",
                    policy_title=doc.policy_title or "Unknown Policy",
                    effective_date=doc.effective_date,
                    drug_name_raw=raw_name,
                    drug_name_canonical=canonical,
                    coverage_status="covered_with_criteria",
                    prior_auth_required=prior_auth,
                    step_therapy_required=step_required,
                    step_therapy_details=step_details,
                    site_of_care_restriction=site_of_care,
                    preferred_status=preferred_status,
                    evidence=evidence,
                )
            )

    return ExtractedPolicy(
        source_file=doc.source_file,
        payer=doc.payer or "Unknown",
        policy_title=doc.policy_title or "Unknown Policy",
        effective_date=doc.effective_date,
        records=records,
    )


def main() -> None:
    if len(sys.argv) != 3:
        print("Usage: python scripts/extract_structured.py <sections.json> <extracted.json>")
        sys.exit(1)

    in_path = Path(sys.argv[1])
    out_path = Path(sys.argv[2])
    out_path.parent.mkdir(parents=True, exist_ok=True)

    parsed = msgspec.json.decode(in_path.read_bytes(), type=ParsedDocument)
    extracted = extract_records(parsed)
    out_path.write_bytes(msgspec.json.encode(extracted))
    print(f"Wrote {out_path}")


if __name__ == "__main__":
    main()