import axios from "axios";
import ConnectionConfig from "../../../../Assets/jsonData/ConnectionConfig/ConnectionConfig.json";

interface SelectPriceCoefServiceProps {
  priceCoefId: string;
}

function SelectPriceCoefService(props: SelectPriceCoefServiceProps) {
  let token = localStorage.getItem("token");
  axios
    .put(
      `${
        ConnectionConfig.ServerUrl +
        ConnectionConfig.Routes.PriceCoef.Select +
        "?PriceCoefId=" +
        props.priceCoefId
      }`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    .then((responce) => {
      var data = responce.data;
      console.log(data);
    })
    .catch((e) => {
      console.log(e);
    });
}

export default SelectPriceCoefService;
