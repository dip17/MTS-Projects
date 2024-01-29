import axios from "axios";
import { apiConstants } from "./components/Constant/constants";
import {
  isAndroid,
  isIOS,
  isWindows,
  isMacOs,
  mobileModel,
  browserName,
  osName,
  mobileVendor,
  browserVersion
} from "react-device-detect";

// const apiUrl = "https://staging-backend.fansforx.com/api/user/"; // Production Mode

// const apiUrl = "http://localhost:8000/api/user/"; // Local Mode
const apiUrl = "http://192.168.1.25/api/user/"; // Local Mode

const Environment = {
  postMethod: async (action, object) => {
    let userId =
      localStorage.getItem("userId") !== "" &&
      localStorage.getItem("userId") !== null &&
      localStorage.getItem("userId") !== undefined
        ? localStorage.getItem("userId")
        : "";

    let accessToken =
      localStorage.getItem("accessToken") !== "" &&
      localStorage.getItem("accessToken") !== null &&
      localStorage.getItem("accessToken") !== undefined
        ? localStorage.getItem("accessToken")
        : "";

    let deviceUniqueId =
        localStorage.getItem("device_unique_id") !== "" &&
        localStorage.getItem("device_unique_id") !== null &&
        localStorage.getItem("device_unique_id") !== undefined
          ? localStorage.getItem("device_unique_id")
          : "";

    const url = apiUrl + action;

    let formData = new FormData();

    // By Default Id and token

    formData.append("id", userId);
    formData.append("token", accessToken);

    var socialLoginUser = 0;

    // append your data
    for (var key in object) {
      formData.append(key, object[key]);

      if (key === "social_unique_id") {
        socialLoginUser = 1;
      }
    }

    // By Default added device type and login type in future use
    if (!socialLoginUser) {
      formData.append("login_by", apiConstants.LOGIN_BY);
    }

    formData.append("device_type", apiConstants.DEVICE_TYPE);
    
    var device_model = "";
    if(isAndroid==true){
      device_model = mobileModel;
    } else if(isIOS==true){
      device_model = mobileModel;
    } else {
      device_model = browserName+' '+browserVersion;
    }

    formData.append("device_model",device_model);

    if(deviceUniqueId) {
      formData.append("device_unique_id", deviceUniqueId);
    }
    
    return await axios.post(url, formData);

    // Progress bar
    // {
    //   onUploadProgress: (ProgressEvent) => {
    //     console.log({
    //       loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100,
    //     });
    //   },
    // }
  },

  getMethod: async (action, object) => {
    let userId =
      localStorage.getItem("userId") !== "" &&
      localStorage.getItem("userId") !== null &&
      localStorage.getItem("userId") !== undefined
        ? localStorage.getItem("userId")
        : "";
    let accessToken =
      localStorage.getItem("accessToken") !== "" &&
      localStorage.getItem("accessToken") !== null &&
      localStorage.getItem("accessToken") !== undefined
        ? localStorage.getItem("accessToken")
        : "";

    let deviceUniqueId =
        localStorage.getItem("device_unique_id") !== "" &&
        localStorage.getItem("device_unique_id") !== null &&
        localStorage.getItem("device_unique_id") !== undefined
          ? localStorage.getItem("device_unique_id")
          : "";

    const url = apiUrl + action;

    let formData = new FormData();

    // By Default Id and token

    formData.append("id", userId);
    formData.append("token", accessToken);

    // append your data
    for (var key in object) {
      formData.append(key, object[key]);
    }

    // By Default added device type and login type in future use

    formData.append("login_by", apiConstants.LOGIN_BY);
    formData.append("device_type", apiConstants.DEVICE_TYPE);

    var device_model = "";
    if(isAndroid==true){
      device_model = mobileModel;
    } else if(isIOS==true){
      device_model = mobileModel;
    } else {
      device_model = browserName+' '+browserVersion;
    }

    formData.append("device_model",device_model);

    if(deviceUniqueId) {
      formData.append("device_unique_id", deviceUniqueId);
    }

    return await axios.get(url, formData);
  },

  /*methods(action) {

        const url = apiUrl+'/api/'+action;

        return {
            getOne: ({ id }) => axios.get(`${url}/${id}`),
            getAll: (toGet) => axios.post(url, toGet),
            update: (toUpdate) =>  axios.put(url,toUpdate),
            create: (toCreate) =>  axios.put(url,toCreate),
            delete: ({ id }) =>  axios.delete(`${url}/${id}`)
        }
    }*/
};

export default Environment;
