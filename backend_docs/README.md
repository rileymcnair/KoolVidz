# KoolVidz backend

## Installation

 1. Install PostgreSQL from [here](https://www.postgresql.org/download/)
 2. Clone or download the repository
 3. `cd KoolVidz`
 4. `npm install`
 5. Add your database password to `database.js` under ```DB_PASSWORD```
 6. Start the project with `npm run start`
 7. `GET http://localhost:5050/api/onboard` to create the database

## Testing

 1. Install Postman from [here](https://www.postman.com/downloads/)
 2. Import api-spec.json from /backend

## Before Committing

 - Run `npm run lint` to lint your code. Some issues can be fixed with `npm run fix-lint`
 - Remove your password from `database.js`
