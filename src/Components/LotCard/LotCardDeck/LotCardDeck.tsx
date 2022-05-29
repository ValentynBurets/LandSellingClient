import { Container} from "react-bootstrap";
import LotCard from "../LotCard/LotCard";

interface TaskCardDeckProps {
  lots: any;
}

export default function TaskCardDeck(props: TaskCardDeckProps) {
  return (
    <Container className="TaskList">
      {props.lots?.map((lot: any) => (
        <LotCard key={lot.id} lot={lot} />
      ))}
    </Container>
  );
}
