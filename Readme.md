Go to main folder and then run this
docker build -t reactivities-backend -f API/Dockerfile .
docker tag reactivities-backend ht170900/reactivities-backend:latest

docker build -t reactivities-frontend -f client/Dockerfile .
docker tag reactivities-backend ht170900/reactivities-frontend:latest

docker push ht170900/reactivities-frontend
docker push ht170900/reactivities-backend

docker save -o frontend.tar reactivities-frontend
docker save -o backend.tar reactivities-backend

docker images

docker search reactivities-backend
docker search reactivities-frontend

docker pull ht170900/reactivities-backend:latest
docker pull ht170900/reactivities-frontend:latest

docker-compose up -d

yml file content 
version: "3.8"

services:
  backend:
    image: ht170900/reactivities-backend:latest  # Pull from Docker Hub
    ports:
      - "5000:5000"
      - "5001:5001"
    environment:
      - ASPNETCORE_URLS=http://+:5000

  frontend:
    image: ht170900/reactivities-frontend:latest  # Pull from Docker Hub
    ports:
      - "80:80"
    depends_on:
      - backend

