FROM node:16

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

# Bundle app source
COPY . .

EXPOSE 300
CMD [ "node", "index.js" ]