# deploy bash script
docker build -t toanthanh/pos-client:latest -t toanthanh/pos-client:$SHA -f ./client/Dockerfile ./client
docker build -t toanthanh/pos-server:latest -t toanthanh/pos-server:$SHA -f ./server/Dockerfile ./server

# push images with latest tag
docker push toanthanh/pos-client:latest
docker push toanthanh/pos-backend:latest

# push images with SHA tag
docker push toanthanh/pos-client:$SHA
docker push toanthanh/pos-server:$SHA

# deploy applications to Kubernetes
kubectl apply -f k8s
kubectl set image deployments/server-deployment server=toanthanh/pos-server:$SHA
kubectl set image deployments/client-deployment client=toanthanh/pos-client:$SHA