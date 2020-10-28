import React from 'react';
import styles from './styles.module.scss';
import {AppCtx} from '@/context';

/**
 * 关于
 * @constructor
 */
export default function About() {
  const {theme} = React.useContext(AppCtx);
  return (
    <div className={styles.about}>
      <h1>About</h1>
      <h2>当前主题为{theme}</h2>
    </div>
  );
}
