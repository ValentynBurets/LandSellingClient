import axios from "axios";
import ConnectionConfig from "../../../../Assets/jsonData/ConnectionConfig.json";

const saveLot = (priceCoefs, lotId) => {
  if (priceCoefs == null) {
    alert("Please add price coefs to create a new lot with rent option");
    return;
  }

  let token = localStorage.getItem("token");

  priceCoefs.map(item => {
    let singlePriceCoef = {
      "lotId": lotId,
      "daysCount": item.days,
      "value": item.cost
    }
    axios
    .post(
      `${
        ConnectionConfig.ServerUrl + ConnectionConfig.Routes.PriceCoef.Create
      }`,
      singlePriceCoef,
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
      alert(e);
    });
  });

  
  
};

export default saveLot;
