import axios from "axios";
import ConnectionConfig from "../../../../Assets/jsonData/ConnectionConfig/ConnectionConfig.json";
import { CreateAgreement } from "../../../../Components/Types/Agreement";

interface CreateNewAgreementServiceProps {
  agreement: CreateAgreement;
}

function CreateNewAgreementService(props: CreateNewAgreementServiceProps) {
  let token = localStorage.getItem("token");
  axios
    .post(
      `${ConnectionConfig.ServerUrl + ConnectionConfig.Routes.Agreement.Create}`,
      props.agreement,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    .then((responce) => {
      var data = responce.data;
      console.log(data)
    })
    .catch((e) => {
      console.log(e);
    });
}

export default CreateNewAgreementService;
