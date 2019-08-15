import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './Notification.css';

const Notification = ({ notification }) => {
  if(!notification || !notification.message || notification.message.length===0) {
    return null;
  }

  const classes = `notification ${notification.type}`;

  return (
    <div className={classes}>
      {notification.message}
    </div>
  );
};

Notification.propTypes = {
  notification: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  };
};

export default connect(mapStateToProps)(Notification);