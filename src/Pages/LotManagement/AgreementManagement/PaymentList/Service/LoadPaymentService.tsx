import axios from "axios";
import { Payment } from "../../../../../Components/Types/Payment";
import ConnectionConfig from "../../../../../Assets/jsonData/ConnectionConfig/ConnectionConfig.json";

interface LoadPaymentProps{
  setPayments: (arg: Payment[]) => void,
  agreementId: string;
}

const LoadPaymentService = (props: LoadPaymentProps) => {
  let token = localStorage.getItem("token");
  
  axios
    .get(
      `${ConnectionConfig.ServerUrl + ConnectionConfig.Routes.Payment.GetByAgreementId +
      "?agreementId=" +
      props.agreementId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    .then((responce) => {
      var data = responce.data;
      //console.log(data)
      if (data != null) {
        props.setPayments(data);
      }
    })
    .catch((e) => {
      console.log(e);
    }); 
  }

export default LoadPaymentService
