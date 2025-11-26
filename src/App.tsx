import { HashRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Layout from './components/Layout'
import { useEffect, useState } from 'react'

function App() {

  const [theme, setTheme] = useState<"light" | "dark">("light")

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark")
  }, [theme])

  return (
    <HashRouter>
      <Routes>
        <Route element={ <Layout theme={theme} setTheme={setTheme} /> }>
          <Route path='/' element={ <HomePage /> } />
          <Route path='/all' element={ <h1>ALL</h1> } />
          <Route path='*' element={ <h1>404 NOT FOUND</h1> } />
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default App
