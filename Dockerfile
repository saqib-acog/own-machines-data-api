FROM node:alpine
WORKDIR /machine-data-app
COPY package.json ./
RUN npm install
COPY node_modules .
COPY . .
CMD ["npm", "run", "dev"]
