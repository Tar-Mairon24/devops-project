#! /bin/bash

echo "Service to redeploy: "
echo "1. frontend"
echo "2. backend"
echo "3. database"
echo "4. all"

read -p "Enter the service to redeploy: " service

case "$service" in
    1)
        echo "Redeploying frontend..."
        docker-compose -f docker/frontend.yml up -d --build
        if [ $? -ne 0 ]; then
            echo "Failed to redeploy frontend"
            exit 1
        fi
        ;;
    2)
        echo "Redeploying backend..."
        docker-compose -f docker/backend.yml up -d --build
        if [ $? -ne 0 ]; then
            echo "Failed to redeploy backend"
            exit 1
        fi
        ;;
    3)
        echo "Redeploying database..."
        docker-compose -f docker/postgres.yml up -d --build
        if [ $? -ne 0 ]; then
            echo "Failed to redeploy database"
            exit 1
        fi
        ;;
    4)
        echo "Redeploying all services..."
        docker-compose up -f docker/frontend.yml -f docker/backend.yml -f docker/postgres.yml -d --build
        if [ $? -ne 0 ]; then
            echo "Failed to redeploy all services"
            exit 1
        fi
        ;;
    *)
        echo "Invalid service"
        ;;
esac