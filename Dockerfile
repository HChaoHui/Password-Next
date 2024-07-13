# 使用官方的Node.js镜像作为基础镜像
FROM node:18.17.0

# 设置工作目录
WORKDIR /app

# 复制前端代码并构建
COPY web /app/web
WORKDIR /app/web
RUN npm install

# 复制后端代码并构建
COPY admin /app/admin
WORKDIR /app/admin
RUN npm install

# 重新构建 sqlite3 模块
RUN npm rebuild sqlite3

# 暴露端口
EXPOSE 3000
EXPOSE 19899

# 启动应用
CMD ["sh", "-c", "cd /app/web && npm run build && npm start & cd /app/admin && node index.js"]
