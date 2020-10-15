import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './index.css';

const Modifiers = {
  t1: {
    fontSize: '12px'
  },
  t2: {
    fontSize: '14px'
  },
  t3: {
    fontSize: '20px'
  },
  t4: {
    fontSize: '18px'
  },
  regular: {
    fontWeight: 400
  },
  medium: {
    fontWeight: 500
  },
  heavy: {
    fontWeight: 600
  },
  bold: {
    fontWeight: 'bold'
  }
};

const Typography = ({ Tag, children, className, modifier, disable }) => {
  let styles = modifier.reduce(
    (acc, each) => {
      let property = Modifiers[each];
      property && Object.assign(acc, property);
      return acc;
    },
    { cursor: disable ? 'not-allowed' : 'pointer' }
  );

  return (
    <Tag className={classNames('typo-text', className)} style={styles}>
      {children}
    </Tag>
  );
};

PropTypes.Typography = {
  Tag: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'div', 'a', 'li', 'label'])
    .isRequired,
  children: PropTypes.any
};

Typography.defaultProps = {
  Tag: 'div',
  className: ''
};

export default Typography;
