import React from 'react'
import { Container, Row, Col, ProgressBar } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt, faPhone, faUtensils } from '@fortawesome/free-solid-svg-icons'
import { create } from '../utils/axios'
import { getCategoriesDict } from '../utils/categories'
import { RestaurantMap } from '../components'
import styles from './RestaurantView.scss'

class RestaurantView extends React.Component {
  constructor(props) {
    super(props)

    this.api = create()

    this.state = {
      restaurant: {},
      categories_dict: null,
    }
  }

  async componentDidMount() {
    const { id } = this.props.match.params

    const res = await this.api.get('/api/get_restaurant.php', {
      params: { id }
    })

    const categories_dict = await getCategoriesDict()

    const restaurant = res.data
    this.setState({ restaurant, categories_dict })
  }

  render() {
    const { name, address, tel, scores, latitude, longitude, sites } = this.state.restaurant
    const { categories_dict } = this.state

    const genre = sites && Object.values(sites).map(site => site.genre).join('/').replace(/,|、/g, '/')

    return (
      <div className={styles.self}>
        <Container>
          <h2>{name}</h2>
          <Row>
            <Col xs={{ span: 12, order: 1 }} lg={{ span: 4, order: 2 }}>
              <h3>基本情報</h3>
              <div className={styles.content}>
                <div>
                  <FontAwesomeIcon className={styles.texticon} icon={faMapMarkerAlt} fixedWidth />
                  {address}
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
                <RestaurantMap center={latitude && [latitude, longitude]} marker={name} height='30vw' />
              </div>
            </Col>
            <Col xs={{ span: 12, order: 2 }} lg={{ span: 8, order: 1 }}>
              <h3>評価</h3>
              <div className={styles.content}>
                {
                  scores && scores.map(item => (
                    <div key={item.category}>
                      <div className={styles.bar_text}>
                        <span className='float-left'>
                          {categories_dict ? categories_dict[item.category].name : item.category}
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
                {
                  sites && sites['Retty'] && (
                    <p className={styles.retty}>
                      Retty
                      <a href={sites['Retty'].url}>
                        アクセス
                      </a>
                    </p>
                  )
                }
                {
                  sites && sites['ぐるなび'] && (
                    <p className={styles.gurunavi}>
                      ぐるなび
                      <a href={sites['ぐるなび'].url}>
                        アクセス
                      </a>
                    </p>
                  )
                }
                {
                  sites && sites['食べログ'] && (
                    <p className={styles.tabelog}>
                      食べログ
                      <a href={sites['食べログ'].url}>
                        アクセス
                      </a>
                    </p>
                  )
                }
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default RestaurantView