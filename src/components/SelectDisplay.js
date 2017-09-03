import React from "react";

export default ({data, ...props}) => {
  return (
    <div className="styled-select">
      <select {...props}>
        <option value={null}>Please choose and option</option>
        {data.map(item => <option key={item.id} value={item.id + ""}>{item.name}</option>)}
      </select>
      </div>
 )
}