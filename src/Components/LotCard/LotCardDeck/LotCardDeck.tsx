import { Container } from "react-bootstrap";
import LotCard from "../LotCard/LotCard";
import { SimpleLot } from "../../Types/Lot/Lot";

interface TaskCardDeckProps {
  lots: SimpleLot[];
}

export default function TaskCardDeck(props: TaskCardDeckProps) {
  return (
    <Container className="TaskList">
      {props.lots?.map((lot: SimpleLot) => (
        <LotCard key={lot.id} lot={lot} />
      ))}
    </Container>
  );
}
