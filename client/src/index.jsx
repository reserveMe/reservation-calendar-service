import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Widget from './components/widget.jsx';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Router>
        <Route path='/restaurants/:id/' component={Widget} />
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
