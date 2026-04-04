from __future__ import annotations

from pathlib import Path
import msgspec

from models_tharun.schema import ExtractedPolicy


def main() -> None:
    normalized_dir = Path("data/normalized")
    out_file = Path("data/final/all_records.json")
    out_file.parent.mkdir(parents=True, exist_ok=True)

    all_records = []

    for path in sorted(normalized_dir.glob("*.json")):
        policy = msgspec.json.decode(path.read_bytes(), type=ExtractedPolicy)
        for record in policy.records:
            all_records.append({
                "source_file": policy.source_file,
                "payer": record.payer,
                "policy_title": record.policy_title,
                "effective_date": record.effective_date,
                "drug_name_raw": record.drug_name_raw,
                "drug_name_canonical": record.drug_name_canonical,
                "indication_raw": record.indication_raw,
                "indication_canonical": record.indication_canonical,
                "coverage_status": record.coverage_status,
                "prior_auth_required": record.prior_auth_required,
                "step_therapy_required": record.step_therapy_required,
                "step_therapy_details": record.step_therapy_details,
                "clinical_criteria": record.clinical_criteria,
                "site_of_care_restriction": record.site_of_care_restriction,
                "preferred_status": record.preferred_status,
                "evidence": [
                    {
                        "field_name": e.field_name,
                        "snippet": e.snippet,
                        "page_number": e.page_number,
                        "section": e.section,
                    }
                    for e in record.evidence
                ],
            })

    out_file.write_bytes(msgspec.json.encode(all_records))
    print(f"Wrote {len(all_records)} records to {out_file}")


if __name__ == "__main__":
    main()