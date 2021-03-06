import React from 'react'
import { ButtonToolbar, Button } from 'react-bootstrap'
import c from 'classnames'
import styles from './KeywordButton.scss'

class KeywordButtons extends React.Component {
  onClick(keyword) {
    const { selected, onUpdate } = this.props
    let new_selected = []

    if (selected.includes(keyword)) {
      new_selected = selected.filter(item => item != keyword)
    } else {
      new_selected = selected.concat([keyword,])
    }

    this.setState({ selected: new_selected })

    if (onUpdate) onUpdate(new_selected)
  }

  render() {
    const { keywords, selected } = this.props

    return (
      <ButtonToolbar>
        {
          keywords && keywords.filter(keyword => keyword.show).map(keyword => (
            <Button
              className={c('mx-auto', styles.button)}
              key={keyword.id}
              variant="outline-primary"
              onClick={() => this.onClick(String(keyword.id))}
              active={selected && selected.includes(String(keyword.id))}
            >
              {keyword.name}
            </Button>
          ))
        }
      </ButtonToolbar>
    )
  }
}

export default KeywordButtons