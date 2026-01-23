from sqlmodel import SQLModel
from app.db.session import engine
# Import all models here to ensure they are registered with SQLModel
from app.models.user import User
from app.models.dashboard import CropAnalytics, SoilHealth, IrrigationLog
from app.models.extended import PestControlLog, FarmEquipment, FinancialReport

def init_db():
    SQLModel.metadata.create_all(engine)

if __name__ == "__main__":
    print("Initializing Database...")
    init_db()
    print("Database initialized successfully.")
