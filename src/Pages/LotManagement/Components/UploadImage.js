import { 
  React, 
  useState,
  useEffect
} from "react";
import PropTypes from 'prop-types'
import picture from '../../../Assets/Images/picture.png'
import encodeFile from "../Services/encodeFile"
import './style.sass'
import LotImageCarousel from './ImageCarousel/LotImageCarousel'

const UploadImage = (props) => {

const onFileChange = (e) => {
  encodeFile(e.target.files[0], props.addLotPictureToArr);
};
useEffect(()=> {console.log("render component", props.lotPictures)}, [props])

return (
  <div className="PictureBox">
    <div>
      {props.lotPictures!== undefined && 
      <LotImageCarousel
        imgArray={props.lotPictures}
      />}
    </div>
    <input  type="file" id="input" onChange={onFileChange} />
  </div>
);
};

UploadImage.protoTypes = {
setFileString: PropTypes.string
}

export default UploadImage;