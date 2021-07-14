import { useEffect, useState } from "react";
//import { useSelectedId } from "../hooks/useSelectedId";
import { api } from "../services/api";
import { MovieCard } from "./MovieCard";
import '../styles/content.scss';

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

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface ContentProps {
  selectedID: number;
}

export function Content({ selectedID } : ContentProps) {
  //const { selectedID } = useSelectedId();
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedID}`).then(response => {
      setMovies(response.data);
    });

    api.get<GenreResponseProps>(`genres/${selectedID}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedID]);

  return (
    <div className="container">
          <header>
            <span className="category">Categoria:<span> {selectedGenre.title}</span></span>
          </header>

          <main>
            <div className="movies-list">
              {movies.map(movie => (
                <MovieCard key ={movie.imdbID} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
              ))}
            </div>
          </main>
        </div>
  );
}