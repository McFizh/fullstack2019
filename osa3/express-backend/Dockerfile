FROM node:10.15 AS builder
RUN git clone https://github.com/McFizh/fullstack2019.git
WORKDIR /fullstack2019/osa3/puhelinluettelo
RUN npm ci ; npm run build

FROM node:10.15
EXPOSE 3001
WORKDIR /service
COPY --from=builder /fullstack2019/osa3/puhelinluettelo/build ./build
COPY package*.json index.js /service/
COPY lib /service/lib
COPY models /service/models
RUN npm ci
CMD node index.js
