import { connect } from 'react-redux';
import { updateWindowDimensions } from 'state/actions';
import React, { Component } from 'react';

class WindowWatcher extends Component {
    constructor(props) {
        super(props);
    }

    _update(e) {
        this.props.updateWindowDimensions({
            innerHeight: window.innerHeight,
            innerWidth: window.innerWidth,
        });
    }

    componentDidMount() {
        window.addEventListener('resize', () => this._update());
        document.addEventListener('DOMContentLoaded', () => this._update());
        document.addEventListener('ready', () => this._update());
    }

    componentWillUnmount() {
        window.removeEventListener('resize', () => this._update());
        document.removeEventListener('DOMContentLoaded', () => this._update());
        document.removeEventListener('ready', () => this._update());
    }

    render() {
        return null;
    }
}

const mapDispatchToProps = function(dispatch) {
    return {
        updateWindowDimensions: function(...args) {
            return dispatch(updateWindowDimensions(...args));
        },
    }
}

export default connect(null,mapDispatchToProps)(WindowWatcher);