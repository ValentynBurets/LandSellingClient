const encodeFile = (file, addLotPictureToArr) => {
  var reader = new FileReader();
  if (file) {
      reader.readAsDataURL(file);
      reader.onload = () => {
          let dataURI = reader.result;
          let encodedFile = split(dataURI)
          let imageId = Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);

          addLotPictureToArr({picture: encodedFile, id: imageId});
      };
      reader.onerror = (error) => {
          console.log("error: ", error);
      };
  }
};

const split = (string) =>{
  const words = string.split('base64');
  return words[1].substring(1);
}

export default encodeFile