import React from "react"
import Arrow from "../assets/arrow.png";
import numeral from "numeral"

const getCurrency = (code) => {
  switch(code){
    case "JPY": 
      return "¥"
    case "CNY": 
      return "¥"
    case "EUR":
      return "€"
    default: 
      return "$"
  }
}

export default ({data}) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Use Cases/Campaigns</th>
          <th>Sent</th>
          <th>Open</th>
          <th>Open Rate%</th>
          <th>Sales</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => {
          return (
            <tr key={index}>
              <td><img alt=">" className="table-arrow" src={Arrow}/> {item.title}</td>
              <td>{numeral(item.sent).format('0,0')}</td>
              <td>{numeral(item.opened).format('0,0')}</td>
              <td>{numeral(item.opened / item.sent * 100).format('0,0.0[00000]')}</td>
              <td>{getCurrency(item.currency)}{numeral(item.sales).format('0,0')}</td>
            </tr>
          )}
        )}
      </tbody>
    </table>
  )
}
