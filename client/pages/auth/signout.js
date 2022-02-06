import { useEffect } from "react";
import Router from "next/router";
import { useRequest } from "../../hooks/use-request";

export default () => {
  const { doRequest, errors } = useRequest({
    url: "/auth/users/signout",
    method: "get",
    onSuccess: () => Router.push("/"),
  });
  useEffect(() => {
    doRequest();
  }, []);

  if (errors) {
    console.log(errors);
    return <div>Something happened, please try again.</div>;
  }
  return <div>Signing you out</div>;
};
