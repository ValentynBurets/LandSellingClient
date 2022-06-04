import axios from "axios";
import ConnectionConfig from "../../../../Assets/jsonData/ConnectionConfig/ConnectionConfig.json";
import { Bid } from "../../../../Components/Types/Bid";

interface LoadBidsServiceProps {
  lotId: string;
  setBids: (arg: Bid[]) => void;
}

function LoadBidsService(props: LoadBidsServiceProps) {
  axios
    .get(
      `${
        ConnectionConfig.ServerUrl +
        ConnectionConfig.Routes.Bid.GetAllByLotId +
        "?LotId=" +
        props.lotId
      }`
    )
    .then((responce) => {
      var data = responce.data;
      //console.log(data)
      if (data != null) {
        props.setBids(data);
      }
    })
    .catch((e) => {
      console.log(e);
    });
}

export default LoadBidsService
