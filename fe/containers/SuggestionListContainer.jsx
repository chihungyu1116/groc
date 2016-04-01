import React, { Component , PropTypes } from 'react'
import { connect } from 'react-redux'
import {
  openGroceryHelperAct,
  closeGroceryHelperAct
} from '../actions/AppAction';

class SuggestionListContainer extends React.Component {
  componentWillMount() {
    this.setInitialState()
  }

  setInitialState() {
    this.setState({
      items: [
        {
          query: 'apple',
          itemId: 11980008, 
          imageUrl: 'http://ll-us-i5.wal.co/dfw/dce07b8c-5e74/k2-_9148854a-0e30-40f7-b1fd-03fe34a13f44.v2.jpg-0ff7ef09dd18c1bd9ac774b15e368f0b87020aaa-webp-450x450.webp', 
          name: 'Pink Lady U.S. Extra Fancy Grade Apples, 3 Lb',
          price: '3.99'
        },
        {
          query: 'steak',
          itemId: 43839468, 
          imageUrl: 'http://ll-us-i5.wal.co/dfw/dce07b8c-6e1e/k2-_44cf321e-60da-47ff-af3a-f703cfd05819.v2.jpg-85029bdaaefb6916238ac9567e8af4355c7129d9-webp-450x450.webp', 
          name: 'Chuck Boneless Eye Steak',
        },
      ]


    })


  }

  renderSuggestionItems(items) {
    return items.map((item, index) => {
      const { query, itemId, imageUrl, name, price } = item
      return (
        <div key={index} className="yj-suggestion-item-container">
          <img className="yj-suggestion-item-image"
            src={imageUrl} />
          <div className="yj-suggestion-item-name">{name}</div>
          <div className="yj-suggestion-item-price">{price ? `$${price}` : 'Price not available'}</div>
        </div>
      )


    })



  }


  render() {
    const { routes, params } = this.props
    const { items } = this.state

    return (
      <div className='gorcery-helper'>
        <div>
          {this.renderSuggestionItems(items)}
        </div>
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
  return {};
}

export default connect(mapStateToProps)(SuggestionListContainer)