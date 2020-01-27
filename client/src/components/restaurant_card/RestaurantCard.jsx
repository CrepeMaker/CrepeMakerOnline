import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Container, Row, Col, ProgressBar, Image } from 'react-bootstrap'
import c from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt, faPhone, faUtensils } from '@fortawesome/free-solid-svg-icons'
import RestaurantMap from '../common/RestaurantMap'
import { getCategoriesDict } from '../../utils/categories'
import styles from './RestaurantCard.scss'

class RestaurantCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = { categories_dict: null }
  }

  async componentDidMount() {
    const categories_dict = await getCategoriesDict()
    this.setState({ categories_dict })
  }

  render() {
    const { id, name, address, tel, sites, scores, border, latitude, longitude } = this.props
    const { categories_dict } = this.state

    const genre = sites && Object.values(sites).map(site => site.genre).join('/').replace(/,|、/g, '/')

    return (
      <Card border={border} className={c(styles.self, 'animated fadeIn')}>
        <Card.Body>
          <Card.Title>
            <Link to={`/restaurant/${id}`}>
              {name}
            </Link>
          </Card.Title>
          <Container>
            <Row>
              <Col lg={4} md={12} className={styles.content}>
                <div>
                  <FontAwesomeIcon className={styles.texticon} icon={faMapMarkerAlt} fixedWidth />
                  {address}
                </div>
                <div>
                  <FontAwesomeIcon className={styles.texticon} icon={faPhone} fixedWidth />
                  {tel}
                </div>
                <div>
                  <FontAwesomeIcon className={styles.texticon} icon={faUtensils} fixedWidth />
                  {genre}
                </div>
              </Col>
              <Col lg={5} md={12} className={styles.content}>
                {
                  scores && scores.map(item => (
                    <Container key={item.category}>
                      <Row>
                        <Col xs={3}>
                          {categories_dict ? categories_dict[item.category].name : item.category}
                        </Col>
                        <Col xs={6}>
                          <ProgressBar
                            animated
                            striped
                            variant="info"
                            now={item.score * 4 + 50}
                          />
                        </Col>
                        <Col xs={3}>
                          {item.score}
                        </Col>
                      </Row>
                    </Container>
                  ))
                }
              </Col>
              <Col lg={3} md={12}>
                <RestaurantMap
                  center={latitude && [latitude, longitude]}
                  marker={name}
                  height='150px'
                  option={{ zoomControl: false }}
                />
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>
    )
  }
}

export default RestaurantCard