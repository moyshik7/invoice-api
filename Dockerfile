FROM node:14
WORKDIR /usr/yourapplication-name
COPY package.json .
COPY package-lock.json .
# RUN npm ci (For production)
RUN npm install
COPY . .
CMD ["npm", "start"]