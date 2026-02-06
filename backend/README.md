# Agrowise Backend (FastAPI)

This is the Python-based backend for the Agrowise full-stack system. It provides a robust, type-safe API for managing farm data, users, and IoT sensor simulations.

## 🚀 Features

- **User Authentication**: Secure JWT-based authentication with password hashing.
- **Crop Analytics**: Real-time yield prediction and health monitoring.
- **Soil Health**: Tracking nitrogen, phosphorus, potassium, and pH levels.
- **Irrigation Management**: Monitoring and logging irrigation activities.
- **Extended Farm Management**: Pest control logs, equipment tracking, and financial reporting.
- **Database Migrations**: Managed with Alembic for seamless schema updates.
- **API Documentation**: Interactive documentation with Swagger UI and ReDoc.

## 🛠 Tech Stack

- **Framework**: [FastAPI](https://fastapi.tiangolo.com/)
- **Server**: [Uvicorn](https://www.uvicorn.org/)
- **ORM/Models**: [SQLModel](https://sqlmodel.tiangolo.com/) (SQLAlchemy + Pydantic)
- **Database**: SQLite (Development) / PostgreSQL (Production ready)
- **Migrations**: [Alembic](https://alembic.sqlalchemy.org/)
- **Security**: JWT (`python-jose`) & Password Hashing (`passlib`)

## 📋 Project Structure

```text
backend/
├── alembic/            # Database migration scripts
├── app/
│   ├── api/            # Route handlers (v1)
│   ├── core/           # Configuration and security settings
│   ├── db/             # Database session management
│   ├── models/         # SQLModel database models
│   ├── schemas/        # Pydantic validation schemas
│   ├── main.py         # Application entry point
│   ├── init_db.py      # Database initialization script
│   └── seed.py         # Database seeding script (test data)
├── alembic.ini         # Alembic configuration
├── requirements.txt    # Python dependencies
└── sql_app.db          # Local SQLite database
```

## ⚙️ Getting Started

### Prerequisites

- Python 3.10 or higher
- `pip` (Python package manager)

### Installation

1. **Navigate to the backend directory**:
   ```bash
   cd backend
   ```

2. **Create a virtual environment**:
   ```bash
   python -m venv venv
   ```

3. **Activate the virtual environment**:
   - **Windows**: `.\venv\Scripts\activate`
   - **Mac/Linux**: `source venv/bin/activate`

4. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

### Database Setup

1. **Initialize the database**:
   ```bash
   python -m app.init_db
   ```

2. **Seed the database (Optional but recommended for testing)**:
   ```bash
   python -m app.seed
   ```
   *This creates a default admin user:* `admin@agrowise.com` / `admin123`

### Running the Server

Start the development server with hot-reload:
```bash
uvicorn app.main:app --reload
```

The API will be available at `http://localhost:8000`.

## 📚 API Documentation

Once the server is running, you can access:
- **Swagger UI**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **ReDoc**: [http://localhost:8000/redoc](http://localhost:8000/redoc)

## 📡 Key Endpoints

- `POST /api/v1/login/access-token`: Login and receive JWT.
- `GET /api/v1/users/me`: Get current logged-in user info.
- `GET /api/v1/dashboard/crops`: Fetch crop analytics data.
- `GET /api/v1/extended/equipment`: List farm equipment.

## 🗄 Migrations (Alembic)

To create a new migration after model changes:
```bash
alembic revision --autogenerate -m "description of changes"
```

To apply migrations:
```bash
alembic upgrade head
```

---
*Developed by the Agrowise Team*
