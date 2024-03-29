import React,{useState} from "react";

function ScrollableMenu() {

const [ward, setward] = useState(null);

const handleclick=(wardnumber)=>{
    setward(wardnumber);
}
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12">

          {/* Scrollable Menu */}
          <div className="btn-group">
            <button
              type="button"
              className="btn btn-default dropdown-toggle"
              data-toggle="dropdown"
            >
              Menu 
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
                <li key={index}>
                  <option value={index+1}> ward {index+1} </option>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScrollableMenu;