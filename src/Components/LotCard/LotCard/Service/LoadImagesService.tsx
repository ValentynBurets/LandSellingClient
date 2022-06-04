import axios from "axios";
import ConnectionConfig from "../../../../Assets/jsonData/ConnectionConfig/ConnectionConfig.json";
import { LotImage } from "../../../Types/LotImage";

interface LoadServiceProps {
  lotId: string;
  setImageArray: (arg: LotImage[]) => void
}

const LoadImagesService = (props: LoadServiceProps) => {

  axios
    .get(
      `${
        ConnectionConfig.ServerUrl +
        ConnectionConfig.Routes.Image.GetAllByLotId +
        "?LotId=" +
        props.lotId
      }`
    )
    .then((responce) => {
      var data = responce.data;
      //console.log(data)
      props.setImageArray(data);
    })
    .catch((e: any) => {
      console.log(e);
    });
};

export default LoadImagesService;
