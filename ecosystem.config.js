module.exports = {
  apps: [
    {
      name: 'market-master-backend', // 应用名称
      script: 'dist/main.js', // 启动脚本
      // instances: 1, // 启用集群模式，实例数为 CPU 核心数
      // exec_mode: "cluster", // 集群模式
      watch: false, // 是否监听文件变化自动重启
      env: {
        NODE_ENV: 'production', // 开发环境变量
      },
      env_production: {
        NODE_ENV: 'production', // 生产环境变量
      },
      log_date_format: 'YYYY-MM-DD HH:mm:ss', // 日志时间格式
    },
  ],
};
