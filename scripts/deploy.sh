#!/bin/bash
set -e

echo "🚀 Starting Rezzy deployment..."

ENVIRONMENT=${ENVIRONMENT:-production}
echo "Deploying to: $ENVIRONMENT"

git pull origin main
export $(cat .env.$ENVIRONMENT | xargs)

docker compose down || true
docker compose build --no-cache
docker compose up -d

sleep 10

if curl -f http://localhost:3001/api/health > /dev/null 2>&1; then
    echo "✓ API is healthy"
else
    echo "✗ API health check failed"
    docker compose logs api
    exit 1
fi

echo "✓ Deployment completed!"
