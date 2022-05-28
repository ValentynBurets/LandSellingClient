interface encodeFileProps {
  file: any;
  addLotPictureToArr: (arg: { picture: string; id: string }) => {};
}

const encodeFile = (props: encodeFileProps) => {
  var reader = new FileReader();
  if (props.file) {
    reader.readAsDataURL(props.file);
    reader.onload = () => {
      let dataURI = reader.result as string;
      let encodedFile = split(dataURI);
      let imageId = Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);

      props.addLotPictureToArr({ picture: encodedFile, id: imageId });
    };
    reader.onerror = (error) => {
      console.log("error: ", error);
    };
  }
};

const split = (string: string) => {
  const words = string.split("base64");
  return words[1].substring(1);
};

export default encodeFile;
