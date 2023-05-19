# Feature:

- Allow upload IB portfolio trade and export a csv with the required field
- Show the uploaded data in data grid
- Show price alert in alert box when website is open
- Allow upload of exchange rate and store in DB
- Calculate the capital gian
- Calculate the interest gain
- Calculate the dividend gain
- Show portfolio diagram in pie chart

# What have done?

- Create the next js project

```
npx create-next-app@latest --experimental-app
✔ What is your project named? … next-finsight
✔ Would you like to use TypeScript with this project? … Yes
✔ Would you like to use ESLint with this project? … Yes
✔ Would you like to use Tailwind CSS with this project? … Yes
✔ Would you like to use `src/` directory with this project? … No
✔ Use App Router (recommended)? … Yes
✔ Would you like to customize the default import alias? … No
```

- Install TypeScript and its required dependencies (Need to double check if still required after saying yes in the step 1)

```
npm install -D typescript ts-node @types/node
```

- Install Tailwindcss typography

```

npm install --save-dev @tailwindcss/typography
```

- Install MUI data grid

```
npm install @mui/icons-material @mui/material @emotion/styled @emotion/react
npm install @mui/x-data-grid
```

- Install Redux toolkit

```

npm install react-redux @reduxjs/toolkit

```

- Install react-datepicker

```

npm i --save-dev @types/react-datepicker

```

- Install filepond for drag and drop file to upload

```
npm install react-filepond filepond --save
```

- Install Next-theme

```
npm install next-themes
```

## CSV Parser

```

npm install csv-parser

```

## Postresql

### Install Postgresql

```

brew install postgresql

```

### Install Postgresql Admin

```

brew install --cask pgadmin4

```

### Start Postgresql

```

brew services start postgresql@14

```

### Run Postgresql

```

psql postgres

```

### List the database

```

\l

```

### Create Database with name nextfinsight

```

CREATE DATABASE nextfinsight;

```

### Create User with name dummy and grant all access to database nextfinsight to this user

```

CREATE USER dummy WITH PASSWORD '<your-password>';

```

### Grant permission to the user dummy

```

GRANT ALL PRIVILEGES ON DATABASE nextfinsight TO dummy;

```

> Replace <your-password> with any password you like.

### Connect to database nextfinsight

```

\c nextfinsight

```

## Prisma

```

npm install prisma --save-dev

```

4. Prisma

- Init prisma

```

npx prisma init

```

- Create schema in schema.prisma (run when there is any update in schema.prisam)

- Push to Prisma (This step will solve the issue in Cannot find module '@prisma/client' in client.ts)

```

npx prisma db push

```

- Check the Holding table is created

- Check data is created in the database

> Run below command to see the data in Prisma studio

```

npx prisma studio

```

- Step to Add table

1. Add the table in schema.prisma
2. Create the below directory, remove it if already exist and run the command below

```
mkdir -p prisma/migrations/0_init
```

3. Run the below command to generate migration script

```
npx prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma --script > prisma/migrations/0_init/migration.sql
```

4. Review the sql and remove the tables that you don't want to change
5. Run the below command to apply the change

```
npx prisma migrate resolve --applied 0_init
```

> Or, goto postgres console to query the data directly

model Interest {
id Int @id @default(autoincrement())
createdAt DateTime @default(now())
updatedAt DateTime @updatedAt
payDate DateTime
instrumentCode String
amount Decimal @db.Decimal(12, 6)
currencyCode String?
exchangeRate Decimal @db.Decimal(12, 6)
exchangeRateYearly Decimal? @db.Decimal(12, 6)
exchangeRateMonthly Decimal? @db.Decimal(12, 6)
exchangeRateMonthlyInverse Decimal? @db.Decimal(12, 6)
}

model Dividend {
id Int @id @default(autoincrement())
createdAt DateTime @default(now())
updatedAt DateTime @updatedAt
payDate DateTime
instrumentCode String
quantity Int
tax Decimal @db.Decimal(12, 6)
fee Decimal @db.Decimal(12, 6)
grossRate Decimal @db.Decimal(12, 6)
grossAmount Decimal @db.Decimal(12, 6)
netAmount Decimal @db.Decimal(12, 6)
currencyCode String?
exchangeRate Decimal @db.Decimal(12, 6)
exchangeRateYearly Decimal? @db.Decimal(12, 6)
exchangeRateMonthly Decimal? @db.Decimal(12, 6)
exchangeRateMonthlyInverse Decimal? @db.Decimal(12, 6)
}

## Reference:

- A JavaScript library that can upload anything you throw at it, optimizes images for faster uploads, and offers a great, accessible, silky smooth user experience.
  https://pqina.nl/filepond/docs/

- CSS grid cheatsheet
  https://grid.malven.co/

# Below are autogenerated by Next.js

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
