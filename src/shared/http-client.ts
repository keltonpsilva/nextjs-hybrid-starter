import axios from "axios";

import setupInterceptorsTo from "./http-client-interceptor";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-type": "application/json",
  },
});

export default setupInterceptorsTo(instance);
