FROM node:alpine
EXPOSE 80

RUN mkdir /opt/tettitori-ui

ADD ./package-lock.json /opt/tettitori-ui
ADD ./package.json /opt/tettitori-ui

ADD ./server.js /opt/tettitori-ui

RUN mkdir /opt/install

ADD ./ /opt/install

WORKDIR /opt/install

RUN npm ci
RUN npm run build

RUN cp -R ./build /opt/tettitori-ui/build
RUN cp -R ./node_modules /opt/tettitori-ui/node_modules

WORKDIR /opt/tettitori-ui

RUN rm -R -rf /opt/install

ENTRYPOINT npm run serve
