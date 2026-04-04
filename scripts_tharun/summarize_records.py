from __future__ import annotations

from collections import Counter
from pathlib import Path
import msgspec


def main() -> None:
    path = Path("data/final/all_records.json")
    records = msgspec.json.decode(path.read_bytes())

    print(f"Total records: {len(records)}")

    payer_counts = Counter(r["payer"] for r in records)
    print("\nRecords by payer:")
    for payer, count in payer_counts.items():
        print(f"  {payer}: {count}")

    drug_counts = Counter(r["drug_name_canonical"] for r in records if r["drug_name_canonical"])
    print("\nTop canonical drugs:")
    for drug, count in drug_counts.most_common(20):
        print(f"  {drug}: {count}")

    print("\nSample records:")
    for r in records[:5]:
        print({
            "payer": r["payer"],
            "drug": r["drug_name_canonical"],
            "preferred_status": r["preferred_status"],
            "prior_auth_required": r["prior_auth_required"],
            "step_therapy_required": r["step_therapy_required"],
        })


if __name__ == "__main__":
    main()