import React, { Component } from 'react'

class CategoryOptionComponent extends Component{
    constructor(props) {
        super(props)
    }
    componentWillMount() {
        this.setState({isSelected: false});
    }
    handleClick(e){
        var isSelected = !this.state.isSelected;
        this.setState({isSelected: isSelected});
        this.props.handleClick(isSelected, this.props.info)
    }
    render(){
        let className = "option";
        if(this.props.info === 'Beverage'){
            className += " beverage"
        }else if(this.props.info === "Sports"){
            className += " sports"
        }
        className += this.state.isSelected ? " selected" : ""
        return (
            <div className={className} onClick={this.handleClick.bind(this)}>
                <i className="fa fa-check"></i>
                <img src={this.props.img}/>
                <div className="info">{this.props.info}</div>
            </div>
        )
    }
}

export default CategoryOptionComponent
