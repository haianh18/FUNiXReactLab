import React from "react";
import { Link } from "react-router-dom";

function StaffList(props) {
  const listNhanvien = props.staffs.map((nv) => {
    return (
      <Link key={nv.id} to={`/staff/${nv.id}`}>
        <div key={nv.id}>
          <div className="col-12 col-md-2 m-1">
            <img src={nv.image} alt={nv.name} />
            <p>{nv.name}</p>
          </div>
        </div>
      </Link>
    );
  });
  return (
    <div className="container">
      <div className="row">{listNhanvien}</div>
    </div>
  );
}

export default StaffList;
