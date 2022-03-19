// import React from 'react'

// export default function MultiItemSelector(props) {
//   return (
//     <article class='card-group-item'>
//       <header class='card-header'>
//         <h6 class='title'>{props.Title}</h6>
//       </header>
//       <div class='filter-content'>
//         <div class='card-body' onChange={props.onChangeValue}>
//           <form>
//             {props.postArray.map((post, index) => {
//               return (
//                 <label class='form-check'>
//                   <input
//                     type='checkbox'
//                     class='form-check-input'
//                     value={post.id}
//                     name='exampleCheck'
//                   />
//                   <span class='form-check-label'>{post.name}</span>
//                 </label>
//               )
//             })}
//           </form>
//         </div>
//       </div>
//     </article>
//   )
// }

import React, { Component } from 'react'

export default class MultiItemSlector extends Component {
  render() {
    return (
      <article className='card-group-item'>
        <header className='card-header'>
          <h6 className='title'>{this.props.Title}</h6>
        </header>
        <div className='filter-content'>
          <div className='card-body' onChange={this.props.onChangeValue}>
            <form>
              {this.props.postArray.map((post, index) => {
                return (
                  <label className='form-check'>
                    <input
                      type='checkbox'
                      className='form-check-input'
                      value={post.id}
                      name='exampleCheck'
                    />
                    <span className='form-check-label'>{post.name}</span>
                  </label>
                )
              })}
            </form>
          </div>
        </div>
      </article>
    )
  }
}
