import { HashRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import { useEffect, useState } from 'react'
import { Toaster } from 'sonner'
import GroupsPage from './pages/GroupsPage'
import ArtistPage from './pages/ArtistPage'
import ErrorPage from './pages/ErrorPage'
import DashboardPage from './pages/DashboardPage'
import { GroupsProvider } from './context/GroupsContext'
import CompaniesPage from './pages/CompaniesPage'
import VenuesPage from './pages/VenuesPage'
import ToursPage from './pages/ToursPage'
import ConcertPage from './pages/ConcertPage'
import ComparePage from './pages/ComparePage'
import ScrollToTop from './ScrollToTop'
import AboutPage from './pages/AboutPage'

const AppRoutes = () => {

  const [theme, setTheme] = useState<"light" | "dark">("light")

  const MEDIA_QEURY = 900

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark")
  }, [theme])

  return (
    <>
      <ScrollToTop />

      <Routes>
        <Route element={ <Layout theme={theme} setTheme={setTheme} mediaQuery={MEDIA_QEURY} /> }>

          <Route path='/' element={ <DashboardPage /> } />
          <Route path='/groups' element={ <GroupsPage /> } />
          <Route path='/tours' element={ <ToursPage /> } />
          <Route path='/companies' element={ <CompaniesPage /> } />
          <Route path='/venues' element={ <VenuesPage /> } />
          <Route path='/compare' element={ <ComparePage /> } />
          <Route path='/about' element={ <AboutPage /> } />

          <Route path='/groups/:id' element={ <ArtistPage /> } />
          <Route path='/tours/:id' element={ <ConcertPage /> } />

          <Route path='*' element={ <ErrorPage message='Status 404 Page Not Found' /> } />
          
        </Route>
      </Routes>

      <Toaster richColors closeButton position="top-right" theme={theme} />
    </>
  )
}

const App = () => {

  return (
    <HashRouter>
      <GroupsProvider>
        <AppRoutes />
      </GroupsProvider>
    </HashRouter>
  )

}

export default App
