import React from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import * as d3 from 'd3';
import { geojsonData } from './finalsetted';



const ChloroplethMap = () => {
    useEffect(() => {
        // Create a color scale
        const colorScale = d3.scaleSequential(d3.interpolateOranges).domain([0, d3.max(data)]);
    
        // Set up the style function for GeoJSON features
        const style = (feature) => {
          const value = data[feature.properties.region]; // Adjust this to match your data structure
          return {
            fillColor: colorScale(value),
            weight: 1,
            opacity: 1,
            color: 'white',
            fillOpacity: 0.7,
          };
        };
    
        // Render the map
        const map = L.map('map').setView([0, 0], 2);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
        L.geoJSON(geojsonData, {
          style: style,
        }).addTo(map);
      }, [geojsonData, data]);
    
      return <div id="map" style={{ height: '100vh' }}></div>;
}

export default ChloroplethMap;