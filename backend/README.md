# Agrowise Backend (FastAPI)

This is the Python-based backend for the Agrowise full-stack system. It provides a robust, type-safe API for managing farm data, users, and IoT sensor simulations.

## Tech Stack
- **Framework**: FastAPI
- **Server**: Uvicorn
- **ORM**: SQLModel / SQLAlchemy
- **Database**: SQLite (Default)
- **Validation**: Pydantic
- **Security**: JWT (python-jose)

## Getting Started
 py
### Prerequisites
- Python 3.10 or higher
- `pip` (Python package manager)

### Installation
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create a virtual environment:
   ```bash
   python -m venv venv
   ```
3. Activate the virtual environment:
   - **Windows**: `.\venv\Scripts\activate`
   - **Mac/Linux**: `source venv/bin/activate`
4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

### Running the Server
Start the development server with hot-reload:
```bash
uvicorn app.main:app --reload
```
The API will be available at `http://localhost:8000`.

### Documentation
Once the server is running, you can access:
- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

## Integration with Frontend
The frontend is configured to communicate with this backend via the `API_BASE_URL` defined in `src/api.js`. For localhost development, it defaults to `http://localhost:8000`.

## Hosting Note
This backend is designed to be hosted independently. Ensure that the `CORS_ORIGINS` in `app/main.py` include your production frontend domain.
