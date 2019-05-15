import { composeWithDevTools } from 'redux-devtools-extension';
import * as asyncInitialState from 'redux-async-initial-state';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import middleware from './middleware.js/middleware';  // Imported the middleware file
// import reducers from './reducers/index';
import authReducer from './reducers/AuthReducer';
import mainReducer from './reducers/MainReducer';
import thunk from 'redux-thunk';
import Dexie from 'dexie';

// const reducers = combineReducers({
// });


// We need outerReducer to replace full state as soon as it loaded

let db = new Dexie('Mikeys Dexie');
db.version(1).stores({ todos: '++id' });
db.open().catch(err => {console.log(err)})

const reducers = asyncInitialState.outerReducer(combineReducers({
  auth: authReducer,
  main: mainReducer,
  asyncInitialState: asyncInitialState.innerReducer,
}));
// Load state function
// Should return promise that resolves application state
const loadStore = () => {
  console.log("inside loadStore");
  // let db = ;
  console.log(db.isOpen())
  return db
    .table('todos')
    .toCollection()
    .last((rec) => {
      console.log(rec)
      return rec;
    })
    .catch(err => {
      console.log(err);
    })
}

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(asyncInitialState.middleware(loadStore), middleware, thunk)), // Look at the applyMiddleware params.
);
//
// compose(applyMiddleware(asyncInitialState.middleware(loadStore)))

// const initalState = {
//   auth: {
//     usernameStr: '',
//     passwordStr: '',
//     isLoggedIn: false,
//     isSignup: false,
//     userId: null,
//     userName: '',
//     email: '',
//     error: null
//   },
//   main: {
//     searchStr: "",
//     searchResults: [],
//     cart: [],
//     currCard: [],
//     hasBeenClicked: false,
//     cardClicked: false,
//     backButton: true,
//     cardId: -1,
//     favoriteFoods: [],
//     shoppingCartArr: []
//   }
// };


export default store;
