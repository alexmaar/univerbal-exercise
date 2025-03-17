import { Movie } from 'domain/movie';

import { atom } from 'jotai';

import { getTopRatedMoviesQuery } from '@/infrastructure/repositories/movie';

export const topRatedMovies$ = atom(async (_, { signal }): Movie[] => {
  return await getTopRatedMoviesQuery();
});
