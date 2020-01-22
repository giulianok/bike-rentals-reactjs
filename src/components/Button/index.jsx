import React from 'react';
import classnames from 'classnames';

import styles from './index.module.scss';

const Button = ({ className, ...props }) => (
  <button className={classnames(styles.root, className)} {...props} />
);

export default Button;
