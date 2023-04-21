import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Button from "react-bootstrap/Button";

const Vehicle = () => {
  const [vehicle, setVehicle] = useState([]);
  const [selected, setSelected] = useState("");

  const getOption = async () => {
    const result = await axios.get(
      "https://octalogic-test-frontend.vercel.app/api/v1/vehicleTypes"
    );
    setVehicle(result.data.data);
  };

  const addoption = () => {
    if (selected === "") {
      toast.error(" fill is Redio button!", {
        position: "top-center"
      });
    }
  };
  useEffect(() => {
    getOption();
  }, []);

  return (
    <div>
      <h1>Number of Vehicles</h1>
      {vehicle.map((val, i) => {
        return (
          <>
            <div>
              <input
                type="radio"
                value={val.type}
                name="wheels"
                checked={selected === `${val.type}`}
                onChange={(e) => setSelected(e.target.value)}
              />
              <label>{val.type}</label>
            </div>
          </>
        );
      })}
      <Button
        variant="dark"
        type="submit"
        onClick={() => addoption()}
        style={{ width: "420px" }}
      >
        Next
      </Button>
      <ToastContainer />
    </div>
  );
};

export default Vehicle;
