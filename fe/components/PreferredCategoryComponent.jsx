import React, { Component } from 'react'
import CategoryOptionComponent from "./CategoryOptionComponent.jsx"
const data = {
    first: [
        {
            img: "/assets/vegetables.png",
            info: "Vegetables"
        },
        {
            img: "/assets/fruits.png",
            info: "Fruits"
        },
        {
            img: "/assets/meat.png",
            info: "Meat"
        },
        {
            img: "/assets/bakery.png",
            info: "Bakery"
        },
        {
            img: "/assets/seafood.png",
            info: "Seafood"
        },
        {
            img: "/assets/milk.png",
            info: "Milk & Cream"
        }
    ],
    second: [
        {
            img: "/assets/beverage.png",
            info: "Beverage"
        },
        {
            img: "/assets/snacks.png",
            info: "Snacks"
        },
        {
            img: "/assets/kitchen.png",
            info: "Kitchen & Tools"
        },
        {
            img: "/assets/toys.png",
            info: "Baby & Toys"
        },
        {
            img: "/assets/electronics.png",
            info: "Electronics"
        },
        {
            img: "/assets/sports.png",
            info: "Sports"
        },
    ]
}
class PreferredCategoryComponent extends Component{
    constructor(props) {
        super(props)
        this.handleOptionClick = this.handleOptionClick.bind(this)
    }
    componentWillMount() {
        this.setState({current_selected: 0})
    }
    handleOptionClick(isAdd, category){
        var current_selected = this.state.current_selected
        current_selected = isAdd ? current_selected + 1 : current_selected - 1
        if(current_selected >= 12) current_selected = 12
        if(current_selected <= 0) current_selected = 0
        this.setState({current_selected: current_selected})
        this.props.handleCategorySelect(isAdd, category)
    }
    renderRow(is_first_row){
        var row_data = is_first_row ? data['first'] : data['second']
        return (
            <div className="row">
                {row_data.map((row) => {
                    return <CategoryOptionComponent img={row.img} handleClick={this.handleOptionClick} info={row.info} key={row.info}/>
                })}
            </div>
            )
    }
    render(){
        return (
            <div className="select-categories">
                {this.renderRow(true)}
                {this.renderRow(false)}
                <div className="select-info">
                    You have selected <span className="count"> {this.state.current_selected} </span> categories
                </div>
            </div>
        )
    }
}

export default PreferredCategoryComponent
