
//Context
//import { SelectedGenreId } from './contexts/SelectedGenreId';

//Styles
import './styles/global.scss';

//components
import { SideBar } from './components/SideBar';
import { Content } from './components/Content';
import { useState } from 'react';

export function App() {
  const [selectedGenreId, setSelectedGenreId] = useState(1);

  function selectedGenre2 (id: number) {
    setSelectedGenreId(id);
  }

  return (
   // <SelectedGenreId>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
        <SideBar 
        setGenresId={selectedGenre2}
        selectedID={selectedGenreId}/>
        <Content selectedID={selectedGenreId}/>
        </div>
   //  </SelectedGenreId>
  )
}