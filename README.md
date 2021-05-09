## 项目构建

* 通过vue和webpack构建的一个单页应用的项目
``` bash
|-- api 与后端交互的接口
|-- images 存放静态文件（例如：图片，视频等）
|-- components 组件文件存放目录，放可复用的组件
|-- directive 存放自定义指令函数目录，自定义指令统一放在这个地方管理
|-- filters 存放过滤函数目录，自定义函数统一放在这个地方管理
|-- layout 侧边栏和导航栏组件存放目录，后期功能追加注意组件拆分，遵循底耦合原则
|-- styles 全局公共样式存放目录，此文件慎重更改，避免样式污染
|-- views 业务页面文件存放目录
|-- store 存放vuex相关文件（多个模块需要分开申明）该项目页面较少，目前未涉及到需要使用，后续需要在追加。
|-- static 存放公共文件配置，该目录不会配webpack所打包
    |-- config 书写公共的一些配置地址，方便打包后更改     
|-- main.js 入口函数
|-- App.vue 应用配置，用来配置App全局样式以及监听应用的生命周期
|-- package.json 项目中所使用插件的版本信息
```


## 项目启动

``` bash
# 安装所需依赖包
npm install

# 启动项目 默认端口8080
npm run dev

# 打包项目，webpack会根据模块打包成相应文件
npm run build

# 打包项目，webpack会根据模块打包成相应文件并生成一个分析报告
npm run build --report
```
## 特别注意
1. 本项目属于独立的项目，所以为了避免css污染 每个页面都要采用如下写法。
```
<template>
    <div id="tailorPicture">
        <span class="explen"></span>
    </div>
</template>

<style lang="less">
  #tailorPicture{
    .explen{
      xxx
    }
  }
</style>
每个页面都必须声明一个唯一的id，页面中所有的class声明的样式，必须写在id里面，如上例子
```
2. 字体图标采用 cdn形式 
```
在index.html中引入
<link rel="stylesheet" href="https://at.alicdn.com/t/font_1521460_mva7jb9ww1n.css">
用法如下：
<i class="iconfont icon-yunshu"></i>
每次更新图标库只需在字体图标库中重新生成一个在线链接即可。
```
