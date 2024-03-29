import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useContext } from 'react';
import { geojsonData } from './finalsetted';
import { notecontext } from './notecontext';

const MapComponent = () => {
  const { clicked } = useContext(notecontext);
  const [selectedLayer, setSelectedLayer] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);

  const handleClick = (e) => {
    const layer = e.target;
    
    // Remove style from previously selected layer
    if (selectedLayer) {
      selectedLayer.setStyle({
        fillColor: 'transparent',
        color: 'transparent',
        weight: 2,
      });
    }

    // Set style for the clicked layer
    layer.setStyle({
      fillColor: 'red',
      color: 'red',
      weight: 2,
    });

    // Update selected layer and ward
    setSelectedLayer(layer);
    setSelectedWard(layer.feature.properties.ward);
  };

  useEffect(() => {
    if (clicked !== null) {
      // Find the layer with the clicked ward
      const targetFeature = geojsonData.features.find(feature => feature.properties.ward === clicked);
      if (targetFeature) {
        const layer = targetFeature.layer;
        handleClick({ target: layer });
      }
    } else {
      // Reset style if no ward is clicked
      if (selectedLayer) {
        selectedLayer.setStyle({
          fillColor: 'transparent',
          color: 'transparent',
          weight: 2,
        });
        setSelectedLayer(null);
        setSelectedWard(null);
      }
    }
  }, [clicked]);

  const onEachFeature = (feature, layer) => {
    layer.on({
      click: handleClick,
    });
    feature.layer = layer;
  };

  const mapComponent = (
    <MapContainer center={[22.7196, 75.8577]} minZoom={12} maxBoundsViscosity={0.9} zoom={11.4} style={{ height: '100%', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <GeoJSON data={geojsonData} onEachFeature={onEachFeature} style={() => ({ fillColor: 'transparent', color: 'transparent', weight: 2 })} />
    </MapContainer>
  );

  return {
    selectedWard,
    mapComponent,
  };
};

export default MapComponent;
