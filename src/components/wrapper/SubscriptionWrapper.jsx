import React from "react";
import PropTypes from "prop-types";
import { useSubscription } from "@apollo/react-hooks";
import { Suspense, Dialog } from "../";

export default function SubscriptionWrapper({ url, query, options, children }) {
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
  } = useSubscription(query, options);

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

SubscriptionWrapper.defaultProps = {
  options: {}
};

SubscriptionWrapper.propTypes = {
  options: PropTypes.object,
  url: PropTypes.string.isRequired,
  query: PropTypes.object.isRequired,
  children: PropTypes.func.isRequired,
  translate: PropTypes.func.isRequired
};
