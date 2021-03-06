import React, { Component } from 'react';
import './Map.css';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';
import ActivityList from '../ActivityList';
// import { QUERY_USER, QUERY_ME } from '../utils/queries';

mapboxgl.accessToken = `${process.env.REACT_APP_MAPBOX_KEY}`;

class Map extends React.Component {

  componentDidUpdate() {
    this.showRoute();
  }
  componentDidMount() {

    console.log(this)

    // Creates new map instance
    this.map = new mapboxgl.Map({
      container: this.mapWrapper,
      style: 'mapbox://styles/mapbox/streets-v10',
      center: [-73.985664, 40.748514],
      zoom: 12
    })

    // Creates new directions control instance
    this.directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: 'metric',
      profile: 'mapbox/driving',
    })

    // Integrates directions control with map
    this.map.addControl(this.directions, 'top-left');
    new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true
    });
    this.map.on('load', () => {
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true
      });
      this.showRoute()
    });
  };
  //
  showRoute() {

    this.directions.setDestination(this.props.myLocation)
  };

  render() {
    console.log("my location:, ", this.props.myLocation);
    return (
      <div>
        <div ref={el => (this.mapWrapper = el)} className="mapWrapper"
          mapboxapiaccesstoken={process.env.REACT_APP_MAPBOX_KEY}
        />
      </div>
    );
  }
}

export default Map;