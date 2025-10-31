FROM node:23-alpine AS builder

WORKDIR /home/app

COPY package*.json ./

RUN npm install

COPY . .

FROM node:23-alpine AS runtime

WORKDIR /home/app

COPY --from=builder /home/app /home/app

EXPOSE 8080

ENV NODE_ENV=production
ENV PORT=8080

CMD ["npm", "start"]
