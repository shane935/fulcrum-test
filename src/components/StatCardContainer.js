import React, {Component} from "react";
import update from 'react/lib/update';
import StatCard from "./StatCard.js";
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';


class StatCardContainer extends Component {
  constructor(){
    super();
    this.state = {
      cards: [{
        id: 1,
        value: '9',
        title: 'Campaigns',
        percentageChange: 36
      },{
        id: 2,
        value: '89%',
        title: 'Open Rate %',
        percentageChange: 55
      },{
        id: 3,
        value: '23%',
        title: 'Exit Rate',
        percentageChange: -12
      }],
    };
  }

  moveCard = (dragIndex, hoverIndex) => {
    const { cards } = this.state;
    const dragCard = cards[dragIndex];
    this.setState(update(this.state, {
      cards: {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragCard],
        ],
      },
    }));
  }

  
  render() {
    return (
      <div className="overall-stats">
        {this.state.cards.map((card, index) => (
          <StatCard title={card.title}
                    value={card.value}
                    index={index}
                    key={card.id}
                    id={card.id}
                    moveCard={this.moveCard}
                    percentageChange={card.percentageChange}/>
        ))}
      </div>
    )
  }
}

export default DragDropContext(HTML5Backend)(StatCardContainer);
