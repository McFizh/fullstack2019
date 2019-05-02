FROM node:10.15
RUN git clone https://github.com/McFizh/fullstack2019.git
RUN cd fullstack2019/osa3/puhelinluettelo ; npm ci ; npm run build

FROM node:10.15

EXPOSE 3001

WORKDIR /service
COPY package*.json index.js /service/
RUN npm ci
COPY --from=0 /fullstack2019/osa3/puhelinluettelo/build .

CMD node index.js