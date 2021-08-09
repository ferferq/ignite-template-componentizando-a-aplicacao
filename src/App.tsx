

//Styles
import './styles/global.scss';

//components
import { SideBar } from './components/SideBar';
import { Content } from './components/Content';

export function App() {

  return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
        <SideBar/>
        <Content/>
        </div>
  )
}