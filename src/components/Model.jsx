import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const Model = () => {
  const [model, setModel] = useState([]);
  const [finalData, setFinalData] = useState([]);
  const [selected, setSelected] = useState("");
  const [formData, setFormData] = useState(
    JSON.parse(localStorage.getItem("form"))
  );
  const [vehicle, setVehicle] = useState(
    JSON.parse(localStorage.getItem("vehicle"))
  );
  const navigate = useNavigate();

  const getDataById = async (id) => {
    let data = await axios.get(
      "https://octalogic-test-frontend.vercel.app/api/v1/vehicles/" + id
    );
    return data;
  };

  const getOption = async () => {
    var results = [];
    if (vehicle && vehicle.vehicles && vehicle.vehicles.length > 0) {
      for (let i = 0; i < vehicle.vehicles.length; i++) {
        let data = await getDataById(vehicle.vehicles[i].id);
        results.push(data?.data?.data);
      }
    }

    console.log(results);
    setModel(results);
  };

  const addoption = () => {
    if (selected === "") {
      toast.error(" fill is Redio button!", {
        position: "top-center"
      });
    } else {
      let preForms = [...formData];
      if (preForms && preForms.length > 0) {
        preForms = preForms.filter(
          (item) => item.question !== "Please select model:"
        );
      }
      let formQA = { question: "Please select model:", answers: selected };
      preForms.push(formQA);
      setFormData(preForms);
      localStorage.removeItem("form");
      localStorage.setItem("form", JSON.stringify(preForms));
      navigate("/picker");
    }
  };
  const handleSelected = async (id) => {
    let data = await getDataById(id);
    setSelected(id);
    setFinalData(data);
  };
  useEffect(() => {
    setVehicle(JSON.parse(localStorage.getItem("vehicle")));
    getOption();
  }, []);

  return (
    <div className="container" style={{ marginLeft: "25%", marginTop: "5%" }}>
      <div className="row ">
        <div className="col">
          <h4>Please select model: </h4>
        </div>
      </div>

      <div className="row d-inline-flex mb-4 mt-4">
        <div className="col">
          {model.map((val, i) => {
            return (
              <div key={i}>
                <div className="row">
                  <div className="col d-inline-flex">
                    <div className="row d-block" style={{ marginLeft: 5 }}>
                      <div className="col" style={{ marginTop: "2rem" }}>
                        <input
                          type="radio"
                          value={val.id}
                          name="vehicle"
                          checked={selected === `${val.id}`}
                          onChange={(e) => handleSelected(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="row d-block" style={{ marginLeft: 5 }}>
                      <div className="col">
                        <img
                          src={val.image.publicURL}
                          className="img-fluid"
                          alt={val.image.key}
                          style={{ height: "5rem", width: "8rem" }}
                        />
                      </div>
                      <div className="col">
                        <label>{val.name}</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Button
            variant="dark"
            type="submit"
            onClick={() => addoption()}
            style={{ width: "420px" }}
          >
            Next
          </Button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Model;
