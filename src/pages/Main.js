import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import App from './App'
import Settings from './Settings'

class Main extends React.Component {
	render() {
		return (
		    <Switch>
		      <Route exact path='/' component={App}/>
		      <Route path='/settings' component={Settings}/>
		      <Route path='/home' component={Home}/>
		      <Route path='/login' component={Login}/>
		    </Switch>
		)
	}
}

export default Main
