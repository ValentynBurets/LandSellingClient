//  import React from 'react'
//  import { CardDeck } from 'react-bootstrap'

//  import LotCard from './LotCard'

// export default function LotCardsDeck(props) {
//   return (
//     <CardDeck>
//       {props.postArray.map((post, index) => {
//         return (
//           <LotCard
//             Id={post.id}
//             Title={post.Address}
//             Description={post.Description}
//             Price={post.price}
//             Images={post.Images}
//             Square={post.Square}
//           />
//         )
//       })}
//     </CardDeck>
//   )
// }

import React, { Component } from 'react'

import { CardDeck } from 'reactstrap'

import LotCard from './LotCard'

export default class LotCardsDeck extends Component {
  render() {
    return (
      <CardDeck>
        {this.props.postArray.map((post) => {
          return (
            <LotCard
              id={post.id}
              title={post.model}
              user_name={post.user_name}
              publication_date={post.publication_date}
              lot_image={post.lot_image}
              description={post.description}
              square={post.square}
            />
          )
        })}
      </CardDeck>
    )
  }
}
