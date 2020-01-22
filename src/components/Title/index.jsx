import React from 'react';
import classnames from 'classnames';

import styles from './index.module.scss';

const Title = ({ type, children, className }) => {
  const Component = type;

  return (
    <Component className={classnames(styles[type], className)}>
      {children}
    </Component>
  );
};

export default Title;
