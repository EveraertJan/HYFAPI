FROM node:7.9.0

RUN mkdir -p /crew/lib

COPY package.json /crew
COPY package-lock.json /crew

WORKDIR /crew

RUN npm install || cat npm-debug.log

VOLUME /crew/src
VOLUME /crew/uploads

EXPOSE 3000

CMD ["npm", "start"]
