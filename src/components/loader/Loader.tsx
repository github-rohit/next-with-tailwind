import type { NextPage } from 'next';

import styles from './Loader.module.css';

const Loader: NextPage = () => {
  return <span className={styles.loader}></span>;
};

export default Loader;
