import ajax from "axios";
import React, {Component} from "react";
import equals from "is-equal-shallow"

const request = ajax.create({
  baseURL: 'https://peaceful-cliffs-56332.herokuapp.com',
});



export default (endpoint, WrappedComponent) => {
  return class extends Component{
    constructor(){
      super();
      this.state = {
        data: []
      }
    }
    requestData = ({params = {}}) => {
      request.get(endpoint, {
        params
      }).then(({data}) => {
        this.setState({
          data
        })
      }).catch(console.log)
    }
    componentWillMount(){
      this.requestData(this.props)
    }
    componentWillReceiveProps({params = {}}){
      const {params: currentParams = {}} = this.props
      if(!equals(currentParams, params)){
        this.requestData({params});
      }
    }
    render() {
      const {params, ...restProps} = this.props
      return <WrappedComponent {...restProps} {...this.state}/>
    }
  }
}