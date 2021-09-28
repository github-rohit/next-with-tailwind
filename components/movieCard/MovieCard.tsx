import type { NextPage } from 'next';
import Link from 'next/link';

import { Movie } from '../../types/Movie';
import styles from './MovieCard.module.css';

interface MovieCardProps extends Movie {}

const MovieCard: NextPage<MovieCardProps> = (props) => {
  const { _id, poster, title, plot, year, rated, imdb } = props;
  return (
    <>
      <Link href={`/movie/${_id}`}>
        <a className={`group ${styles.card}`}>
          <div className="md:flex">
            <div className={styles.imageContainer}>
              <img className={styles.image} src={poster} />
            </div>
            <div className="flex flex-col flex-1 p-4">
              <div className="flex-1">
                <span className={`${styles.title} group-hover:text-white`}>
                  {title}
                </span>
                <div className="flex-auto flex space-x-2 mt-3 items-center">
                  <span className="text-gray-700 font-light group-hover:text-gray-300">
                    {year}
                  </span>
                  <span>&middot;</span>
                  {rated ? (
                    <span className={styles.pills}>{rated}</span>
                  ) : (
                    <span className={styles.pills}>NOT RATED</span>
                  )}
                  <span>&middot;</span>
                  <span className={styles.pills}>IMDB: {imdb.rating}/10</span>
                </div>
                <p className={`${styles.plot} clamp group-hover:text-gray-400`}>
                  {plot}
                </p>
              </div>
            </div>
          </div>
        </a>
      </Link>
    </>
  );
};

export default MovieCard;
