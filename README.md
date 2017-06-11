# ticketing-server

ticketing-server 提供了电影售票相关 RESTful API。详细的 API 文档，你可以点击[这里](https://github.com/TicketingProject/doc/blob/master/server-docs/api.md)查看。

## 安装

```
$ npm install
```

## 使用

项目运行需求 `node` 版本不低于 `v7.6.0`。

```
$ npm start
```

## 实现相关

### 目录结构

```
ticketing-server
  |__configs            - 项目相关配置
  |__controllers        - Controller层
  |__db                 - ORM 配置
  |__error              - 自定义错误相关
  |__models             - Model层
  |__redis              - Redis连接相关
  |__routers            - 路由
  |__schedules          - 定时任务
  |__app.js             * 项目入口
```
