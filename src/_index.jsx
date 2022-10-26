import React from 'react';
import { render } from 'react-dom';

// setup fake backend
import { configureFakeBackend } from './_helpers';
 import {App} from "./App"

configureFakeBackend();

render(
    <App />,
    document.getElementById('app')
);