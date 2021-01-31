import React, { useState } from "react"
import { withRouter } from "react-router-dom"
import ReactMapGL, { Source, Layer } from "react-map-gl"
import "./minimap.css"

function MiniMap(props) {
  //Map State
  const { lat, long, geoJson } = props
  const [viewport, setViewport] = useState({
    latitude: lat,
    longitude: long,
    width: "100%",
    height: "100%",
    zoom: 3,
  })

  const geojson = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: { type: "Point", coordinates: [long, lat] },
      },
    ],
  }

  const layerStyle = {
    id: "point",
    type: "circle",
    paint: {
      "circle-radius": 5,
      "circle-color": "#007cbf",
    },
  }

  const features = geoJson.map((place) => {
    return {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [
          place.features[0].geometry.coordinates[0],
          place.features[0].geometry.coordinates[1],
        ],
      },
    }
  })

  const destinations = {
    type: "FeatureCollection",
    features: features,
  }

  const [selectedCity, setSelectedCity] = useState(null)
  React.useEffect(() => {
    window.addEventListener("resize", () => {
      setViewport({
        latitude: lat,
        longitude: long,
        width: "100%",
        height: "100%",
        zoom: 3,
      })
    })
    return () => {
      window.removeEventListener("resize", setViewport)
    }
  }, [])
  //Search State//
  // const [budget, setBudget] = useState(`$${props.match.params.budget}`)
  // const [where, setWhere] = useState(props.match.params.where)
  // const [when, setWhen] = useState(props.match.params.selectedDate)
  return (
    <div className='mini-map-container'>
      <div className='mini-map-side-bar'>
        <div className='suggestion-title'>
          <h1>Suggested Trips</h1>
        </div>
      </div>

      <div className='mini-map'>
        <ReactMapGL
          {...viewport}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          mapStyle='mapbox://styles/nickloverde/ckkew55if03e817o5o2je6rkp'
          //allows us to drag map around and zoom in/out
          onViewportChange={(viewport) => {
            setViewport({ ...viewport })
          }}
        >
          <Source id='my-data' type='geojson' data={geojson}>
            <Layer {...layerStyle} />
          </Source>
          
          <Source id='my-data' type='geojson' data={destinations}>
            <Layer {...layerStyle} />
          </Source>
        </ReactMapGL>
      </div>

      {/* {apicall.map((city) => (
                <Marker 
                key={{}} 
                latitude={{}} 
                longitude={{}}>
                    <button
                    onClick={e => {
                        e.preventDefault()
                        setSelectedCity(city)
                    }}
                    className='marker-btn'>
                        <img src='locIcon' alt='location-icon'/>
                    </button>
                </Marker>
            ))} */}
    </div>
  )
}
export default withRouter(MiniMap)
