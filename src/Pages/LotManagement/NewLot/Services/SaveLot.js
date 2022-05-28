import axios from "axios";
import ConnectionConfig from "../../../../Assets/jsonData/ConnectionConfig.json";

const saveLot = (lotData, setLotId) => {
  if (lotData == null) {
    alert("Please add text to the text box to create a new lot");
    return;
  }

  let token = localStorage.getItem("token");
  axios
    .post(
      `${
        ConnectionConfig.ServerUrl + ConnectionConfig.Routes.Lot.CreateNewLot
      }`,
      lotData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    .then((responce) => {
      var data = responce.data;
      setLotId(data);
      console.log(data);
    })
    .catch((e) => {
      console.log(e);
      alert(e);
    });
};

export default saveLot;
