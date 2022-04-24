import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardText, CardImg } from "reactstrap";
import { STAFFS } from "../data/staffs";

function StaffList(props) {
  const listNhanvien = props.staffs.map((nv) => {
    return (
      <div className="col-6 col-md-4 col-lg-2 mb-1 mt-1">
        <Card>
          <Link key={nv.id} to={`/staff/${nv.id}`}>
            <CardImg
              className="mx-auto img-thumbnail"
              src={nv.image}
              alt={nv.name}
            />
            <CardText style={{ color: "black", textAlign: "center" }}>
              {nv.name}
            </CardText>
          </Link>
        </Card>
      </div>
    );
  });
  const [filteredData, setFilteredData] = useState([]);
  const handleFilter = (event) => {
    const searchWord = event.target.value;
    const newFilter = props.staffs.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      return setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  return (
    <div className="search">
      <div className="searchInputs">
        <form>
          <input
            type="text"
            placeholder="Tìm nhân viên..."
            onChange={handleFilter}
          />
        </form>
      </div>

      <div className="dataResult container">
        <div className="row">
          {filteredData.map((value) => {
            return (
              <div className="col-6 col-md-4 col-lg-2 mb-1 mt-1">
                <Card>
                  <Link key={value.id} to={`/staff/${value.id}`}>
                    <CardImg
                      className="mx-auto img-thumbnail"
                      src={value.image}
                      alt={value.name}
                    />
                    <CardText style={{ color: "black", textAlign: "center" }}>
                      {value.name}
                    </CardText>
                  </Link>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default StaffList;
