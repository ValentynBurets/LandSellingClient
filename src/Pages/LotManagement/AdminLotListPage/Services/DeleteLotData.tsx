import axios from "axios";
import React from "react"
import ConnectionConfig from "../../../../Assets/jsonData/ConnectionConfig/ConnectionConfig.json";


interface IDeleteLotDataProps{
  lotId: string;
}

function DeleteLotData(props: IDeleteLotDataProps){

  let token = localStorage.getItem("token");
  
  axios
  .delete(
    `${
      ConnectionConfig.ServerUrl +
      ConnectionConfig.Routes.Lot.Delete +
      "?lotId=" +
      props.lotId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
  )
  .then((responce) => {
    //console.log(data)
  })
  .catch((e) => {
    console.log(e);
  });
}

export default DeleteLotData
