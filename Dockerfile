FROM node:alpine
WORKDIR /machinedataproject
COPY . .
RUN npm i
CMD ["npm", "run", "dev"]