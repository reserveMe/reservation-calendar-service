import React from 'react';
const format = require('date-fns/format');

const Widget = ({ match, availableTimes, handleSubmit, onChange,
  timeOptions, restaurantRef, createReservation }) => {
  let availableTimesButtons = [];
  if (!availableTimes.length) {
    availableTimesButtons.push(<button type="submit" name="submit" key="findTable">Find a Table</button>);
  } else if (availableTimes[0] === null) {
    availableTimesButtons.push(<div>No reservations near your requested time available.</div>);
  } else {
    availableTimesButtons = availableTimes.map((timeSlot) => {
      let readableTime;
      if (Number(timeSlot.toString().substr(0, 2)) > 12) {
        readableTime = `${(Number(timeSlot.toString().substr(0, 2)) - 12)}:${timeSlot.toString().substr(2, 2)} PM`;
      } else {
        readableTime = `${timeSlot.toString().substr(0, 2)}:${timeSlot.toString().substr(2, 2)} AM`;
      }
      return (<button type="submit" name="submit" key={timeSlot} id={timeSlot} onClick={createReservation}>{readableTime}</button>);
    });
  }
  return (
    <div>
      <h1>Make a Reservation</h1>
      <hr />
      <form onSubmit={handleSubmit} ref={restaurantRef} restaurantid={match.params.id}>
        Party Size
        <br />
        <select defaultValue="2" id="selectedPartySize" onChange={onChange}>
          <option value="1">For 1</option>
          <option value="2">For 2</option>
          <option value="3">For 3</option>
          <option value="4">For 4</option>
          <option value="5">For 5</option>
          <option value="6">For 6</option>
          <option value="7">For 7</option>
          <option value="8">For 8</option>
          <option value="9">For 9</option>
          <option value="10">For 10</option>
          <option value="11">For 11</option>
          <option value="12">For 12</option>
          <option value="13">For 13</option>
          <option value="14">For 14</option>
          <option value="15">For 15</option>
          <option value="16">For 16</option>
          <option value="17">For 17</option>
          <option value="18">For 18</option>
          <option value="19">For 19</option>
          <option value="20">For 20</option>
        </select>
        <br />
        <div>
          Date
          <br />
          <input type="date" id="selectedDate" min={format(Date.now(), 'YYYY-MM-DD')} onChange={onChange} />
          <br />
          Time
          <br />
          <select id="selectedTime" onChange={onChange}>
            {timeOptions}
          </select>
          <br />
          {availableTimesButtons}
        </div>
      </form>
      <h2>
        Params:
        {match.params.id}
      </h2>
    </div>
  );
};

export default Widget;
