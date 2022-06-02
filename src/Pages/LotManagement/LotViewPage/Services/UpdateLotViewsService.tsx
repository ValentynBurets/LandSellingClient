import axios from "axios";
import ConnectionConfig from "../../../../Assets/jsonData/ConnectionConfig/ConnectionConfig.json";

interface UpdateLotViewsServiceProps {
  lotId: string;
}

function UpdateLotViewsService(props: UpdateLotViewsServiceProps) {
  axios
    .put(
      `${
        ConnectionConfig.ServerUrl +
        ConnectionConfig.Routes.Lot.Viewed +
        "?LotId=" +
        props.lotId
      }`
    )
    .then((responce) => {
      var data = responce.data;
      console.log(data);
    })
    .catch((e) => {
      console.log(e);
    });
}

export default UpdateLotViewsService;
