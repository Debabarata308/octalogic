import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const Wheels = () => {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState("");
  const [formData, setFormData] = useState(
    JSON.parse(localStorage.getItem("form"))
  );
  const navigate = useNavigate();

  const getOption = async () => {
    const result = await axios.get(
      "https://octalogic-test-frontend.vercel.app/api/v1/vehicleTypes"
    );
    setData(result.data.data);
  };

  const addoption = () => {
    // console.log("dsfs");
    if (selected === "") {
      toast.error(" fill is Redio button!", {
        position: "top-center"
      });
    } else {
      // console.log(formData);
      let preForms = [...formData];
      if (preForms && preForms.length > 0) {
        preForms = preForms.filter(
          (item) => item.question !== "Please select of wheels: "
        );
      }
      let formQA = { question: "Please select of wheels: ", answers: selected };
      preForms.push(formQA);
      setFormData(preForms);
      localStorage.removeItem("form");
      localStorage.setItem("form", JSON.stringify(preForms));
      navigate("/vehicle");
    }
  };

  useEffect(() => {
    getOption();
  }, []);

  return (
    <div className="container" style={{ marginLeft: "25%", marginTop: "5%" }}>
      <div className="row ">
        <div className="col">
          <h4>Please select of wheels: </h4>
        </div>
      </div>

      <div className="row d-inline-flex mb-4 mt-4">
        <div className="col">
          {data.map((val, i) => {
            return (
              <div key={i}>
                <div className="row">
                  <div className="col d-inline-flex">
                    <div className="row d-block" style={{ marginLeft: 5 }}>
                      <div className="col" style={{ marginTop: "2rem" }}>
                        <input
                          type="radio"
                          value={val.wheels}
                          name="wheels"
                          checked={selected === `${val.wheels}`}
                          onChange={(e) => setSelected(e.target.value)}
                        />
                        <label style={{ marginLeft: 5 }}>{val.wheels}</label>
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

export default Wheels;
