FROM node:12.16.1-alpine
COPY . .
EXPOSE 3000
RUN npm install && npm run build && npm run start:prod