import axios from "axios";
import { DetailedLot } from "../../../../Components/Types/Lot";
import ConnectionConfig from "../../../../Assets/jsonData/ConnectionConfig/ConnectionConfig.json";

interface LoadDetailLotInfoServiceProps {
  lotId: string;
  setLotInfo: (arg: DetailedLot) => void;
  setDataLoading: (arg: any) => void;
}

function LoadDetailLotInfoService(props: LoadDetailLotInfoServiceProps) {
  props.setDataLoading((prev: any) => ({
    ...prev,
    isLoading: true,
    requests: true,
    inProgress: true,
  }));
  axios
    .get(
      `${
        ConnectionConfig.ServerUrl +
        ConnectionConfig.Routes.Lot.GetLotById +
        "?LotId=" +
        props.lotId
      }`
    )
    .then((responce) => {
      var data = responce.data;
      //console.log(data)
      if (data != null) {
        props.setLotInfo(data);
      }
    })
    .catch((e) => {
      console.log(e);
    });
}

export default LoadDetailLotInfoService;
