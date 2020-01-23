import React from 'react'
import { Container, Row, Col, Button, Card } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUtensils } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { KeywordButtons, GenreSelector, PlaceSelector, RestaurantCard } from '../components'
import styles from './HomeView.scss'

class HomeView extends React.Component {
  constructor(props) {
    super(props)

    const keywords = ['価格', '雰囲気', '料理(質)', '料理(量)', '立地']
    const places = ['目黒区']
    const genres = ['全て', '和食', 'イタリアン', 'カフェ']

    this.api = axios.create('/')

    this.state = {
      keywords,
      selected_keywords: [],
      genres,
      selected_genre: genres.length ? genres[0] : '',
      places,
      selected_place: places.length ? places[0] : '',
      restaurants: [],
    }
  }

  async componentDidMount() {
    const res = await this.api.get('data/sample_restaurants.json', {
      responseType: 'json',
    })
    this.setState({ restaurants: res.data })
  }

  onUpdateKeywords(selected_keywords) {
    this.setState({ selected_keywords })
  }

  onUpdatePlace(selected_place) {
    this.setState({ selected_place })
  }

  onUpdateGenre(selected_genre) {
    this.setState({ selected_genre })
  }

  onSearch() {
    const { selected_keywords, selected_place, selected_genre } = this.state
    console.log({
      selected_keywords,
      selected_place,
      selected_genre,
    })
  }

  render() {
    const { keywords, selected_keywords, genres, selected_genre, places, selected_place, restaurants } = this.state

    return (
      <div className={styles.self}>
        <div className={styles.form}>
          <Container>
            <h3>
              <span>
                自分に合った
              </span>
              <span>
                レストランを
              </span>
              <span>
                見つけよう
              </span>
            </h3>
            <Row>
              <Col lg={{ span: 8, offset: 2 }} md={{ span: 10, offset: 1 }} sm={12}>
                <Card>
                  <Card.Body>
                    <Container>
                      <Row>
                        <Col md={6}>
                          <PlaceSelector
                            places={places}
                            selected={selected_place}
                            onUpdate={this.onUpdatePlace.bind(this)}
                          />
                        </Col>
                        <Col md={6}>
                          <GenreSelector
                            genres={genres}
                            selected={selected_genre}
                            onUpdate={this.onUpdateGenre.bind(this)}
                          />
                        </Col>
                      </Row>
                    </Container>
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