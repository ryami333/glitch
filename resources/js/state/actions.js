export const UPDATE_MOUSE_POSITION = 'UPDATE_MOUSE_POSITION';
export const UPDATE_WINDOW_DIMENSIONS = 'UPDATE_WINDOW_DIMENSIONS';

export function updateMousePosition({x, y}) {
    return {
        type: UPDATE_MOUSE_POSITION,
        x,
        y,
    }
}

export function updateWindowDimensions({innerHeight, innerWidth}) {
    return {
        type: UPDATE_WINDOW_DIMENSIONS,
        innerHeight,
        innerWidth,
    }
}
