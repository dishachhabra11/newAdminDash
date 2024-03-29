

// import React from 'react';
// // import './App.css'; // You can create a CSS file for styling

// const unpaidTable = () => {
    

//     const unpaidData = [
//         { wardNo: 1, wardName: 'Ward X', percentageUnpaid: 20 },
//         { wardNo: 2, wardName: 'Ward Y', percentageUnpaid: 5 },
//         { wardNo: 3, wardName: 'Ward Z', percentageUnpaid: 25 },
//         { wardNo: 3, wardName: 'Ward Z', percentageUnpaid: 25 },
//         { wardNo: 3, wardName: 'Ward Z', percentageUnpaid: 25 },
//         { wardNo: 3, wardName: 'Ward Z', percentageUnpaid: 25 },
//     ];

//     return (
//         <div className="app">
           
//             <UnpaidTable data={unpaidData} tableName="Unpaid" />
//         </div>
//     );
// };

// const UnpaidTable = ({ data, tableName }) => {
//     return (
//         <div>
//             <div class="card">
//                 <div class="card-body">
//                     <h4>Basic Table</h4>
//                     <div>
//                         <table className="table">
//                             <thead>
//                                 <tr className='content'>
//                                     <th>Ward No.</th>
//                                     <th>Ward Name</th>
//                                     {tableName === 'Paid' ? <th>Paid Tax %</th> : <th>Unpaid Tax %</th>}
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {data?.map((item) => (
//                                     <tr key={item.wardNo} className='content'>
//                                         <td>{item.wardNo}</td>
//                                         <td>{item.wardName}</td>
//                                         {tableName === 'Paid' ? <td>{`${item.percentagePaid}%`}</td> : <td>{`${item.percentageUnpaid}%`}</td>}
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default UnpaidTable;
import React from 'react';
// import './App.css'; // You can create a CSS file for styling
// import 'bootstrap/dist/css/bootstrap.min.css';
// import "./Table.css";
const UTable = ({ theme }) => {
    // Dummy data for the paid and unpaid tables
    const unpaidData = [
        { wardNo: 6, wardName: 'Malharganj', percentageUnpaid: 80 },
        { wardNo: 9, wardName: 'Vrindavan', percentageUnpaid: 95 },
        { wardNo: 11, wardName: 'Bhagirath pura', percentageUnpaid: 75 },
        { wardNo: 14, wardName: 'Ashok nagar', percentageUnpaid: 75 },
        { wardNo: 27, wardName: 'Pashupati nath', percentageUnpaid: 75 },
        { wardNo: 10, wardName: 'Banganga', percentageUnpaid: 75 },
    ];

    

    return (
        <div className="app">
             <UnpaidTable theme={theme} data={unpaidData} tableName="Paid" />
       
        </div>
    );
};

const UnpaidTable = ({ theme,data, tableName }) => {
    return (
        <div>
<div class={`card ${theme === "light" ? "bg-lavender text-black" : ""}`}>
        <div class="card-body">
          <h4>Least paying wards</h4>
          <div>
            <table
              className="table"
              style={{ overflowY: "auto", height: "300px" }}
            >
              <thead>
                <tr className="content">
                  <th className={`${theme === "light" ? "text-black" : ""}`}>
                    Ward No.
                  </th>
                  <th className={`${theme === "light" ? "text-black" : ""}`}>
                    Ward Name
                  </th>
                  <th className={`${theme === "light" ? "text-black" : ""}`}>
                    Unpaid Tax %
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.map((item) => (
                  <tr key={item.wardNo} className="content">
                    <td className={`${theme === "light" ? "text-black" : ""}`}>
                      {item.wardNo}
                    </td>
                    <td className={`${theme === "light" ? "text-black" : ""}`}>
                      {item.wardName}
                    </td>
                    <td>
                      <button
                        type="button"
                        class={` ${
                          theme
                            ? "btn btn-danger bg-red-400 btn-md text-black"
                            : "btn btn-danger btn-md"
                        }`}
                      >
                        {item.percentageUnpaid}%
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>

                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UTable;