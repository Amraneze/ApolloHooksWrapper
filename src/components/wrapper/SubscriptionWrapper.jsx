import React from "react";
import PropTypes from "prop-types";
import { useSubscription } from "@apollo/react-hooks";
import { Suspense, Dialog } from "../";

export default function SubscriptionWrapper({
  subscription,
  options,
  children
}) {
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
  } = useSubscription(subscription, options);

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
  children: PropTypes.func.isRequired,
  subscription: PropTypes.object.isRequired
};
