import axios from "axios";

const request = axios.create({
  baseURL: "http://localhost:3001",

  headers: {
    "Content-Type": "application/json",
    //'Authorization': 'token <your-token-here> -- https://docs.GitHub.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token'
  },
});

export default request;
