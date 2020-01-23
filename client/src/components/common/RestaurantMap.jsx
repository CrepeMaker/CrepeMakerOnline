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
      console.log(map.leafletElement.invalidateSize)
      if (map) map.leafletElement.invalidateSize()
    }, 100)
  }

  render() {
    const { center, marker } = this.props

    if (!center) return null

    return (
      <div style={{ height: '30vw' }}>
        <Map
          center={[center.latitude, center.longitude]}
          zoom={15}
          ref={this.mapRef}
          style={{ height: '30vw' }}
        >
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
          {
            marker && (
              <Marker position={[center.latitude, center.longitude]}>
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