import { useState, useEffect } from 'react';
import axios from 'axios';

axios.defaults.baseURL = process.env.api_url;

interface UseAxios {
  url: string;
  method: 'get' | 'post' | 'put' | 'patch' | 'delete';
  body?: any;
  headers?: any;
}

const useAxios = ({ url, method, body = null, headers = null }: UseAxios) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [loading, setloading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await axios[method](
        url,
        JSON.parse(headers),
        JSON.parse(body)
      );
      setResponse(res.data);
    } catch (err: any) {
      setError(err);
    }

    setloading(false);
  };

  return { response, error, loading, fetchData };
};

export default useAxios;
