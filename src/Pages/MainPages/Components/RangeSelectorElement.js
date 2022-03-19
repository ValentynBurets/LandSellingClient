import React from 'react'

export default function RangeSelectorElement(props) {
  return (
    <article className='card-group-item'>
      <header className='card-header'>
        <h6 className='title'>{props.Title}"</h6>
      </header>
      <div className='filter-content'>
        <div className='form-row' onChange={props.onChangeValue}>
          <div className='form-row' onChange={props.onChangeValue}>
            <div className='form-group col-md-6'>
              <label>{props.LeftBorder}</label>
              <input
                id='from'
                type={props.Type}
                className='form-control'
                placeholder={props.LeftPlaceholder}
              />
            </div>
            <div className='form-group col-md-6 text-right'>
              <label>{props.RightBorder}</label>
              <input
                id='to'
                type={props.Type}
                className='form-control'
                placeholder={props.RightPlaceholder}
              />
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
