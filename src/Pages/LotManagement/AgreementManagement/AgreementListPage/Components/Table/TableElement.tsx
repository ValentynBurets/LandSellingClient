import Button from "react-bootstrap/Button";
import LinkConfig from "../../../../../../Assets/jsonData/LinkConfig/LinkConfig.json";

import { Link } from "react-router-dom";
import { TableAgreement } from "../../../../../../Components/Types/Agreement";

interface TableElementProps {
  index: number;
  elementData: TableAgreement;
  setApproveState: () => void;
  setDisApproveState: () => void;
  setAgreementNumber: (arg: number) => void;
}

function TableElement(props: TableElementProps) {
  const disApproveToggleShow = (number: number) => {
    props.setDisApproveState();
    props.setAgreementNumber(number);
  };

  const approveToggleShow = (number: number) => {
    props.setApproveState();
    props.setAgreementNumber(number);
  };
  return (
    <tr className="align-middle text-center">
      <td>{props.elementData.number}</td>
      <td>
        {props.elementData && props.elementData.lotId && (
          <Link
            to={{
              pathname:
                LinkConfig.lot_management.lot + `/${props.elementData.lotId}`,
              state: { lotId: `${props.elementData.lotId}` },
            }}
          >
            {" "}
            Lot
          </Link>
        )}
      </td>
      <td>
        {props.elementData && props.elementData.customerId && (
          <Link
            to={{
              pathname:
                LinkConfig.person.profile + `/${props.elementData.customerId}`,
              state: { lotId: `${props.elementData.customerId}` },
            }}
          >
            {" "}
            Customer{" "}
          </Link>
        )}
      </td>
      <td>{props.elementData.description}</td>
      <td>{props.elementData.status}</td>
      <td>
        {props.elementData.creationDate
          .substring(0, props.elementData.creationDate.indexOf("."))
          .replace("T", " ")}
      </td>
      <td>
        {props.elementData.startDate
          .substring(0, props.elementData.startDate.indexOf("."))
          .replace("T", " ")}
      </td>
      <td>
        {props.elementData.endDate
          .substring(0, props.elementData.endDate.indexOf("."))
          .replace("T", " ")}
      </td>
      <td>
        <Button
          onClick={() =>
            !props.elementData.isApprove ? approveToggleShow(props.index) : null
          }
          variant="dark"
          disabled={props.elementData.isDisApprove ? true : false}
        >
          Approve
        </Button>
      </td>
      <td>
        <Button
          onClick={() =>
            !props.elementData.isDisApprove
              ? disApproveToggleShow(props.index)
              : null
          }
          variant="dark"
          disabled={props.elementData.isApprove ? true : false}
        >
          Disapprove
        </Button>
      </td>
    </tr>
  );
}

export default TableElement;
