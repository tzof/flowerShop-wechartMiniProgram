# TZOF 花城微信小程序前端

[![GitHub license](https://img.shields.io/github/license/tzof/flowerShop-wechartMiniProgram.svg)](https://github.com/tzof/flowerShop-wechartMiniProgram/blob/master/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/tzof/flowerShop-wechartMiniProgram.svg)](https://github.com/tzof/flowerShop-wechartMiniProgram/issues)
[![GitHub stars](https://img.shields.io/github/stars/tzof/flowerShop-wechartMiniProgram.svg)](https://github.com/tzof/flowerShop-wechartMiniProgram/stargazers)

## 项目简介

TZOF 花城微信小程序是为用户提供便捷鲜花购买体验的应用程序。用户可以通过该小程序浏览商品、管理购物车、下单购买以及维护个人信息等。本项目使用 微信小程序 + Vant-weapp 框架开发，与[后端服务](https://github.com/tzof/flowerShop-node)配合提供完整的购物流程支持。

### 后端仓库 - Node.js

[TZOF 花城微信小程序后端仓库](https://github.com/tzof/flowerShop-node)

## API 接口文档

[TZOF 花城小程序接口 api 文档](https://tzof.net:217/api-docs/)

## 功能概览

- **用户登录**：通过微信授权快速登录。
- **商品浏览**：查看首页轮播图和活动信息；浏览不同类别的商品列表及详情页。
- **购物车管理**：添加/修改购物车内商品数量；修改购物车中商品的选择状态；删除购物车内的商品。
- **地址管理**：添加新收货地址；编辑已有地址；设置默认地址；删除不需要的地址。
- **订单处理**：创建新的订单；查看历史订单列表；获取单个订单详细信息。
- **个人中心**：查看并编辑个人信息。

## 开发环境搭建

### 1. 安装微信开发者工具

确保安装了最新版的微信开发者工具。

### 2. 克隆仓库

```bash
git clone https://github.com/tzof/flowerShop-wechartMiniProgram.git
cd flowerShop-wechartMiniProgram
```

### 3. 在微信开发者工具中打开项目

在微信开发者工具中选择“新建项目”，然后选择刚才克隆下来的项目目录作为本地路径。

### 4. 配置域名白名单

在微信开发者工具中配置相应的服务器域名以允许访问后端服务。需要将后端 API 地址（例如https://tzof.net:217）加入request合法域名列表。

### 5. 运行项目

点击微信开发者工具中的“编译”按钮即可运行项目。
