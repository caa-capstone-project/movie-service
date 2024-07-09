# Deploy as docker container
```
docker compose up -d --build
```
# Build and push image for both arm64 and amd64 arch
```
docker buildx build --platform linux/amd64,linux/arm64 -t trystan00000/movie-service:latest --push .
```
### API url: localhost:4200/api/***