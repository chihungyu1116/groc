import {
  COMPLETED_PROCESSING_SHOPPING_LIST_ACT
} from '../actions/ShoppingListAction';

const defaultState = {
	suggestionList: [
	{"query":"apple","count":1,"data":{"id":"1022608","sku":"1022608","name":"Gala Apples, 1 lb","maxAllowed":10,"taxCode":"2038305","isOutOfStock":false,"images":{"thumbnail":"http://i-grocery.walmart.com/mediaimages/1256145750872.jpg","large":"http://i-grocery.walmart.com/mediaimages/1256145750873.jpg"},"isAlcoholic":false,"productCode":"343"},"price":{"list":0.97,"priceUnitOfMeasure":"LB","salesUnitOfMeasure":"LB","salesQuantity":1,"isRollback":false,"isClearance":false,"unit":0.97}},
	{"query":"iphone","count":1,"data":{"id":"3000251233","sku":"3000251233","name":"OtterBox Defender Case for iPhone 4/4S","maxAllowed":2,"taxCode":"2038710","isOutOfStock":true,"images":{"thumbnail":"http://i.walmartimages.com/i/p/00/66/05/43/01/0066054301193_150X150.jpg","large":"http://i.walmartimages.com/i/p/00/66/05/43/01/0066054301193_215X215.jpg"},"isAlcoholic":false,"productCode":"2621130"},"price":{"list":46.88,"priceUnitOfMeasure":"EA","salesUnitOfMeasure":"EA","salesQuantity":1,"isRollback":false,"isClearance":false,"unit":46.88}},
	{"query":"steak","count":1,"data":{"id":"1018274","sku":"1018274","name":"Hormel Beef Steak Tips W/Mashed Potatoes & Gravy Compleats Microwave Bowls, 10 oz","maxAllowed":24,"taxCode":"2038305","isOutOfStock":false,"images":{"thumbnail":"http://i.walmartimages.com/i/p/00/03/76/00/48/0003760048252_150X150.jpg","large":"http://i.walmartimages.com/i/p/00/03/76/00/48/0003760048252_215X215.jpg"},"isAlcoholic":false,"productCode":"239295"},"price":{"list":2.25,"priceUnitOfMeasure":"OZ","salesUnitOfMeasure":"OZ","salesQuantity":9,"isRollback":false,"isClearance":false,"unit":0.25}},
	{"query":"detergent","count":1,"data":{"id":"3000826824","sku":"3000826824","name":"Simply Clean ; Fresh Refreshing Breeze Liquid Laundry Detergent, 138 fl oz","maxAllowed":4,"taxCode":"2038710","isOutOfStock":false,"images":{"thumbnail":"http://i.walmartimages.com/i/p/00/03/70/00/89/0003700089131_150X150.jpg","large":"http://i.walmartimages.com/i/p/00/03/70/00/89/0003700089131_215X215.jpg"},"isAlcoholic":false,"productCode":"3898648"},"price":{"list":8.97,"priceUnitOfMeasure":"FO","salesUnitOfMeasure":"FO","salesQuantity":138,"isRollback":false,"isClearance":false,"unit":0.065}},
	{"query":"toilet paper","count":1,"data":{"id":"3000817933","sku":"3000817933","name":"Angel Soft Bath Tissue Jumbo Rolls, 286 sheets, 12 rolls","maxAllowed":24,"taxCode":"2038724","isOutOfStock":false,"images":{"thumbnail":"http://i.walmartimages.com/i/p/00/03/04/00/79/0003040079000_150X150.jpg","large":"http://i.walmartimages.com/i/p/00/03/04/00/79/0003040079000_215X215.jpg"},"isAlcoholic":false,"productCode":"4033552"},"price":{"list":5.74,"priceUnitOfMeasure":"EA","salesUnitOfMeasure":"EA","salesQuantity":3432,"isRollback":false,"isClearance":false,"unit":0.0017}},
	{"query":"something special","not_found": true}
	]
}

export default function SuggestionListReducer(state = defaultState, action) {
  if( action.type === COMPLETED_PROCESSING_SHOPPING_LIST_ACT) {
    return Object.assign({}, state, {
      suggestionList: action.shoppingList
    })
  } else if ( action.type === 'RECEIVED_ALTERNATIVE_ITEMS_ACT' ) {
  	const { alternativeItems } = action
		return Object.assign({}, state, {
			alternativeItems
    })
  } else if ( action.type === 'SUGGESTION_LIST_CHANGED_ACT' ) {
  	const { suggestionList } = action
		return Object.assign({}, state, {
			suggestionList,
      alternativeItems: undefined
    })  	
  }

  return state
}