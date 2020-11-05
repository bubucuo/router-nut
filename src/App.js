import {useState} from "react";
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

        <Switch>
          <Route
            path="/"
            exact
            //children={children}
            component={HomePage}
            //render={() => <HomePage />}
            //render={render}
          />

          <Route path="/" exact component={HomePage}>
            HomePage
          </Route>

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
  console.log("render props", props); //sy-log
  return <div>render</div>;
}
