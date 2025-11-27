import { HashRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import { useEffect, useState } from 'react'
import { Toaster } from 'sonner'
import GroupsPage from './pages/GroupsPage'
import ArtistPage from './pages/ArtistPage'
import ErrorPage from './pages/ErrorPage'
import Heading from './components/Heading'
import DashboardPage from './pages/DashboardPage'
import { GroupsProvider } from './context/GroupsContext'

const AppRoutes = () => {

  const [theme, setTheme] = useState<"light" | "dark">("light")

  const MEDIA_QEURY = 900

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark")
  }, [theme])

  return (
    <HashRouter>
      <Routes>
        <Route element={ <Layout theme={theme} setTheme={setTheme} mediaQuery={MEDIA_QEURY} /> }>
          <Route path='/' element={ <DashboardPage /> } />
          <Route path='/groups' element={ <GroupsPage /> } />
          <Route path='/tours' element={ <Heading title='Tours' desc='Browse all K-pop tours and their details' /> } />
          <Route path='/venues' element={ <Heading title='Venues' desc='Explore venues and see which artists performed there' /> } />
          <Route path='/companies' element={ <Heading title='Companies' desc='Browse K-pop entertainment companies and their artists' /> } />
          <Route path='/groups/:id' element={ <ArtistPage /> } />
          <Route path='*' element={ <ErrorPage message='Status 404 Page Not Found' /> } />
        </Route>
      </Routes>

      <Toaster richColors closeButton position="top-right" theme={theme} />
    </HashRouter>
  )
}

const App = () => {

  return (
    <GroupsProvider>
      <AppRoutes />
    </GroupsProvider>
  )

}

export default App
