import React, { Component , PropTypes } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

const LIST_CLASS_PREFIX = 'yj-suggestion-list'
const ITEM_CLASS_PREFIX = 'yj-suggestion-item'



class SuggestionListContainer extends React.Component {
  constructor (props) {
    super(props)
    this.updateSuggestionList = this.updateSuggestionList.bind(this)
    this.browseAlternativeItems = this.browseAlternativeItems.bind(this)
  }

  componentWillMount() {
    this.setInitialState()
  }

  setInitialState() {
    this.setState({dirty: false})
  }

  componentWillReceiveProps(nextProps) {
    const { suggestionList } = nextProps
    this.setState({suggestionList: suggestionList})
  }

  renderSuggestionItems(items, itemCardType) {
    return items.map((item, index) => {
      return (
        <div key={index}>
          { this.renderSuggestionItem(item, index, itemCardType) }
          { this.renderAlternativeItems(item, index, itemCardType) }
        </div>
      )
    })
  }

  getItemClasses(className, itemCardType) {
    return [`${ITEM_CLASS_PREFIX}-${className}`, itemCardType].join(' ')
  }

  getListClasses(className) {
    return `${LIST_CLASS_PREFIX}-${className}`
  }

  renderAlternativeItems(item, index, itemCardType) {
    const containerClasses = this.getItemClasses('container', itemCardType)
    return true ? null : (
      <div className={containerClasses}>
        abcdefg
      </div>
      )
  }

  renderSuggestionItem(item, index, itemCardType) {
    const { data, price, query, count } = item
    itemCardType = itemCardType === 'thumbnail' ? 'thumbnail' : 'tile'
    const containerClasses = this.getItemClasses('container', itemCardType)
    const nameClasses = this.getItemClasses('name', itemCardType)
    const imageClasses = this.getItemClasses('image', itemCardType)
    const priceClasses = this.getItemClasses('price', itemCardType)
    return item.not_found ? null : (
       <div className={containerClasses}>
         <img className={imageClasses} src={data.images.thumbnail} />
         <div className={nameClasses}>{data.name}</div>
         <div className={priceClasses}>{price ? `$${price.list}` : 'Price not available'}</div>
         { this.renderAmountEdit(index, count, itemCardType) }
       </div>
    )
  }

  renderAmountEdit(index, count, itemCardType) {
    if ( itemCardType !== 'tile' ) { return null }
    const editClasses = this.getItemClasses('edit', itemCardType)
    const editButtonClasses = this.getItemClasses('edit-button', itemCardType)
    const changeButtonClasses = this.getItemClasses('change-button', itemCardType)
    const countClasses = this.getItemClasses('edit-count', itemCardType)
    const addOne = () => { this.updateSuggestionList(index, count+1) }
    const subtractOne = () => { this.updateSuggestionList(index, Math.max(0, count-1)) }
    const changeItem = (event) => { this.browseAlternativeItems(index) }
    return (
      <div className={editClasses}>
        <button className={editButtonClasses} onClick={subtractOne}>-</button>
        <input className={countClasses} type="text" onChange={() => {}} value={count} disabled/>
        <button className={editButtonClasses} onClick={addOne}>+</button>
        <button className={changeButtonClasses} onClick={changeItem}>Change</button>
      </div>
    )
  }

  updateSuggestionList(itemIndex, newCount) {
    const suggestionList = this.getSuggestionList()
    suggestionList[itemIndex].count = newCount
    this.setState({
      suggestionList: suggestionList,
      dirty: true
    })
  }

  browseAlternativeItems(itemIndex) {
    const suggestionList = this.getSuggestionList()
    const query = suggestionList[itemIndex].query
    console.log(['browseAlternativeItems', itemIndex, query])

  }

  getSuggestionList() {
    return this.state.dirty ? this.state.suggestionList : this.props.suggestionList
  }

  render() {
    const suggestionList = this.getSuggestionList()
    const listContainerClasses = this.getListClasses('container')
    const listTitleClasses = this.getListClasses('title')
    const title = "We've put together a shopping list for you"
    return (
      <div className={listContainerClasses}>
        <h3 className={listTitleClasses}>{title}</h3>
        {this.renderSuggestionItems(suggestionList, 'thumbxnail')}
      </div>
    );
  }
}

SuggestionListContainer.contextTypes = {
  router: React.PropTypes.object.isRequired 
};

SuggestionListContainer.propTypes = {
  children: PropTypes.object
}

function mapStateToProps(state) {
  const { suggestionList } = state.SuggestionListReducer
  return {
    suggestionList
  };
}

export default connect(mapStateToProps)(SuggestionListContainer)