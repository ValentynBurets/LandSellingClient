import { useHistory } from "react-router-dom";
import { Card, Row, Col } from "react-bootstrap";
import Coll from "react-bootstrap/Col";

import LinkConfig from "../../../Assets/jsonData/LinkConfig/LinkConfig.json";
import SimpleLot from "../../Types/Lot/SimpleLot";

import "./TaskCardStyle.sass";

interface lotCardProps {
  lot: SimpleLot;
}

export default function LotCard(props: lotCardProps) {
  let history = useHistory();

  const viewLot = () => {
    history.push({
      pathname: LinkConfig.lot_management.lot + `/${props.lot.id}`,
      state: { lotId: `${props.lot.id}` },
    });
  };

  const lot = props.lot;
  const date = lot.publicationDate.split("T");

  console.log(lot);

  return (
    <Card
      bg=""
      border="success"
      className="cardTemplateStyle"
      onClick={viewLot}
    >
      <Row>
        <Col>
          <Card.Title>{lot.header}</Card.Title>
        </Col>
        <Coll className="ColBlock">
          <Card.Text className="ml-3">{"Publiction date: " + date}</Card.Text>
          <Card.Text className="ml-3">
            {lot.isAuction ? "Auction" : lot.isRent && "Rent"}
          </Card.Text>
          <Card.Text className="ml-3">
            {lot.isAuction && "Buy price: " + lot.buyPrice}
          </Card.Text>
        </Coll>
      </Row>
    </Card>
  );
}
