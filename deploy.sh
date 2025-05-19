#! /bin/bash

echo "Service to redeploy: "
echo "1. frontend"
echo "2. backend"
echo "3. database"
echo "4. all"
echo "5. nada"

read -p "Enter the service to redeploy: " service

case "$service" in
    1)
        if [ ! -f docker/frontend.yml ]; then
            echo "Frontend manifest not found"
            exit 1
        fi
        # if [ ! -f CN_React/Dockerfile ]; then
        #     echo "Frontend Dockerfile not found"
        #     exit 2
        # fi
        ./scripts/validarContenedor.sh frontend
        exit_code=$?
        if [ $? -eq 2 ]; then
            echo "Multiple frontend containers found"
            exit 3
        fi
        if [ $exit_code -eq 2 ]; then
            echo "Multiple frontend containers found"
            exit 3
        fi
        if [ $exit_code -eq 1 ]; then
            echo "Stopping frontend..."
            docker compose -f docker/frontend.yml down
            echo "Redeploying frontend..."
            docker compose -f docker/frontend.yml up -d --build
            if [ $? -ne 0 ]; then
                echo "Failed to redeploy frontend"
                exit 4
            fi
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
