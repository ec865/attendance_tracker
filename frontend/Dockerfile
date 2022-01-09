FROM node:17-alpine 
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json yarn.lock ./
COPY src/ ./src/
COPY public/ ./public/
RUN npm install axios
RUN yarn install

EXPOSE 3000

CMD ["yarn", "start"]