import React from 'react'
import PropTypes from "prop-types";
import { Trans } from 'react-i18next';

import encodeFile from "../../Services/encodeFile";
import LotImageCarousel from "../../../../../Components/Image/ImageCarousel/LotImageCarousel";

import style from "./UploadImageStyle.module.sass";
import "./style.sass";

interface UploadImageProps {
  addLotPictureToArr: () => {};
  lotPictures: [];
}

function UploadImage(props: UploadImageProps) {
  const onFileChange = (event: any) => {
    encodeFile({
      file: event.target.files[0],
      addLotPictureToArr: props.addLotPictureToArr,
    });
  };

  return (
    <div className={style.pictureBox}  style={{ minHeight: "23rem" }}>
      <div>
        {props.lotPictures.length > 0 ? (
          <div>
            <LotImageCarousel imgArray={props.lotPictures} />
            <label className={style.custom_file_upload}>
              <input type="file" id="input" onChange={onFileChange} />
              <Trans i18nKey="Upload">Upload</Trans>
            </label>
          </div>
        ) : (
          <div style={{width: "500px", marginTop: "3rem", marginBottom: "3rem"}}>
          <label className={style.custom_file_upload}>
            <input type="file" id="input" onChange={onFileChange} />
            <Trans i18nKey="Upload">Upload</Trans>
          </label>
          </div>
        )}
      </div>
    </div>
  );
};

UploadImage.protoTypes = {
  setFileString: PropTypes.string,
};

export default UploadImage;
