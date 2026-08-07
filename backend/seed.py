import sys
import os

# Add backend directory to python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.database.database import engine, SessionLocal
from app.database.base import Base
from app.models.role import Role
from app.models.user import User
from app.models.service_provider import ServiceProvider
from app.security.password import hash_password

def init_db():
    print("Checking database connection and creating tables...")
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    try:
        # 1. Seed Roles
        roles_data = ["Admin", "HR", "Employee"]
        roles_map = {}
        for role_name in roles_data:
            role = db.query(Role).filter(Role.name == role_name).first()
            if not role:
                role = Role(name=role_name)
                db.add(role)
                db.flush()
                print(f"[+] Created Role: {role_name}")
            roles_map[role_name] = role.id

        db.commit()

        # 2. Seed Service Providers
        sps_data = [
            {"name": "HR Portal", "entity_id": "hr-portal", "acs_url": "http://localhost:3001/saml/acs"},
            {"name": "Employee Portal", "entity_id": "employee-portal", "acs_url": "http://localhost:3002/saml/acs"},
            {"name": "Admin Portal", "entity_id": "admin-portal", "acs_url": "http://localhost:3003/saml/acs"},
        ]
        for sp in sps_data:
            existing_sp = db.query(ServiceProvider).filter(ServiceProvider.entity_id == sp["entity_id"]).first()
            if not existing_sp:
                new_sp = ServiceProvider(
                    name=sp["name"],
                    entity_id=sp["entity_id"],
                    acs_url=sp["acs_url"],
                    enabled=True
                )
                db.add(new_sp)
                print(f"[+] Created Service Provider: {sp['name']}")

        db.commit()

        # 3. Seed Default Accounts
        users_data = [
            {
                "email": "admin@company.com",
                "password": "admin123",
                "first_name": "System",
                "last_name": "Admin",
                "department": "IT",
                "job_title": "System Admin",
                "role_id": roles_map["Admin"]
            },
            {
                "email": "admin@samlguard.com",
                "password": "admin123",
                "first_name": "System",
                "last_name": "Administrator",
                "department": "Security",
                "job_title": "Security Admin",
                "role_id": roles_map["Admin"]
            },
            {
                "email": "hr@company.com",
                "password": "hr123",
                "first_name": "Rahul",
                "last_name": "Sharma",
                "department": "Human Resources",
                "job_title": "HR Executive",
                "role_id": roles_map["HR"]
            },
            {
                "email": "hr@samlguard.com",
                "password": "hr123",
                "first_name": "Sarah",
                "last_name": "Johnson",
                "department": "Human Resources",
                "job_title": "HR Manager",
                "role_id": roles_map["HR"]
            },
            {
                "email": "employee@company.com",
                "password": "emp123",
                "first_name": "Arjun",
                "last_name": "Singh",
                "department": "Cyber Security",
                "job_title": "Security Analyst",
                "role_id": roles_map["Employee"]
            },
            {
                "email": "employee@samlguard.com",
                "password": "emp123",
                "first_name": "Priya",
                "last_name": "Verma",
                "department": "Engineering",
                "job_title": "Software Engineer",
                "role_id": roles_map["Employee"]
            }
        ]

        created_count = 0
        for u in users_data:
            existing = db.query(User).filter(User.email == u["email"]).first()
            if not existing:
                user = User(
                    email=u["email"],
                    password_hash=hash_password(u["password"]),
                    first_name=u["first_name"],
                    last_name=u["last_name"],
                    department=u["department"],
                    job_title=u["job_title"],
                    role_id=u["role_id"],
                    is_active=True,
                    is_verified=True
                )
                db.add(user)
                created_count += 1
                print(f"[+] Created user: {u['email']} (Password: {u['password']})")

        db.commit()
        print(f"\n[OK] Database check complete! Added {created_count} new users.")

        # Print current summary of users in database
        all_users = db.query(User).all()
        print("\n" + "="*60)
        print(" CURRENT USERS IN POSTGRESQL DATABASE (`samlguard`)")
        print("="*60)
        print(f"{'ID':<4} | {'Email':<25} | {'Name':<20} | {'Role'}")
        print("-"*60)
        role_lookup = {r.id: r.name for r in db.query(Role).all()}
        for u in all_users:
            rname = role_lookup.get(u.role_id, "Unknown")
            fullname = f"{u.first_name or ''} {u.last_name or ''}".strip()
            print(f"{u.id:<4} | {u.email:<25} | {fullname:<20} | {rname}")
        print("="*60 + "\n")

    except Exception as e:
        db.rollback()
        print(f"[ERROR] Error seeding database: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    init_db()
