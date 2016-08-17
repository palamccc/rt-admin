import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'react-toolbox/lib/button';

const App = () => <div><div><Button label="Primary Button" primary /></div></div>;
/* global document */
ReactDOM.render(<App />, document.getElementById('app'));
