import React from 'react'
import { withRouter } from 'react-router-dom'
import { Container, Row, Col, Spinner } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { SearchFormCard, RestaurantCard } from '../components'
import { create } from '../utils/axios'
import { parseParams, createParams } from '../utils/params'
import styles from './HomeView.scss'

class SearchView extends React.Component {
  constructor(props) {
    super(props)

    this.api = create()

    const { keywords, genre, place } = parseParams(location.search)

    this.state = {
      busy: false,
      restaurants: [],
      initial_keywords: keywords,
      initial_genre: genre,
      initial_place: place,
    }
  }

  async componentDidMount() {
    const params = parseParams(location.search)
    this.update(params)

    /*
    const res = await this.api.get('api/get_recommended.php', {
      params: { size: 3 }
    })
    this.setState({ restaurants: res.data })
    */
  }

  async update({ keywords, place, genre }) {
    this.setState({ restaurants: [], busy: true })
    const res = await this.api.get('/api/search_restaurants.php', {
      params: {
        categories: keywords,
        size: 3,
        category_size: 5,
      }
    })

    this.setState({ restaurants: res.data, busy: false })
  }

  onSubmit({ keywords, genre, place }) {
    const { history } = this.props
    const search = createParams({ keywords, place, genre })

    history.push(`/search?${search}`)
    this.update({ keywords, place, genre })
  }

  render() {
    const { restaurants, initial_keywords, initial_genre, initial_place, busy } = this.state

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
                <SearchFormCard
                  onSubmit={this.onSubmit.bind(this)}
                  {...{ initial_keywords, initial_genre, initial_place }}
                />
              </Col>
            </Row>
          </Container>
        </div>
        <div className={styles.recommendations}>
          <Container>
            <h3>
              <FontAwesomeIcon className={styles.texticon} icon={faSearch} fixedWidth />
              検索結果
            </h3>
            <Row>
              <Col xs={12}>
                {
                  busy && (
                    <div className='text-center'>
                      <Spinner animation="border" />
                      <br />
                      検索中
                    </div>
                  )
                }
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

export default withRouter(SearchView)