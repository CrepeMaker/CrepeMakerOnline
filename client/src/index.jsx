import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { HomeView, RestaurantView } from './views'
import { TopBar } from './components'

import '../node_modules/bootstrap-honoka/dist/css/bootstrap.min.css'
import '../node_modules/animate.css/animate.min.css'

render(
  <div>
    <BrowserRouter>
      <div>
        <TopBar />
        <Container fluid style={{ 'padding': '0' }}>
          <Route exact={true} path="/" component={HomeView} />
          <Route exact={true} path="/restaurant/:id" component={RestaurantView} />
        </Container>
      </div>
    </BrowserRouter>
  </div>,
  document.getElementById('app')
);