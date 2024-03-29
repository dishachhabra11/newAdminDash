import React from 'react';

const WardMeter = ({ wardNumber, TaxSelected, data }) => {

    console.log("selected tax is ",TaxSelected)
    console.log("selected tax is ",wardNumber);

  if (wardNumber !== null) {
    const wardDataFiltered = data.filter((entry) => entry.ward === wardNumber);
    const totalEntries = wardDataFiltered.length;
    
    // Calculate total sum paid for Water Tax
    const totalWaterTax = ((wardDataFiltered.reduce(( entry) => entry.Water_Tax!==0))/totalEntries)*100;
    const totalGarbageTax = ((wardDataFiltered.reduce(( entry) => entry.Garbage_Tax!==0))/totalEntries)*100;
    const totalPropertyTax = ((wardDataFiltered.reduce(( entry) => entry.Property_Tax!==0))/totalEntries)*100;

    console.log(`${wardNumber} ka ${totalGarbageTax}, ${totalPropertyTax}, ${totalPropertyTax}`);
    // Render based on TaxSelected
    if (TaxSelected === 'Water_Tax') {
        return (
          <>
            <ReactSpeedometer
              fluidWidth={false}
              responsive={true}
              minValue={0}
              maxValue={100}
              value={totalWaterTax('Water_Tax')}
              needleColor="#2F323A"
              segments={5}
              startColor="#26A1EB"
              endColor="#26D974"
              ringWidth={15}
            />
            <p >Water Tax paid <h1>{totalWaterTax('Water_Tax').toFixed(2)}%</h1></p>
          </>
        );
      } else if (TaxSelected === 'Garbage_Tax') {
        return (
          <>
            <ReactSpeedometer
              fluidWidth={false}
              responsive={true}
              minValue={0}
              maxValue={100}
              value={totalGarbageTax('Garbage_Tax')}
              needleColor="#2F323A"
              segments={5}
              startColor="#26A1EB"
              endColor="#26D974"
              ringWidth={15}
            />
            <p >Garbage Tax paid <h1>{totalGarbageTax('Garbage_Tax').toFixed(2)}%</h1></p>
          </>
        );
      } else if (TaxSelected === 'Property_Tax') {
        return (
          <>
            <ReactSpeedometer
              fluidWidth={false}
              responsive={true}
              minValue={0}
              maxValue={100}
              value={totalPropertyTax('Property_Tax')}
              needleColor="#2F323A"
              segments={5}
              startColor="#26A1EB"
              endColor="#26D974"
              ringWidth={15}
            />
            <p >Property Tax paid <h1>{totalPropertyTax('Property_Tax').toFixed(2)}%</h1></p>
          </>
        );
      } else   {
        return (
          <>
            <ReactSpeedometer
              fluidWidth={false}
              responsive={true}
              minValue={0}
              maxValue={100}
              value={calculateOverallPaidPercentage()}
              needleColor="#2F323A"
              segments={5}
              startColor="#26A1EB"
              endColor="#26D974"
              ringWidth={15}
            />
            <p >Overall Tax paid <h1>{calculateOverallPaidPercentage().toFixed(2)}%</h1></p>
          </>)
      } }
};

export default WardMeter;