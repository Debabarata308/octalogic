import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";

const Picker = () => {
  const [model, setModel] = useState([]);
  const [finalData, setFinalData] = useState([]);
  const [selected, setSelected] = useState("");
  const [formData, setFormData] = useState(
    JSON.parse(localStorage.getItem("form"))
  );
  const [vehicle, setVehicle] = useState(
    JSON.parse(localStorage.getItem("vehicle"))
  );

  const [startDate, setStartDate] = useState(new Date("2014/02/08"));
  const [endDate, setEndDate] = useState(new Date("2014/02/10"));
  const navigate = useNavigate();

  const getDataById = async (id) => {
    let data = await axios.get(
      "https://octalogic-test-frontend.vercel.app/api/v1/bookings/" + id
    );
    return data;
  };

  const getOption = async () => {
    var results = [];
    let data = await getDataById(formData[3].answers);
    results = data?.data?.data;
    if (results && results.length > 0) {
      results.map((item) => {
        let startDate = new Date(item.startDate);
        let endDate = new Date(item.endDate);
        var newend = endDate.setDate(endDate.getDate() + 1);
        endDate = new Date(newend);
        while (startDate < endDate) {
          // console.log(startDate);
          var newDate = startDate.setDate(startDate.getDate() + 1);
          startDate = new Date(newDate);
        }
      });
    }
    setModel(results);
  };

  const addoption = () => {
    if (startDate == null && endDate == null) {
      toast.error(" fill is Redio button!", {
        position: "top-center"
      });
    } else {
      let preForms = [...formData];
      if (preForms && preForms.length > 0) {
        preForms = preForms.filter(
          (item) => item.question !== "Please select booking start/end date:"
        );
      }
      let formQA = {
        question: "Please select booking start/end date:",
        answers: { startDate: startDate, endDate: endDate }
      };
      preForms.push(formQA);
      setFormData(preForms);
      localStorage.removeItem("form");
      localStorage.setItem("form", JSON.stringify(preForms));
      toast.success("Your vehicle is booked", {
        position: "top-center"
      });
    }
  };

  useEffect(() => {
    setVehicle(JSON.parse(localStorage.getItem("vehicle")));
    getOption();
  }, []);

  return (
    <div className="container" style={{ marginLeft: "20%", marginTop: "5%" }}>
      <div className="row ">
        <div className="col">
          <h4>Please select booking start/end date: </h4>
        </div>
      </div>

      <div className="row d-inline-flex mb-4 mt-4">
        <div className="col">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
          />
        </div>
        <div className="col">
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
          />
        </div>
      </div>
      <div className="row d-block">
        <div className="col">
          <Button
            variant="dark"
            type="submit"
            onClick={() => addoption()}
            style={{ width: "420px" }}
          >
            Book
          </Button>
        </div>
        <div className="col mt-2">
          <Button
            variant="secondary"
            type="submit"
            onClick={() => navigate("/")}
            style={{ width: "420px" }}
          >
            Home
          </Button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Picker;
