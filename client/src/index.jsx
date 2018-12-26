import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Widget from './components/widget.jsx';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
const format = require('date-fns/format');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      availableTimes: [],
      selectedDate: null,
      selectedTime: null,
      selectedPartySize: null,
      selectedRestaurant: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.restaurantRef = React.createRef();
  }

  componentDidMount() {
    let currentTime = Number(format(Date.now(), 'HHmm'));
    if (60 - Number(format(Date.now(), 'mm')) < 30) {
      currentTime += (100 - Number(format(Date.now(), 'mm')));
    } else if (60 - Number(format(Date.now(), 'mm')) > 30) {
      currentTime += (30 - Number(format(Date.now(), 'mm')));
    }
    const timeOptions = [];
    while (currentTime <= 2330) {
      let currentTimeRead;
      if (Number(currentTime.toString().substr(0, 2)) > 12) {
        currentTimeRead = `${(Number(currentTime.toString().substr(0, 2)) - 12)}:${currentTime.toString().substr(2, 2)} PM`;
      } else {
        currentTimeRead = `${currentTime.toString().substr(0, 2)}:${currentTime.toString().substr(2, 2)} AM`;
      }
      timeOptions.push(
        <option value={currentTime} key={currentTime}>{currentTimeRead}</option>,
      );
      if (currentTime.toString()[2] === '0') {
        currentTime += 30;
      } else {
        currentTime += 70;
      }
    }
    this.setState({
      timeOptions,
      selectedDate: format(Date.now(), "MMDDYY"),
      selectedTime: timeOptions[0].props.value,
      selectedRestaurant: this.restaurantRef.current.getAttribute('restaurantid'),
      selectedPartySize: 2,
    });
  }


  onChange(e) {
    if (e.target.id === 'selectedDate') {
      const dateArr = e.target.value.split('-');
      const convertedDate = dateArr[1] + dateArr[2] + dateArr[0].slice(2);
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

  handleSubmit(e) {
    e.preventDefault();
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
              selectedDate={this.state.selectedDate}
              timeOptions={this.state.timeOptions}
              restaurantRef={this.restaurantRef}
            />
          )}
        />
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
