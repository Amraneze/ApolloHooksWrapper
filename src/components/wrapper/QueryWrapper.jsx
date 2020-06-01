import React from "react";
import PropTypes from "prop-types";
import { useQuery } from "@apollo/react-hooks";
import { Suspense, Dialog } from "../";

export default function QueryWrapper({ url, query, options, children }) {
  if (options.pollInterval) {
    options.pollInterval = options.skip ? 0 : options.pollInterval;
  }
  const {
    data,
    loading,
    error,
    fetchMore,
    subscribeToMore,
    stopPolling
  } = useQuery(query, options);

  if (loading) {
    return <Suspense isLoading={true} />;
  }
  if (error) {
    stopPolling();
    return <Dialog />;
  }
  if (data) return children({ data, fetchMore, subscribeToMore });
  return null;
}

QueryWrapper.defaultProps = {
  options: {}
};

QueryWrapper.propTypes = {
  options: PropTypes.object,
  url: PropTypes.string.isRequired,
  query: PropTypes.object.isRequired,
  children: PropTypes.func.isRequired,
  translate: PropTypes.func.isRequired
};
