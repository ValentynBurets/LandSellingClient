import { TableAgreement } from "../../../../../../Components/Types/Agreement";
import TableElement from "./TableElement";

interface TbodyProps {
  bodyData: TableAgreement[];
  setApproveState: () => void;
  setDisApproveState: () => void;
  setAgreementNumber: (arg: number) => void;
}

function Tbody(props: TbodyProps) {
  return (
    <tbody>
      {props.bodyData && props.bodyData.map((elem: TableAgreement, index: number) => (
        <TableElement
          elementData={elem}
          key={index}
          setApproveState={props.setApproveState}
          setDisApproveState={props.setDisApproveState}
          setAgreementNumber={(arg: number) => {props.setAgreementNumber(arg)}}
          index={index}
        />
      ))}
    </tbody>
  );
}

export default Tbody;