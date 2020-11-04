# lesson2-用原生 js 实现前端路由

## 什么前端路由

​ 路由这个概念最早出现在后端，通过用户请求的 url 导航到具体的 html 页面。现在的前端路由不同于传统路由，它不需要服务器解析，而是可以通过 hash 函数或者 h5 history API 来实现。在前端开发中，我们可以使用路由设置访问路径，并根据路径与组件的映射关系切换组件的显示，而这整个过程都是在同一个页面中实现的，不涉及页面间的跳转，这也就是我们常说的单页应用（spa）。

## 原生 js 实现前端路由

```html
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>lesson1</title>
  </head>
  <body>
    <ul>
      <li><a href="#/home">home</a></li>
      <li><a href="#/user">user</a></li>
      <li><a href="#/login">login</a></li>
    </ul>

    <div id="view"></div>
  </body>

  <script>
    // 当初始的 HTML 文档被完全加载和解析完成之后，DOMContentLoaded 事件被触发，
    // 而无需等待样式表、图像和子框架的完全加载。
    window.addEventListener("DOMContentLoaded", onLoad);

    // 当URL的片段标识符更改时，将触发hashchange事件 (跟在＃符号后面的URL部分，包括＃符号)
    window.addEventListener("hashchange", onHashChange);

    let view;

    function onLoad() {
      view = document.getElementById("view");
      onHashChange();
    }

    // 路由变化时，根据路由渲染对应 UI
    function onHashChange() {
      switch (location.hash) {
        case "#/home":
          view.innerHTML = "Home";
          return;
        case "#/user":
          view.innerHTML = "User";
          return;
        case "#/login":
          view.innerHTML = "Login";
          return;
        default:
          return;
      }
    }
  </script>
</html>
```
