import React, { useState, useEffect } from 'react';
import ComplaintBox from './ComplaintBox';

const ComplaintsTable = () => {
  const [complaintsData, setComplaintsData] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    fetch('https://newadmindash.onrender.com/maps/complains')
      .then(response => response.json())
      .then(data => setComplaintsData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <section className="ftco-section" style={{ width: "100%", minWidth: "100vw" }}>
        <div className="container" style={{ marginTop: "10vh", padding: "30px", minWidth: "100vw" }}>
          <div className="d-flex justify-content-center row">
            <div className="col-md-12">
              <div className="table-responsive table-borderless">
                <table className="table myaccordion" id="accordion">
                  <tbody>
                    <tr style={{ display: "flex", justifyContent: "space-between" }}>
                      <th>Sc.No</th>
                      <th>UID</th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th>Title</th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th>Description</th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                    </tr>

                    {complaintsData.map((complaint, index) => (
                      <ComplaintBox
                        key={index}
                        sNo={index + 1}
                        uid={complaint.uid}
                        title={complaint.title}
                        phone={complaint.phone}
                        body={complaint.body}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ComplaintsTable;
