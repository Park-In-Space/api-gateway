FROM node:carbon-slim

# Create app directory
WORKDIR /api-gateway

# Install app dependencies
COPY package.json /api-gateway/
RUN npm install

# Bundle app source
COPY . /api-gateway/

CMD [ "npm", "run" ]
