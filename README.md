# Getting Started with Education App

## About us

Small team has contribute to implement education app.

## Technique stacks:
- NestJs / TypeORM
- MySQL
- Jest
- Additional: Husky / Pretty

### Prerequisites

What things you need to install

    Node.js v18.6.0
    yarn
    docker-compose (optional)

### Installing
#### With Docker

    1. Clone the repository
    2. Run command: `docker-compose up -d`

#### Without Docker

    1. Clone the repository
    2. Install MySQL
        - Database: education_db
        - Username: education_db
        - Password: education_password
        Credential above is default.
        You can revise it in config directory (config/default.yaml)
    3. Install dependencies: `yarn`
    4. Start service at port 3000: `yarn start:dev`
