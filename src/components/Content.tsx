import { useEffect, useState } from "react";
import { useSelectedId } from "../hooks/useSelectedId";
import { api } from "../services/api";
import { MovieCard } from "./MovieCard";
import '../styles/content.scss';
import { Grid, GridCellRenderer } from 'react-virtualized';

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

export function Content() {
  const { selectedID } = useSelectedId();
  //const [movies, setMovies] = useState<MovieProps[]>([]);
  const [movies2, setMovies2] = useState<MovieProps[][]>([]);

  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedID}`).then(response => {
      //setMovies(response.data);
      const newMovies: MovieProps[][] = [];
      let helpMovies: MovieProps[] = [];
      response.data.map(movie => {
        helpMovies.push(movie);
        if (helpMovies.length > 2) {
          newMovies.push(helpMovies);
          helpMovies = [];
        }
      })
      if (helpMovies) {
        newMovies.push(helpMovies);
      }
      console.log(newMovies)
      setMovies2(newMovies);
    });

    api.get<GenreResponseProps>(`genres/${selectedID}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedID]);

  const cellRenderer: GridCellRenderer = ({ columnIndex, key, rowIndex, style }) => {
    return (
      <div key={key} className="movies-list" style={style}>
        {
          movies2[rowIndex][columnIndex]?.Title &&
          <MovieCard key={movies2[rowIndex][columnIndex].imdbID} title={movies2[rowIndex][columnIndex].Title} poster={movies2[rowIndex][columnIndex].Poster} runtime={movies2[rowIndex][columnIndex].Runtime} rating={movies2[rowIndex][columnIndex].Ratings[0].Value} />
        }
      </div>
    );
  }

  return (
    <div className="container">
      <header>
        <span className="category">Categoria:<span> {selectedGenre.title}</span></span>
      </header>

      <main>
        {
          movies2.length &&
          <Grid
            cellRenderer={cellRenderer}
            columnCount={movies2[0].length}
            columnWidth={290}
            height={480}
            rowCount={movies2.length}
            rowHeight={370}
            width={900}
            overscanRowCount={1}
          />
        }
        {/* {movies.map(movie => (
                <MovieCard key ={movie.imdbID} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
              ))} */}
      </main>
    </div>
  );
}