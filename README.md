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

## Database: Postresql

### Choice 1: Install postgreSQL directly

```

brew install postgresql

```

- Install postgreSQL Admin

```

brew install --cask pgadmin4

```

- Start postgreSQL

```

brew services start postgresql@14

```

- Run postgreSQL

```

psql postgres

```

### Choice 2: Install Postgresql through docker

- Install Docker

Follow the instruction to download and install docker.
https://docs.docker.com/desktop/install/

- pull postgreSQL image from docker

```
docker pull postgres
```

Reference: https://hub.docker.com/_/postgres

- Start and remove the postgreSQL container

```
docker compose up
```

- Stop and remove the postgreSQL container

```
docker compose down
```

- Connect postgreSQL in docker

- Connect postgreSQL to verify data by interactive terminal

```
docker exec -it postgresql psql -U username -d nextfinsight
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

- Replace <your-password> with any password you like.

```
CREATE USER dummy WITH PASSWORD '<your-password>';
```

### Grant permission to the user dummy

```
GRANT ALL PRIVILEGES ON DATABASE nextfinsight TO dummy;
```

### Connect to database nextfinsight

```
\c nextfinsight
```

## Prisma

- Install prisma

```
npm install prisma --save-dev
```

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

- Run below command to see the data in Prisma studio

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

- Or, goto postgres console to query the data directly

## Dockerize the next.js app, prisma and postgresql

1. Build the Docker image for the current folder and tag it with `docker-next-finsight-image`

```
docker build -t docker-next-finsight-image .
```

2. Check the image was created

```
docker images | grep docker-next-finsight-image
```

3. Start the container

```
docker compose up
```

4. Stop the container

```
docker compose down
```

#### Appendix 1: Run the image in detached mode and map port 3000 inside the container with 3000 on current host

```
docker run -p 3000:3000 -d docker-next-finsight-image

```

#### Appendix 2: Start postgreSQL

- run in detached mode (background mode)

```
docker run --name postgres-sql-detached -p 1234:5432 -d -e POSTGRES_PASSWORD=password -e POSTGRES_USER=username -e POSTGRES_DB=nextfinsight -v /Users/claire/docker/volumes/postgres/data:/var/lib/postgres/data postgres
```

Replace password with your selected password for superuser of the database

#### Appendix 3: stop postgreSQL

- run the below command to find the container id of the postgresql

```
docker ps
```

- run the below command to replace the #containerId#

```
docker stop #containerId#
```

#### Appendix 4: Notes for not using docker compose to manage image, container and network:

- Start/Stop the docker container

```
docker start #containerId#
docker stop #containerId#
```

- Remove the docker container

```
docker rm #containerId#
```

- Check logs

```
docker logs -f my-postgres
```

- check images of docker

```
docker images
```

- remove docker images

```
docker rmi #imageId#
```

- list the network in docker

```
docker network ls
```

- create network in docker

```
docker network create next-finsight-net
```

- connect to the network

```
docker network connect next-finsight-net postgres-sql-detached
```

- expose port to outside network

```
docker run -p 5432:5432 --net next-finsight-net docker-next-finsight-i
```

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
