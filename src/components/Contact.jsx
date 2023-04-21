import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const [inpval, setInpval] = useState({
    fname: "",
    lname: ""
  });

  const [data, setData] = useState([]);
  console.log(inpval);
  const navigate = useNavigate();

  const getdata = (e) => {
    const { value, name } = e.target;

    setInpval(() => {
      return {
        ...inpval,
        [name]: value
      };
    });
  };

  const addData = (e) => {
    e.preventDefault();

    const { fname, lname } = inpval;

    if (fname === "") {
      toast.error(" First name field is requred!", {
        position: "top-center"
      });
    } else if (lname === "") {
      toast.error("Last Name field is requred", {
        position: "top-center"
      });
    } else {
      console.log("data added succesfully");
      localStorage.setItem(
        "form",
        JSON.stringify([
          ...data,
          { question: "First, Whats your name ?", answers: inpval }
        ])
      );
      navigate("/wheel");
    }
  };
  return (
    <div>
      <h2>First, Whats your name ?</h2>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name="fname"
            onChange={getdata}
            placeholder="Enter Your Name"
            style={{ width: "420px" }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="lname"
            onChange={getdata}
            placeholder="Enter Your Last Name"
            style={{ width: "420px" }}
          />
        </Form.Group>
        <Button
          variant="dark"
          type="submit"
          onClick={addData}
          style={{ width: "420px" }}
        >
          Next
        </Button>
      </Form>
      <ToastContainer />
    </div>
  );
};

export default Contact;
