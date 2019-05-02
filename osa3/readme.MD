Assignment 3.12 file (mongo.js) is in backend directory. Rest of the application runs on google cloud:

http://fs2019.mcfish.info

# Notes on deployment

To deploy:

cd express-backend
docker build . -t gcr.io/fullstack-2019-kurssi/puhelinluettelo:latest
docker push gcr.io/fullstack-2019-kurssi/puhelinluettelo:latest

To force update on deployment:

kubectl set image deployment/puhelinluettelo puhelinluettelo=gcr.io/fullstack-2019-kurssi/puhelinluettelo
