import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { HomeView, RestaurantView, SearchView } from './views'
import { TopBar } from './components'

import '../node_modules/bootstrap-honoka/dist/css/bootstrap.min.css'
import '../node_modules/animate.css/animate.min.css'

render(
  <div style={{ backgroundColor: '#f5f5f5' }}>
    <BrowserRouter>
      <div>
        <TopBar />
        <Container fluid style={{ 'padding': '0' }}>
          <Route exact={true} path="/" component={HomeView} />
          <Route exact={true} path="/restaurant/:id" component={RestaurantView} />
          <Route exact={true} path='/search' component={SearchView} />
        </Container>
      </div>
    </BrowserRouter>
  </div>,
  document.getElementById('app')
);