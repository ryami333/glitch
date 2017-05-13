import {
    UPDATE_MOUSE_POSITION,
    UPDATE_WINDOW_DIMENSIONS,
} from 'state/actions';

const DEFAULTS = {
    window: {
        innerHeight: window.innerHeight,
        innerWidth: window.innerWidth,
    },
    mouse: {
        x: null,
        y: null,
    }
}

export default function(state = DEFAULTS, action) {
    switch (action.type) {
        case UPDATE_WINDOW_DIMENSIONS:
            state = Object.assign({}, state, {
                window: {
                    innerHeight: action.innerHeight,
                    innerWidth: action.innerWidth,
                },
            });
            break;
        case UPDATE_MOUSE_POSITION:
            state = Object.assign({}, state, {
                mouse: {
                    x: action.x,
                    y: action.y,
                },
            });
            break;
    }

    return state;
}