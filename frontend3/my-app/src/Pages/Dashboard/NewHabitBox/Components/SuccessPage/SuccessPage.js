/** @format */

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SuccessPage.css";

export default function SuccessPage() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/");
  }, []);
  return (
    <React.Fragment>
      <h1> Success ! </h1>
    </React.Fragment>
  );
}
