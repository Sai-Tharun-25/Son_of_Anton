from sqlalchemy import select, func

from backend_tharun.db import SessionLocal
from backend_tharun.models_db import Policy, CoverageRecord, EvidenceSpan


def main() -> None:
    session = SessionLocal()
    try:
        policy_count = session.scalar(select(func.count()).select_from(Policy))
        record_count = session.scalar(select(func.count()).select_from(CoverageRecord))
        evidence_count = session.scalar(select(func.count()).select_from(EvidenceSpan))

        print("Policies:", policy_count)
        print("Coverage records:", record_count)
        print("Evidence spans:", evidence_count)

        rows = session.execute(
            select(CoverageRecord.drug_name_canonical, func.count())
            .group_by(CoverageRecord.drug_name_canonical)
            .order_by(func.count().desc())
        ).all()

        print("\nTop drugs:")
        for drug, count in rows[:10]:
            print(f"  {drug}: {count}")

    finally:
        session.close()


if __name__ == "__main__":
    main()