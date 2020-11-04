# lesson3-环境配置与 react-router 简介

[TOC]

## 资源

1. [React 官网](https://react.docschina.org/)
2. [react-router](http://react-router.docschina.org/)

## 课堂目标

1. 掌握 cra 环境

2. 掌握 react-router 的基本使用

## 知识点

### 快速开始

```bash
npx create-react-app router-nut
cd router-nut
yarn start
```

### 配置 less 与装饰器

```bash
yarn add @craco/craco craco-less @babel/plugin-proposal-decorators
```

根目录下添加 craco.config.js 文件

```js
// * 配置完成后记得重启下
const CracoLessPlugin = require("craco-less");

module.exports = {
  babel: {
    //用来支持装饰器
    plugins: [["@babel/plugin-proposal-decorators", {legacy: true}]]
  },
  plugins: [
    {
      plugin: CracoLessPlugin
    }
  ]
};
```

修改 package.json

```json
 "scripts": {
    "start": "craco start",
    "build": "craco build",
    "test": "craco test"
  },
```

### react-router 简介

react-router 包含 3 个库，react-router、react-router-dom 和 react-router-native。react-router 提供最基本的路由功能，实际使用的时候我们不会直接安装 react-router，而是根据应用运行的环境选择安装 react-router-dom（在浏览器中使用）或 react-router-native（在 rn 中使用）。react-router-dom 和 react-router-native 都依赖 react-router，所以在安装时，react-router 也会自动安装，创建 web 应用。

#### 安装

```bash
yarn add react-router-dom
```

#### BrowserRouter 与 HashRouter 对比

1. HashRouter 最简单，不需要服务器端渲染，靠浏览器的#的来区分 path 就可以，BrowserRouter 需要服务器端对不同的 URL 返回不同的 HTML，后端配置可[参考](https://react-guide.github.io/react-router-cn/docs/guides/basics/Histories.html)。
2. BrowserRouter 使用 HTML5 history API（ pushState，replaceState 和 popstate 事件），让页面的 UI 同步与 URL。
3. HashRouter 不支持 location.key 和 location.state，动态路由跳转需要通过?传递参数。
4. Hash history 不需要服务器任何配置就可以运行，如果你刚刚入门，那就使用它吧。但是我们不推荐在实际线上环境中用到它，因为每一个 web 应用都应该渴望使用 `browserHistory`。

#### MemoryRouter

把 URL 的历史记录保存在内存中的 `<Router>`（不读取、不写入地址栏）。在测试和非浏览器环境中很有用，如 React Native。

#### 基本使用

react-router 中奉行一切皆组件的思想，路由器-**Router**、链接-**Link**、路由-**Route**、独占-**Switch**、重定向-**Redirect**都以组件形式存在

```jsx
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Link to="/">首页</Link>
        <Link to="/user">用户中心</Link>
        <Link to="/login">登录</Link>

        {/* 根路由要添加exact，实现精确匹配 */}
        <Route exact path="/" component={HomePage} />
        <Route path="/user" component={UserPage} />
        <Route path="/login" component={LoginPage} />
      </Router>
    </div>
  );
}

export default App;
```
