# 使用 Node.js 官方镜像作为基础镜像
FROM node:20 AS build

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json，安装依赖
COPY package*.json ./
RUN npm install

# 复制源代码到工作目录
COPY . .

# 编译项目
RUN npm run build

# 生产环境镜像
FROM node:20-slim

# 设置工作目录
WORKDIR /app

# 复制构建后的文件
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules

# 暴露应用的端口
EXPOSE 3000

# 设置启动命令
CMD ["node", "dist/main"]