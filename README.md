# pos

[![Build Status](https://travis-ci.com/ductoanthanh/pos.svg?token=qYUgzVzD82JQipy27Dcy&branch=master)](https://travis-ci.com/ductoanthanh/pos)

Encrypt service account file from Google Cloud IAM

# Run ruby container in current working directory

```
docker run -it -v $(pwd):/app ruby:2.3 sh
```

# Install Travis

```
gem install travis
```

# Login with Travis

```
travis login --pro --github-token xxx
```

# Encrypt the file, specify the working directory in Travis

```
travis encrypt-file service-account.json -r ductoanthanh/pos
```

# Add following build script in before_install stage

```
openssl aes-256-cbc -K $encrypted_9f3b5599b056_key -iv $encrypted_9f3b5599b056_iv -in service-account.json.enc -out service-account.json -d
```

# Helm install and add stable repo

```
curl -fsSL -o get_helm.sh https://raw.githubusercontent.com/helm/helm/master/scripts/get-helm-3
chmod 700 get_helm.sh
./get_helm.sh
helm repo add stable https://kubernetes-charts.storage.googleapis.com/
```

# Use Helm to install nginx-ingress

```
helm install my-nginx stable/nginx-ingress
```

# Create secret

```
kubectl create secret generic db_url --from-literal DB_URL=yoururl
```
