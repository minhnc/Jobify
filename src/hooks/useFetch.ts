import axios from 'axios';
import fakeData from './fakeData';
import {useQuery} from '@tanstack/react-query';
import {API_KEY} from '@env';
import type {Job} from '@app/types';

type Query = {
  query?: string;
  job_id?: string;
  page?: string;
};

type Data = {
  data: Array<Job>;
  hasMore: boolean;
};

export const fetchData = async (
  endpoint: string,
  query: Query,
): Promise<Data> => {
  let data;

  if (API_KEY) {
    data = await axios.request({
      method: 'GET',
      url: `https://jsearch.p.rapidapi.com/${endpoint}`,
      headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
      },
      params: {...query},
    });
  } else {
    data = await fakeData(endpoint);
  }

  const res = data.data.data;

  return {data: res, hasMore: res.length > 0};
};

const useFetch = (endpoint: string, query: Query) => {
  return useQuery({
    queryKey: [endpoint, query?.page],
    queryFn: () => fetchData(endpoint, query),
    keepPreviousData: true,
    staleTime: 5000,
  });
};

export default useFetch;
