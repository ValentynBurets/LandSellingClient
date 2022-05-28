import { useEffect } from "react";
import PropTypes from "prop-types";
import encodeFile from "../NewLot/Services/encodeFile";
import style from "./UploadImageStyle.module.sass";
import LotImageCarousel from "./ImageCarousel/LotImageCarousel";

interface UploadImageProps {
  addLotPictureToArr: () => {};
  lotPictures: [];
}

const UploadImage = (props: UploadImageProps) => {
  const onFileChange = (event: any) => {
    encodeFile({
      file: event.target.files[0],
      addLotPictureToArr: props.addLotPictureToArr,
    });
  };

  useEffect(() => {
    console.log("render component", props.lotPictures);
  }, [props]);
  console.log("props.lotPictures", props);

  return (
    <div className={style.pictureBox}>
      <div>
        {props.lotPictures.length > 0 ? (
          <div>
            <LotImageCarousel imgArray={props.lotPictures} />
            <input type="file" id="input" onChange={onFileChange} />  
          </div>
        ):
        <div
          className={style.uploadBoxStyle}
        >
          <input type="file" id="input" onChange={onFileChange} />  
        </div>
        }
      </div>
    </div>
  );
};

UploadImage.protoTypes = {
  setFileString: PropTypes.string,
};

export default UploadImage;
