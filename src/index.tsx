import { render } from 'react-dom'

import { App } from './App'
import { SelectedGenreId } from './contexts/SelectedGenreId'

render(<SelectedGenreId><App /></SelectedGenreId>, document.getElementById('root'))