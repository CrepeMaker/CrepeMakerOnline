import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Container, Row, Col, ProgressBar, Image } from 'react-bootstrap'
import c from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt, faPhone, faUtensils } from '@fortawesome/free-solid-svg-icons'
import styles from './RestaurantCard.scss'

class RestaurantCard extends React.Component {
  render() {
    const { id, name, place, tel, genre, scores, border, image } = this.props

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
              <Col lg={3} md={12}>
                <Image
                  className={styles.image}
                  src={image}
                  fluid
                />
              </Col>
              <Col lg={4} md={12} className={styles.content}>
                <div>
                  <FontAwesomeIcon className={styles.texticon} icon={faMapMarkerAlt} fixedWidth />
                  {place}
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
                    <Container key={item.keyword}>
                      <Row>
                        <Col xs={3}>
                          {item.keyword}
                        </Col>
                        <Col xs={6}>
                          <ProgressBar
                            animated
                            striped
                            variant="info"
                            now={item.score}
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
            </Row>
          </Container>
        </Card.Body>
      </Card>
    )
  }
}

export default RestaurantCard