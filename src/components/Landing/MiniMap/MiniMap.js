import React, { useState, useMemo, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import ReactMapGL, { Marker} from 'react-map-gl'
import './minimap.css'

function MiniMap(props) {
  //Map State
  const { lat, long, flights } = props
  const [selectedCity, setSelectedCity] = useState(null)
  
  const [viewport, setViewport] = useState({
    latitude: lat,
    longitude: long,
    width: "100%",
    height: "100%",
    zoom: 3,
  })

//   const suggested = [flights[0], flights[1], flights[2]]

//   const suggestedCards = suggested.map(flight => (
//     <div key={flight.QuoteId} className='flight-card'>
//       <h3>{flight.CityName}</h3>
//       <h1>${flight.MinPrice}</h1>
//     </div>
//   ))

  const markers = useMemo(() => flights.map(
    city => (
        <div>{city.lon ? 
        <Marker
        key={city.CityName} 
        longitude={+city.lon} 
        latitude={+city.lat} 
        className='marker'>
            <div className='marker-container'>
             <button
                onClick={e => {
                    e.preventDefault()
                    setSelectedCity(city)
                    console.log(selectedCity)
                }}
                className='marker-btn'>
                    <p className='price'>${city.MinPrice}</p>
                    <img className='marker-icon' src="https://cdn4.iconfinder.com/data/icons/basic-ui-pack-flat-s94-1/64/Basic_UI_Icon_Pack_-_Flat_map_pointer-512.png"/>
            </button>
            </div>
        </Marker> : null}
        </div>
        )
    ), [flights]);

  useEffect(() => {
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
 
  return (
    <div className='mini-map-container'>
      <div className='mini-map-side-bar'>
        <div className='suggestion-title'>
            {/* {flights.QuoteId ? 
                <div>
                <h1>Suggested Trips</h1>
                {<div>{suggestedCards}</div>}
                <h5 className='map-click'>Click on the map icons to see details</h5>
                </div>
                : null} */}

            {selectedCity ? (
                <div className='popup'>
                    <img className= 'popup-img' src='https://upload.wikimedia.org/wikipedia/commons/3/32/20190616154621%21Echo_Park_Lake_with_Downtown_Los_Angeles_Skyline.jpg'/>
                    <h2>City: {selectedCity.CityName}</h2>
                    <h3>Price: ${selectedCity.MinPrice}</h3>
                    <h4>{(selectedCity.Direct) ? 'Direct' : 'Multiple-stops'
                        }</h4>
                    <button
                        // onClick= {isLoggedIn ? saveLocation to profile : Link to register page>Add to favorites}
                    >
                        {/* <img src='plus-icon'/> */}
                    </button>
                    <button className='search-button'>Go to Flight</button>
                </div>
            ) : null}

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
                {/* Markers */}
                {markers}
        
            </ReactMapGL>
      </div>

    </div>


    )
}
export default withRouter(MiniMap)
