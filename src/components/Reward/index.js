import React from 'react';
import PropTypes from 'prop-types';
import Typography from '../Common/TypoGraphy';
import './index.css';

function Reward() {
  return (
    <div className="reward">
      <div className="text-body">
        <Typography className="typo-first" Tag="p" modifier={['medium', 't3']}>
          Spin the wheel now to get rewarded
        </Typography>
        <Typography className="typo-second" Tag="p" modifier={['regular', 't1']}>
          Tap on Spin or rotate the wheel anti-clockwise and release to start spinning
        </Typography>
      </div>
    </div>
  );
}

PropTypes.Reward = {};

export default Reward;
