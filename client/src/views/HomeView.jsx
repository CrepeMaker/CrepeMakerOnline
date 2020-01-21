import React from 'react'
import { Container, Row, Col, Button, Card } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUtensils } from '@fortawesome/free-solid-svg-icons'
import { KeywordButtons, PlaceSelector, RestaurantCard } from '../components'
import styles from './HomeView.scss'

class HomeView extends React.Component {
  constructor(props) {
    super(props)

    const keywords = ['価格', '雰囲気', '料理(質)', '料理(量)', '立地']
    const places = ['目黒区']

    const restaurants = [
      {
        name: '大岡山食堂', tel: '03-1234-5678', place: '東京都目黒区大岡山1-23-4', genre: '和食',
        scores: [{ 'keyword': '味', 'score': 42.3 }, { 'keyword': '雰囲気', 'score': 23.5 }]
      },
      {
        name: 'レストラン大岡山', tel: '03-987-6543', place: '東京都目黒区大岡山3-1', genre: 'イタリアン',
        scores: [{ 'keyword': '味', 'score': 23.3 }, { 'keyword': '雰囲気', 'score': 72.5 }, { 'keyword': '立地', 'score': 61.0 }]
      },
    ]

    this.state = {
      keywords,
      selected_keywords: [],
      places,
      selected_place: places.length ? places[0] : '',
      restaurants,
    }
  }

  onUpdateKeywords(selected_keywords) {
    this.setState({ selected_keywords })
  }

  onUpdatePlace(selected_place) {
    this.setState({ selected_place })
  }

  onSearch() {
    const { selected_keywords, selected_place } = this.state
    console.log({
      selected_keywords,
      selected_place,
    })
  }

  render() {
    const { keywords, selected_keywords, places, selected_place, restaurants } = this.state

    return (
      <div className={styles.self}>
        <div className={styles.form}>
          <Container>
            <Row>
              <Col className='text-center'>
                <span className={styles.form_text}>
                  自分に合ったレストランを見つけよう
            </span>
              </Col>
            </Row>
            <Row>
              <Col lg={{ span: 8, offset: 2 }} md={{ span: 10, offset: 1 }} sm={12}>
                <Card>
                  <Card.Body>
                    <PlaceSelector
                      places={places}
                      selected={selected_place}
                      onUpdate={this.onUpdatePlace.bind(this)}
                    />
                    <KeywordButtons
                      keywords={keywords}
                      selected={selected_keywords}
                      onUpdate={this.onUpdateKeywords.bind(this)}
                    />
                    <Button
                      block
                      className={styles.search_button}
                      variant='info'
                      onClick={this.onSearch.bind(this)}
                    >
                      検索
                </Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
        <div className={styles.recommendations}>
          <Container>
            <h3>
              <FontAwesomeIcon className={styles.texticon} icon={faUtensils} />
              おすすめレストラン
              <FontAwesomeIcon className={styles.texticon} icon={faUtensils} />
            </h3>
            <Row>
              <Col xs={12}>
                {
                  restaurants && restaurants.map(item => (
                    <RestaurantCard
                      key={item.name}
                      border={'success'}
                      {...item}
                    />
                  ))
                }

              </Col>
            </Row>
          </Container>
        </div>
      </div>
    )
  }
}

export default HomeView