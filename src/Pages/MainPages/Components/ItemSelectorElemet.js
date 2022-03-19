import React, { Component } from 'react'

export default function ItemSelectorElement(props) {
  return (
    <label className='form-check'>
      <input
        type={props.type}
        className='form-check-input'
        value={props.id}
        name='exampleRadio'
      />
      <span className='form-check-label'>{props.body}</span>
    </label>
  )
}
