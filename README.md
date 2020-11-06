# lesson6 - 动态路由

[TOC]

## 资源

1. [React 官网](https://react.docschina.org/)
2. [react-router](http://react-router.docschina.org/)



## 课堂目标

1. 动态路由



## 知识点

### 动态路由

使用:id的形式定义动态路由

定义路由:

```jsx
<Route path="/product/:id" component={Product} />
```

添加导航链接:

```react
<Link to={"/product/123"}>搜索</Link>
```

创建Search组件并获取参数:

```jsx
function Product({location, match}) {
  console.log("match", match); //sy-log
  const {id} = match.params;
  return <h1>Product-{id}</h1>;
}
```

