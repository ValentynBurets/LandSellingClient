import axios from "axios";
import React from "react"
import { UpdateLot } from "../../../../Components/Types/Lot";
import ConnectionConfig from "../../../../Assets/jsonData/ConnectionConfig/ConnectionConfig.json";


interface IUpdateLotDataProps{
  lotData: UpdateLot;
  lotId: string;
}

function UpdateLotData(props: IUpdateLotDataProps){
  let token = localStorage.getItem("token");
  
  axios
  .put(
    `${
      ConnectionConfig.ServerUrl +
      ConnectionConfig.Routes.Lot.Update
    }`,
    props.lotData,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  )
  .then((responce) => {
    var data = responce.data;
    //console.log(data)
    
  })
  .catch((e) => {
    console.log(e);
  });
}

export default UpdateLotData