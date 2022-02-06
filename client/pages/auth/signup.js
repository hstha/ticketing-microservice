import { useState } from "react";
import { useRequest } from "../../hooks";

export default () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { doRequest, errors } = useRequest({
    url: "/api/users/signup",
    method: "post",
    body: {
      email,
      password,
    },
  });

  const submitHandler = (e) => {
    e.preventDefault();
    doRequest();
  };

  const showError = (message, field) => (
    <div className="alert alert-danger">
      <p>{message}</p>
    </div>
  );

  return (
    <form onSubmit={submitHandler}>
      <h1>Sign Up</h1>
      <div className="form-group">
        <label>Email Address</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
        />
        {errors && errors.email && showError(errors.email, "email")}
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-control"
        />
        {errors && errors.password && showError(errors.password, "password")}
      </div>
      <button className="btn btn-primary">Sign up</button>
    </form>
  );
};
