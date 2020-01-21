import React from 'react'
import { InputGroup, Form } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'

class PlaceSelector extends React.Component {
  onChange(e) {
    const { onUpdate } = this.props
    const index = e.target.selectedIndex
    const value = e.target.options[index].value
    if (onUpdate) onUpdate(value)
  }

  render() {
    const { places, selected } = this.props

    return (
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text id="basic-addon1">
            <FontAwesomeIcon icon={faMapMarkerAlt} />
          </InputGroup.Text>
        </InputGroup.Prepend>
        <Form.Control
          as="select"
          onChange={this.onChange.bind(this)}
          selected={selected}
        >
          {
            places && places.map(place => (
              <option
                key={place}
              >
                {place}
              </option>
            ))
          }
        </Form.Control>
      </InputGroup>
    )
  }
}

export default PlaceSelector