from __future__ import annotations

from collections import defaultdict
from pathlib import Path
import msgspec


def main() -> None:
    path = Path("data/final/all_records.json")
    out_file = Path("data/final/compare_view.json")

    records = msgspec.json.decode(path.read_bytes())

    grouped = defaultdict(list)

    for r in records:
        drug = r.get("drug_name_canonical") or "unknown"
        grouped[drug].append(r)

    compare_view = []
    for drug, items in grouped.items():
        compare_view.append({
            "drug_name_canonical": drug,
            "plans": [
                {
                    "payer": i["payer"],
                    "policy_title": i["policy_title"],
                    "effective_date": i["effective_date"],
                    "coverage_status": i["coverage_status"],
                    "prior_auth_required": i["prior_auth_required"],
                    "step_therapy_required": i["step_therapy_required"],
                    "step_therapy_details": i["step_therapy_details"],
                    "site_of_care_restriction": i["site_of_care_restriction"],
                    "preferred_status": i["preferred_status"],
                    "evidence": i["evidence"],
                }
                for i in items
            ]
        })

    out_file.write_bytes(msgspec.json.encode(compare_view))
    print(f"Wrote compare view to {out_file}")


if __name__ == "__main__":
    main()