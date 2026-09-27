"""Verify the three sample applications share identical SQLite SQL files."""

from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
PROJECTS = ("vue-spring-boot", "react-spring-boot", "citizen-jinja2-python")
SQL_FILES = ("CURRENT_SCHEMA.sql", "LOCAL_SAMPLE_DATA.sql")


def main() -> None:
    for filename in SQL_FILES:
        files = [ROOT / project / "database" / filename for project in PROJECTS]
        expected = files[0].read_bytes()
        for path in files[1:]:
            if path.read_bytes() != expected:
                raise SystemExit(f"Schema parity failed: {path} differs from {files[0]}")
        print(f"PASS {filename}: identical in all three projects")


if __name__ == "__main__":
    main()
