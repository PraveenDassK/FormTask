import axios from "axios";

const request = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,

  headers: {
    "Content-Type": "application/json",
    //'Authorization': 'token <your-token-here> -- https://docs.GitHub.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token'
  },
});

export default request;
