import React from 'react'

const wardTable = () => {
  return (
    <div>
      <div class="md-3">
                    <h3 class="text-white font-weight-normal"> Ward 83</h3>
                    <div class="card" style={{ backgroundColor: "rgba(0,0,0,0.6)", marginBottom: "12px", marginTop: "20px", padding: "0px"}}>
                      <div class="row">
                        <div class="card-body" style={{ height: "80px", minHeight: "110px" }}>
                          <h6>Water Tax</h6>
                          <p className="text-muted font-weight-normal">111/130</p>
                        </div>
                      </div>
                    </div>
                    <div class="card" style={{backgroundColor: "rgba(0,0,0,0.6)",marginBottom: "12px", padding: "0px"}}>
                      <div class="row">
                        <div class="card-body" style={{ height: "80px", minHeight: "110px" }}>
                          <h6>Property Tax</h6>
                          <p className="text-muted font-weight-normal">111/130</p>
                        </div>
                      </div>
                    </div>
                    <div class="card" style={{ backgroundColor: "rgba(0,0,0,0.6)", marginBottom: "12px",padding: "0px",}}>
                      <div class="row">
                        <div class="card-body" style={{ height: "80px", minHeight: "110px" }}>
                          <h6>Garbage Tax</h6>
                          <p className="text-muted font-weight-normal">111/130</p>
                        </div>
                      </div>
                    </div>
                  </div>
    </div>
  )
}

export default wardTable
