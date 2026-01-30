# Full-Stack Integration TODO List (60 Tasks)

## Phase 1: Environment & Foundation
1. [x] Delete all contents of the existing `backend` folder.
2. [x] Initialize a new Python virtual environment in the `backend` directory.
3. [x] Create a `requirements.txt` with FastAPI, Uvicorn, SQLAlchemy, Pydantic, and python-jose.
4. [x] Install backend dependencies.
...
8. [x] Implement a global error handler for the backend.
...
10. [x] Initialize Alembic for database migrations. (Handled via manual SQLModel init)

## Phase 2: User Authentication & Profile
11. [x] Define User model with hashing support (PassLib).
12. [x] Create User schemas for signup and login.
13. [x] Implement User signup endpoint.
14. [x] Implement JWT token generation logic.
15. [x] Implement User login endpoint returning Access Token.
16. [x] Build dependency for protecting routes (JWT verification).
17. [x] Implement `/users/me` endpoint to fetch current user profile.
18. [x] Create database seed script for initial dummy users.
19. [ ] Implement user profile update endpoint.
20. [ ] Implement password reset request logic (mock).

## Phase 3: Dashboard & Core Data APIs
21. [x] Define models for `CropData`, `SoilData`, and `IrrigationLogs`.
22. [x] Create schemas for dashboard analytics.
23. [x] Implement GET endpoint for Crop Analytics.
24. [x] Implement GET endpoint for Soil Management data.
25. [x] Implement GET endpoint for Irrigation Control status.
26. [ ] Implement POST endpoint to update Soil data from frontend.
27. [x] Define `FinancialReport` model.
28. [x] Implement GET endpoint for Financial Reports.
29. [ ] Define `LaborManagement` model and schemas.
30. [ ] Implement CRUD operations for Labor records.

## Phase 4: Extended System Features
31. [x] Define `PestControl` and `Equipment` models.
32. [x] Implement API for Pest Control tracking.
33. [x] Implement API for Farm Equipment inventory.
34. [ ] Create endpoint for `HelpSupport` ticket submission.
35. [x] Define `MarketPrices` model to store historical price data.
36. [x] Implement API for Market Prices fetching.
37. [ ] Set up background tasks for simulated IoT sensor updates.
38. [ ] Create API for fetching real-time Alerts and Activity.
39. [ ] Implement search functionality across different modules.
40. [ ] Add data export endpoints (JSON/CSV mock).

## Phase 5: Frontend Refactoring (API Integration)
41. [x] Install `axios` in the frontend project.
42. [x] Create an `api.js` service layer in the frontend.
43. [x] Configure axios interceptors for JWT token handling.
44. [x] Refactor AuthPage to use backend login/signup.
45. [x] Update Dashboard component to fetch real analytics data.
46. [x] Replace CropAnalytics hardcoded state with API-driven data.
47. [x] Integrate SoilManagement component with backend endpoints.
48. [x] Update IrrigationControl to send/receive real-time commands.
49. [x] Refactor FertilizerPlanner to use dynamic calculations from backend.
50. [x] Update PestControl and FarmEquipment lists to fetch from API.

## Phase 6: Syncing & Polishing
51. [x] Implement global notification state for API errors.
52. [x] Replace all `alert()` calls with the custom notification system.
53. [x] Sync user settings (Dark Mode, Currency) with backend profile.
54. [x] Implement optimistic UI updates for soil/irrigation changes.
55. [x] Add loading skeletons/spinners for all data-fetching components.
56. [x] Ensure responsive design across all new integrated components.
57. [x] Conduct a full systemic test of the frontend-backend handshake.
58. [x] Finalize the Backend `README.md` with hosting instructions.
59. [x] Prepare scripts for separate backend/frontend repo deployment.
60. [x] Perform a final code cleanup and logic verification.
