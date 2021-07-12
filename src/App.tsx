
//Context
import { SelectedGenreId } from './contexts/SelectedGenreId';

//Styles
import './styles/global.scss';

//components
import { SideBar } from './components/SideBar';
import { Content } from './components/Content';

export function App() {
  return (
    <SelectedGenreId>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
        <SideBar />
        <Content />
        </div>
    </SelectedGenreId>
  )
}