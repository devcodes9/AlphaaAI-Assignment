import React from 'react'
import '../App.css'

export const IAlphaaChart = (props) => {

    var prof = props.profDiff;
    var profitSum = 0;
    prof?.map((ele) => {
      profitSum += ele.prof;
    })

    var loss = props.lossDiff;
    var lossSum = 0;
    loss?.map((ele) => {
      lossSum += ele.loss;
    })


  return (
    // <div>
    //   <h1>Summary</h1>
    //   <ul><b>Profit:</b></ul>
    //   <li>{profitSum}</li>
    //   <ul><b>Loss:</b></ul>
    //   <li>{lossSum}</li>
    //   <ul><b>Net Change:</b></ul>
    //   <li>{Number((profitSum + lossSum).toFixed(2))}</li>
    // </div>
    <div>
      <div className='net'><h4>Net Change</h4></div>
      <div className='summary'>
      <div className='items'>
        <p>Profit</p>
        <p>{Number(profitSum.toFixed(2))}</p>
      </div>
      <div className='items'>
        <p>Loss</p>
        <p>{Number(lossSum.toFixed(2))}</p>
      </div>
      <div className='items'>
        <p>Net</p>
        <p>{Number((profitSum + lossSum).toFixed(2))}</p>
      </div>
      </div>
    </div>
  )
}

