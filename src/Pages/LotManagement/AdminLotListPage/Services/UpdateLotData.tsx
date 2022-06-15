import axios from "axios";
import React from "react"
import { UpdateLot } from "../../../../Components/Types/Lot";
import ConnectionConfig from "../../../../Assets/jsonData/ConnectionConfig/ConnectionConfig.json";


interface IUpdateLotDataProps{
  lotData: UpdateLot;
  lotId: string;
}

function UpdateLotData(props: IUpdateLotDataProps){

  axios
  .put(
    `${
      ConnectionConfig.ServerUrl +
      ConnectionConfig.Routes.Lot.Update
    }`,
    props.lotData
  )
  .then((responce) => {
    var data = responce.data;
    //console.log(data)
    
  })
  .catch((e) => {
    console.log(e);
  });
}


