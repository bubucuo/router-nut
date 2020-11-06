import React, {Component} from "react";
import {RouterContext} from "./RouterContext";
import matchPath from "./matchPath";
export default class Route extends Component {
  render() {
    return (
      <RouterContext.Consumer>
        {context => {
          const {location} = context;
          const {path, children, component, render} = this.props;
          const match = path
            ? matchPath(location.pathname, this.props)
            : context.match; //location.pathname === path;
          const props = {...context, location, match};
          // children component render
          //match children 》 component》 render 》null
          // 不match children(function) > null
          return match
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
            : null;
        }}
      </RouterContext.Consumer>
    );
  }
}
