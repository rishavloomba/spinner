import React from 'react';
import PropTypes from 'prop-types';
import Typography from '../Common/TypoGraphy';
import './index.css';

function Question() {
  return (
    <>
      <Typography className="question" Tag="h3" modifier={['medium', 't2']}>
        Have a question? Get help
      </Typography>
    </>
  );
}

PropTypes.Question = {};

export default Question;
