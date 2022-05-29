import axios from "axios";
import ConnectionConfig from "../../../../Assets/jsonData/ConnectionConfig.json";

const SaveImages = (lotPictures, lotId) => {
  if (lotPictures == null) {
    alert("Please upload the images for lot");
    return;
  }

  let token = localStorage.getItem("token");

lotPictures.map( item => {
  let image = {
    'lotId': lotId,
    'imageData': item.picture
  };
  console.log('image', image);

  axios
    .post(
      `${
        ConnectionConfig.ServerUrl + ConnectionConfig.Routes.Image.Create
      }`,
      image,
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

})
};

export default SaveImages;