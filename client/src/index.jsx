import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Widget from './components/widget.jsx';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      availableTimes: [],
      selectedDate: null,
      selectedTime: null,
      selectedPartySize: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getAvailableReservations = this.getAvailableReservations.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    if (e.target.id === 'selectedDate') {
      let dateArr = e.target.value.split('-');
      let convertedDate = dateArr[1] + dateArr[2] + dateArr[0].slice(2);
      this.setState({
        [e.target.id]: convertedDate
      });
    } else {
      this.setState({
        [e.target.id]: e.target.value
      });
    }
  }

  getAvailableReservations(restaurantID, dateToReserve) {
    $.ajax({
      url: `/api/reservations/restaurantID=${restaurantID}&date=${dateToReserve}`,
      type: 'GET',
      success: (success) => {
        console.log('Success!');
      },
      error: (err) => {
        throw err;
      }
    });
  }

  handleSubmit(e, callback) {
    e.preventDefault();
    console.log(e.target.data);
  }

  mapAvailableTimes(reservationArray) {

  }

  render() {
    return (
      <Router>
        <Route path="/restaurants/:id/"
          render={routeProps => (
            <Widget
              {...routeProps}
              availableTimes={this.state.availableTimes}
              getAvailableReservations={this.getAvailableReservations}
              handleSubmit={this.handleSubmit}
              onChange={this.onChange}
            />
          )}
        />
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
