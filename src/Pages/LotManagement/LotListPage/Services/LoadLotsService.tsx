import axios from "axios";
import ConnectionConfig from "../../../../Assets/jsonData/ConnectionConfig/ConnectionConfig.json";
import {SimpleLot} from "../../../../Components/Types/Lot"

interface LoadServiceProps{
  selectedParams: any,
  setLots: (arg: SimpleLot[]) => void,
  setDataLoading: (arg: any) => void
}

const LoadLotsService = (props: LoadServiceProps) => {
  props.setDataLoading((prev: any) => ({
    ...prev,
    isLoading: true,
    requests: true,
    inProgress: true,
  }));
  
  axios
    .post(
      `${ConnectionConfig.ServerUrl + ConnectionConfig.Routes.Lot.Get}`,
      props.selectedParams
    )
    .then((responce) => {
      var data = responce.data;
      //console.log(data)
      if (data != null) {
        props.setLots(data);
      }
    })
    .catch((e) => {
      console.log(e);
    }); 

    props.setDataLoading((prev: any) => ({
      ...prev,
      isLoading: false,
      requests: false,
      inProgress: false,
    }));
  }

export default LoadLotsService
