import React from 'react'
import { Container, Row, Col, Button, Card } from 'react-bootstrap'
import axios from 'axios'
import { create } from '../../utils/axios'
import KeywordButtons from './KeywordButtons'
import GenreSelector from './GenreSelector'
import PlaceSelector from './PlaceSelector'
import styles from './SearchFormCard.scss'

class SearchFormCard extends React.Component {
  constructor(props) {
    super(props)

    const keywords = []
    const places = ['目黒区']
    const genres = ['全て']

    this.api = create()

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
    const { initial_keywords, initial_genre, initial_place } = this.props
    const { genres, places } = this.state

    const res = await axios.get('/data/categories.json')
    if (res.status === 200) {
      this.setState({ keywords: res.data })
      console.log({ keywords: res.data })
    }

    this.setState({
      selected_keywords: initial_keywords || [],
      selected_genre: initial_genre || (genres.length ? genres[0] : ''),
      selected_place: initial_place || (places.length ? places[0] : ''),
    })
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

  onSubmit() {
    const { onSubmit } = this.props
    const { selected_keywords, selected_place, selected_genre } = this.state

    if (onSubmit) {
      onSubmit({
        keywords: selected_keywords,
        place: selected_place,
        genre: selected_genre,
      })
    }
  }

  render() {
    const { keywords, selected_keywords, genres, selected_genre, places, selected_place } = this.state

    return (
      <div>
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
              onClick={this.onSubmit.bind(this)}
            >
              検索
            </Button>
          </Card.Body>
        </Card>
      </div>
    )
  }
}

export default SearchFormCard