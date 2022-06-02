import React, { ReactNode } from "react";
import './PdfButton.css';

interface ModalButtonProps{
  onClick: (arg: any) => void;
  children: ReactNode;
}

export default function ModalButton(props: ModalButtonProps) {
    return(
        <div className='pdf-generator'>
            <div>
                <button className='pdf-btn' onClick={(e) => props.onClick(e)}>{props.children}</button>
            </div>
            <div className='pdf-generator-text'>Download .pdf file</div>
        </div>
    )
}
