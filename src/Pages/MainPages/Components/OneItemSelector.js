import React from 'react'

export default function OneItemSelector(props) {
  return (
    <div onChange={props.onChangeValue}>
      {props.postArray.map((post, index) => {
        return (
          <label className='form-check'>
            <input
              type='radio'
              className='form-check-input'
              value={post.id}
              name='exampleRadio'
            >
              {post.name}
            </input>
          </label>
        )
      })}
    </div>
  )
}
