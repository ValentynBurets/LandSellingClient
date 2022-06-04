import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Card, Row, Col } from "react-bootstrap";
import Coll from "react-bootstrap/Col";

import LinkConfig from "../../../Assets/jsonData/LinkConfig/LinkConfig.json";
import { SimpleLot } from "../../Types/Lot";
import { LotImage } from "../../Types/LotImage";
import LotImageCarousel from "../../Image/ImageCarousel/LotImageCarousel";
import LoadImagesService from "./Service/LoadImagesService";
import style from "./LotCardStyle.module.sass";
import React from "react";

interface lotCardProps {
  lot: SimpleLot;
}

export default function LotCard(props: lotCardProps) {
  let history = useHistory();
  const [imageArray, setImageArray] = useState<LotImage[]>([]);

  const viewLot = () => {
    history.push({
      pathname: LinkConfig.lot_management.lot + `/${props.lot.id}`,
      state: { lotId: `${props.lot.id}` },
    });
  };

  const lot = props.lot;

  let d = new Date(lot.publicationDate);
  let ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
  let mo = new Intl.DateTimeFormat("en", { month: "short" }).format(d);
  let da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);

  useEffect(() => {
    if (props.lot.id) {
      LoadImagesService({
        lotId: props.lot.id,
        setImageArray: (arg: LotImage[]) => {
          setImageArray(arg);
        },
      });
    }
  }, [props.lot]);

  console.log(props.lot);

  return (
    <Card
      bg=""
      border="success"
      style={{    
        backgroundColor: "RGB(250, 250, 250, 0.823)",
        margin: "1em", 
        marginLeft: "auto", 
        marginRight: "auto", 
        textAlign: "center",   
        borderRadius: "20px"
      }}
      onClick={viewLot}
    >
      <Row>
        <Col>
          {imageArray && imageArray.length > 0 && (
            <LotImageCarousel imgArray={imageArray} />
          )}
        </Col>
        <Coll className={style.card_col_block}>
          <Card.Title style={{fontSize: "30px"}}>{lot.header}</Card.Title>
          <Card.Text className="ml-3">
            {"Publiction date: " + `${da} ${mo} ${ye}`}
          </Card.Text>
          <Card.Text style={{fontSize: "20px"}} className="ml-3">
            {lot.isAuction ? "Auction" : lot.isRent && "Rent"}
          </Card.Text>
          <Card.Text style={{fontSize: "20px"}} className="ml-3">
            {lot.isAuction && "Buy price: " + lot.buyPrice}
          </Card.Text>
          <Card.Text className="ml-3">
            {lot.location &&
              lot.location.region +
                " " +
                lot.location.city +
                " " +
                lot.location.street}
          </Card.Text>
        </Coll>
      </Row>
    </Card>
  );
}
