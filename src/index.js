import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './components/App';
import Main from './components/Main';

    //<App />
render((
	<BrowserRouter>
		<Main />
	</BrowserRouter>
), document.getElementById('app'));
