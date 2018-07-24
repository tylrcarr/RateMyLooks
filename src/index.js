import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import Main from './pages/Main';

import 'bootstrap/dist/css/bootstrap.css';
render((
	<BrowserRouter>
		<Main />
	</BrowserRouter>
), document.getElementById('app'));
