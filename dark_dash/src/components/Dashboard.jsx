import React, { useEffect } from "react";
import { LineGraph } from "./LineGraph";
import Table from "./ranked";
import { useContext } from "react";
import UnpaidTable from "./LeastRanked";
import { useState } from "react";
import ContextualExample from "./ProgressBar";
import { DoughnutComponent } from "./doughnut";
import Speedometer from "./Speedometer";
import MapComponent from "./MapContainer";
import WardMapComponent from "./wardMap";
import RegionTable from "./RegionTable";
import { notecontext } from "./notecontext";
import { useTheme } from "./ThemeContext";
import WardMap from "./wardMap";



const Dashboard = () => {

  const { theme } = useTheme();
  const { selectedWard, mapComponent } = MapComponent();
  const [IsLoading, setIsLoading] = useState(false);
  const [SelectedType, setSelectedType] = useState();
  const [speedbtn, setspeedbtn] = useState(null);
  const [fetchedData, setfetchedData] = useState(null);
  const [wardNumber, setwardNumber] = useState(null);
  const {temp} =useContext(notecontext);
  const{clicked, setClicked}= temp;
  
  useEffect(() => {
    fetchDataAndPopulateCards();
  }, []);

  useEffect(() => {
    if(fetchedData)
    fourbuttons(selectedWard,fetchedData);
  }, [selectedWard,fetchedData]);
  
  useEffect(() => {
    if(fetchedData)
    sidetabel(selectedWard,fetchedData);
  }, [selectedWard,fetchedData]);
  


  const fetchDataAndPopulateCards = async () => {
    try {
      const response = await fetch("https://newadmindash.onrender.com/maps/markers");
      
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      
      setfetchedData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  

  function formatLargeNumber(value) {
    const roundedValue = Math.round(value * 100) / 100;
    const stringValue = roundedValue.toString();
    const truncatedValue = stringValue.substring(0, 5);
    return truncatedValue;
}

  
  const formatIndianCurrency = (value) => {
    if (value >= 1e+12) {
        return `${formatLargeNumber((Math.round(value / 1e+11) / 10).toFixed(2))} Trillion`;
    } else if (value >= 1e+9) {
        return `${formatLargeNumber((Math.round(value / 1e+8) / 10).toFixed(2))} Billion`;
    } else if (value >= 1e+6) {
        return `${formatLargeNumber((Math.round(value / 1e+5) / 10).toFixed(2))} Million`;
    } else if (value >= 1e+3) {
        return `${(value / 1e+3).toFixed(3)} K`;
    } else if (value >= 1e+7) {
        return `${(value / 1e+7).toFixed(2)} Cr`;
    } else if (value >= 1e+5) {
        return `${(value / 1e+5).toFixed(2)} Lakh`;
    } else {
        return value;
    }
}

const sidetabel =(selectedWard,fetchedData)=>{

 
    if (selectedWard==null)
    {
       const totalpersons=fetchedData?.length;
       const waterpersons=fetchedData?.filter((entry)=> entry.Water_Tax!==0);
       const Garbagepersons=fetchedData?.filter((entry)=> entry.Garbage_Tax!==0);
       const propertyrsons=fetchedData?.filter((entry)=> entry.Property_Tax!==0);

       document.getElementById("samarth").innerHTML=`Overall`;
      document.getElementById("FirstBlock").innerHTML=`${waterpersons.length}/${totalpersons}`;
    document.getElementById("SecondBlock").innerHTML=`${propertyrsons.length}/${totalpersons}`;
    document.getElementById("ThirdBlock").innerHTML=`${Garbagepersons.length}/${totalpersons}`;
    }

    if (clicked!==null) 
    {
      selectedWard=clicked;
      const dataArray = Object.values(fetchedData);

    
    const TotalPersons = dataArray.filter((entry) => entry.ward === `${selectedWard}`);
    
    const PaidWater= TotalPersons.filter((entry)=> entry.Water_Tax!==0);
    const PaidGarbage= TotalPersons.filter((entry)=> entry.Garbage_Tax!==0);
    const PaidProperty= TotalPersons.filter((entry)=> entry.Property_Tax!==0);



    document.getElementById("FirstBlock").innerHTML=`${PaidWater.length}/${TotalPersons.length}`;
    document.getElementById("SecondBlock").innerHTML=`${PaidGarbage.length}/${TotalPersons.length}`;
    document.getElementById("ThirdBlock").innerHTML=`${PaidProperty.length}/${TotalPersons.length}`;
    document.getElementById("samarth").innerHTML=`Ward Number : ${selectedWard}`;
  }

  }

  const fourbuttons = (selectedWard,fetchedData) => {
    
    if (selectedWard && fetchedData) {
      const wardData = fetchedData.filter((entry) => entry.ward === `${selectedWard}`);

      if (wardData.length > 0) {
        
      
      const WardWaterTax = wardData.reduce((total, entry) => total + entry.Water_Tax, 0);
      const WardGarbageTax = wardData.reduce((total, entry) => total + entry.Garbage_Tax, 0);
      const WardPropertyTax = wardData.reduce((total, entry) => total + entry.Property_Tax, 0);
      
      
      const TotalWardTax = WardGarbageTax + WardPropertyTax + WardWaterTax;
  
        document.getElementById("totalRevenueValue").innerText = `₹ ${(formatIndianCurrency(TotalWardTax))}`;
        document.getElementById("waterTaxValue").innerText = `₹ ${formatIndianCurrency(WardWaterTax)}`;
        document.getElementById("garbageTaxValue").innerText = `₹ ${formatIndianCurrency(WardGarbageTax)}`;
        document.getElementById("propertyTaxValue").innerText = `₹ ${formatIndianCurrency(WardPropertyTax)}`;
      }
    } else if (fetchedData!=null && selectedWard==null) {

      const totalWaterTax = fetchedData.reduce((total, entry) => total + entry.Water_Tax, 0);
      const totalGarbageTax = fetchedData.reduce((total, entry) => total + entry.Garbage_Tax, 0);
      const totalPropertyTax = fetchedData.reduce((total, entry) => total + entry.Property_Tax, 0);
  
      const totalRevenue = totalGarbageTax + totalPropertyTax + totalWaterTax;
  
      document.getElementById("totalRevenueValue").innerText = `₹ ${formatIndianCurrency(totalRevenue)}`;
      document.getElementById("waterTaxValue").innerText = `₹ ${formatIndianCurrency(totalWaterTax)}`;
      document.getElementById("garbageTaxValue").innerText = `₹ ${formatIndianCurrency(totalGarbageTax)}`;
      document.getElementById("propertyTaxValue").innerText = `₹ ${formatIndianCurrency(totalPropertyTax)}`;
    }
    else
    {
      document.getElementById("totalRevenueValue").innerText = `₹ ${0}`;
      document.getElementById("waterTaxValue").innerText = `₹ ${0}`;
      document.getElementById("garbageTaxValue").innerText = `₹ ${0}`;
      document.getElementById("propertyTaxValue").innerText = `₹ ${0}`;
    }
  };
  
  const handleclick = (ward) => {
    setwardNumber(ward);
  };

  const handlebuttonclick = (taxtype) => {
    setSelectedType(taxtype);
  };

  const handlebtn = (taxtype) => {
    setspeedbtn(taxtype);
  };

  return (
    <>
   
      <div style={{ cursor: "pointer", userSelect: "none" }}>
  <spinner className="text-center" />
  <div className={`main-panel ${theme === "light" ? "bg-floralwhite" : ""}`}>
    <div
      className={`content-wrapper ${
        theme === "light" ? "bg-floralwhite" : ""
      }`}
    >
      <div className="row">
        <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
          {/* card 1 */}
          <div
            class={`card ${
              theme === "light" ? "bg-lavender text-black" : ""
            }`}
          >
            <div className="card-body">
              <div className="row">
                <div className="col-9">
                  <div className="d-flex align-items-center align-self-start">
                    <h3 className="mb-0" id="totalRevenueValue">
                      Loading...
                    </h3>
                  </div>
                </div>
                <div className="col-3">
                  <div
                    class={`icon icon-box-warning ${
                      theme === "dark" ? "bg-black" : ""
                    } `}
                  >
                    <span className="mdi mdi-arrow-top-right icon-item"></span>
                  </div>
                </div>
              </div>
              <h6
                class={`${
                  theme === "light"
                    ? "text-black font-weight-normal"
                    : "text-muted font-weight-normal"
                }`}
              >
                Total Revenue
              </h6>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
          {/* card 2 */}
          <div
            class={`card ${
              theme === "light" ? "bg-lavender text-black" : ""
            }`}
          >
            <div className="card-body">
              <div className="row">
                <div className="col-9">
                  <div className="d-flex align-items-center align-self-start">
                    <h3 className="mb-0" id="waterTaxValue">
                      Loading...
                    </h3>
                  </div>
                </div>
                <div className="col-3">
                  <div
                    class={`icon icon-box-primary ${
                      theme === "dark" ? "bg-black" : ""
                    }`}
                  >
                    <span className="mdi mdi-cup-water  icon-item"></span>
                  </div>
                </div>
              </div>
              <h6
                class={`${
                  theme === "light"
                    ? "text-black font-weight-normal"
                    : "text-muted font-weight-normal"
                }`}
              >
                Water Tax
              </h6>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
          {/* card 3 */}
          <div
            class={`card ${
              theme === "light" ? "bg-lavender text-black" : ""
            }`}
          >
            <div className="card-body">
              <div className="row">
                <div className="col-9">
                  <div className="d-flex align-items-center align-self-start">
                    <h3 className="mb-0" id="propertyTaxValue">
                      Loading...
                    </h3>
                  </div>
                </div>
                <div className="col-3">
                  <div
                    class={`icon icon-box-danger ${
                      theme === "dark" ? "bg-black" : ""
                    }`}
                  >
                    <span className="mdi mdi-store di left icon-item"></span>
                  </div>
                </div>
              </div>
              <h6
                class={`${
                  theme === "light"
                    ? "text-black font-weight-normal"
                    : "text-muted font-weight-normal"
                }`}
              >
                Property Tax
              </h6>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
          {/* card 4 */}
          <div
            class={`card ${
              theme === "light" ? "bg-lavender text-black" : ""
            }`}
          >
            <div className="card-body">
              <div className="row">
                <div className="col-9">
                  <div className="d-flex align-items-center align-self-start">
                    <h3 className="mb-0" id="garbageTaxValue">
                      Loading...
                    </h3>
                    {/* <p className="text-success ms-2 mb-0 font-weight-medium">
                          +3.5%
                        </p> */}
                  </div>
                </div>
                <div className="col-3">
                  <div
                    class={`icon icon-box-success ${
                      theme === "dark" ? "bg-black" : ""
                    }`}
                  >
                    <span className="mdi mdi-archive icon-item"></span>
                  </div>
                </div>
              </div>
              <h6
                class={`${
                  theme === "light"
                    ? "text-black font-weight-normal"
                    : "text-muted font-weight-normal"
                }`}
              >
                Garbage Tax
              </h6>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        {/* ward table */}
        <div className="col-md-3 grid-margin stretch-card">
          <div
            class={`card ${
              theme === "light" ? "bg-lavender text-black" : ""
            }`}
            style={{
              height: "78vh",
              overflowY: "auto",
              scrollbarWidth: "thick",
              overflowX: "hidden",
            }}
          >
            <div className="card-body">
              <dash />
              <RegionTable theme={theme} />
            </div>
            {
              theme=="light" ?" " :<style>
              {` 
              /* WebKit Scrollbar Styles */
              .card::-webkit-scrollbar {
                  width: 8px;
              }
              .card::-webkit-scrollbar-thumb {
                  background-color: #555555;
              }
              .card::-webkit-scrollbar-track {
                  background-color:   #333333 ;
              }
          `}
            </style>
            }
            
          </div>
        </div>
              {/* map card */}
              <div className="col-md-6 grid-margin stretch-card">
              <div
                  class={`card ${
                    theme === "light" ? "bg-lavender text-black" : ""
                  }`}
                >
                  <div className="card-body">{mapComponent}</div>
                </div>
              </div>
              <div className="col-md-3 grid-margin stretch-card">
              <div
                  class={`card ${
                    theme === "light" ? "bg-lavender text-black" : ""
                  }`}
                >
                  <div className="card-body">
                    <div className="md-3">
                    <h3
                        class={` ${
                          theme === "light"
                            ? "text-black"
                            : "text-white font-weight-normal"
                        } `}
                        id="samarth"
                      >
                        Ward number : {selectedWard}
                      </h3>
                      <div
                        className="card"
                        style={{
                          backgroundColor: theme
                            ? "#e6e6fa"
                            : "rgba(0,0,0,0.6)",
                          marginBottom: "12px",
                          marginTop: "20px",
                          padding: "0px",
                        }}
                      >
                        <div className="row">
                        <div
                            class={`card-body ${
                              theme === "light" ? " text-black bg-floralwhite" : ""
                            }`}
                            style={{ height: "80px", minHeight: "110px" }}
                          >
                            <h6>Water Tax</h6>
                            <p className="text-muted font-weight-normal" id="FirstBlock" >persons/totalpersons</p>
                          </div>
                        </div>
                      </div>
                      <div
                        className="card"
                        style={{
                          backgroundColor: theme
                            ? "#e6e6fa"
                            : "rgba(0,0,0,0.6)",
                          marginBottom: "12px",
                          padding: "0px",
                        }}
                      >
                        <div className="row">
                        <div
                            class={`card-body ${
                              theme === "light" ? " text-black bg-floralwhite" : ""
                            }`}
                            style={{ height: "80px", minHeight: "110px" }}
                          >
                            <h6>Property Tax</h6>
                            <p className="text-muted font-weight-normal" id="SecondBlock" >
                              persons/totalpersons
                            </p>
                          </div>
                        </div>
                      </div>
                      <div
                        className="card"
                        style={{
                          backgroundColor: theme
                            ? "#e6e6fa"
                            : "rgba(0,0,0,0.6)",
                          marginBottom: "12px",
                          padding: "0px",
                        }}
                      >
                        <div className="row">
                        <div
                            class={`card-body ${
                              theme === "light" ? " text-black bg-floralwhite" : ""
                            }`}
                            style={{ height: "80px", minHeight: "110px" }}
                          >
                            <h6>Garbage Tax</h6>
                            <p className="text-muted font-weight-normal" id="ThirdBlock">
                              persons/totalpersons
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              {/* progess chart */}
              <div className="col-sm-6 grid-margin">
              <div
                  class={`card ${
                    theme === "light" ? "bg-lavender text-black" : ""
                  }`}
                >
                  <div
                    className="card-body"
                    style={{ height: "269px", alignItems: "center" }}
                  >
                    <ContextualExample theme={theme} />
                  </div>
                </div>
              </div>
              {/* speedo meter */}
              <div className="col-sm-6 grid-margin">
              <div
                  class={`card ${
                    theme === "light" ? "bg-lavender text-black" : ""
                  }`}
                >
                  <div
                    className="row"
                    style={{
                      justifyContent: "center",
                      gap: "8px",
                      marginBottom: "8px",
                      marginTop: "8px",
                    }}
                  >
                    <button
                      className="btn btn-primary btn-sm"
                      style={{ width: "100px" }}
                      onClick={() => {
                        handlebtn("");
                      }}
                    >
                      Overall Tax
                    </button>
                    <button
                      className="btn btn-primary btn-sm"
                      style={{ width: "100px" }}
                      onClick={() => {
                        handlebtn("Garbage_Tax");
                      }}
                    >
                      Garbage Tax
                    </button>
                    <button
                      className="btn btn-primary btn-sm"
                      style={{ width: "100px" }}
                      onClick={() => {
                        handlebtn("Property_Tax");
                      }}
                    >
                      Property Tax
                    </button>
                    <button
                      className="btn btn-primary btn-sm"
                      style={{ width: "100px" }}
                      onClick={() => {
                        handlebtn("Water_Tax");
                      }}
                    >
                      Water Tax
                    </button>
                  </div>
                  <div
                    className="card-body"
                    style={{
                      width: "300px",
                      height: "229px",
                      display: "flex",

                      borderRadius: "5px",
                      justifyContent: "center",
                      position: "relative",
                      margin: "auto",
                    }}
                  >
                    <Speedometer
                      TaxSelected={speedbtn}
                      wardNumber={wardNumber}
                    />
                    <div className="container px-0">
                      <div className="row">
                        <div className="col-lg-12">
                          {/* Scrollable Menu */}
                          <div className="btn-group">
                          <button
                              type="button"
                              className={`${
                                theme === "light"
                                  ? "btn btn-default dropdown-toggle text-black"
                                  : "btn btn-default dropdown-toggle"
                              }`}
                              data-toggle="dropdown"
                              style={{ pointer: "arrow" }}
                            >
                              Ward List
                            </button>
                            <ul
                              className="dropdown-menu scrollable-menu"
                              role="menu"
                              style={{
                                height: "auto",
                                maxHeight: "200px",
                                overflowX: "hidden",
                              }}
                            >
                              {[...Array(10).keys()].map((index) => (
                                <li key={index} style={{ cursor: "pointer" }}>
                                  <option
                                    value={index + 1}
                                    onClick={() => {
                                      handleclick(`${index + 1}`);
                                    }}
                                    style={{ pointer: "default" }}
                                  >
                                    ward {index + 1}{" "}
                                  </option>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>{" "}
                  </div>
                </div>
              </div>
            </div>
            {/* line chart */}
            {/* line chart */}
            <div className="row ">
              <div className="col-8 grid-margin">
              <div
                  className={`card ${
                    theme === "light" ? "bg-lavender text-black" : ""
                  }`}
                  style={{ height: "71vh" }}
                >
                  <div
                    style={{ width: "100%", height: "50vh", margin: "auto" }}
                  >
                    <LineGraph />
                  </div>
                </div>
              </div>
              {/* pie graph */}
              <div className="col-4 grid-margin">
              <div
                  className={`card ${
                    theme === "light" ? "bg-lavender text-black" : ""
                  }`}
                >
                  <div
                    className="row"
                    style={{
                      justifyContent: "center",
                      gap: "8px",
                      marginBottom: "8px",
                      marginTop: "8px",
                    }}
                  >
                     <button
                      type="button"
                      class={`${
                        theme === "light"
                          ? "btn btn-primary btn-sm text-black"
                          : "btn btn-primary btn-sm "
                      }`}
                      style={{ width: "80px" }}
                      onClick={() => {
                        handlebuttonclick("Paid");
                      }}
                    >
                      Paid
                    </button>

                    <button
                      type="button"
                      class={`${
                        theme === "light"
                          ? "btn btn-primary btn-sm text-black"
                          : "btn btn-primary btn-sm "
                      }`}
                      style={{ width: "80px" }}
                      onClick={() => {
                        handlebuttonclick("UnPaid");
                      }}
                    >
                      Unpaid
                    </button>
                  </div>

                  <DoughnutComponent
                    SetType={SelectedType}
                    style={{ marginBottom: "9px" }}
                  />
                </div>
              </div>
            </div>

            {/* table ranking  */}
            <div className="row">
              <div className="col-md-6 col-xl-4 grid-margin stretch-card">
              <div
                  class={`card ${
                    theme === "light" ? "bg-lavender text-black" : ""
                  }`}
                >
                  <div className="card-body">
                  <Table theme={theme} />
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-xl-4 grid-margin stretch-card">
              <div
                  class={`card ${
                    theme === "light" ? "bg-lavender text-black" : ""
                  }`}
                >
                  <div className="card-body">
                  <UnpaidTable theme={theme} />
                  </div>
                </div>
              </div>
              <div className="col-md-12 col-xl-4 grid-margin stretch-card">
              <div
                  class={`card ${
                    theme === "light" ? "bg-lavender text-black" : ""
                  }`}
                >
                  <div className="card-body">
                   
                    <WardMapComponent datas={fetchedData}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
