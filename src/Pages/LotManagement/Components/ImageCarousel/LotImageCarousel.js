import { React, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";
import style from "./Style.module.sass";

function LotImageCarousel(props) {
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  console.log(props.imgArray)
  return (
    <Carousel
      className={style.carouselStyle}
      variant={"dark"}
      indicators={true}
      interval={3000}
      slide={true}
      touch={true}
      activeIndex={index}
      onSelect={handleSelect}
    >
      {props.imgArray.map((img, i) => {
        return (
          <Carousel.Item key={i}>
            <Image
              key={img.id}
              fluid={true}
              className={style.CardImageStyle}
              src={"data:image/jpg;base64," + img.picture}
              alt="picture"
            />
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
}

export default LotImageCarousel;
