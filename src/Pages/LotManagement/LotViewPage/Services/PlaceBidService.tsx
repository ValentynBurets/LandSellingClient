import axios from "axios";
import ConnectionConfig from "../../../../Assets/jsonData/ConnectionConfig/ConnectionConfig.json";
import { CreateBid } from "../../../../Components/Types/Bid";

interface PlaceBidServiceProps {
  bid: CreateBid;
}

function PlaceBidService(props: PlaceBidServiceProps): boolean {
  let token = localStorage.getItem("token");
  axios
    .post(
      `${ConnectionConfig.ServerUrl + ConnectionConfig.Routes.Bid.Create}`,
      props.bid,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    .then((responce) => {
      var data = responce.data;
      console.log(data)
      return true;
    })
    .catch((e) => {
      console.log(e);
      return false;
    });

  return true;
}

export default PlaceBidService;
