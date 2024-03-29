import React, { useState, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useContext } from 'react';
import { geojsonData } from './finalsetted';
import { notecontext } from './notecontext';

const MapComponent = () => {
  const { temp } = useContext(notecontext);
  const { clicked, setClicked } = temp;
  const [selectedLayer, setSelectedLayer] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);

  useEffect(() => {
    if (clicked !== null) {
      const targetFeature = geojsonData.features.find(feature => feature.properties.ward === clicked);
      if (targetFeature && selectedLayer !== targetFeature.layer) {
        const layer = targetFeature.layer;
        layer.setStyle({
          ...layer.options.style, // Preserve existing styles if any
          fillColor: 'red',
          color: 'red',
          weight: 2,
        });
        if (selectedLayer) {
          selectedLayer.setStyle({
            ...selectedLayer.options.style,
            fillColor: 'grey',
            color: 'transparent',
            weight: 2,
          });
        }
        setSelectedLayer(layer);
      }
    } else if (selectedLayer) {
      selectedLayer.setStyle({
        ...selectedLayer.options.style,
        fillColor: 'grey',
        color: 'transparent',
        weight: 2,
      });
      setSelectedLayer(null);
      setSelectedWard(null);
    }
  }, [clicked, selectedLayer]); 

  const handleClick = (e) => {
    const layer = e.target;
    const ward = layer.feature.properties.ward;
    setClicked(ward);
    setSelectedWard(ward);
  };

  const onEachFeature = useMemo(() => (feature, layer) => {
    layer.on({
      click: handleClick,
    });
    feature.layer = layer;
  }, []); 

  const mapComponent = useMemo(() => (
    <MapContainer center={[22.7196, 75.8577]} minZoom={12} maxBoundsViscosity={0.9} zoom={11.4} style={{ height: '100%', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <GeoJSON data={geojsonData} onEachFeature={onEachFeature} style={() => ({ fillColor: '#3b3b3b', color: 'transparent', weight: 2 })} />
    </MapContainer>
  ), [onEachFeature]); 

  return {
    selectedWard: clicked !== null ? clicked : selectedWard,
    mapComponent,
  };
};

export default MapComponent;
