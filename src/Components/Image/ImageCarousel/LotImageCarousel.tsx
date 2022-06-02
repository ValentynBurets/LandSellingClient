import { SetStateAction, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";
import style from "./LotImageCarouselStyle.module.sass";
import {LotImage} from "../../Types/LotImage"

interface LotImageCarouselProps {
  imgArray: LotImage[];
}

function LotImageCarousel(props: LotImageCarouselProps) {
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex: SetStateAction<number>, e: any) => {
    setIndex(selectedIndex);
  };

  //console.log(props.imgArray);
  
  return (
    <div className={style.CardImageStyle} >
      <Carousel
        indicators={true}
        interval={3000}
        slide={true}
        touch={true}
        activeIndex={index}
        onSelect={handleSelect}
      >
        {props?.imgArray?.map((img, i) => {
          return (
            <Carousel.Item key={i}>
              <Image
                style={{marginLeft: "auto", 
                  marginRight: "auto", 
                  textAlign: "center",
                  height: "20rem",
                  padding: "1%",
                  width: "30rem" }}
                key={img.id}
                fluid={true}
                src={"data:image/jpg;base64, " + img.picture}
                alt="picture"
              />
            </Carousel.Item>
          );
        })}
      </Carousel>
    </div>
  );
}

export default LotImageCarousel;
