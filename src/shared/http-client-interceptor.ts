import { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { getSession, signOut } from "next-auth/react";
import isEmpty from "lodash/isEmpty";
import isUndefined from "lodash/isUndefined";
import isNull from "lodash/isNull";
import { toast } from "sonner";

import { HOME_PAGE_PATH } from "./router/router-paths";

type ErrorType = {
  key: string;
  value: string[];
};

type ProblemDetailsErrorType = {
  status: number;
  title: string;
  errors?: ErrorType;
  detail?: string;
};

function handleError(ex: ProblemDetailsErrorType) {
  const { errors } = ex;

  const API_DEFAULT_MESSAGE_REQUEST = "The request is invalid";

  if (!isNull(ex.detail) && !isEmpty(ex.detail)) {
    toast.error(ex.detail);
    return;
  }

  // catch default errors (e.g. 404, 500, etc.)
  if (isUndefined(errors)) {
    toast.error(API_DEFAULT_MESSAGE_REQUEST);
    return;
  }

  // process standard API errors
  Object.entries(errors!).forEach(([, value]) => {
    if (isEmpty(value)) {
      toast.error(API_DEFAULT_MESSAGE_REQUEST);

      return;
    }

    toast.error(value[0]);
  });
}

const onRequest = async (
  config: InternalAxiosRequestConfig
): Promise<InternalAxiosRequestConfig> => {
  const session = await getSession();

  if (session && session.idToken) {
    const accessToken = session.idToken;

    config.headers.setAuthorization(`Bearer ${accessToken}`);
  }

  return config;
};

const onResponseError = (error: AxiosError): Promise<AxiosError> | null => {
  if (error.code === "ERR_NETWORK" || error.message === "Network Error") {
    toast.error("Network error", {
      description: "Please check your internet connection",
    });
    window.location.href = "/error";
  }

  const { response } = error;

  if (response) {
    switch (response.status) {
      case 401:
        signOut({ redirect: true, callbackUrl: HOME_PAGE_PATH });
        break;
      case 500:
        toast.error("Server Error", {
          description: "Something went wrong on our end",
        });
        break;
      default:
        handleError(error?.response?.data as ProblemDetailsErrorType);
        break;
    }
  }

  return Promise.reject(error);
};

export default function setupInterceptorsTo(
  axiosInstance: AxiosInstance
): AxiosInstance {
  axiosInstance.interceptors.request.use(onRequest, undefined);
  axiosInstance.interceptors.response.use(undefined, onResponseError);

  return axiosInstance;
}
