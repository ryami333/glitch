import 'main.scss';

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from 'state/store';
import WindowWatcher from 'components/WindowWatcher';
import MouseWatcher from 'components/MouseWatcher';

class App extends Component {

    canvas;
    ctx;
    img;

    componentDidMount() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext('2d', { alpha: false });

        this.img.addEventListener('load', () => {
            this.ctx.drawImage(this.img, 0, 0, window.innerWidth, window.innerHeight);
        });
    }

    componentWillUnmount() {
        
    }

    render() {
        return (
            <Provider store={store}>
                <div>
                    <MouseWatcher />
                    <WindowWatcher />

                    <div className="canvas">
                        <picture>
                            <source srcSet="https://source.unsplash.com/xI_-wFJhCiM/420x210" media="(max-width=420px)" />
                            <source srcSet="https://source.unsplash.com/xI_-wFJhCiM/768x384" media="(max-width=768px)" />
                            <source srcSet="https://source.unsplash.com/xI_-wFJhCiM/1024x512" media="(max-width=1024px)" />
                            <source srcSet="https://source.unsplash.com/xI_-wFJhCiM/1440x720" media="(max-width=1440px)" />
                            <source srcSet="https://source.unsplash.com/xI_-wFJhCiM/1920x960" media="(max-width=1920px)" />
                            <source srcSet="https://source.unsplash.com/xI_-wFJhCiM/2560x1280" media="all" />
                            <img className="canvas__image" src="https://source.unsplash.com/xI_-wFJhCiM/1920x960" ref={ref => { this.img = ref }}/>
                        </picture>

                        <canvas className="canvas__canvas" ref={ref => { this.canvas = ref}} />
                    </div>
                </div>
            </Provider>
        );
    }
}

export default App;
