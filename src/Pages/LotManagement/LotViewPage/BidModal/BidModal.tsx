import React, { ReactNode } from "react";
// import style from  "./BidModal.module.css";
// import {
//   Container,
//   Col,
//   Row,
//   Button,
//   InputGroup,
//   FormControl,
// } from "react-bootstrap";

// import accept from "../../../../Assets/Images/icons/accept.png"
// import decline from "../../../../Assets/Images/icons/decline.png"

interface IBidModalInterface{
  header: string;
  onClose: any;
  show: boolean;
  children: ReactNode;
  accept: (arg: boolean) => void;
}

const BidModal = (props:IBidModalInterface) => {

  if (!props.show) {
    return null;
  }
  return (
    <div>
      
    </div>
  );
};

export default BidModal;