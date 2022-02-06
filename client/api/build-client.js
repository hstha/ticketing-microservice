import axios from "axios";

export default ({ req }) => {
  if (typeof window === "undefined") {
    // we are on server
    // this is for logic is to solve the issue with k8s
    // request should be made to http://SERVICENAME.NAMESPACE....
    return axios.create({
      baseURL:
        "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
      headers: req.headers,
    });
  } else {
    // we are on client
    return axios.create({
      baseURL: "/",
    });
  }
};
