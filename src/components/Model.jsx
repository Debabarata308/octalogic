import React, { useEffect, useState } from "react";
import axios from "axios";
const Model = () => {
  const [data, setData] = useState([]);

  const fatchData = async () => {
    const result = await axios.get(
      "https://octalogic-test-frontend.vercel.app/api/v1/vehicleTypes"
    );
    setData(result.data.data);
  };

  console.log(data);
  useEffect(() => {
    fatchData();
  }, []);

  return <div>Model</div>;
};

export default Model;
