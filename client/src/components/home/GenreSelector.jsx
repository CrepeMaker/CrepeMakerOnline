import React from 'react'
import { InputGroup, Form } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUtensils } from '@fortawesome/free-solid-svg-icons'

class GenreSelector extends React.Component {
  onChange(e) {
    const { onUpdate } = this.props
    const index = e.target.selectedIndex
    const value = e.target.options[index].value
    if (onUpdate) onUpdate(value)
  }

  render() {
    const { genres, selected } = this.props

    return (
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text id="basic-addon1">
            <FontAwesomeIcon icon={faUtensils} />
          </InputGroup.Text>
        </InputGroup.Prepend>
        <Form.Control
          as="select"
          onChange={this.onChange.bind(this)}
          selected={selected}
        >
          {
            genres && genres.map(genre => (
              <option
                key={genre}
              >
                {genre}
              </option>
            ))
          }
        </Form.Control>
      </InputGroup>
    )
  }
}

export default GenreSelector