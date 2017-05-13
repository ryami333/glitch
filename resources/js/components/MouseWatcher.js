import { connect } from 'react-redux';
import { updateMousePosition } from 'state/actions';
import React, { Component } from 'react';

class MouseWatcher extends Component {

    _last = Date.now();

    constructor(props) {
        super(props);
    }

    _update(e) {
        let now = Date.now();
        let elapsed = Date.now() - this._last;

        if (elapsed > 16) {
            this.props.updateMousePosition({
                x: e.clientX,
                y: e.clientY,
            });
            this._last = now;
        }
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