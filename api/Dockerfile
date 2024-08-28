FROM node:12.18.1

WORKDIR /

COPY package.json package.json
RUN npm install

COPY . .

RUN npm run build

CMD [ "npm", "start" ]
