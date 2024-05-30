import React, { useState } from "react";
import "./style.css";
import axios from "axios";

export default function PriceList() {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [extraPersons, setExtraPersons] = useState('');
  const extraCostPerPerson = 500;

  const [Customerno, setCustomerno] = useState('')
  const [Numberofrooms, setNumberofrooms] = useState('')

  const handlesubmit = async (e) => {
    e.preventDefault()

    let body = {
      custno: Number(Customerno),
      choice: Number(selectedRoom),
      num_rooms: Number(Numberofrooms),
      extra_persons: Number(extraPersons)

    }
    console.log(body);
    let res = await axios.post('http://127.0.0.1:5000/calculateRoomRent', body)
    if (res.status == 201) {
      alert(res.data.message)
    } else {
      alert("error pls try again")

    }
    console.log(res);
  }

  const handleRoomChange = (event) => {
    setSelectedRoom(parseInt(event.target.value, 10));
  };

  const handleExtraPersonsChange = (event) => {
    setExtraPersons(parseInt(event.target.value, 10));
  };

  const calculateTotal = () => {
    if (selectedRoom !== null) {
      return Numberofrooms * selectedRoom + extraPersons * extraCostPerPerson;
    }
    return 0;
  };

  return (
    <div>

      <div className="form-row row mb-5">
        <div className="form-group col-md-6 mt-3">
          <label > Customer Number</label>
          <input
            type="text"
            className="form-control"
            // id="inputEmail4"
            placeholder="Number"
            onChange={(e) => { setCustomerno(e.target.value) }}
          />
        </div>

        <div className="form-group col-md-6 mt-3 ">
          <label >Number of Rooms</label>
          <input
            type="text"
            className="form-control"
            // id="inputEmail4"
            placeholder="Number of Rooms"
            onChange={(e) => { setNumberofrooms(e.target.value) }}
          />
        </div>
      </div>


      <div className="card">
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <input
              type="radio"
              name="room"
              value="1"
              onChange={handleRoomChange}
              className="me-5"
            />
            <strong>First Class Room Cost :</strong> 6000 Per Ni8
          </li>
          <li className="list-group-item">
            <input
              type="radio"
              name="room"
              value="2"
              onChange={handleRoomChange}
              className="me-4"
            />
            <strong>Business Class Room Cost :</strong> 4000 Per Ni8
          </li>
          <li className="list-group-item">
            <input
              type="radio"
              name="room"
              value="3"
              onChange={handleRoomChange}
              className="me-4"
            />
            <strong>Economy Class Room Cost :</strong> 2000 Per Ni8
          </li>
        </ul>
        <div>
          <label htmlFor="extraPersons " className="mt-5">
            <strong>Extra Persons (500 per person):</strong>
          </label>
          <input
            type="number"
            id="extraPersons"
            min="0"
            value={extraPersons}
            className="mt-5 ms-5 designin"
            onChange={handleExtraPersonsChange}
          />
        </div>
        {/* <div className="mt-5" id="output">
          {selectedRoom !== null && (
            <p>
              You have opted to rent at {selectedRoom} with {extraPersons} extra
              person(s). Total cost: {calculateTotal()}
            </p>
          )}
        </div> */}

        <button onClick={handlesubmit}>Submit</button>
      </div>
    </div>
  );
}
