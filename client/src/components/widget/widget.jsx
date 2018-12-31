import React from 'react';
import PropTypes from 'prop-types';
import * as Styled from './styles';
import DatePicker from '../datepicker/datepicker.jsx';

const format = require('date-fns/format');

const Widget = ({
  match, availableTimes, handleSubmit, onChange,
  timeOptions, restaurantRef, createReservation, onDateChange
}) => {
  let availableTimesButtons = [];
  if (!availableTimes.length) {
    availableTimesButtons.push(<Styled.Button type="submit" name="submit" key="findTable" id="findtable">Find a Table</Styled.Button>);
  } else if (availableTimes[0] === null) {
    availableTimesButtons.push(<div key="UNAVAILABLE">No reservations near your requested time available.</div>);
  } else if (availableTimes[0] === 'CREATED') {
    availableTimesButtons.push(<div key="CREATED" id="createdReservation">Reservation created!</div>);
  } else {
    availableTimesButtons = availableTimes.map((timeSlot) => {
      let readableTime;
      if (Number(timeSlot.toString().substr(0, 2)) > 12) {
        readableTime = `${(Number(timeSlot.toString().substr(0, 2)) - 12)}:${timeSlot.toString().substr(2, 2)} PM`;
      } else {
        readableTime = `${timeSlot.toString().substr(0, 2)}:${timeSlot.toString().substr(2, 2)} AM`;
      }
      return (<Styled.DateButtonDiv key={timeSlot}><Styled.DateButton type="submit" name="submit" key={timeSlot} id={timeSlot} className="timeslot" onClick={createReservation}>{readableTime}</Styled.DateButton></Styled.DateButtonDiv>);
    });
  }

  return (
    <Styled.Container>
      <Styled.HeaderDiv>
        <Styled.HeaderText>Make a Reservation</Styled.HeaderText>
      </Styled.HeaderDiv>
      <Styled.Form onSubmit={handleSubmit} ref={restaurantRef} title={match.params.id} id="widgetForm">
        <Styled.PartySize>
          <Styled.PartySizeText>Party Size</Styled.PartySizeText>
          <Styled.PartySizeSelect defaultValue="2" id="selectedPartySize" onChange={onChange}>
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
          </Styled.PartySizeSelect>
        </Styled.PartySize>
        <Styled.DateAndTime>
          <Styled.DateDiv>
            <Styled.DateText>Date</Styled.DateText>
            <DatePicker onDateChange={onDateChange} />
          </Styled.DateDiv>
          <Styled.TimeDiv>
            <Styled.TimeText>Time</Styled.TimeText>
            <Styled.TimeSelect id="selectedTime" onChange={onChange}>
              {timeOptions}
            </Styled.TimeSelect>
          </Styled.TimeDiv>
        </Styled.DateAndTime>
        <Styled.OuterDateButtonDiv>
          <Styled.ButtonDiv>
            {availableTimesButtons}
          </Styled.ButtonDiv>
        </Styled.OuterDateButtonDiv>
      </Styled.Form>
    </Styled.Container >
  );
};

Widget.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node,
    }).isRequired,
  }).isRequired,
  availableTimes: PropTypes.arrayOf(PropTypes.string),
  handleSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  timeOptions: PropTypes.node,
  restaurantRef: PropTypes.instanceOf(Object),
  createReservation: PropTypes.func.isRequired,
};

export default Widget;