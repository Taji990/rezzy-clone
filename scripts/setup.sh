#!/bin/bash
set -e

echo "🚀 Setting up Rezzy development environment..."

docker compose build
docker compose up -d

echo "✓ Setup completed!"
echo "  Web:      http://localhost"
echo "  API:      http://localhost/api"
echo "  Traefik:  http://localhost:8080"
