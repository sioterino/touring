import { HashRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'

function App() {

  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={ <HomePage /> } />
        <Route path='/all' element={ <h1>ALL</h1> } />
        <Route path='*' element={ <h1>404 NOT FOUND</h1> } />
      </Routes>
    </HashRouter>
  )
}

export default App
