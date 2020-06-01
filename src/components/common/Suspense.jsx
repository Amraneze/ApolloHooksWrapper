import React from "react";
import PropTypes from "prop-types";

import { Loader } from "../";

function Suspense({ children, isLoading, ...rest }) {
  return <div {...rest}>{isLoading ? <Loader loading /> : children}</div>;
}

Suspense.defaultProps = {
  children: <div />
};

Suspense.propTypes = {
  isLoading: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node.isRequired
};

export default Suspense;
