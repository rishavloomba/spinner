import React from 'react';
import PropTypes from 'prop-types';
import Typography from '../Common/TypoGraphy';
import './index.css';

function Header() {
  return (
    <div className="header">
      <div className="back-arrow" />
      <Typography className="head-text" Tag="p" modifier={['medium', 't2']}>
        Your Rewards
      </Typography>
    </div>
  );
}

PropTypes.Header = {};

export default Header;
