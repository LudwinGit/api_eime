FROM node:12.16.1-alpine
COPY . .
EXPOSE 80
RUN npm install && npm run build 
CMD node dist/main
