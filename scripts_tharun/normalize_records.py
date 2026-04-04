from __future__ import annotations

import sys
from pathlib import Path
import msgspec

from models_tharun.schema import ExtractedPolicy, CoverageRecord


def normalize_bool(value):
    return bool(value) if value is not None else None


def normalize_policy(extracted: ExtractedPolicy) -> ExtractedPolicy:
    normalized_records = []

    for r in extracted.records:
        preferred_status = r.preferred_status
        if preferred_status:
            preferred_status = preferred_status.lower().replace("-", "_")

        normalized_records.append(
            CoverageRecord(
                payer=r.payer.strip(),
                policy_title=r.policy_title.strip(),
                policy_id=r.policy_id,
                effective_date=r.effective_date,
                drug_name_raw=r.drug_name_raw.strip(),
                drug_name_canonical=r.drug_name_canonical.strip().lower(),
                indication_raw=r.indication_raw,
                indication_canonical=(r.indication_canonical.lower().strip()
                                      if r.indication_canonical else None),
                coverage_status=(r.coverage_status.lower().strip()
                                 if r.coverage_status else None),
                prior_auth_required=normalize_bool(r.prior_auth_required),
                step_therapy_required=normalize_bool(r.step_therapy_required),
                step_therapy_details=r.step_therapy_details,
                clinical_criteria=r.clinical_criteria,
                site_of_care_restriction=r.site_of_care_restriction,
                preferred_status=preferred_status,
                evidence=r.evidence,
            )
        )

    return ExtractedPolicy(
        source_file=extracted.source_file,
        payer=extracted.payer,
        policy_title=extracted.policy_title,
        effective_date=extracted.effective_date,
        records=normalized_records,
    )


def main() -> None:
    if len(sys.argv) != 3:
        print("Usage: python scripts/normalize_records.py <extracted.json> <normalized.json>")
        sys.exit(1)

    in_path = Path(sys.argv[1])
    out_path = Path(sys.argv[2])
    out_path.parent.mkdir(parents=True, exist_ok=True)

    extracted = msgspec.json.decode(in_path.read_bytes(), type=ExtractedPolicy)
    normalized = normalize_policy(extracted)
    out_path.write_bytes(msgspec.json.encode(normalized))
    print(f"Wrote {out_path}")


if __name__ == "__main__":
    main()