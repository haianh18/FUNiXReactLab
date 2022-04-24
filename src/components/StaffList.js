import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardText, CardImg } from "reactstrap";

function StaffList(props) {
  const [searchTerm, setSearchTerm] = useState("");
  const listNhanvien = props.staffs
    .filter((val) => {
      if (searchTerm === "") {
        return val;
      } else if (
        val.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
      ) {
        return val;
      }
    })
    .map((nv) => {
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

  return (
    <div className="search">
      <div className="searchInputs container m-3">
        <input
          type="text"
          placeholder="Tìm nhân viên..."
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        />
      </div>

      <div className="dataResult container m-1">
        <div className="row">{listNhanvien}</div>
      </div>
    </div>
  );
}

export default StaffList;
