Assignment 3.12 file (mongo.js) is in backend directory. Rest of the application runs on private docker:

http://fs2019.mcfish.info

# To try out app on local docker

cd express-backend
docker build . -t fullstack-2019-kurssi/puhelinluettelo:latest
docker run -p 3001:3001 -e DB_URL="database_address_goes_here" fullstack-2019-kurssi/puhelinluettelo:latest

