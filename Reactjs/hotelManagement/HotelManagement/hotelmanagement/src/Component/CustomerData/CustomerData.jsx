import React, { useState } from "react";
import "./style.css";
import axios from "axios";
export default function CustomerData() {

  const [name, setname] = useState('')
  const [bookingDate, setbookingDate] = useState('')
  const [address, setaddress] = useState('')
  const [customerNo, setcustomerNo] = useState('')

  const handlesubmit = async (e) => {
    e.preventDefault()
    // console.log(name, bookingDate, address, customerNo)
    let body = {

      custno: customerNo,
      name: name,
      addr: address,
      roomBookdate: bookingDate
    }
    let res = await axios.post('http://127.0.0.1:5000/registerCustomer', body)
    if (res.status == 201) {
      alert(res.data.message)
    } else {
      alert("error pls try again")

    }
    console.log(res);
  }
  // const [name,setname]=useState('')

  return (
    <>
      <h3>Add Deatil</h3>

      <div className="mt-4 movefield">
        <form className="ms-4">
          <div className="form-row">
            <div className="form-group col-md-6 mt-3">
              <label > Customer Number</label>
              <input
                type="text"
                className="form-control"
                // id="inputEmail4"
                placeholder="Number"
                onChange={(e) => { setcustomerNo(e.target.value) }}
              />
            </div>
            <div className="form-group col-md-6 mt-3">
              <label > Customer Name</label>
              <input
                type="text"
                className="form-control"
                // id="inputPassword4"
                placeholder="Name"
                onChange={(e) => { setname(e.target.value) }}
              />
            </div>

            <div className="form-group col-md-6 mt-3">
              <label >Address</label>
              <input
                type="text"
                className="form-control"
                // id="inputPassword4"
                placeholder="Adress"
                onChange={(e) => { setaddress(e.target.value) }}
              />
            </div>

            <div className="form-group col-md-6 mt-3">
              <label>Date</label>
              <input
                type="date"
                className="form-control"
                // id="inputPassword4"
                placeholder="Date"
                onChange={(e) => { setbookingDate(e.target.value) }}
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-4 btn btn-primary"
            onClick={handlesubmit}
          >
            Book Now
          </button>
        </form>
      </div>
    </>
  );
}
