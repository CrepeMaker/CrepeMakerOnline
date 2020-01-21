import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { KeywordButtons, PlaceSelector } from '../components'
import styles from './HomeView.scss'

class HomeView extends React.Component {
  constructor(props) {
    super(props)

    const keywords = ['価格', '雰囲気', '料理(質)', '料理(量)', '立地']
    const places = ['目黒区']

    this.state = {
      keywords,
      selected_keywords: [],
      places,
      selected_place: places.length ? places[0] : '',
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
    const { keywords, selected_keywords, places, selected_place } = this.state

    return (
      <Container>
        <Row>
          <Col md={{ span: 6, offset: 3 }} sm={{ span: 8, offset: 2 }}>
            <PlaceSelector
              places={places}
              selected={selected_place}
              onUpdate={this.onUpdatePlace.bind(this)}
            />
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 6, offset: 3 }} sm={{ span: 8, offset: 2 }}>
            <KeywordButtons
              keywords={keywords}
              selected={selected_keywords}
              onUpdate={this.onUpdateKeywords.bind(this)}
            />
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 6, offset: 3 }} sm={{ span: 8, offset: 2 }}>
            <Button
              block
              className={styles.search_button}
              variant='info'
              onClick={this.onSearch.bind(this)}
            >
              検索
            </Button>
          </Col>
        </Row>

      </Container>
    )
  }
}

export default HomeView