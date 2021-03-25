# build environment
FROM node:14.16.0-alpine AS builder
WORKDIR /app
COPY . .
RUN yarn
RUN yarn build

# production environment
FROM nginx:stable-alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY --from=builder /app/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
