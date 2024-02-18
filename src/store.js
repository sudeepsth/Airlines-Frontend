import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers/index';
import rootSaga from './sagas/index';
// import { composeWithDevTools } from 'redux-devtools-extension';

const sagaMiddleWare = createSagaMiddleware();
  // Use Redux DevTools Extension if it's installed in the browser
  const reduxDevTools =
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();


const store = (applyMiddleware(sagaMiddleWare))(createStore)(
    rootReducer,reduxDevTools
);

sagaMiddleWare.run(rootSaga);

export default store;