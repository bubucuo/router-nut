import React, {Component} from "react";

export default class Route extends Component {
  render() {
    const {path, component} = this.props;
    const match = window.location.pathname === path;
    return match ? React.createElement(component) : null;
  }
}
