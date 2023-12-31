import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../AppContext";
import { useNavigate } from "react-router";
import { BubbleBackground, InputComponent } from "../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { SubmitResultsInterface } from "../SignUp/SubmitResultsInterface.types";

const ForgotPassword = () => {
  const { email, setEmail } = useContext(AppContext);
  const [validationCode, setValidationCode] = useState<number>(0);
  const navigate = useNavigate();
  const [submitResults, SetSubmitResult] = useState<SubmitResultsInterface>();

  function generateRandomNumber() {
    const min = 100000;
    const max = 999999;

    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  useEffect(() => {
    setValidationCode(generateRandomNumber());
  }, []);

  const handleSubmit = () => {
    axios
      .post("http://localhost:8081/forgot-password", { email, validationCode })
      .then((res) =>
        res.data === true
          ? (navigate("/recovery-password"), console.log(true))
          : (SetSubmitResult(res.data), console.log(false))
      )
      .catch((err) => console.log("DIO3", email, err));
  };

  return (
    <div className="forgot-password-page">
      <BubbleBackground />
      <button
        className="home-button"
        onClick={() => {
          navigate("/");
        }}
      >
        <FontAwesomeIcon icon={faHouse} />
      </button>
      <div className="form">
        <h1>Forgot password</h1>
        <div className="input">
          <InputComponent
            value={email}
            setValue={setEmail}
            ChecksOn={false}
            fieldName="email"
            submitResults={submitResults}
          />
        </div>
        <button
          className={`submit ${email != "" ? "active" : "inactive"}`}
          value={"submit"}
          onClick={() => {
            if (email != "") {
              handleSubmit();
            }
          }}
        >
          submit
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
