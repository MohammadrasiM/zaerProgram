import axios from "axios";
import { baseUrl } from "../utils/urls";

// import {errorHandling} from './errorHandling';
import validatorError from "./validatorError";
import Notify from "../components/shared/Toast";
const cache = require("memory-cache");

const headerItems = (token) => {
  if (token) {
    return {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    };
  } else
    return {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
};
const config = (method, url, data, token) => {
  if (method == "GET")
    return {
      method: method,
      headers: headerItems(token),
      url: `${baseUrl}${url}`,
      params: data,
    };
  else
    return {
      method: method,
      headers: headerItems(token),
      url: `${baseUrl}${url}`,
      data: data,
    };
};

export const ApiCall = async (
  method,
  url,
  data,
  name = "response ->",
  callback,
  onError,
  cacheDuration,
  cacheKey,
  readFromCache = false,
  refresh = true,
  options,
  disableMessage
) => {
  try {
    //CACHE CONTROL
    if (readFromCache && method == "GET") {
      const cachedResponse = cache.get(cacheKey || url);
      if (cachedResponse) {
        console.log("read from cache" + url);
        if (typeof callback == "function") callback(cachedResponse);
        return;
      }
    }
    if (method != "get" || method != "GET") cache.del(cacheKey || url); //remove cache
    //END CACHE CONTROL

    const token = localStorage.getItem("token") || null;
    const response = await axios(config(method, url, data, token));

    if (response.status == 200 || response.status == 201) {
      const res = response.data;

      console.log(name, res);
      if (res.status == "successful" || res.status == "success") {
        if (typeof callback == "function") callback(res);
        !!cacheDuration && cache.put(cacheKey || url, res, cacheDuration); //cache response
        !disableMessage && res.messages?.fa && method != "GET" && Notify({ type: "success", body: res.messages?.fa });
      } else {
        //Failed
        if (typeof onError == "function") onError(response);
        Notify({ type: "error", title: "خطا", body: res.messages?.fa });
      }
    } else {
      // Status != 200
      response.status == 401 &&
        (localStorage.removeItem("isLogin"), localStorage.removeItem("token"), window?.location?.replace("/auth"));
      if (typeof onError == "function") onError(response);
    }
  } catch (error) {
    if (error?.response?.status == 401) {
      localStorage.removeItem("isLogin");
      localStorage.removeItem("token");
      window?.location?.replace("/auth");
    }
    if (typeof onError == "function") onError(error);
    if (error.response?.status == 401 && refresh) {
      localStorage.removeItem("isLogin");
      localStorage.removeItem("token");
      return window?.location?.replace("/auth");
    }
    console.log("Error", error.response?.data || error);
    if (error && error.message == "Network Error")
      Notify({ type: "warn", body: "لطفا اتصال اینترنت خود را بررسی کنید" });
    else {
      const msg = validatorError(error?.response?.data?.errors);
      if (options?.multiErrorsCustomeMessage && Object.keys(error?.response?.data?.errors)?.length > 1) {
        Notify({
          type: "error",
          title: "خطا",
          body: error?.response?.data?.message,
        });
      } else
        Notify({
          type: "error",
          title: "خطا",
          body: msg || error.response?.data?.messages?.fa || "Unknown error occured",
        });
    }
  }
};
