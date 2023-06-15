FROM node:18-alpine AS dependencies
WORKDIR /app

COPY package.json package-lock.json ./
COPY prisma ./prisma/
RUN  npm install --production

FROM node:18-alpine AS build
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

RUN npx prisma generate
RUN npm run build
COPY migrate-and-start.sh .
RUN chmod +x migrate-and-start.sh

FROM node:18-alpine AS deploy
WORKDIR /app

ENV NODE_ENV production

COPY --from=build /app/public ./public
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/.next ./.next
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/prisma ./prisma

EXPOSE 3000

ENV PORT 3000


CMD ["npm", "run", "start:migrate:prod"]
