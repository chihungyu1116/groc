import React, { Component , PropTypes } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { fetchAlternativeItemsAct, suggestionListChangedAct } from '../actions/SuggestionListAction'

const LIST_CLASS_PREFIX = 'yj-suggestion-list'
const ITEM_CLASS_PREFIX = 'yj-suggestion-item'
const MAX_COUNT = 20
const ALTERNATIVE_ITEMS_COUNT = 5


class SuggestionListContainer extends React.Component {
  constructor (props) {
    super(props)
    this.updateSuggestionListCount = this.updateSuggestionListCount.bind(this)
    this.updateSuggestionListItem = this.updateSuggestionListItem.bind(this)
    this.browseAlternativeItems = this.browseAlternativeItems.bind(this)
    this.addToCart = this.addToCart.bind(this)
  }

  componentWillMount() {
    this.setInitialState()
  }

  setInitialState() {
    this.setState({dirty: false, addedToCart: false, showAlternativeItems: false})
  }

  componentWillReceiveProps(nextProps) {
    const { suggestionList, alternativeItems } = nextProps
    this.setState({suggestionList: suggestionList, showAlternativeItems: alternativeItems !== undefined})
  }

  renderSuggestionItems(items, itemCardType) {
    const containerClasses = this.getItemClasses('outer-container')
    return items.map((item, index) => {
      return (
        <div className={containerClasses} key={index}>
          { this.renderSuggestionItem(item, index, itemCardType) }
          { this.renderAlternativeItems(index, itemCardType) }
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
        <button className={cancelButtonClasses}><a href="">Not This Time</a></button>
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

  renderAlternativeItems(thisItemIndex, itemCardType) {
    const { alternativeItems } = this.props
    const { showAlternativeItems } = this.state
    if ( !showAlternativeItems || !alternativeItems || alternativeItems.index !==  thisItemIndex ) {
      const containerClasses = this.getItemClasses('alternative-container collapsed')
      return <div className={containerClasses}></div>
    } else {
      const { items } = alternativeItems
      const suggestionList = this.getSuggestionList()
      const noAlternatives = items.length === 1 && this.isSameItem(items[0], suggestionList[thisItemIndex])
      if ( noAlternatives ) {
        const containerClasses = this.getItemClasses('alternative-container empty')
        setTimeout(() => {
          this.setState({showAlternativeItems: false})
        }, 1000)
        return <div className={containerClasses}>Similar items are not found</div>
      } else {
        const containerClasses = this.getItemClasses('alternative-container')
        return (
          <div className={containerClasses}>
            { items.map((altItem, altItemIndex) => {
              return this.renderSuggestionItem(altItem, altItemIndex, 'thumbnail', thisItemIndex)
            }) }
          </div>
        )
      }
    }
  }

  renderSuggestionItem(item, index, itemCardType, originalItemIndex) {
    const { data, price, query, count } = item
    itemCardType = itemCardType === 'thumbnail' ? 'thumbnail' : 'tile'

    let isCurrentItem = false
    if ( originalItemIndex !== undefined ) {
      const suggestionList = this.getSuggestionList()
      isCurrentItem = this.isSameItem(item, suggestionList[originalItemIndex])
    }
    const containerClasses = this.getItemClasses(isCurrentItem ? `container current` : 'container', itemCardType)
    const nameClasses = this.getItemClasses('name', itemCardType)
    const imageClasses = this.getItemClasses('image', itemCardType)
    return (
      <div key={index} className={containerClasses}>
        <img className={imageClasses} src={data.images.thumbnail} />
        <div className={nameClasses}>{data.name}</div>
        { this.renderAmountEdit(index, count, itemCardType) }
        { this.renderPrice(price.list, count, itemCardType) }
        { this.renderSelectButton(item, originalItemIndex, itemCardType) }
      </div>
    )
  }

  isSameItem(itemA, itemB) {
    return itemA.data.id === itemB.data.id
  }

  renderSelectButton(item, indexToReplace, itemCardType) {
    if ( itemCardType !== 'thumbnail' ) { return null }
    const priceTotalClasses = this.getItemClasses('price-total', itemCardType)
    const selectAlternativeButtonClasses = this.getItemClasses('select-alternative-item-button', itemCardType)
    const chooseThis = () => {
      this.updateSuggestionListItem(indexToReplace, item)
    }
    return (
      <button className={selectAlternativeButtonClasses} onClick={chooseThis}>Choose</button>
    )
  }

  renderPrice(price, count, itemCardType) {
    const containerClasses = this.getItemClasses('price-container', itemCardType)
    const priceTotalClasses = this.getItemClasses('price-total', itemCardType)
    const showEachPrice = itemCardType === 'tile' && count > 1
    const priceEachClasses = this.getItemClasses(showEachPrice ? 'price-each' : 'price-each yj-hidden', itemCardType)
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
    const addOne = () => { this.updateSuggestionListCount(index, Math.min(MAX_COUNT, count+1)) }
    const subtractOne = () => { this.updateSuggestionListCount(index, Math.max(0, count-1)) }
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

  updateSuggestionListCount(itemIndex, newCount) {
    const suggestionList = this.getSuggestionList()
    suggestionList[itemIndex].count = newCount
    this.props.suggestionListChangedAct(suggestionList)
  }

  updateSuggestionListItem(itemIndex, newItem) {
    const suggestionList = this.getSuggestionList()
    suggestionList[itemIndex] = newItem
    this.props.suggestionListChangedAct(suggestionList)
  }

  browseAlternativeItems(itemIndex) {
    const suggestionList = this.getSuggestionList()
    const query = suggestionList[itemIndex].query
    this.props.fetchAlternativeItemsAct(itemIndex, query, ALTERNATIVE_ITEMS_COUNT)
  }

  addToCart() {
    // does not really add to cart
    this.setState({addedToCart: true})
  }

  getSuggestionList() {

    console.log('get suggestion list? ',this)
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
            <div className="yj-add-to-cart-message">Good news, items have been added to cart</div>
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
  const { suggestionList, alternativeItems } = state.SuggestionListReducer

  console.log('in suggestion list: ', state, suggestionList);

  return {
    suggestionList, alternativeItems
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAlternativeItemsAct: (itemIndex, query, count) => {
      dispatch(fetchAlternativeItemsAct(itemIndex, query, count))
    },
    suggestionListChangedAct: (suggestionList) => {
      dispatch(suggestionListChangedAct(suggestionList))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SuggestionListContainer)