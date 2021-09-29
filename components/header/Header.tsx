import { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import Router, { useRouter } from 'next/router';
import Link from 'next/link';

import styles from './Header.module.css';
import React from 'react';

const Header: NextPage = () => {
  const router = useRouter();
  const [search, setSearch] = useState('');

  const handelChange = (event: React.ChangeEvent) => {
    const { target } = event;
    const { value } = target as HTMLInputElement;
    setSearch(value);
  };

  const handelSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (!search) {
      return;
    }

    Router.push({
      pathname: '/',
      query: `text=${search}`
    });
  };

  const handelClear = () => {
    setSearch('');

    Router.push({
      pathname: '/',
      query: ``
    });
  };

  useEffect(() => {
    const { query } = router;

    if (query.text) {
      setSearch(query.text as string);
    } else {
      setSearch('');
    }
  }, [router?.query]);

  return (
    <>
      <div className={styles.nav}>
        <Link href="/">
          <a>
            <img
              src="https://angularflix.firebaseapp.com/assets/images/logo-purple.svg"
              alt=""
              height="40"
              width="33"
            />
          </a>
        </Link>
        <div className="flex-1" />
        <div>
          <form onSubmit={handelSubmit}>
            <div className="relative">
              <input
                className={styles.searchInput}
                type="text"
                placeholder="Search..."
                value={search}
                onChange={handelChange}
              />
              <div className={styles.searchIcon}>
                <svg
                  className={styles.searchIconsvg}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"></path>
                </svg>
              </div>
              {router?.query.text && (
                <button
                  onClick={handelClear}
                  type="button"
                  className={styles.searchClear}
                >
                  <svg
                    className={styles.searchClearsvg}
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z"
                      stroke="currentColor"
                      fill="none"
                      fillRule="evenodd"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Header;
