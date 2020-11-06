# lesson11 - 手写实现BrowserRouter、Route、Link

b站账号：欧米伽莎士比亚

[b站视频地址]()

[TOC]

## 资源

1. [React 官网](https://react.docschina.org/)
2. [react-router](http://react-router.docschina.org/)



## 课堂目标

1. react-router初步实现



## 知识点

#### 实现Router 

```jsx
import React, {Component} from "react";
import {RouterContext} from "./Context";

export default class Router extends Component {
  static computeRootMatch(pathname) {
    return {path: "/", url: "/", params: {}, isExact: pathname === "/"};
  }
  constructor(props) {
    super(props);
    this.state = {
      location: props.history.location
    };

    this.unlisten = props.history.listen(location => {
      this.setState({
        location
      });
    });
  }

  componentWillUnmount() {
    if (this.unlisten) {
      this.unlisten();
    }
  }

  render() {
    return (
      <RouterContext.Provider
        value={{
          history: this.props.history,
          location: this.state.location,
          match: Router.computeRootMatch(this.state.location.pathname)
        }}>
        {this.props.children}
      </RouterContext.Provider>
    );
  }
}
```



#### 实现BrowserRouter

**BrowserRouter**：历史记录管理对象history初始化及向下传递，location变更监听

```jsx
import React, {Component} from "react";
import {createBrowserHistory} from "history";
import Router from "./Router";

export default class BrowserRouter extends Component {
  constructor(props) {
    super(props);
    this.history = createBrowserHistory();
  }

  render() {
    return <Router history={this.history}>{this.props.children}</Router>;
  }
}
```



#### 实现Route

路由配置，匹配检测，内容渲染

// match 按照互斥规则 优先渲染顺序为children component render null，children如果是function执行function，是节点直接渲染

// 不match children 或者null （只渲染function）

```jsx
export default class Route extends Component {
  render() {
    return (
      <RouterContext.Consumer>
        {context => {
          // 优先从props中取值
          const location = this.props.location || context.location;
          //  优先从props中取值计算

          const match = this.props.computedMatch
            ? this.props.computedMatch
            : this.props.path
            ? matchPath(location.pathname, this.props)
            : context.match;
          const props = {
            ...context,
            location,
            match
          };
          let {path, children, component, render} = this.props;
          // match  渲染这三者之一：children  component render或者null
          // 不match，渲染children 或者 null
          return (
            <RouterContext.Provider value={props}>
              {match
                ? children
                  ? typeof children === "function"
                    ? children(props)
                    : children
                  : component
                  ? React.createElement(component, props)
                  : render
                  ? render(props)
                  : null
                : typeof children === "function"
                ? children(props)
                : null}
            </RouterContext.Provider>
          );
        }}
      </RouterContext.Consumer>
    );
  }
}
```



#### 实现Link

Link.js: 跳转链接，处理点击事件

```jsx
const Link = forwardRef(({to, children, ...restProps}, ref) => {
  const context = useContext(RouterContext);
  const handleClick = e => {
    e.preventDefault();
    // 命令式
    context.history.push(to);
  };
  return (
    <a href={to} {...restProps} onClick={handleClick} ref={ref}>
      {children}
    </a>
  );
});

export default Link;
```

