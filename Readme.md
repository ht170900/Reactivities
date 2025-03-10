<<<<<<< HEAD
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
=======
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
>>>>>>> 2f05a98653b5c4f0e7dd69bdcc04ed6c3ff542f7
