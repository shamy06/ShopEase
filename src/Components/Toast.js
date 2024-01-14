import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Toast = (message, type) => {
  switch (type) {
    case "success":
      toast.dismiss();
      return toast.success(
        <div>
          <p>{message}</p>
        </div>
      );
    case "info":
      toast.dismiss();
      return toast.info(
        <div>
          <p>{message}</p>
        </div>
      );
    case "warning":
      toast.dismiss();
      return toast.warn(
        <div>
          <p>{message}</p>
        </div>
      );
    default:
      toast.dismiss();
  }
};

export default Toast;