import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import CustomerData from "./Component/CustomerData/CustomerData";
import CustomerDetail from "./Component/CustomerDeatail/CustomerDetail";
import PriceList from "./Component/PriceList/PriceList";

function App() {
  const [Compshow, setCompshow] = useState(0);

  const handmanagecomp = (value) => {
    if (value == 0) {
      setCompshow(0);
    }

    if (value == 1) {
      setCompshow(1);
    }

    if (value == 2) {
      setCompshow(2);
    }
  };

  return (
    <>
      <button className="p-5 btn btn-link" onClick={() => handmanagecomp(0)}>
        Add Customer
      </button>
      <button className="p-5 btn btn-link" onClick={() => handmanagecomp(1)}>
        View Customer
      </button>
      <button className="p-5 btn btn-link" onClick={() => handmanagecomp(2)}>
        Price
      </button>

      <div>
        {Compshow == 0 ? (
          <CustomerData />
        ) : Compshow == 1 ? (
          <CustomerDetail />
        ) : (
          <PriceList />
        )}
      </div>
    </>
  );
}

export default App;
