import React from "react";
import PropTypes from "prop-types";
import useResendOTP from "./Hooks/resendOTP";
import "./Otp.css"

function ResendOTP({ renderTime, renderButton, style, className, ...props }) {
  const { remainingTime, handelResendClick } = useResendOTP(props);
  return (
    <div
      className={className || ""}
      data-testid="otp-resend-root"
      style={{
        display: "flex",
        justifyContent: "space-between",
        ...style
      }}
    >
      {renderTime ? (
        renderTime(remainingTime)
      ) : (
        <span className="timing">{remainingTime} sec</span>
      )}
      {renderButton ? (
        renderButton({
          disabled: remainingTime !== 0,
          onClick: handelResendClick,
          remainingTime
        })
      ) : (
        <button className="Resendbtn" disabled={remainingTime !== 0} onClick={handelResendClick} type="button">
          Resend OTP
        </button>
      )}
    </div>
  );
}

ResendOTP.defaultProps = {
  maxTime: 300,
  timeInterval: 1000,
  style: {}
};

ResendOTP.propTypes = {
  onTimerComplete: PropTypes.func,
  onResendClick: PropTypes.func,
  renderTime: PropTypes.func,
  renderButton: PropTypes.func,
  maxTime: PropTypes.number,
  timeInterval: PropTypes.number,
  style: PropTypes.object,
  className: PropTypes.string
};

export default ResendOTP;
