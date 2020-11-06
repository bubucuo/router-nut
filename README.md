# lesson5-Route 渲染内容的三种方式

[b站视频教程](https://www.bilibili.com/video/BV16z4y1C75E)

[TOC]

## 资源

1. [React 官网](https://react.docschina.org/)
2. [react-router](http://react-router.docschina.org/)



## 课堂目标

2. 掌握 Route 渲染内容的三种方式
2. 掌握 404 路由



## 知识点

Route 渲染优先级：children>component>render。

三者能接收到同样的[route props]，包括 match, location and history，但是当不匹配的时候，children 的 match 为 null。

这三种方式互斥，你只能用一种。

```jsx
import React, {useState} from "react";
import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import LoginPage from "./pages/LoginPage";
import _404Page from "./pages/_404Page";

function App() {
  const [count, setCount] = useState(0);
  return (
    <div className="App">
      <button
        onClick={() => {
          setCount(count + 1);
        }}>
        add: {count}
      </button>
      <Router>
        <Link to="/">首页</Link>
        <Link to="/user">用户中心</Link>
        <Link to="/login">登录</Link>
        {/* 独占路由 */}
        <Switch>
          <Route
            path="/"
            exact
            //children={children}
            component={HomePage}

            // ! 渲染component的时候会调用React.createElement，如果使用下面这种匿名函数的形式，每次都会生成一个新的匿名的函数，
            // ! 导致生成的组件的type总是不相同，这个时候会产生重复的卸载和挂载
            //!  错误举例 课下自己尝试下 观察下HomePage的didMount和willUnmount函数 */}
            //component={() => <HomePage />}

            // render={render}
          />
          <Route path="/user" component={UserPage} />
          <Route path="/login" component={LoginPage} />
          <Route component={_404Page} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

function children(props) {
  console.log("children props", props); //sy-log
  return <div>children</div>;
}

function render(props) {
  console.log("props props", props); //sy-log
  return <div>render</div>;
}
```



### children：func

有时候，不管 location 是否匹配，你都需要渲染一些内容，这时候你可以用 children。

除了不管 location 是否匹配都会被渲染之外，其它工作方法与 render 完全一样。

```jsx
import React, {Component} from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router, Link, Route} from "react-router-dom";

function ListItemLink({to, name, ...rest}) {
  return (
    <Route
      path={to}
      children={({match}) => (
        <li className={match ? "active" : ""}>
          <Link to={to} {...rest}>
            {name}
          </Link>
        </li>
      )}
    />
  );
}

export default class RouteChildren extends Component {
  render() {
    return (
      <div>
        <h3>RouteChildren</h3>
        <Router>
          <ul>
            <ListItemLink to="/somewhere" name="链接1" />
            <ListItemLink to="/somewhere-else" name="链接2" />
          </ul>
        </Router>
      </div>
    );
  }
}
```

### render：func

但是当你用 render 的时候，你调用的只是个函数。但是它和 component 一样，能访问到所有的[route props]。

```jsx
import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router, Route} from "react-router-dom";

// 方便的内联渲染
ReactDOM.render(
  <Router>
    <Route path="/home" render={() => <div>Home</div>} />
  </Router>,
  node
);

// wrapping/composing
//把route参数传递给你的组件
function FadingRoute({component: Component, ...rest}) {
  return (
    <Route {...rest} render={routeProps => <Component {...routeProps} />} />
  );
}

ReactDOM.render(
  <Router>
    <FadingRoute path="/cool" component={Something} />
  </Router>,
  node
);
```

### component: component

只在当 location 匹配的时候渲染。



### 注意

当你用`component`的时候，Route 会用你指定的组件和 React.createElement 创建一个新的[React element]。这意味着当你提供的是一个内联函数的时候，每次 render 都会创建一个新的组件。这会导致不再更新已经现有组件，而是直接卸载然后再去挂载一个新的组件。因此，当用到内联函数的内联渲染时，请使用 render 或者 children。

Route 核心渲染代码如下：

![image-20200224174023810](https://tva1.sinaimg.cn/large/0082zybply1gc7moo8djgj311c0u0wv0.jpg)



### 404 页面

设定一个没有 path 的路由在路由列表最后面，表示一定匹配

```react
<Switch>
  <Route path="/" exact component={HomePage} />
  <Route path="/user" component={UserPage} />
  <Route path="/login" component={LoginPage} />
  <Route component={_404Page} />
</Switch>
```

### 