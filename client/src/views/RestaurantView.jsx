import React from 'react'
import { Container, Row, Col, ProgressBar } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt, faPhone, faUtensils } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import styles from './RestaurantView.scss'

class RestaurantView extends React.Component {
  constructor(props) {
    super(props)

    this.api = axios.create('/')

    this.state = {
      restaurant: {}
    }
  }

  async componentDidMount() {
    const { id } = this.props.match.params

    const res = await this.api.get('/data/sample_restaurants.json')
    const restaurants = res.data


    const targets = restaurants.filter(item => item.id === id)
    if (targets.length) {
      this.setState({ restaurant: targets[0] })
    }
  }

  render() {
    const { name, place, tel, genre, scores } = this.state.restaurant

    return (
      <Container className={styles.self}>
        <h2>{name}</h2>
        <Row>
          <Col xs={{ span: 12, order: 1 }} lg={{ span: 4, order: 2 }}>
            <h3>基本情報</h3>
            <div className={styles.content}>
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
            </div>

            <h3>地図</h3>
            <div className={styles.content}>

            </div>
          </Col>
          <Col xs={{ span: 12, order: 2 }} lg={{ span: 8, order: 1 }}>
            <h3>評価</h3>
            <div className={styles.content}>
              {
                scores && scores.map(item => (
                  <div key={item.keyword}>
                    <div className={styles.bar_text}>
                      <span className='float-left'>
                        {item.keyword}
                      </span>
                      <span className='float-right'>
                        {item.score}
                      </span>
                    </div>
                    <div>
                      <ProgressBar now={item.score} />
                    </div>
                  </div>
                ))
              }
            </div>
            <h3>リンク</h3>
            <div className={styles.content}>

            </div>
          </Col>
        </Row>




      </Container>
    )
  }
}

export default RestaurantView