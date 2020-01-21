import React from 'react'

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
    return (
      <Map
        center={center}
        zoom={14}
        ref={this.mapRef}
        style={{ height: '100%', minHeight: '320px' }}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
      </Map>
    )
  }
}

export default RestaurantMap