import React, { useState } from "react"
import { DetailedLot } from "../../../../../Components/Types/Lot";
import TableElement from "./TableElement";

interface TbodyProps {
  bodyData : DetailedLot[]
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
        />
      ))}
    </tbody>
  );
}

export default Tbody;