import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Widget from './components/widget.jsx';

const format = require('date-fns/format');

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      availableTimes: [],
      selectedDate: null,
      selectedTime: null,
      selectedPartySize: null,
      selectedRestaurant: null,
      timeOptions: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.restaurantRef = React.createRef();
    this.createReservation = this.createReservation.bind(this);
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
      selectedDate: format(Date.now(), 'MMDDYY'),
      selectedTime: timeOptions[0].props.value.toString(),
      selectedRestaurant: this.restaurantRef.current.getAttribute('restaurantid'),
      selectedPartySize: '2',
    });
  }

  onChange(e) {
    if (e.target.id === 'selectedDate') {
      const dateArr = e.target.value.split('-');
      const convertedDate = dateArr[1] + dateArr[2] + dateArr[0].slice(2);
      this.setState({
        [e.target.id]: convertedDate,
      });
      if (convertedDate === format(Date.now(), 'MMDDYY')) {
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
        this.setState({ timeOptions });
      } else if (convertedDate !== format(Date.now(), 'MMDDYY')) {
        const allTimeOptions = ['0000', '0030', '0100', '0130', '0200', '0230', '0300', '0330', '0400', '0430', '0500',
          '0530', '0600', '0630', '0700', '0730', '0800', '0830', '0900', '0930', '1000', '1030', '1100', '1130', '1200',
          '1230', '1300', '1330', '1400', '1430', '1500', '1530', '1600', '1630', '1700', '1730', '1800', '1830', '1900',
          '1930', '2000', '2030', '2100', '2130', '2200', '2230', '2300', '2330'];
        const timeOptions = allTimeOptions.map((timeSlot) => {
          let timeSlotRead;
          if (Number(timeSlot.toString().substr(0, 2)) > 12) {
            timeSlotRead = `${(Number(timeSlot.toString().substr(0, 2)) - 12)}:${timeSlot.toString().substr(2, 2)} PM`;
          } else {
            timeSlotRead = `${timeSlot.toString().substr(0, 2)}:${timeSlot.toString().substr(2, 2)} AM`;
          }
          return (<option value={timeSlot} key={timeSlot}>{timeSlotRead}</option>);
        })
        this.setState({ timeOptions });
      }
    } else {
      this.setState({
        [e.target.id]: e.target.value.toString(),
        availableTimes: [],
      });
    }
  }

  getAvailableReservations(restaurantID, dateToReserve) {
    $.ajax({
      url: `/api/reservations/restaurantID=${restaurantID}&date=${dateToReserve}`,
      type: 'GET',
      success: (success) => {
        this.mapAvailableTimes(JSON.parse(success));
      },
      error: (err) => {
        throw err;
      },
    });
  }

  createReservation(e) {
    e.preventDefault();
    const { selectedRestaurant, selectedDate, selectedPartySize } = this.state;
    $.ajax({
      url: '/api/reservations/',
      type: 'POST',
      data: {
        restaurantID: selectedRestaurant,
        date: selectedDate,
        time: e.target.id,
        partySize: selectedPartySize,
      },
      success: () => {
        this.setState({
          availableTimes: ['CREATED'],
        })
      },
      error: (err) => {
        throw err;
      },
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { selectedRestaurant, selectedDate } = this.state;
    this.getAvailableReservations(selectedRestaurant, selectedDate);
  }

  mapAvailableTimes(reservationArray) {
    const { timeOptions, selectedTime } = this.state;
    const availableTimes = timeOptions.slice().map((timeSlot) => {
      return timeSlot.props.value.toString();
    });
    reservationArray.forEach((reservation) => {
      if (availableTimes.indexOf(reservation.timeToReserve) !== -1) {
        availableTimes.splice(availableTimes.indexOf(reservation.timeToReserve), 1);
      }
    });
    const mappedTimes = [];
    let middleIndex = -1;
    let approxRequestedTimeLeft = Number(selectedTime);
    let approxRequestedTimeRight = Number(selectedTime);
    while (middleIndex === -1) {
      if (availableTimes.indexOf(approxRequestedTimeLeft.toString()) !== -1) {
        middleIndex = availableTimes.indexOf(approxRequestedTimeLeft.toString());
      } else if (availableTimes.indexOf(approxRequestedTimeRight.toString()) !== -1) {
        middleIndex = availableTimes.indexOf(approxRequestedTimeRight.toString());
      } else if (approxRequestedTimeLeft === 0 || approxRequestedTimeRight.toString() > 2330) {
        middleIndex = null;
      } else {
        approxRequestedTimeLeft -= (approxRequestedTimeLeft % 100 === 30 ? 30 : 70);
        approxRequestedTimeRight += (approxRequestedTimeRight % 100 === 30 ? 70 : 30);
      }
    };
    if (middleIndex !== null) {
      for (let i = middleIndex - 2; i <= middleIndex + 2; i += 1) {
        if (availableTimes[i]) {
          mappedTimes.push(availableTimes[i]);
        }
        if (i === middleIndex + 2) {
          this.setState({ availableTimes: mappedTimes });
        }
      }
    } else {
      mappedTimes.push(null);
      this.setState({ availableTimes: mappedTimes });
    }
  }

  render() {
    const { availableTimes, selectedDate, timeOptions } = this.state;
    return (
      <Router>
        <Route
          path="/restaurants/:id/"
          render={routeProps => (
            <Widget
              {...routeProps}
              availableTimes={availableTimes}
              getAvailableReservations={this.getAvailableReservations}
              handleSubmit={this.handleSubmit}
              onChange={this.onChange}
              selectedDate={selectedDate}
              timeOptions={timeOptions}
              restaurantRef={this.restaurantRef}
              createReservation={this.createReservation}
            />
          )}
        />
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
