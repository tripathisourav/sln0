kubectl port-forward -n ingress-nginx svc/ingress-nginx-controller 80:80

post forward

terminal path -> cd ~/Desktop/cohort2dev/projects/capstone

logs - kubectl logs deployment/sandbox-deployment -f

delete cluster - kubectl delete -f ./k8s