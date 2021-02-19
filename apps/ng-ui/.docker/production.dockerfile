FROM node:15.8.0-alpine3.10 as angular-built
WORKDIR /usr/src/app
RUN npm i -g @angular/cli@11.0.0
COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install --silent
COPY . .
RUN ng build --prod --build-optimizer

FROM nginx:1.19.7
LABEL author="Saurabh Palatkar"
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=angular-built /usr/src/app/dist/ng-app /usr/share/nginx/html
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]
