import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Router, { useRouter } from 'next/router';
import axios, { AxiosResponse } from 'axios';

import Loader from '../components/loader/Loader';
import MovieCard from '../components/movieCard/MovieCard';
import Pagination from '../components/pagination/Pagination';
import { Movie } from '../types/Movie';

interface HomeProps {
  movies: Movie[];
  page: number;
  entries_per_page: number;
  total_results: number;
}

const Home: NextPage<HomeProps> = (props) => {
  const router = useRouter();
  const { movies, ...rest } = props;
  const [loading, setLoading] = useState(false);

  const handelRouteChangeStart = () => {
    setLoading(true);
  };

  const handelRouteChangeEnd = () => {
    setLoading(false);
  };

  useEffect(() => {
    Router.events.on('routeChangeStart', handelRouteChangeStart);
    Router.events.on('routeChangeComplete', handelRouteChangeEnd);

    return () => {
      Router.events.off('routeChangeStart', handelRouteChangeStart);
      Router.events.off('routeChangeComplete', handelRouteChangeEnd);
    };
  }, []);

  if (loading) {
    return (
      <>
        <div className="p-14">
          <Loader />
        </div>
      </>
    );
  }

  if (!rest.total_results) {
    return (
      <>
        <div
          className="px-6 md:px-14 md:py-14  flex-1 flex items-center justify-center text-lg"
          style={{ height: '70vh' }}
        >
          Your search - <b>{router.query?.text}</b> - did not match any
          documents.
        </div>
      </>
    );
  }

  return (
    <>
      <div className="p-6 md:p-14">
        <div className="grid gap-10 md:grid-cols-1 lg:grid-cols-2 ">
          {movies?.map((movie, index: any) => {
            return <MovieCard {...movie} key={index} />;
          })}
        </div>
        <Pagination {...rest} />
      </div>
    </>
  );
};

Home.getInitialProps = async (context): Promise<HomeProps> => {
  const { query } = context;
  const qarray = [];
  let queryStr = '';

  for (const qry in query) {
    qarray.push(`${qry}=${context.query[qry]}`);
  }

  if (qarray.length) {
    queryStr = `/search?${qarray.join('&')}`;
  }

  const { data } = (await axios.get(
    `${process.env.api_url}/movies${queryStr}`
  )) as AxiosResponse<HomeProps>;
  return { ...data } as HomeProps;
};

export default Home;
