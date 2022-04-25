import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardText, CardImg } from "reactstrap";

function StaffList(props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortId, setSortId] = useState(false);
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
    .sort((a, b) => (sortId ? a.id - b.id : b.id - a.id))
    .map((nv) => {
      return (
        <div key={nv.id} className="col-6 col-md-4 col-lg-2 mb-1 mt-1">
          <Card>
            <Link to={`/staff/${nv.id}`}>
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
    <div className="search container">
      <div className="searchInputs container m-3">
        <div id="band" className="row">
          <div id="title" className="m-1 mt-2 mr-5">
            <h3>Nhân viên</h3>
          </div>
          <div id="input" className="m-1">
            <input
              className="form-control form-control-md"
              type="text"
              placeholder="Tìm nhân viên..."
              onChange={(event) => {
                setSearchTerm(event.target.value);
              }}
            />
          </div>
          <div id="btn" className="m-1 mt-1">
            <button
              type="button"
              className="responsive-content btn btn-primary"
              onClick={() => setSortId(!sortId)}
            >
              Sắp xếp theo MSNV
            </button>
          </div>
        </div>
      </div>
      <hr />
      <div className="dataResult container m-1">
        <div className="row">{listNhanvien}</div>
      </div>
    </div>
  );
}

export default StaffList;
