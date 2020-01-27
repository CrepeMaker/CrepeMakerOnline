import React from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'

class RestaurantMap extends React.Component {
  constructor(props) {
    super(props)
    this.mapRef = React.createRef()
  }

  componentDidMount() {
    setTimeout(() => {
      const map = this.mapRef.current
      if (map) map.leafletElement.invalidateSize()
    }, 100)
  }

  render() {
    const { center, marker, height, option = {} } = this.props

    if (!center) return null

    return (
      <div>
        <Map
          center={center}
          zoom={15}
          ref={this.mapRef}
          style={{ height }}
          {...option}
        >
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
          {
            marker && (
              <Marker position={center}>
                <Popup>{marker}</Popup>
              </Marker>
            )
          }
        </Map>
      </div>
    )
  }
}

export default RestaurantMap