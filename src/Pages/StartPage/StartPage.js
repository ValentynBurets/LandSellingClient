import React from 'react'
import style from './StartPage.module.sass'
import { SpecialButton } from './Component/HomeButtons/SpecialButton'

//import Image from "../../Assets/Images/green-fields.jpg"

function StartPage() {
  return (
    <div className={style.start_page}>
      <div className={style.start_page_cols}>
        <div className={style.present_col}>
          <div className={style.description}>
            <h1>LAND AND BUILDING</h1>
            <h5>Find you best offer for you with our service</h5>
          </div>
        </div>
        <div className={style.authorize_col}>
          <SpecialButton param='building' />
          <SpecialButton param='land' />  
        </div>
    </div>
    </div >
  )
}

export default StartPage


// <Container fluid className='start-page'>
// <Row>
//   <Col>
//     <h1>LAND AND BUILDING</h1>
//     <h5>Find you best offer for you with our service</h5>
//   </Col>
//   <Col>
//     <SpecialButton param='building' />
//     <SpecialButton param='land' />
//   </Col>
// </Row>
// <Row>
//   <h1> Our benefites... ... ... ... ...</h1>
// </Row>
// </Container>