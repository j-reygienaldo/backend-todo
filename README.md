# Todo Apps - Backend

## Created using Nest.js + Prisma

> How to run
>
> 1. Install the package using `yarn` or `npm install`
> 2. Update your connection string on .env file (for this project, we are using SQL Server), or create using example below
> 3. Run `npx prisma migrate deploy`
> 4. If success, then `yarn dev` or `npm run dev` to start the apps

## Created using Node v18.19.1

## Features

1. Login/register using email (need to connect to backend from another repo)
2. Add, edit (mark as done/undone), delete Todo
3. Search Todo

## More features

- [x] Database migration
- [x] Authentication & Authorization
- [x] Using Design Pattern
- [x] Implement Logging
- [-] Add Unit Testing

## Error and basic debugging

1. If there's a CORS error, please add your frontend domain on `main.tsx` file.

## .env example

```
> DATABASE_URL=sqlserver://host:port;database=db_name;user=user_name;password=pwd;encrypt=true;trustServerCertificate=true

> SALT_ROUNDS=10
```
