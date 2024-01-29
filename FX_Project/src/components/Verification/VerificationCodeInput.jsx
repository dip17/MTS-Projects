import React, { useState, useRef, useEffect } from "react";
import OtpInput from "react-otp-input";

const VerificationCodeInput = ({
  length,
  label,
  loading,
  onComplete,
  labelClassName,
  autoFocus=false
}) => {
  const [code, setCode] = useState("");

  useEffect(() => {
    if (code.length === length)
      onComplete(code);
    else
      onComplete("");
  }, [code]);

  return (
    <>
      <div className="code-input">
        <lable className={labelClassName}>{label}</lable>
        <div className="code-inputs">
          <OtpInput
            numInputs={length}
            className="otp"
            value={code}
            onChange={val => setCode(val)}
            isInputNum={true}
            shouldAutoFocus={autoFocus}
          />
        </div>
      </div>
    </>
  );
};

export default VerificationCodeInput;
