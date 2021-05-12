FROM node:14.16.1

# create directory
WORKDIR /usr/app

# copy file to directory
COPY package.json ./

# install dependencies
RUN npm install

# copy all
COPY . .

# expose por 3333
EXPOSE 3333

# run server
CMD ["node", "build/server.js"]
