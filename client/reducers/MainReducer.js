import * as types from "../constants/actionTypes";

const initialState = {
  searchStr: "",
  searchResults: [],
  cart: [],
  currCard: [],
  hasBeenClicked: false,
  cardClicked: false,
  backButton: true,
  cardId: -1,
  favoriteFoods: [],
  shoppingCartArr: []
}

const mainReducer = (state = initialState, action) => {
  let searchResults;
  let cardClicked;
  switch (action.type) {
    case types.UPDATE_SEARCH_STR:
      return {
        ...state,
        searchStr: action.payload
      }

    case types.CALL_SEARCH_STR:
      return {
        ...state,
        searchResults: action.payload
      }
    case types.CHANGE_PAGE:
    case types.ON_CARD_CLICKED:
      cardClicked = !state.cardClicked;
      return {
        ...state,
        cardId: action.payload,
        cardClicked: !state.cardClicked,
        backButton: !state.backButton
      }
    case types.BACK_BUTTON_CLICKED:
      return {
        ...state,
        cardClicked: !state.cardClicked,
        backButton: !state.backButton
      }
    case types.GET_FAVORITE_FOODS:
      return {
        ...state,
        favoriteFoods: action.payload
      }
     case types.CHANGE_HAS_BEEN_CLICKED:
     case types.CHANGE_FAVORITE_FOODS:
     case types.CONNECT_TO_RECIPE:
     case types.GET_SHOPPING_LIST:

     case types.REMOVE_FAV:
       let newFavs = state.favoriteFoods.slice(0);
       for(let i = 0; i < newFavs.length; i++) {
         if(newFavs[i].id === action.payload.favId) {
           newFavs.splice(i, 1);
           break;
         }
       }
       return {
         ...state,
         favoriteFoods: newFavs
       }

     case types.ADD_TO_SHOPPING_CART:
      return {
        ...state,
        shoppingCartArr: state.shoppingCartArr.concat(action.payload)
      }
    default:
      return state;
  }
}

export default mainReducer
