FROM node:14
WORKDIR /app
COPY . /app
RUN cd /app/client ; npm install ; npm run-script build
RUN npm install
