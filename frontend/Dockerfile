FROM node:23-alpine AS builder

WORKDIR /home/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:23-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

COPY --from=builder /home/app/package*.json ./
COPY --from=builder /home/app/.next ./.next
COPY --from=builder /home/app/public ./public
COPY --from=builder /home/app/node_modules ./node_modules

EXPOSE 3000

CMD ["npm", "start"]
