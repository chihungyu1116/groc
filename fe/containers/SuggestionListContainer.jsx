import React, { Component , PropTypes } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

const LIST_CLASS_PREFIX = 'yj-suggestion-list'
const ITEM_CLASS_PREFIX = 'yj-suggestion-item'
const MAX_COUNT = 20


class SuggestionListContainer extends React.Component {
  constructor (props) {
    super(props)
    this.updateSuggestionList = this.updateSuggestionList.bind(this)
    this.browseAlternativeItems = this.browseAlternativeItems.bind(this)
    this.addToCart = this.addToCart.bind(this)
  }

  componentWillMount() {
    this.setInitialState()
  }

  setInitialState() {
    this.setState({dirty: false, addedToCart: false})
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

  renderSuggestionListSummary(items) {
    const totalPrice = this.getTotalPrice(items)
    const containerClasses = this.getListClasses('summary-container')
    const addToCartButtonClasses = this.getListClasses('add-to-cart-button')
    const cancelButtonClasses = this.getListClasses('cancel-button')
    const priceContainerClasses = this.getItemClasses('price-container')
    const priceTotalClasses = this.getItemClasses('price-total')
    return (
      <div className={containerClasses}>Total:
        <div className={priceContainerClasses}>
          <div className={priceTotalClasses}>${this.getTotalPrice(items)}</div>
        </div>
      </div>
    )
  }

  renderSuggestionListActions() {
    const containerClasses = this.getListClasses('summary-container')
    const addToCartButtonClasses = this.getListClasses('add-to-cart-button')
    const cancelButtonClasses = this.getListClasses('cancel-button')
    return (
      <div className={containerClasses}>
        <button className={cancelButtonClasses}>Not This Time</button>
        <button className={addToCartButtonClasses} onClick={this.addToCart}>Add to Cart</button>
      </div>
    )
  }

  getTotalPrice(items) {
    return items.reduce((previous, item) => { 
      return item.price.list * item.count + previous
    }, 0).toFixed(2)
  }

  getItemClasses(className, itemCardType) {
    itemCardType = itemCardType ? itemCardType : 'tile'
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
    return (
      <div className={containerClasses}>
        <img className={imageClasses} src={data.images.thumbnail} />
        <div className={nameClasses}>{data.name}</div>
        { this.renderAmountEdit(index, count, itemCardType) }
        { this.renderPrice(price.list, count) }
      </div>
    )
  }

  renderPrice(price, count) {
    const containerClasses = this.getItemClasses('price-container')
    const priceTotalClasses = this.getItemClasses('price-total')
    const priceEachClasses = this.getItemClasses(`price-each ${count === 1 ? 'yj-hidden' : ''}`)
    return price === undefined ? (<div className={containerClasses}>Price not available</div>) : (
      <div className={containerClasses}>
        <div className={priceTotalClasses}>{`$${(price * count).toFixed(2)}`}</div>
        <div className={priceEachClasses}>{`$${price} each`}</div>
      </div>
    )
  }

  renderAmountEdit(index, count, itemCardType) {
    if ( itemCardType !== 'tile' ) { return null }
    const editClasses = this.getItemClasses('edit')
    const editButtonClasses = this.getItemClasses('edit-button')
    const changeButtonClasses = this.getItemClasses('change-button')
    const countClasses = this.getItemClasses('edit-count')
    const addOne = () => { this.updateSuggestionList(index, Math.min(MAX_COUNT, count+1)) }
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

  addToCart() {
    console.log('add to cart')
    // does not really add to cart
    this.setState({addedToCart: true})
  }

  getSuggestionList() {
    const list = this.state.dirty ? this.state.suggestionList : this.props.suggestionList
    return list.filter((item) => { return !item.not_found })
  }

  renderSuggestionList() {
    const suggestionList = this.getSuggestionList()
    const listContainerClasses = this.getListClasses('container')
    const listTitleClasses = this.getListClasses('title')
    const title = "We've put together a shopping list for you"
    return (
      <div className={listContainerClasses}>
        <h3 className={listTitleClasses}>{title}</h3>
        {this.renderSuggestionItems(suggestionList, 'thumbxnail')}
        {this.renderSuggestionListSummary(suggestionList)}
        {this.renderSuggestionListActions()}
      </div>
    )
  }

  renderAddToCartConfirmation() {
    const listContainerClasses = this.getListClasses('container')
    return (
      <div className={listContainerClasses}>
        <div className="yj-add-to-cart-container">
          <div className="yj-add-to-cart-positioner">
            <div className="yj-add-to-cart-message">Items have been added to cart</div>
            <div className="yj-add-to-cart-button-list">
              <button className="yj-view-cart-button">
                View Cart <i className="fa fa-shopping-cart"></i>
              </button>
              <button className="yj-checkout-button">Check Out</button>
            </div>
          </div>
        </div>
      </div>      
    )
  }

  render() {
    const { addedToCart } = this.state
    return addedToCart ? this.renderAddToCartConfirmation() : this.renderSuggestionList()
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