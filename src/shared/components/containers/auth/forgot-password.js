import React, { useState } from "react";
// import button from "./button";
import { Auth } from "aws-amplify";
import Footer from "../../navigation/footer";
import { useForm } from "react-hook-form";

export default function Forgotpassword(props) {
  const [stage, setStage] = useState(1); // 1 = email stage, 2 = code stage
  const [email, setEmail] = useState("");
  const { register, handleSubmit, watch, errors } = useForm();
  const [errorMessageFromAWS, setErrorMessageFromAWS] = useState("");

  const sendCode = (event) => {
    event.preventDefault();
    Auth.forgotPassword(email)
      .then((data) => {
        console.log(data);
        setStage(2);
      })
      .catch((error) => setErrorMessageFromAWS(error.message));
  };

  const resetPassword = (values) => {
    const code = values.code;
    const confirmPassword = values.confirmPassword;

    Auth.forgotPasswordSubmit(email, code, confirmPassword)
      .then(() => props.history.push("/"))
      .catch((err) =>

      setErrorMessageFromAWS(err.message)

      );
  };

  return (
    <>
      <div className="login">
        {stage === 1 && (
          <form onSubmit={sendCode} className="login__form">
            <div className="signup__heading--style">
              <h3>Submit your email to receive code</h3>
            </div>
            <div controlid="email" bssize="large" className="login__wrapper">
              <div className="login__email--colorAndSpacing">
                <h3>
                  Email
                </h3>
              </div>{" "}
              <input
                className="signup__passwordInput"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>{" "}
            <button type="submit" bssize="large">
              <h3>
                Submit
              </h3>
            </button>
          </form>
        )}

        {stage === 2 && (
          <form onSubmit={handleSubmit(resetPassword)} className="signup__form">
            <div className="forgotPassword__heading--style">
              <h3>
              If your email exisits, you will receive a code in your inbox
              </h3>
            </div>
            <div>
              <div className="signup__wrapper">
                <div className="forgotPassword__text"> <h3>code</h3> </div>{" "}
                <input
                  className="signup__passwordInput"
                  name="code"
                  ref={register({
                    required: "required",
                  })}
                />
                {errors.code ? <p>{errors.code.message} </p> : ""}{" "}
              </div>
              <div className="signup__wrapper">
                <div className="forgotPassword__text"> <h3>new password</h3> </div>{" "}
                <input
                  className="signup__passwordInput"
                  type="password"
                  name="password"
                  ref={register({
                    required: "required",
                    minLength: {
                      value: 8,
                      message: "min length is 8",
                    },
                  })}
                />
                {errors.password ? <p>{errors.password.message} </p> : ""}{" "}
              </div>
              <div className="signup__wrapper">
                <div className="forgotPassword__text"><div> <h3>confirm password</h3> </div></div>{" "}
                <input
                  className="signup__passwordInput"
                  type="password"
                  name="confirmPassword"
                  ref={register({
                    required: "required",
                    minLength: {
                      value: 8,
                      message: "min length is 8",
                    },
                    validate: (value) =>
                      value === watch("password") || "Passwords don't match.",
                  })}
                />
                {errors.confirmpassword ? (
                  <p>{errors.confirmpassword.message} </p>
                ) : (
                  ""
                )}{" "}
              </div>
            </div>
            <button type="submit" bssize="large">
              <h3>
                Submit
              </h3>
            </button>
            <div className="warning-message">{errorMessageFromAWS}</div>

          </form>
        )}
      </div>
      <Footer
        message={"Working towards a circular economy in waste management"}
      />
    </>
  );
}
