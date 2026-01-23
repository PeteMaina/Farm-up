from sqlmodel import Session, select
from app.db.session import engine
from app.models.user import User
from app.models.dashboard import CropAnalytics, SoilHealth, IrrigationLog
from app.models.extended import PestControlLog, FarmEquipment, FinancialReport
from app.core.security import get_password_hash

def seed_data():
    with Session(engine) as session:
        # Check if user already exists
        statement = select(User).where(User.email == "admin@agrowise.com")
        admin = session.exec(statement).first()
        
        if not admin:
            admin = User(
                email="admin@agrowise.com",
                hashed_password=get_password_hash("admin123"),
                full_name="Farm Administrator",
                is_superuser=True
            )
            session.add(admin)
            session.commit()
            session.refresh(admin)
            print(f"Created admin user: {admin.email}")
            
            # Seed Dashboard Data
            crops = [
                CropAnalytics(crop_name="Maize", yield_predicted=85.5, health_score=92.0, moisture_level=45.2, user_id=admin.id),
                CropAnalytics(crop_name="Wheat", yield_predicted=72.3, health_score=88.5, moisture_level=38.4, user_id=admin.id),
                CropAnalytics(crop_name="Beans", yield_predicted=64.8, health_score=95.1, moisture_level=52.0, user_id=admin.id),
            ]
            soil = [
                SoilHealth(nitrogen=45.0, phosphorus=32.5, potassium=182.0, ph_level=6.5, location_tag="North Field", user_id=admin.id),
                SoilHealth(nitrogen=38.2, phosphorus=28.0, potassium=165.5, ph_level=6.8, location_tag="East Field", user_id=admin.id),
            ]
            irrigation = [
                IrrigationLog(zone="Zone A", liters_used=1200.5, status="Completed", user_id=admin.id),
                IrrigationLog(zone="Zone B", liters_used=850.0, status="Completed", user_id=admin.id),
            ]
            
            # Seed Extended Features
            pests = [
                PestControlLog(pest_type="Aphids", last_treatment="2024-01-10", next_treatment="2024-02-10", status="Managed", user_id=admin.id),
                PestControlLog(pest_type="Spider Mites", last_treatment="2024-01-15", next_treatment="2024-02-15", status="Active Monitor", user_id=admin.id),
            ]
            equipment = [
                FarmEquipment(name="John Deere Tractor", status="Active", last_serviced="2023-11-20", fuel_level=75.0, user_id=admin.id),
                FarmEquipment(name="Irrigation Pump B", status="Maintenance", last_serviced="2024-01-05", fuel_level=100.0, user_id=admin.id),
            ]
            financials = [
                FinancialReport(month="January", revenue=15200.0, expenses=8400.0, profit=6800.0, user_id=admin.id),
                FinancialReport(month="December", revenue=12800.0, expenses=7200.0, profit=5600.0, user_id=admin.id),
            ]
            
            for item in crops + soil + irrigation + pests + equipment + financials:
                session.add(item)
            
            session.commit()
            print("Successfully seeded dashboard data.")
        else:
            print("Admin already exists, skipping seed.")

if __name__ == "__main__":
    seed_data()
