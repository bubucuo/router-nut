import {useState} from "react";
// import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
import {BrowserRouter as Router, Route, Link} from "./react-router-dom-nut";

import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import LoginPage from "./pages/LoginPage";
import _404Page from "./pages/_404Page";

function App() {
  // const [count, setCount] = useState(0);
  const id = 123;
  return (
    <div className="App">
      {/* <button
        onClick={() => {
          setCount(count + 1);
        }}>
        add: {count}
      </button> */}
      <Router>
        <Link to="/">首页</Link>
        <Link to="/user">用户中心</Link>
        <Link to="/login">登录</Link>
        <Link to="/product/123">商品</Link>

        {/* <Switch> */}
        <Route
          path="/"
          exact
          //children={children}
          component={HomePage}
          //render={() => <HomePage />}
          //render={render}
        />
        {/* <Route path="/product/:xx" component={Product} /> */}
        <Route path="/user" component={UserPage} />
        <Route path="/login" component={LoginPage} />

        <Route component={_404Page} />
        {/* </Switch> */}
      </Router>
    </div>
  );
}

export default App;

function Product(props) {
  console.log("props", props); //sy-log
  const {match} = props;
  const {url} = match;
  const {xx} = match.params;

  return (
    <div>
      Product:{xx}
      <Link to={url + "/detail"}>详情</Link>
      <Route path={url + "/detail"} component={Detail} />
    </div>
  );
}

function Detail(props) {
  console.log("Detail props", props); //sy-log
  return <div>Detail</div>;
}

function children(props) {
  console.log("children props", props); //sy-log

  return <div>children</div>;
}

function render(props) {
  console.log("render props", props); //sy-log
  return <div>render</div>;
}
