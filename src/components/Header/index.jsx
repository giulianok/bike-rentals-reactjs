import React from 'react';
import { Link } from '@reach/router';

import logo from '../../assets/logo.png';
import Container from '../Container';
import Cart from '../Cart';

import styles from './index.module.scss';

const Header = () => {
  return (
    <header className={styles.root}>
      <Container>
        <div className={styles.content}>
          <Link to="/">
            <img src={logo} />
          </Link>
          <div>
            <Cart />
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
