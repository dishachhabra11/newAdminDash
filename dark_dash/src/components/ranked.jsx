

import React from 'react';

const Table = ({theme}) => {
    const paidData = [
        { wardNo: 36, wardName: 'Nipaniya', percentagePaid: 80 },
        { wardNo: 42, wardName: 'Swami vivekanand', percentagePaid: 95 },
        { wardNo: 15, wardName: 'Bijasan', percentagePaid: 75 },
        { wardNo: 55, wardName: 'South tukoganj', percentagePaid: 75 },
        { wardNo: 74, wardName: 'Vishnupuri', percentagePaid: 75 },
        { wardNo: 82, wardName: 'Sudama Nagar', percentagePaid: 75 },
    ];
    return (
        <div className="app">
            <PaymentTable theme={theme} data={paidData} tableName="Paid" />
       
        </div>
    );
};

const PaymentTable = ({ theme,data, tableName }) => {
    return (
        <div>
            <div class={`card ${theme === "light" ? "bg-lavender text-black" : ""}`}>
        <div class="card-body">
          <h4>Most paying wards</h4>
          <div>
            <table className="table">
              <thead>
                <tr className="content">
                  <th className={`${theme === "light" ? "text-black" : ""}`}>
                    Ward No.
                  </th>
                  <th className={`${theme === "light" ? "text-black" : ""}`}>
                    Ward Name
                  </th>
                  {tableName === "Paid" ? (
                    <th className={`${theme === "light" ? "text-black" : ""}`}>
                      Paid Tax %
                    </th>
                  ) : (
                    <th className={`${theme === "light" ? "text-black" : ""}`}>
                      Unpaid Tax %
                    </th>
                  )}
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
                            ? "btn btn-success bg-green-400 btn-md text-black"
                            : "btn btn-success btn-md"
                        }`}
                      >
                        {item.percentagePaid}%
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

export default Table;