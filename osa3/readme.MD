Assignment 3.12 file (mongo.js) is in backend directory. 

# To try out app on local docker

cd express-backend
docker build . -t fullstack-2019-kurssi/puhelinluettelo:latest
docker run -p 3001:3001 -e DB_URL="database_address_goes_here" fullstack-2019-kurssi/puhelinluettelo:latest

