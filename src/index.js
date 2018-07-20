import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './components/App';
import Main from './components/Main';

import 'bootstrap/dist/css/bootstrap.css';
    //<App />
render((
	<BrowserRouter>
		<Main />
	</BrowserRouter>
), document.getElementById('app'));
