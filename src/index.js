import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app";
import { Provider } from "react-redux";
import { createStore, applyMiddleware} from "redux";
import { composeWithDevTools } from 'redux-devtools-extension'; 
import reducers from "./reducer";
import reduxThunk from "redux-thunk";

const store = createStore(reducers, composeWithDevTools(applyMiddleware(reduxThunk)));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
