import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
export default function CustomerDetail() {

  const [data, setdata] = useState([])
  const [inputdata, setinputdata] = useState("")



  const handleget = async () => {
    let res = await axios.get('http://127.0.0.1:5000/getAllCustomer')
    setdata(res.data)
    console.log(res);
  }

  useEffect(() => {
    handleget()
  }, [])


  const handelinputdata = (E) => {
    setinputdata(E.target.value)
    try {
      if (E.target.value) {
        if (data.length > 0) {
          let abc = data.filter((da) => da.custno === E.target.value)
          setdata(abc)
        }
      } else {
        handleget()
      }

    } catch (err) {
      console.log(err);
    }


  }




  return (
    <div>
      <input value={inputdata} onChange={handelinputdata} placeholder="Enter CUST ID" />
      {data.map((sub) => (
        <div class="card" >
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              <strong>Name:</strong> {sub.custname}
            </li>
            <li class="list-group-item">
              <strong>CustomerNumber : </strong> {sub.custno}
            </li>
            <li class="list-group-item">
              <strong>Address:</strong> {sub.addr}
            </li>
            <li class="list-group-item">
              <strong>Date:</strong> {moment(sub.bdate).format("MMM Do YY")}
            </li>
          </ul>
        </div>))}
    </div>
  );
}
