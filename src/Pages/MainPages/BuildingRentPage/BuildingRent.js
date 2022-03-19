import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

//import OneItemSelector from '../Components/OneItemSelector'
//import RangeSelectorElement from '../Components/RangeSelectorElement'
//import MultiItemSelector from '../Components/MultiItemSelector'
import LotCardsDeck from '../Components/LotCardsDeck'
//import LotCard from '../Components/LotCard'
import RentSortType from './RentSortType'

import http from '../../../http-common'

function BuildingRent() {
  //let sortedLots = new

  const [lots, setLots] = useState({
    isLoading: true,
    lotsData: null,
  })

 // const [sort, setSort] = useState()

  useEffect(() => {
    http
      .get('/Lot')
      .then((responce) => {
        var data = responce.data
        if (data != null) {
          setLots({ isLoading: false, lotsData: data })
        } else {
          setLots({
            isLoading: false,
            lotsData: Array.from(data),
          })
        }
      })
      .catch((e) => {
        setLots({ isLoading: false, lotsData: null })
        console.log(e)
      })
    //console.log(typeof lots.lotsData)
  }, [setLots])
  var get = ()=> {http
      .get(`/RentHouses?sorted=true&sortType=${sortType22}`)
      .then((responce) => {
        var data = responce.data
        if (data != null) {
          setLots({ isLoading: false, lotsData: data })
        } else {
          setLots({
            isLoading: false,
            lotsData: Array.from(data),
          })
        }
        console.log(responce);
      })
      .catch((e) => {
        setLots({ isLoading: false, lotsData: null })
        console.log(e)
      })
    console.log(lots)
    }


  // let handleSort = (e) => {
  //   this.setState({ sort: e.target.value })
  // }
var getRows = ()=>{
    if(lots.lotsData != null && !lots.isLoading){
      return <Row>
      <Col lg={9}>
        <LotCardsDeck id='lots-list' postArray={lots.lotsData} />
      </Col>
    </Row>
  }
  return <Container></Container>}
  // let handleCitySelect = (e) => {
  //   this.setState({ city: e.target.value })
  //   console.log(e.target.value)
  // }
   const [sortType22, setSortType] = useState(null);
  return (
    <>
      <Container borderStyle='solid'>
        <h2 className='text-center m-4'>ALL OFFERS</h2>
        <label
          style={{ textAlign: 'center', display: 'block' }}
          className='text m-4'
        >
          "Choose your best house and live happy! :)))"
        </label>
        <select
          defaultValue='City'
          aria-label='Default select example'
          onChange={()=>{
            setSortType(RentSortType.City);
            get()}
          }
          style={{ float: 'right' }}
        >
          <option value='Name' select>
            Name
          </option>
          <option value='High-to-low'>From high to low</option>
          <option value='Low-to-high'>From low to high</option>
        </select>
        <h6>Filters:</h6>
         {getRows()}
      </Container>
    </>
  )
        }
export default BuildingRent
