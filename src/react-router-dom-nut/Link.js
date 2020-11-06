import React from "react";

export default function Link({to, children, ...restProps}) {
  return (
    <a href={to} {...restProps}>
      {children}
    </a>
  );
}
