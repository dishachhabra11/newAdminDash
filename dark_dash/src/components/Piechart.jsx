import React from "react";
import { PieChart, Pie, Tooltip, Cell } from "recharts";

const Piechart = () => {
  // Sample data
  const data = [
    { name: "Garbage Tax", students: 30 },
    { name: "Water Tax", students: 40 },
    { name: "Property Tax", students: 30 }
  ];

  const COLORS = ["#793FDF", "#14C38E","blue"]; // Define your custom colors

  return (
    <div
      style={{
        textAlign: "center",
         marginTop:"0px",
        

      }}
    >
       {/* <div className='w-[15rem] h-[300px] p-6  bg-[#16213d]   flex flex-col flex-1 mt-5 mr-5 mb-5 items-center rounded-xl '> */}
       <PieChart width={80} height={42}  style={{height:"50px"}} >
        <Tooltip />
        <Pie
          data={data}
          dataKey="students"
          outerRadius={60}
          innerRadius={40}
          label={({ name, students }) => `${name}: ${students}`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
      </PieChart>
       </div>
      
    // </div>
  );
};

export default Piechart;
