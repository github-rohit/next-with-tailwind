import type { NextPage } from 'next';
import Link from 'next/link';
import axios, { AxiosResponse } from 'axios';
import dayjs from 'dayjs';
import NumberFormat from 'react-number-format';

import Loader from '../../components/loader/Loader';
import PageHeading from '../../components/pageHeading/PageHeading';

import { Movie } from '../../types/Movie';

interface MoviesDetails {
  movie: Movie;
  error: boolean;
}

const MoviesDetails: NextPage<MoviesDetails | null> = (props) => {
  const { movie, error } = props;

  if (error) {
    return (
      <>
        <div
          className="p-6 md:p-14 flex-1 flex items-center justify-center font-light"
          style={{ height: '70vh' }}
        >
          <span className="text-2xl py-1 pr-3 mr-2 border-r">404</span>{' '}
          <span className="text-xl">This page could not be found.</span>
        </div>
      </>
    );
  }

  if (!movie) {
    return (
      <>
        <div className="p-6 md:p-14">
          <Loader />
        </div>
      </>
    );
  }

  const {
    title,
    year,
    rated,
    runtime,
    poster,
    genres,
    fullplot,
    directors,
    writers,
    cast,
    languages,
    countries,
    awards,
    imdb,
    metacritic,
    tomatoes,
    comments
  } = movie;

  return (
    <>
      <div className="flex flex-col-reverse md:flex-row gap-10 bg-gray-900 p-6 md:p-14">
        <div className="flex-1">
          <div className="text-3xl font-bold text-gray-200">{title}</div>
          <div className="space-x-2 mt-1 text-gray-400">
            <span>{year}</span>
            <span>&middot;</span>
            {rated ? <span>{rated}</span> : <span>NOT RATED</span>}
            <span>&middot;</span>
            <span>{runtime} min</span>
          </div>
          <div className="mt-4 space-x-2 flex">
            {genres.map((genre) => {
              return (
                <Link href={`/?genre=${genre}`} key={genre}>
                  <a>
                    <span
                      key={genre}
                      className="border-2 rounded-full border-gray-400 p-1 px-3 text-sm text-gray-400 hover:border-gray-300 hover:text-gray-300"
                    >
                      {genre}
                    </span>
                  </a>
                </Link>
              );
            })}
          </div>
          <div className="mt-8 text-gray-300 text-lg">{fullplot}</div>
          <div className="mt-8 text-gray-400 flex gap-3 py-3 border-t border-gray-600">
            <div className="font-bold">Director</div>
            <div className="flex-1 text-gray-300">{directors.join(', ')}</div>
          </div>
          <div className="text-gray-400 flex gap-3 py-3 border-t border-gray-600">
            <div className="font-bold">Writers</div>
            <div className="flex-1 text-gray-300">{writers.join(', ')}</div>
          </div>
          <div className="text-gray-400 flex gap-3 py-3 border-t border-gray-600">
            <div className="font-bold">Stars</div>
            <div className="flex-1 text-gray-300 space-x-1">
              {cast.map((cast) => {
                return (
                  <Link href={`/?cast=${cast}`} key={cast}>
                    <a>
                      <span className="text-blue-300 hover:underline hover:text-blue-200">
                        {cast}
                      </span>
                      ,
                    </a>
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="text-gray-400 flex gap-3 py-3 border-t border-gray-600">
            <div className="font-bold">Languages</div>
            <div className="flex-1 text-gray-300">{languages.join(', ')}</div>
          </div>
          <div className="text-gray-400 flex gap-3 py-3 border-t border-gray-600">
            <div className="font-bold">Countries</div>
            <div className="flex-1 text-gray-300">{countries.join(', ')}</div>
          </div>
        </div>
        <div className="md:w-4/12">
          <img src={poster} alt={title} />
        </div>
      </div>
      {awards && (
        <div className="px-6 md:px-14 py-8 bg-gray-100">
          <PageHeading>Awards</PageHeading>
          <div className="font-bold text-lg">{awards.text}</div>
        </div>
      )}
      <div className="flex md:flex-row gap-10 mt-8 mb-16 px-6 md:px-14 flex-col-reverse">
        <div className="flex-1">
          <PageHeading>Comments</PageHeading>
          {comments.map(({ _id, name, date, text }) => {
            return (
              <div
                key={_id}
                className="p-3 mb-2 border border-dashed border-gray-300 rounded"
              >
                <div className="space-x-1">
                  <span className="font-bold text-gray-800">{name}</span>
                  <span>&middot;</span>
                  <span className="text-sm text-gray-600">
                    {dayjs(date).format('MMM DD, YYYY')}
                  </span>
                </div>
                <div className="mt-1 text-gray-800">{text}</div>
              </div>
            );
          })}
        </div>
        <div className="md:w-4/12">
          <PageHeading>Ratings</PageHeading>
          <div className="mt-4 p-3 border border-dashed rounded border-gray-300">
            <div>
              <span className="text-3xl text-primary">{imdb?.rating}/</span>
              <span className="text-xl text-primary">10</span>{' '}
              <span className="text-gray-600 text-sm">IMDB</span>
            </div>
            <div className="mt-2 text-gray-600">
              Rating from{' '}
              {imdb?.votes && (
                <NumberFormat
                  value={imdb?.votes}
                  displayType="text"
                  thousandSeparator
                />
              )}{' '}
              reviews
            </div>
          </div>
          {metacritic && (
            <div className="mt-4 p-3 border border-dashed rounded border-gray-300">
              <div>
                <span className="text-3xl text-primary">{metacritic}</span>
                <span className="text-2xl text-primary">%</span>{' '}
                <span className="text-gray-600 text-sm">Metacritic</span>
              </div>
            </div>
          )}
          {tomatoes.critic && (
            <div className="mt-4 p-3 border border-dashed rounded border-gray-300">
              <div>
                <span className="text-3xl text-primary">
                  {tomatoes.critic?.meter}
                </span>
                <span className="text-2xl text-primary">%</span>{' '}
                <span className="text-gray-600 text-sm">Rotten Tomatoes</span>
              </div>
              <div className="mt-2 text-gray-600">
                Critic rating from{' '}
                {tomatoes.critic?.numReviews && (
                  <NumberFormat
                    value={tomatoes.critic?.numReviews}
                    displayType="text"
                    thousandSeparator
                  />
                )}{' '}
                reviews
              </div>
            </div>
          )}
          {tomatoes.viewer && (
            <div className="mt-4 p-3 border border-dashed rounded border-gray-300">
              <div>
                <span className="text-3xl text-primary">
                  {tomatoes.viewer?.meter}
                </span>
                <span className="text-2xl text-primary">%</span>{' '}
                <span className="text-gray-600 text-sm">Rotten Tomatoes</span>
              </div>
              <div className="mt-2 text-gray-600">
                Viewer rating from{' '}
                {tomatoes.viewer?.numReviews && (
                  <NumberFormat
                    value={tomatoes.viewer?.numReviews}
                    displayType="text"
                    thousandSeparator
                  />
                )}{' '}
                reviews
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

MoviesDetails.getInitialProps = async (context) => {
  try {
    const { data } = (await axios.get(
      `${process.env.api_url}/movies/id/${context.query.id}`
    )) as AxiosResponse<any>;
    return data;
  } catch (error) {
    return { movie: null, error: true };
  }
};

export default MoviesDetails;
