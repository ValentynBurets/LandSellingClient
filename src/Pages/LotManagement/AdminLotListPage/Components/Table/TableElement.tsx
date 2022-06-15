import React, { useCallback, useState } from "react";
import Button from "react-bootstrap/Button";

import { Trans } from "react-i18next";
import { Link } from "react-router-dom";
import { DetailedLot, UpdateLot } from "../../../../../Components/Types/Lot";
import LinkConfig from "../../../../../Assets/jsonData/LinkConfig/LinkConfig.json";

import style from "./TableStyle.module.sass";

interface TableElementProps {
  index: number;
  elementData: DetailedLot;
  isSelected: string;
  setIsSelected: (arg: string) => void;
}

function TableElement(props: TableElementProps) {
  const lot = props.elementData;

  const [lotData, setLotData] = useState<UpdateLot>({
    ownerId: lot.ownerId,
    status: lot.status,
    header: lot.header,
    description: lot.description,
    buyPrice: lot.buyPrice,
    minBidPrice: lot.minBidPrice,
    minBidStep: lot.minBidStep,
    auctionDuration: lot.auctionDuration,
    isRent: lot.isRent,
    isAuction: lot.isAuction,
    location: lot.location,
  });

  const handleInputChangeFunction = (event: any) => {
    const { name, value } = event.target;
    console.log(name, value);
    setLotData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputChange = useCallback((value: any) => {
    handleInputChangeFunction(value);
  }, []);

  const Update = () => {
    UpdateLotData({ lotData: lotData, lotId: lot.id });
  };

  const Delete = () => {
    DeleteLotData({ lotId: lot.id });
  };

  return (
    <tr className="align-middle text-center">
      <td>
        {props.elementData && props.elementData.id && (
          <Link
            to={{
              pathname:
                LinkConfig.lot_management.lot + `/${props.elementData.id}`,
              state: { lotId: `${props.elementData.id}` },
            }}
          >
            Lot
          </Link>
        )}
      </td>
      <td>
        {props.elementData && props.elementData.ownerId && (
          <Link
            to={{
              pathname: "/profile" + `/${props.elementData.ownerId}`,
              state: { id: `${props.elementData.ownerId}` },
            }}
          >
            Owner
          </Link>
        )}
      </td>
      <td>
        <input
          type="header"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="headerHelp"
          name="header"
          value={lotData.header}
          onChange={(e) => {
            handleInputChange(e);
          }}
        />
      </td>
      <td>{props.elementData.status}</td>
      <td>
        <textarea
          style={{ minHeight: "8rem" }}
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="headerHelp"
          name="description"
          value={lotData.description}
          onChange={(e) => {
            handleInputChange(e);
          }}
        />
      </td>
      <td>{props.elementData.views}</td>
      <td>
        {props.elementData.publicationDate
          .substring(0, props.elementData.publicationDate.indexOf("."))
          .replace("T", " ")}
      </td>
      <td>
        <input
          type="header"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="headerHelp"
          name="buyPrice"
          value={lotData.buyPrice}
          onChange={(e) => {
            handleInputChange(e);
          }}
        />
      </td>
      <td>
        <input
          type="header"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="headerHelp"
          name="minBidPrice"
          value={lotData.minBidPrice}
          onChange={(e) => {
            handleInputChange(e);
          }}
        />
      </td>
      <td>
        <input
          type="header"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="headerHelp"
          name="minBidStep"
          value={lotData.minBidStep}
          onChange={(e) => {
            handleInputChange(e);
          }}
        />
      </td>
      <td>
        <input
          type="header"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="headerHelp"
          name="auctionDuration"
          value={lotData.auctionDuration}
          onChange={(e) => {
            handleInputChange(e);
          }}
        />
      </td>
      <td>{props.elementData.isRent ? "+" : "-"}</td>
      <td>{props.elementData.isAuction ? "+" : "-"}</td>
      <td>
        {`${props.elementData.location.region} ${props.elementData.location.city} ${props.elementData.location.house}`}
      </td>

      <td>
        <Button
          style={
            props.isSelected !== props.elementData.id
              ? { ...{ color: "white", backgroundColor: "#4287f5" } }
              : { ...{ color: "#4287f5", backgroundColor: "white" } }
          }
          onClick={() => {
            props.setIsSelected(props.elementData.id);
            Update();
          }}
        >
          <Trans i18nKey="Update">Update</Trans>
        </Button>
      </td>
      <td>
        <Button
          style={
            props.isSelected !== props.elementData.id
              ? { ...{ color: "white", backgroundColor: "#4287f5" } }
              : { ...{ color: "#4287f5", backgroundColor: "white" } }
          }
          onClick={() => {
            props.setIsSelected(props.elementData.id);
            Delete();
          }}
        >
          <Trans i18nKey="Delete">Delete</Trans>
        </Button>
      </td>
    </tr>
  );
}

export default TableElement;
function UpdateLotData(arg0: { lotData: UpdateLot; lotId: string }) {
  throw new Error("Function not implemented.");
}

function DeleteLotData(arg0: { lotId: string }) {
  throw new Error("Function not implemented.");
}
