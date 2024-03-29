import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut as DoughnutChart } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export function DoughnutComponent({ SetType }) { 
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

  const getChartData = () => {
    if (SetType === 'UnPaid') {
      const Ugarbagetax = data.length - calculateUnpaidTaxes('Garbage_Tax');
      const Uwatertax = data.length - calculateUnpaidTaxes('Water_Tax');
      const Upropertytax = data.length - calculateUnpaidTaxes('Property_Tax');

      // console.log('Unpaid tax:', Ugarbagetax, Upropertytax, Uwatertax);

      return {
        labels: ['Unpaid Property Tax', 'Unpaid Water Tax', 'Unpaid Garbage Tax'],
        datasets: [
          {
            data: [Ugarbagetax, Uwatertax, Upropertytax],
            backgroundColor: ['#0DCAF0', '#FFC107', '#DC3545'],
          backgroundColor: [
            '#0DCAF0',
            '#FFC107',
            '#DC3545',
          ],
          borderColor: ['#0DCAF0)', 'rgb(255, 0, 0)', 'rgb(0, 255, 0)'],
          borderWidth: 1,
          },
        ],
      };
    } else {
      // Display total counts for all tax types
      const totalPropertyTax = calculateUnpaidTaxes('Property_Tax');
      const totalWaterTax = calculateUnpaidTaxes('Water_Tax');
      const totalGarbageTax = calculateUnpaidTaxes('Garbage_Tax');

      // console.log('Total paid:', totalGarbageTax, totalPropertyTax, totalWaterTax);

      return {
        labels: ['Paid Property Tax', ' Paid Water Tax', 'Paid Garbage Tax'],
        datasets: [
          {
            data: [totalGarbageTax, totalWaterTax, totalPropertyTax],
            backgroundColor: ['#0DCAF0', '#FFC107', '#DC3545'],
          backgroundColor: [
            'rgba(13, 202, 240,0.6)',
            'rgba(255, 193, 7,0.6)',
            'rgba(220, 53, 69,0.6)',
          ],
          borderColor: ['#0DCAF0', '#FFC107', '#DC3545'],
          borderWidth: 1,
          },
        ],
      };
    }
  };

  const doughnutData = getChartData();

  return <DoughnutChart data={doughnutData} />;
}
