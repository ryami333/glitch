import { connect } from 'react-redux';
import { updateMousePosition } from 'state/actions';
import React, { Component } from 'react';

class MouseWatcher extends Component {
    constructor(props) {
        super(props);
    }

    _update(e) {
        this.props.updateMousePosition({
            x: e.clientX,
            y: e.clientY,
        });
    }

    componentDidMount() {
        window.addEventListener('mousemove', e => this._update(e));
    }

    componentWillUnmount() {
        window.removeEventListener('mousemove', e => this._update(e));
    }

    render() {
        return null;
    }
}

const mapDispatchToProps = function(dispatch) {
    return {
        updateMousePosition: function(...args) {
            return dispatch(updateMousePosition(...args));
        },
    }
}

export default connect(null,mapDispatchToProps)(MouseWatcher);