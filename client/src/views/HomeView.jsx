import React from 'react'
import { withRouter } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUtensils } from '@fortawesome/free-solid-svg-icons'
import { SearchFormCard, RestaurantCard } from '../components'
import { create } from '../utils/axios'
import { createParams } from '../utils/params'
import styles from './HomeView.scss'

class HomeView extends React.Component {
  constructor(props) {
    super(props)

    this.api = create()
    this.state = { restaurants: [] }
  }

  async componentDidMount() {
    const res = await this.api.get('api/get_recommended.php', {
      params: { size: 3, category_size: 5, }
    })
    this.setState({ restaurants: res.data })
  }

  onSubmit({ keywords, place, genre }) {
    const { history } = this.props
    const search = createParams({ keywords, place, genre })

    history.push(`/search?${search}`)
  }

  render() {
    const { restaurants } = this.state

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
                <SearchFormCard onSubmit={this.onSubmit.bind(this)} />
              </Col>
            </Row>
          </Container>
        </div>
        <div className={styles.recommendations}>
          <Container>
            <h3>
              <FontAwesomeIcon className={styles.texticon} icon={faUtensils} fixedWidth />
              おすすめレストラン
              <FontAwesomeIcon className={styles.texticon} icon={faUtensils} fixedWidth />
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

export default withRouter(HomeView)