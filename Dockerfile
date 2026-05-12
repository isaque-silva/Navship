FROM node:22-bookworm-slim

WORKDIR /app

COPY package*.json ./

RUN npm ci --include=optional \
  && test -f /app/node_modules/@cloudflare/workerd-linux-64/bin/workerd

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "3000"]
