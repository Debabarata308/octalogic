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
    console.log("dsfs");
    if (selected === "") {
      toast.error(" fill is Redio button!", {
        position: "top-center"
      });
    } else {
      console.log(formData);
      let preForms = [...formData];
      if (preForms && preForms.length > 0) {
        preForms = preForms.filter(
          (item) => item.question !== "Number of Wheels"
        );
      }
      let formQA = { question: "Number of Wheels", answers: selected };
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
    <div>
      <h1>Number of Wheels</h1>
      {data.map((val, i) => {
        return (
          <>
            <div>
              <input
                type="radio"
                value={val.wheels}
                name="wheels"
                checked={selected === `${val.wheels}`}
                onChange={(e) => setSelected(e.target.value)}
              />
              <label>{val.wheels}</label>
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

export default Wheels;
