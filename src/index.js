import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import {Provider} from 'mobx-react';
import BoardStore from "./store/board"; // MobX 에서 사용하는 Provider
const board = new BoardStore();


ReactDOM.render(
    <Provider board={board}>
        <App/>
    </Provider>,
    document.getElementById('root')
);

