import React  from "react";

import axios from "axios";

import connection from "../../../Assets/jsonData/ConnectionConfig/ConnectionConfig.json";
import { InfoData } from "../../../Components/Types/InfoData";

interface LoadProfileInfoServiceProps {
  setFieldsStateCash: (arg: InfoData) => void;
  setFieldsState: (arg: InfoData) => void;
}

function LoadProfileInfoService(props: LoadProfileInfoServiceProps) {
  axios({
    url: connection.ServerUrl + connection.Routes.GetProfileInfo,
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }).then((request) => {
    let infoData = request.data;

    let tempInfoData: InfoData = {
      name: infoData.name,
      surname: infoData.surname,
      phoneNumber: infoData.phoneNumber,
      email: infoData.email,
      password: "",
    };

    props.setFieldsStateCash(tempInfoData);
    props.setFieldsState(tempInfoData);
  });
}

export default LoadProfileInfoService;
