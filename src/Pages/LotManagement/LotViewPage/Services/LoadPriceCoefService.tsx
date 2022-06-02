import axios from "axios";
import ConnectionConfig from "../../../../Assets/jsonData/ConnectionConfig/ConnectionConfig.json";
import { PriceCoef } from "../../../../Components/Types/PriceCoef";

interface LoadPriceCoefServiceProps {
  lotId: string;
  setPriceCoef: (arg: PriceCoef[]) => void;
}

function LoadPriceCoefService(props: LoadPriceCoefServiceProps) {
  axios
    .get(
      `${
        ConnectionConfig.ServerUrl +
        ConnectionConfig.Routes.PriceCoef.GetAllPriceCoefByLotId +
        "?LotId=" +
        props.lotId
      }`
    )
    .then((responce) => {
      var data = responce.data;
      //console.log(data)
      if (data != null) {
        props.setPriceCoef(data);
      }
    })
    .catch((e) => {
      console.log(e);
    });
}

export default LoadPriceCoefService
