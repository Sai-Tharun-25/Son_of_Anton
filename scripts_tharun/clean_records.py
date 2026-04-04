from __future__ import annotations

from pathlib import Path
import msgspec


def record_key(r: dict):
    return (
        r.get("payer"),
        r.get("policy_title"),
        r.get("drug_name_canonical"),
        r.get("indication_canonical"),
        r.get("preferred_status"),
        r.get("coverage_status"),
    )


def main() -> None:
    in_file = Path("data/final/all_records.json")
    out_file = Path("data/final/all_records_clean.json")

    records = msgspec.json.decode(in_file.read_bytes())

    cleaned = []
    seen = set()

    for r in records:
        if not r.get("drug_name_canonical"):
            continue

        key = record_key(r)
        if key in seen:
            continue
        seen.add(key)

        cleaned.append(r)

    out_file.write_bytes(msgspec.json.encode(cleaned))
    print(f"Cleaned {len(records)} -> {len(cleaned)} records")


if __name__ == "__main__":
    main()