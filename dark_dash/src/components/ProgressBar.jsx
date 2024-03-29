import React, { useEffect, useState } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';


function ContextualExample({theme}) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://newadmindash.onrender.com/maps/markers');

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const fetchedData = await response.json();
        setData(fetchedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const calculateUnpaidTaxes = (taxKey) => {
    if (!data || data.length === 0) {
      return 0;
    }

    return data.filter((entry) => entry[taxKey] !== 0).length;
  };

  const totalPropertyTax = calculateUnpaidTaxes('Property_Tax');
  const totalWaterTax = calculateUnpaidTaxes('Water_Tax');
  const totalGarbageTax = calculateUnpaidTaxes('Garbage_Tax');

  return (
    <div>
      <span>Garbage Tax</span>
      <ProgressBar variant="info" now={(totalGarbageTax / data.length) *100 } label={`${totalGarbageTax}%`} style={{ marginBottom: '25px' }} className={` ${
              theme === "light" ? "bg-floralwhite text-black" : ""
            }`} />
      <span>Water Tax</span>
      <ProgressBar variant="warning" now={(totalWaterTax / data.length) * 100} label={`${totalWaterTax}%`} style={{ marginBottom: '25px' }} className={` ${
              theme === "light" ? "bg-floralwhite text-black" : ""
            }`} />
      <span>Property Tax</span>
      <ProgressBar variant="danger" now={(totalPropertyTax / data.length) * 100} label={`${totalPropertyTax}%`} className={` ${
              theme === "light" ? "bg-floralwhite text-black" : ""
            }`} />
    </div>
  );
}

export default ContextualExample;
