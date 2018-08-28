import React, { Component } from 'react';

// COMPONENTS

import Main from './Main';

import Header from './Header';

export default class App extends Component {

    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <Header />
                <Main />
            </div>
        );
    }
}
