FROM node:14
#or simply WORKDIR /usr/invoice
WORKDIR /usr/invoice-api
COPY package.json .
COPY package-lock.json .
#RUN npm ci (For production)
RUN npm install
COPY . .
CMD ["npm", "start"]