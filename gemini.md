# Enterprise Context Primer

This document outlines the structure and technologies used in the Enterprise Context Primer project.

The Enterprise Context Primer is a web application that helps an enterprise manage the LLM context for it's engineering community. 
The system allows the Enterprise to create a company context which has details of the architectural choices the company makes, including acceptable tooling etc. It includes Team context which allows teams to register and create conext for the team centrally, it also allows for Individual context of a person to be stored centrally.1

The system has a backend API that the CLI calls to "prime" the context for interacting with a tool like Gemini CLI or Claude Code

## Backend

The backend is a Node.js application built with TypeScript and Express. It provides a RESTful API for managing context at different levels within an organization.

### Technologies

- **Node.js**: JavaScript runtime environment.
- **TypeScript**: Superset of JavaScript that adds static typing.
- **Express**: Web application framework for Node.js.
- **Knex.js**: SQL query builder for Node.js.
- **SQLite**: Self-contained, serverless SQL database engine.

### Database Schema

The database consists of the following tables:

- `company_context`: Stores a single JSON object for company-wide context.
- `teams`: Stores team information, including a name.
- `team_context`: Stores a JSON object for team-specific context, linked to a team.
- `users`: Stores user information, including an email and a team assignment.
- `individual_context`: Stores a JSON object for user-specific context, linked to a user.

### API Endpoints

The API is organized into three main resources:

- **/company**:
  - `GET /`: Retrieves the company context.
  - `PUT /`: Creates or updates the company context.
- **/teams**:
  - `GET /`: Retrieves all teams.
  - `POST /`: Creates a new team.
  - `GET /:id`: Retrieves a single team.
  - `PUT /:id`: Updates a team.
  - `DELETE /:id`: Deletes a team.
  - `GET /:teamId/context`: Retrieves the context for a specific team.
  - `PUT /:teamId/context`: Creates or updates the context for a specific team.
- **/users**:
  - `GET /`: Retrieves all users.
  - `POST /`: Creates a new user.
  - `GET /:id`: Retrieves a single user.
  - `PUT /:id`: Updates a user.
  - `DELETE /:id`: Deletes a user.
  - `GET /:userId/context`: Retrieves the context for a specific user.
  - `PUT /:userId/context`: Creates or updates the context for a specific user.
