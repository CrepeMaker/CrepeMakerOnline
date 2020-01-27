import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import TopBarLink from './TopBarLink'
import styles from './TopBar.scss'

class TopBar extends React.Component {
  render() {
    return (
      <Navbar expand="md" bg="dark" variant="dark">
        <Navbar.Brand as={Link} to='/'>
          <img className={styles.logo} src='/images/sweets_crape.png' />
          CrepeMakerOnline
        </Navbar.Brand>
      </Navbar>
    )
  }
}
export default TopBar