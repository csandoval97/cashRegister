FROM node:13.12.0-alpine as builder

WORKDIR /usr/src/app

COPY package*.json ./
COPY . ./

RUN npm install
RUN npm install react-scripts@3.4.1 -g
RUN npm run build

FROM nginx:stable-alpine
RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /usr/src/app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]