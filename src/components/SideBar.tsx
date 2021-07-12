import { useEffect, useState } from "react";
import { Button } from "./Button";
import { api } from '../services/api';
import '../styles/sidebar.scss';

import {useSelectedId} from '../hooks/useSelectedId';

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

export function SideBar() {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);
  const { selectedID, selectedGenre2} = useSelectedId();

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  function handleClickButton(id: number) {
    selectedGenre2(id);
  }

  return (
    <nav className="sidebar">
    <span>Watch<p>Me</p></span>

    <div className="buttons-container">
      {genres.map(genre => (
        <Button
          key={String(genre.id)}
          title={genre.title}
          iconName={genre.name}
          onClick={() => handleClickButton(genre.id)}
          selected={selectedID === genre.id}
        />
      ))}
    </div>

  </nav>
  );
}