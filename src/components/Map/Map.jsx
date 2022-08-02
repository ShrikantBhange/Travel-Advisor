import React from "react";
import GoogleMapsReact from 'google-map-react';
import { Paper, Typography , useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';

import useStyles from './styles';

const Map = ({ setCoordinates, setBounds, coordinates, places, setChildClicked, weatherData}) => {

    const classes = useStyles();
    const isDesktop = useMediaQuery('(min-width:600px)');
    

    return (
        //<h1>Map</h1>
        <div className={classes.mapContainer}>
           <GoogleMapsReact
            bootstrapURLKeys={{key: 'AIzaSyCdM3ykVzdUrZ2PcbwJV3RLKptwhNOXgrM'}}
            defaultCenter={coordinates}
            center={coordinates}
            defaultZoom={14}
            margin={[50,50,50,50]}
            options={''}
            onChange={(e) => {
                setCoordinates({ lat: e.center.lat, lng: e.center.lng});
                setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw});
            }}
            onChildClick={((child) => setChildClicked(child))}
           >

            {places?.map((place, i) => (
                <div
                className={"classes.markerContainer"}
                lat={Number(place.latitude)}
                lng={Number(place.longitude)}
                key={i}
                >
                    {
                        !isDesktop ? (
                            <LocationOnOutlinedIcon color="primary" fontSize="large" />
                        ) : (
                            <Paper elevation={3} className={classes.paper}>
                                <Typography className={classes.typography} variant="subtitle2" gutterBottom>
                                    {place.name}
                                </Typography>
                                <img className={classes.pointer} 
                                src={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                                alt="img"
                                />
                                <Rating name="read-only" size="small" value={Number(place.rating)} readOnly />
                            </Paper>
                        )
                    }
                </div>
            ))}
            {weatherData?.list?.map((data, i) => (
                <div key={i} lat={data.coord.lat} lng={data.coord.lon}>
                    <img height={50} src={'https://openweathermap.org/img/w/'+(data.weather[0].icon)+'.png'} alt='omg'/>
                </div>
            ))}

           </GoogleMapsReact>
        </div>
    );
}

export default Map;