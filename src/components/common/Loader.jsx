import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

const LoaderStyle = (value, thickness, lat, offset, color) => ({
  root: {
    position: "absolute",
    width: "100%",
    height: "70vh",
    transform: "rotate(165deg)"
  },
  rootScroll: {
    position: "relative",
    width: "100%",
    height: "10rem",
    transform: "rotate(165deg)"
  },
  loader: {
    position: "absolute",
    content: '""',
    top: "50%",
    left: "50%",
    display: "block",
    width: `${value / 5}px`,
    height: `${value / 5}px`,
    borderRadius: `${value / 10}px`,
    transform: "translate(-50%, -50%)",
    animationFillMode: "none",

    "&.before": {
      animation: "2s ease 0s infinite normal none running $loader-before"
    },

    "&.after": {
      animation: "2s ease 0s infinite normal none running $loader-after"
    }
  },
  "@keyframes loader-before": {
    "0%": {
      width: `${thickness}px`,
      boxShadow: `${lat}px ${-offset}px ${color}, ${-lat}px ${offset}px ${color}`
    },
    "35%": {
      width: `${value}px`,
      boxShadow: `0 ${-offset}px ${color}, 0 ${offset}px ${color}`
    },
    "70%": {
      width: `${thickness}px`,
      boxShadow: `${-lat}px ${-offset}px ${color}, ${lat}px ${offset}px ${color}`
    },
    "100%": {
      boxShadow: `${lat}px ${-offset}px ${color}, ${-lat}px ${offset}px ${color}`
    }
  },
  "@keyframes loader-after": {
    "0%": {
      height: `${thickness}px`,
      boxShadow: `${offset}px ${lat}px ${color}, ${-offset}px ${-lat}px ${color}`
    },
    "35%": {
      height: `${value}px`,
      boxShadow: `${offset}px 0 ${color}, ${-offset}px 0 ${color}`
    },
    "70%": {
      height: `${thickness}px`,
      boxShadow: `${offset}px ${-lat}px ${color}, ${-offset}px ${lat}px ${color}`
    },
    "100%": {
      boxShadow: `${offset}px ${lat}px ${color}, ${-offset}px ${-lat}px ${color}`
    }
  }
});

export default function Loader(props) {
  const { thickness, loading, className, color, scrolling } = props;
  const realThickness = thickness / 5;
  const lat = (thickness - realThickness) / 2;
  const offset = lat - realThickness;

  const classes = makeStyles(
    LoaderStyle(thickness, realThickness, lat, offset, color)
  )();
  const rootClasses = classNames({
    [classes.root]: !scrolling,
    [classes.rootScroll]: scrolling,
    [className]: className !== undefined
  });

  return loading ? (
    <div className={rootClasses}>
      <div className={`${classes.loader} before`} />
      <div className={`${classes.loader} after`} />
    </div>
  ) : null;
}

Loader.defaultProps = {
  thickness: 50,
  loading: false,
  color: "#36d7b7",
  scrolling: false
};

Loader.propTypes = {
  thickness: PropTypes.number,
  loading: PropTypes.bool,
  className: PropTypes.string,
  color: PropTypes.string,
  scrolling: PropTypes.bool
};
