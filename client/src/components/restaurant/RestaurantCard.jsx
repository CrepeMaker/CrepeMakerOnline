import React from 'react'
import { Card, Container, Row, Col, ProgressBar } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt, faPhone, faUtensils } from '@fortawesome/free-solid-svg-icons'
import styles from './RestaurantCard.scss'

class RestaurantCard extends React.Component {
  render() {
    const { name, place, tel, genre, scores, border } = this.props

    return (
      <Card border={border} className={styles.self}>
        <Card.Body>
          <Card.Title>
            {name}
          </Card.Title>
          <Container>
            <Row>
              <Col lg={4} md={12}>
                <div>
                  <FontAwesomeIcon className={styles.texticon} icon={faMapMarkerAlt} />
                  {place}
                </div>
                <div>
                  <FontAwesomeIcon className={styles.texticon} icon={faPhone} />
                  {tel}
                </div>
                <div>
                  <FontAwesomeIcon className={styles.texticon} icon={faUtensils} />
                  {genre}
                </div>
              </Col>
              <Col lg={5} md={12}>
                {
                  scores && scores.map(item => (
                    <Container>
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