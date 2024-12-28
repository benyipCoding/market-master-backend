# 使用官方的 Node.js 镜像作为基础镜像
FROM node:20-alpine

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json 并安装依赖
COPY package*.json ./
RUN npm install --production

# 复制应用程序源代码
COPY . .

# 构建项目
RUN npm run build

# 暴露应用程序的端口
EXPOSE 3000

# 启动应用程序
CMD ["node", "dist/main.js"]

