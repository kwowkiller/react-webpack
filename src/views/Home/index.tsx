import React from 'react';
import styles from './styles.module.scss';
import {Link} from 'react-router-dom';
import logo from '@/assets/react.png';

/**
 * Home首页
 * @constructor
 */
export function Home() {
  return (
    <div className={styles.home}>
      <h1>Home</h1>
      <img src={logo} alt='' />
      <img src={require('@/assets/base64.png')} alt='' />
      <Link to='/about'>about</Link>
    </div>
  );
}
