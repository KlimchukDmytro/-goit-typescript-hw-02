import React from "react";
import s from "./ErrorMessage.module.css";

interface ErrorMessageProps {
  errorMsg: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ errorMsg }) => {
  return (
    <div className={s.error}>
      <h2>Whoops, something went wrong! Please try reloading this page!</h2>
      <p>{errorMsg}</p>
    </div>
  );
};

export default ErrorMessage;
