import React,{useEffect,useState} from 'react';
import { wardData } from '../data/wardData';
import {
  MapContainer,
  TileLayer,
  Polygon,
  
  
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { geojsonData } from './finalsetted';
import chroma from 'chroma-js';


let density=0;
const wardNumberData = [
  { region: "Sardar vallabh bhai patel", wardNo: "25" },
  { region: "55_SauthTukoganj", wardNo: "Ward 2" },
  { region: "54_Residency", wardNo: "Ward 24" },
  { region: "53_DrMaulanaAzadnagar", wardNo: "Ward 25" },
  { region: "51_BhagvatiNagar", wardNo: "Ward 23" },
  { region: "50_Brajeshwari", wardNo: "Ward 24" },
  { region: "49_TilakNagar", wardNo: "Ward 25" },
  { region: "48_GeetaBhavan", wardNo: "Ward 2" },
  { region: "shayam nagar", wardNo: "Ward 21" },
  { region: "Ward 22", wardNo: "Ward 25" },
  { region: "Ward 23", wardNo: "Ward 23" },
  { region: "Ward 24", wardNo: "Ward 24" },
  { region: "Ward 25", wardNo: "Ward 25" },
  { region: "11BHAGIRATHPURA", wardNo: "Ward 10" },
  { region: "Untitled Polygon", wardNo: "Ward 24" },
  { region: "14ashoknagar", wardNo: "Ward 14" },
  { region: "15bijasan", wardNo: "Ward 15" },
  { region: "Untitled Polygon", wardNo: "Ward 24" },
  { region: "18_SantKabir", wardNo: "Ward 18" },
  { region: "19_Vishwakarma", wardNo: "Ward 19" },
  { region: "20_GauriNagar", wardNo: "Ward 20" },
  { region: "chandan nagar", wardNo: "Ward 2" },
  { region: "11BHAGIRATHPURA", wardNo: "Ward 10" },
  { region: "Untitled Polygon", wardNo: "Ward 24" },
  { region: "Kalani nagar", wardNo: "Ward 3" },
  { region: "Rajiv_ward", wardNo: "Ward 5" },
  { region: "Sirpur", wardNo: "Ward 1" },
  { region: "Sukdev nagar", wardNo: "Ward 4" },
  { region: "ward31", wardNo: "Ward 30" },
  { region: "ward32", wardNo: "Ward 32" },
  { region: "ward33", wardNo: "Ward 33" },
  { region: "ward34", wardNo: "Ward 34" },
  { region: "ward35", wardNo: "Ward 35" }
];

const center = [22.719568, 75.857727];

const WardMap = ({datas}) => {
 
  const [bounds, setBounds] = useState(null);


  
  function findDensity(wardNo) {
   
    const totalDataOfWard = datas?.filter((entry) => {
        return entry.ward === wardNo; // Return true or false based on the condition
    });

    if (!totalDataOfWard) {
        console.log("Data for ward not found");
        return 0; // Return a default value or handle the case when data is not found
    }

    

    const totalHouses = totalDataOfWard.length;
    
    const paidHouses = totalDataOfWard.filter((entry) => {
        return entry.Water_Tax > 0 && entry.Property_Tax > 0 && entry.Garbage_Tax > 0;
    }).length;

    
    const density = (paidHouses / totalHouses) * 100;

    return density;
}






  useEffect(() => {
    if (geojsonData) {
      let minX = Infinity;
      let minY = Infinity;
      let maxX = -Infinity;
      let maxY = -Infinity;
  
      geojsonData.features.forEach(feature => {
        feature.geometry.coordinates[0].forEach(coord => {
          const [lng, lat] = coord;
          minX = Math.min(minX, lng);
          minY = Math.min(minY, lat);
          maxX = Math.max(maxX, lng);
          maxY = Math.max(maxY, lat);
        });
      });

      setBounds([[minY, minX], [maxY, maxX]]);
    }
  }, []);

 

  const colorScale = chroma.scale(['#152238', '#0088ff']).mode('lab').domain([0, 100]);


  return (

    
                
                <div style={{ width: '100%', height: '100vh', }}>
    <MapContainer
    center={center}
    style={{width:"100%",height:"100vh"}}
    zoom={11.4}
    dragging={true}
    maxBounds={bounds}
    maxBoundsViscosity={1.0}
    
    minZoom={11}
   >

<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

{
        geojsonData.features.map((state) => {
          const coordinates = state.geometry.coordinates[0].map((item) => [item[1], item[0]]);
          const wardName = state.properties.name; // Access ward name directly from state
          const wardEntry = wardNumberData.filter(entry => entry.region === wardName);
 
          if (wardEntry[0]) {
            const wardNo=(wardEntry[0].wardNo.slice(5));
          
            density=findDensity(wardNo);
           
          } else {
            console.log("wardEntry[0] is undefined or null");
          }

         
          

          const fillColor =density ? colorScale(density).hex() : 'black';
         
          


          
          return (<Polygon
            pathOptions={{
              fillColor: fillColor,
              fillOpacity: 0.7,
              weight: 2,
              opacity: 1,
              dashArray: 3,
              color: 'white'
            }}
            positions={coordinates}
            eventHandlers={{
              mouseover: (e) => {
                const layer = e.target;
                layer.setStyle({
                  dashArray: "",
                  fillColor: "red",
                  fillOpacity: 0.7,
                  weight: 2,
                  opacity: 1,
                  color: "white",
                })
                layer.bindTooltip(state.properties.name).openTooltip();
              },
              mouseout: (e) => {
                const layer = e.target;
                layer.setStyle({
                  fillOpacity: 0.7,
                  weight: 2,
                  dashArray: "3",
                  color: 'white',
                  fillColor: fillColor
                });
                layer.unbindTooltip();
              },
              click: (e) => {
               

              }
            }}
          />)
        })
      }



     
    </MapContainer>
    </div>
     
  
            
    
  );
};

export default WardMap;
