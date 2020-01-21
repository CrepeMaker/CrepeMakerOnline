import React from 'react'
import { Container, Row, Col, ProgressBar } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt, faPhone, faUtensils } from '@fortawesome/free-solid-svg-icons'
import styles from './RestaurantView.scss'

class RestaurantView extends React.Component {
  constructor(props) {
    super(props)

    const restaurant = {
      name: '大岡山食堂', tel: '03-1234-5678', place: '東京都目黒区大岡山1-23-4', genre: '和食',
      scores: [{ 'keyword': '味', 'score': 42.3 }, { 'keyword': '雰囲気', 'score': 23.5 }]
    }

    this.state = {
      ...restaurant,
    }
  }

  render() {
    const { name, place, tel, genre, scores } = this.state

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
                  <p key={item.keyword}>
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
                  </p>
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