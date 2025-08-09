# Potting Shed 2.0 Product Requirements Document (PRD)

## 1. Goals and Background Context

### Goals
- To create a simple, intuitive application for tracking personal garden plants.
- To provide users with timely reminders for watering and care.
- To build a foundation for future features like pest control and harvest tracking.

### Background Context
Many beginner gardeners struggle to keep track of the specific needs of different plants. This app solves that by providing a simple digital inventory and a proactive reminder system, helping users keep their plants healthy and thriving.

| Date | Version | Description | Author |
| :--- | :------ | :---------- | :----- |
| 2025-08-09 | 1.0 | Initial PRD creation | BMad Dev Agent |

## 2. Requirements

### Functional
- **FR1:** Users must be able to create, view, update, and delete plant profiles.
- **FR2:** Each plant profile must include fields for name, species, date planted, and a photo.
- **FR3:** The system must allow users to set a recurring watering schedule for each plant.
- **FR4:** The system must provide a mechanism for sending watering reminders (initial implementation can be a simple on-screen list).

### Non Functional
- **NFR1:** The application must load on a standard mobile connection in under 3 seconds.
- **NFR2:** All user data must be securely stored and associated only with the authenticated user.
- **NFR3:** The database schema must be extensible for future features without requiring major migrations.

## 3. Technical Assumptions

- **Repository Structure:** Monorepo (as established by `create-t3-turbo`).
- **Service Architecture:** Serverless functions via Next.js API routes.
- **Testing requirements:** Unit tests for all API endpoints and critical UI components.

## 4. Epics & Stories

### Epic 1: Core Plant Management

**Goal:** Establish the foundational functionality for users to manage their plant inventory.

#### Story 1.1: Project Scaffolding and Initialization
As a developer, I want to initialize the project with all necessary configurations, so that we have a stable foundation for development.
- **Acceptance Criteria:**
  - 1: `create-t3-turbo` monorepo is created.
  - 2: Dependencies are installed via `pnpm`.
  - 3: Local development server runs successfully.
  - 4: Database schema is successfully pushed.

#### Story 1.2: Create User Profile Data Model and API Endpoint
As a developer, I want to create the initial `UserProfile` data model and a tRPC endpoint to retrieve it, so that we have the foundation for user-specific features.
- **Acceptance Criteria:**
  - 1: A new Drizzle schema for `UserProfile` is created.
  - 2: The database schema is successfully updated.
  - 3: A new tRPC router exists for user profiles.
  - 4: A tRPC procedure exists to get a user's profile.
  - 5: The new endpoint can be tested and returns data correctly.

#### Story 1.3: Create Plant Profile Data Model and API
As a developer, I want to create the `Plant` data model and API endpoints for CRUD operations, so that users can manage their plants.
- **Acceptance Criteria:**
  - 1: A new Drizzle schema for `Plant` is created with required fields.
  - 2: `Plant` schema is linked to the `UserProfile` schema.
  - 3: tRPC procedures for `create`, `getById`, `getAllForUser`, `update`, and `delete` are created for plants.
  - 4: All endpoints are protected and can only be accessed by the plant's owner.

#### Story 1.4: Basic UI for Displaying Plants
As a user, I want to see a list of all my plants on a single page, so that I can get an overview of my garden.
- **Acceptance Criteria:**
  - 1: A new page is created at `/plants`.
  - 2: The page calls the `plant.getAllForUser` endpoint to fetch data.
  - 3: A loading state is displayed while data is being fetched.
  - 4: An empty state is displayed if the user has no plants.
  - 5: Fetched plants are displayed in a simple card format, showing the plant's name and species.

