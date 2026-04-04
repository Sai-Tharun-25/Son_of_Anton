from backend_tharun.db import engine
from backend_tharun.models_db import Base


def main() -> None:
    Base.metadata.create_all(bind=engine)
    print("Database tables created.")


if __name__ == "__main__":
    main()