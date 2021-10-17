import { Link, Switch, Route } from 'react-router-dom'
import { Abaut } from './pages/Abaut'
import { Quotes } from './pages/Quotes'


function App() {


  return (
    <div className="App">
      <header className="flex justify-center gap-x-5 m-5">
        <Link to="/quotes" className="typography-link">К котировкам</Link>
        <Link to="/" className="typography-link">Главная</Link>
      </header>
      <section>
        <Switch>
          <Route path="/quotes">
            <Quotes />
          </Route>
          <Route path="/">
            <Abaut />
          </Route>
        </Switch>
      </section>
    </div>
  )
}

export default App
