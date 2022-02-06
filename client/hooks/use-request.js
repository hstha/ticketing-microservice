import axios from "axios";
import { useState } from "react";

export const useRequest = ({ url, method, body }) => {
  const [errors, setErrors] = useState(null);

  const doRequest = async () => {
    setErrors(null);
    try {
      const response = await axios[method](url, body);
      return response.data;
    } catch (err) {
      const error = {};
      if (
        err.response &&
        err.response.data &&
        err.response.data.errors &&
        Array.isArray(err.response.data.errors)
      ) {
        err.response.data.errors.forEach((e) => {
          if (e.field) {
            error[e.field] = e.message;
          } else {
            error["message"] = e.message;
          }
        });
        console.log({ ...error });
      }
      setErrors(error);
    }
  };

  return { doRequest, errors };
};
