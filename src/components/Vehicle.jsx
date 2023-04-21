import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const Vehicle = () => {
  const [vehicle, setVehicle] = useState([]);
  const [selected, setSelected] = useState("");
  const [formData, setFormData] = useState(
    JSON.parse(localStorage.getItem("form"))
  );
  const navigate = useNavigate();

  const getOption = async () => {
    const result = await axios.get(
      "https://octalogic-test-frontend.vercel.app/api/v1/vehicleTypes"
    );

    let tempDataHolder = [];
    if (formData && formData.length > 0) {
      console.log(result.data.data);
      formData.map((item) => {
        result.data.data.filter((il) => {
          if (item && item.answers == il.wheels) {
            console.log(il);
            tempDataHolder.push(il);
          }
        });
      });
    }
    console.log(tempDataHolder);
    setVehicle(tempDataHolder);
  };

  const addoption = () => {
    if (selected === "") {
      toast.error(" fill is Redio button!", {
        position: "top-center"
      });
    }
    localStorage.removeItem("vehicle");
    localStorage.setItem("vehicle", JSON.stringify(vehicle[0]));
    let preForms = [...formData];
    if (preForms && preForms.length > 0) {
      preForms = preForms.filter(
        (item) => item.question !== "Number of Vehicles"
      );
    }
    let formQA = { question: "Number of Vehicles", answers: vehicle[0] };
    preForms.push(formQA);
    setFormData(preForms);
    localStorage.removeItem("form");
    localStorage.setItem("form", JSON.stringify(preForms));
    navigate("/model");
  };
  useEffect(() => {
    getOption();
  }, []);

  return (
    <div>
      <h1>Number of Vehicles</h1>
      {vehicle.map((val, i) => {
        return (
          <div key={i}>
            <input
              type="radio"
              value={val.type}
              name="wheels"
              checked={selected === `${val.type}`}
              onChange={(e) => setSelected(e.target.value)}
            />
            <label>{val.type}</label>
          </div>
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
