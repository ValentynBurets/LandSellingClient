import React, { useState } from "react"
import { DetailedLot } from "../../../../../Components/Types/Lot";
import { RequestResult } from "../../../../../Components/Types/RequestResult";
import TableElement from "./TableElement";

interface TbodyProps {
  bodyData : DetailedLot[];
  setGoodRequest: (arg: RequestResult) => void;
  setBadRequest: (arg: RequestResult) => void;
}

function Tbody(props: TbodyProps) {
  const [isSelected, setIsSelected] = useState<string>("");

  return (
    <tbody>
      {props.bodyData && props.bodyData.map((elem: DetailedLot, index: number) => (
        <TableElement
          elementData={elem}
          key={index}
          index={index}
          isSelected={isSelected}
          setIsSelected={setIsSelected}
          setGoodRequest={props.setGoodRequest}
          setBadRequest={props.setBadRequest}
        />
      ))}
    </tbody>
  );
}

export default Tbody;