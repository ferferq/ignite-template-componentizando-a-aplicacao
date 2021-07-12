import { useContext } from 'react';
import { SelectedGenre } from '../contexts/SelectedGenreId';

export function useSelectedId () {
  const value = useContext(SelectedGenre);

  return value;
}