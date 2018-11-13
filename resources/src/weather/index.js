import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./components/App";
import store from "./store/configureStore";



const rootEl = document.getElementById("weather");

const renderComponent = Component => {

    ReactDOM.render(
        <Provider store={store} >
            <Component />
        </Provider>,
        rootEl,
    );
};

renderComponent(App);

