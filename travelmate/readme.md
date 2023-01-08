# Travelmate app
An app to facilitate potential user who wants to travel with his like minded or interested person


# Tech Stack
react
node
postgres
meilisearch
microservices
docker
docker-compose

# parts
1-travelmate
    monolith app with all backend services
2-travelmate-payment-microservice
    one microservice in whole app of payment service 
3-travelmate-frontend
    frontend of app

# Main Point to remember

As we are using sql database for microservice we cannot seperate one service soley
based on just single migration we have to use other migration foreign key to be in
our microservice so just using that in payment microservice repo.