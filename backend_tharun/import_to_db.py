from __future__ import annotations

from collections import defaultdict
from datetime import datetime
from pathlib import Path
from typing import Any, Optional

import msgspec

from backend_tharun.db import SessionLocal
from backend_tharun.models_db import Policy, CoverageRecord, EvidenceSpan


def parse_date(value: Optional[str]):
    if not value:
        return None

    value = value.strip()

    # Try common formats from your docs
    formats = [
        "%m/%d/%Y",
        "%m/%d/%y",
        "%B %d, %Y",
        "%B %Y",
    ]

    for fmt in formats:
        try:
            dt = datetime.strptime(value, fmt)
            # If only month/year was supplied, default day=1
            return dt.date()
        except ValueError:
            continue

    return None


def infer_doc_archetype(source_file: str, policy_title: str) -> str:
    s = f"{source_file} {policy_title}".lower()

    if "medical drug list" in s or "mdl" in s:
        return "master_drug_list"
    if "preferred injectable oncology program" in s:
        return "multi_drug_program"
    if "coverage rationale" in s or "medical benefit drug policy" in s:
        return "structured_policy"
    if "rituximab" in s or "bevacizumab" in s:
        return "single_drug_policy"
    return "unknown"


def main() -> None:
    input_file = Path("data/final/all_records_clean.json")
    if not input_file.exists():
        raise FileNotFoundError(f"Missing file: {input_file}")

    records: list[dict[str, Any]] = msgspec.json.decode(input_file.read_bytes())

    session = SessionLocal()

    try:
        # Optional: clear tables for a clean reload during hackathon development
        session.query(EvidenceSpan).delete()
        session.query(CoverageRecord).delete()
        session.query(Policy).delete()
        session.commit()

        policies_by_key: dict[tuple[str, str], Policy] = {}

        for r in records:
            payer = (r.get("payer") or "Unknown").strip()
            policy_title = (r.get("policy_title") or "Unknown Policy").strip()
            source_file = (r.get("source_file") or f"{payer}_{policy_title}").strip()
            key = (payer, source_file)

            if key not in policies_by_key:
                policy = Policy(
                    payer=payer,
                    policy_title=policy_title,
                    policy_id=r.get("policy_id"),
                    effective_date=parse_date(r.get("effective_date")),
                    source_file=source_file,
                    source_type="pdf",
                    doc_archetype=infer_doc_archetype(source_file, policy_title),
                )
                session.add(policy)
                session.flush()  # get policy.id
                policies_by_key[key] = policy

            policy = policies_by_key[key]

            record = CoverageRecord(
                policy_id=policy.id,
                drug_name_raw=(r.get("drug_name_raw") or "").strip(),
                drug_name_canonical=(r.get("drug_name_canonical") or "").strip().lower(),
                indication_raw=r.get("indication_raw"),
                indication_canonical=(
                    r.get("indication_canonical").strip().lower()
                    if r.get("indication_canonical") else None
                ),
                coverage_status=r.get("coverage_status"),
                prior_auth_required=r.get("prior_auth_required"),
                step_therapy_required=r.get("step_therapy_required"),
                step_therapy_details=r.get("step_therapy_details"),
                clinical_criteria=r.get("clinical_criteria"),
                site_of_care_restriction=r.get("site_of_care_restriction"),
                preferred_status=r.get("preferred_status"),
            )
            session.add(record)
            session.flush()  # get record.id

            for e in r.get("evidence", []):
                ev = EvidenceSpan(
                    coverage_record_id=record.id,
                    field_name=e.get("field_name", "unknown"),
                    snippet=e.get("snippet", ""),
                    page_number=e.get("page_number"),
                    section_title=e.get("section"),
                )
                session.add(ev)

        session.commit()
        print(f"Imported {len(records)} coverage records into the database.")

    finally:
        session.close()


if __name__ == "__main__":
    main()