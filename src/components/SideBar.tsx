import { useEffect, useState } from "react";
import { Button } from "./Button";
import { api } from '../services/api';
import '../styles/sidebar.scss';
import { List, ListRowRenderer, WindowScroller } from 'react-virtualized';

import {useSelectedId} from '../hooks/useSelectedId';

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}
export function SideBar() {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);
  const { selectedID, selectedGenre2} = useSelectedId();
  //vou bloquear pq quero tentar de outro jeito

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  function handleClickButton(id: number) {
    selectedGenre2(id);
  }

  const rowRenderer: ListRowRenderer = ({ index, key, style }) => {
    return <div key={key} style={style}>
      <Button
        key={String(genres[index].id)}
        title={genres[index].title}
        iconName={genres[index].name}
        onClick={() => handleClickButton(genres[index].id)}
        selected={selectedID === genres[index].id}
      />
    </div>
  }

  return (
    //<WindowScroller>
     // {({height, isScrolling, registerChild, onChildScroll, scrollTop}) => (
      <nav className="sidebar">
        <span>Watch<p>Me</p></span>
        <div className="buttons-container">
          <List
            height={500}
          //  isScrolling={isScrolling}
          //  onScroll={onChildScroll}
            rowHeight={80} 
            width={400}
            overscanRowCount={3}
            rowCount={genres.length}
            rowRenderer={rowRenderer}  
          //  scrollTop={scrollTop}
          />
        </div>
      </nav>
    //  )}
   // </WindowScroller>
  );
}






{/* {genres.map(genre => (
        <Button
          key={String(genre.id)}
          title={genre.title}
          iconName={genre.name}
          onClick={() => handleClickButton(genre.id)}
          selected={selectedID === genre.id}
        />
      ))} */}