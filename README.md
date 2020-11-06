# lesson7 - 嵌套路由

b站账号：欧米伽莎士比亚

[b站视频地址]()

[TOC]

## 资源

1. [React 官网](https://react.docschina.org/)
2. [react-router](http://react-router.docschina.org/)



## 课堂目标

1. 掌握嵌套路由



## 知识点

### 嵌套路由

Route组件嵌套在其他页面组件中就产生了嵌套关系

修改Product，添加新增和详情

```react
<Route path={url + "/detail"} component={Detail} />
```



```jsx
function Product({match}) {
  console.log("match", match); //sy-log
  const {params, url} = match;
  const {id} = params;
  return (
    <div>
      <h1>Search-{id}</h1>
      <Link to={url + "/detail"}>详情</Link>
      <Route path={url + "/detail"} component={Detail} />
    </div>
  );
}

function Detail({match}) {
  return (
    <div>
      <h1>detail</h1>
    </div>
  );
}
```

