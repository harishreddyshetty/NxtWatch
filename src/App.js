import {Route} from 'react-router-dom'
import LoginRoute from './components/LoginRoute'
import HomeRoute from './components/HomeRoute'

import './App.css'

// Replace your code here
const App = () => (
  <>
    <Route exact path="/login" component={LoginRoute} />
    <Route exact path="/" component={HomeRoute} />
  </>
)

export default App
