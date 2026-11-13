download controller

kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.12.1/deploy/static/provider/kind/deploy.yaml

node label

kubectl label node desktop-control-plane ingress-ready=true --overwrite
kubectl label node <node ka naam> ingress-ready=true --overwrite

controller ready hone ka wait 

kubectl wait --namespace ingress-nginx \
  --for=condition=ready pod \
  --selector=app.kubernetes.io/component=controller \
  --timeout=180s

verify
kubectl get pods -n ingress-nginx
kubectl get ingressclass
kubectl get svc -n ingress-nginx

then apply
kubectl apply -f ./k8s/ingress.yml