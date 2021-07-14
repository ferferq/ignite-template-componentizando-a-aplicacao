import { useEffect, useState } from "react";
import { Button } from "./Button";
import { api } from '../services/api';
import '../styles/sidebar.scss';

//import {useSelectedId} from '../hooks/useSelectedId';

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface SideBarProps {
  setGenresId : (id:number) => void;
  selectedID : number;
}

export function SideBar({setGenresId , selectedID } : SideBarProps) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);
  //const { selectedID, selectedGenre2} = useSelectedId();
  //vou bloquear pq quero tentar de outro jeito

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  function handleClickButton(id: number) {
    setGenresId(id);
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