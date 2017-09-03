import React from "react";
import { DragSource, DropTarget } from 'react-dnd';
import compose from "lodash/flowRight"

const getArrow = (number) => {
  if(number > 0){
    return <span className="arrow">&#8593;</span>
  } else if (number < 0) {
    return <span className="arrow">&#8595;</span>
  }
  return null;
}

const cardSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index,
    };
  },
};

const cardTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    if (dragIndex === hoverIndex) {
      return;
    }

    // Time to actually perform the action
    props.moveCard(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  },
};

const StatCard = ({title, value, percentageChange, connectDragSource, connectDropTarget, isDragging}) => {
  const classes = isDragging ? "stat-card dragging" : "stat-card"
  return connectDragSource(connectDropTarget((
    <div className={classes}>
      <h3>{title}</h3>
      <div className="stat-card-value">{value}</div>
      <div className={percentageChange > 0 ? "stat-card-percentage green" : "stat-card-percentage red"}>{percentageChange}% {getArrow(percentageChange )}</div>
    </div>
  )))
}



export default compose(
  DropTarget("StatCard", cardTarget, connect => ({
    connectDropTarget: connect.dropTarget(),
  })),
  DragSource("StatCard", cardSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }))
)(StatCard);
