import React from "react";
import PropTypes from "prop-types";
import { useMutation } from "@apollo/react-hooks";

import { Suspense, Dialog } from "../";

export default function MutationWrapper({ onUpdate, mutation, options }) {
  const [update, { loading, error }] = useMutation(mutation, options);

  React.useEffect(() => {
    onUpdate(() => update);
  }, [update, onUpdate]);

  if (loading) {
    return <Suspense isLoading={true} />;
  }
  if (error) {
    return <Dialog />;
  }
  return null;
}

MutationWrapper.defaultProps = {
  options: {}
};

MutationWrapper.propTypes = {
  options: PropTypes.object,
  onUpdate: PropTypes.func.isRequired,
  mutation: PropTypes.object.isRequired
};
