## 指定打包架构

`docker buildx build --platform linux/amd64 -t password_next .`

`docker buildx build --platform linux/arm64 -t password_next .`

`docker buildx build --platform linux/arm64,linux/amd64 -t password_next .`

## 镜像标签

`docker tag password_next:latest nocn/password_next:latest`

`docker tag password_next:latest nocn/password_next:AMD64`

`docker tag password_next:latest nocn/password_next:ARM64`

## 推送镜像到仓库

`docker push nocn/password_next:latest`

`docker push nocn/password_next:AMD64`

`docker push nocn/password_next:ARM64`