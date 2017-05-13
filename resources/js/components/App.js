import 'main.scss';

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from 'state/store';
import WindowWatcher from 'components/WindowWatcher';
import MouseWatcher from 'components/MouseWatcher';

class App extends Component {

    render() {
        return (
            <Provider store={store}>
                <MouseWatcher />
                <WindowWatcher />
                <h1>Hello World</h1>
            </Provider>
        );
    }
}

export default App;
