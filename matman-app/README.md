# matman-app

本项目旨在提供数据模拟和进行端对端测试。

## 如何启动数据模拟服务

管理后台启动命令如下，服务启动之后，可以打开 `http://localhost:9527` 进行管理端操作。

```
npm start
```

使用了 [pm2](https://www.npmjs.com/package/pm2) 来启动，命名为 `matman-app`，启动之后服务会常驻内存。关于 pm2 常用的操作包括：

- `pm2 list` ： 查看所有服务
- `pm2 logs` ： 查看日志


## 如何进行端对端测试

端对端测试需要先执行构建：

```
npm run build
```

构建完成之后，运行测试命令即可：

```
npm run test
```
