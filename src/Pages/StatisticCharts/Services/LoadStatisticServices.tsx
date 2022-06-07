import React from "react"
import GetService from "../../../Components/Services/GetService"

import ConnectionConfig from "../../../Assets/jsonData/ConnectionConfig/ConnectionConfig.json"
import { RequestResult } from "../../../Components/Types/RequestResult";

interface ILoadStatisticServicesProps{
  setLotsQuantity: (data: number) => void;
  setBidsQuantity: (data: number) => void;
  setAgreementsQuantity: (data: number) => void;
  setAverageViewsPerLot: (data: number) => void;
  setBadRequest: (arg: RequestResult) => void;
}

function LoadStatisticServices(props: ILoadStatisticServicesProps){

  GetService.request(
      ConnectionConfig.ServerUrl + "Agreement/GetQuantity"
    ).then((response) => {
      if (response.data === null) {
        props.setBadRequest(({show: true, message: "agreements quantity weren't loaded"}));
      } else {
        var data = response.data;
        props.setAgreementsQuantity(data);
        // console.log(data);
      }
    });

    GetService.request(
      ConnectionConfig.ServerUrl + "Lot/GetQuantity"
    ).then((response) => {
      if (response.data === null) {
        props.setBadRequest(({show: true, message: "lots quantity weren't loaded"}));
      } else {
        var data = response.data;
        props.setLotsQuantity(data);
        // console.log(data);
      }
    });
  
    GetService.request(
      ConnectionConfig.ServerUrl + "Bid/GetQuantity"
    ).then((response) => {
      if (response.data === null) {
        props.setBadRequest(({show: true, message: "bids quantity weren't loaded"}));
      } else {
        var data = response.data;
        props.setBidsQuantity(data);
        // console.log(data);
      }
    });

    GetService.request(
      ConnectionConfig.ServerUrl + "Lot/GetAverageViewsPerLot"
    ).then((response) => {
      if (response.data === null) {
        props.setBadRequest(({show: true, message: "average views per lot quantity weren't loaded"}));
      } else {
        var data = response.data;
        props.setAverageViewsPerLot(data);
        // console.log(data);
      }
    });
}

export default LoadStatisticServices