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
    pixels;

    componentDidMount() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.pixels = window.innerHeight * window.innerWidth;
        this.ctx = this.canvas.getContext('2d', { alpha: false });

        this.img.addEventListener('load', () => {
            let canvasRatio = window.innerWidth / window.innerHeight;
            let imageRatio = this.img.naturalWidth / this.img.naturalHeight;

            // Stretch to fit width-wise

            let drawWidth, drawHeight;

            if (canvasRatio < imageRatio) {
                drawHeight = window.innerHeight;
                drawWidth = (window.innerHeight / this.img.naturalHeight) * this.img.naturalWidth;
            } else {
                drawWidth = window.innerWidth;
                drawHeight = (window.innerWidth / this.img.naturalWidth) * this.img.naturalHeight;
            }

            let offsetWidth = 0.5 * (window.innerWidth - drawWidth);
            let offsetHeight = 0.5 * (window.innerHeight - drawHeight);

            this.ctx.drawImage(this.img, offsetWidth, offsetHeight, drawWidth, drawHeight);

            this.imageData = this.ctx.getImageData(0,0,window.innerWidth, window.innerHeight);

            this._loop();
        });
    }

    _loop() {
        window.requestAnimationFrame(function() {
            let newData = this.imageData.data;
            let captureStart = ~~(Math.random() * this.pixels);
            let captureLength = ~~(Math.random() * this.pixels * 0.1);
            let putStart = ~~(Math.random() * this.pixels);
            let slice = newData.slice(captureStart, captureLength);

            console.log(captureStart, captureLength, putStart, slice);

            newData.set(slice, putStart);

            this.imageData.data.set(newData);
            this.ctx.putImageData(this.imageData, 0, 0);

            this._loop();
        }.bind(this));
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
                            <img crossOrigin="Anonymous" className="canvas__image" src="https://source.unsplash.com/xI_-wFJhCiM/1920x960" ref={ref => { this.img = ref }}/>
                        </picture>

                        <canvas className="canvas__canvas" ref={ref => { this.canvas = ref}} />
                    </div>
                </div>
            </Provider>
        );
    }
}

export default App;
