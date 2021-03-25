FROM node:alpine
EXPOSE 80

RUN mkdir /opt/tettitori-ui

ADD ./package-lock.json /opt/tettitori-ui
ADD ./package.json /opt/tettitori-ui

ADD ./server.js /opt/tettitori-ui
ADD ./env/${DEPLOY_ENV}.env /opt/tettitori-ui/app.env
ADD ./hubi-logging /opt/tettitori-ui/hubi-logging

RUN mkdir /opt/install

ADD ./ /opt/install

WORKDIR /opt/install

RUN npm ci
RUN npm run gulp
RUN npm run build --mode production

RUN cp -R ./build /opt/tettitori-ui/build
RUN cp -R ./node_modules /opt/tettitori-ui/node_modules

WORKDIR /opt/tettitori-ui

RUN rm -R -rf /opt/install

CMD npm run serve
