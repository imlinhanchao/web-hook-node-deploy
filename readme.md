# Coding Web Hook 自动部署 Node.js 应用

# 部署说明
1. 将此 Node.js 项目部署在你的服务器上，端口号默认为3000，假设访问网址为：`http://domain.com:3000`。
2. 将 script 目录下的 deploy-node 加入到系统命令中。
3. 需安装 `forever` npm 包。

# 自动部署设置说明
1. 在 Coding 对应项目设置中，将服务器的 SSH 公钥添加到部署密钥。
2. 执行
```bash
# deploy-node 项目名(英文) git-ssh地址 分支名 启动服务文件
deploy-node fresh git@git.coding.net:user/project.git master ./bin/www
```
3. 部署完成后，会自动开启 log 监控。此时可以在网站操作监控 log 。确认没有问题后按下`Ctrl + C`退出监控。
4. 在项目设置的 WebHook 添加 URL：http://domain.com:3000/webhook，若需 token 在服务端的 config.json 配置；

# 使用说明
后续只要将代码提交到 master 分支，就会自动同步部署在服务器了。