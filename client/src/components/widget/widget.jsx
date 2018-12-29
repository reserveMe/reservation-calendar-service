import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const format = require('date-fns/format');

const Button = styled.button`
  padding: .75rem 1rem;
  text-decoration: none;
  background-color: #da3743;
  color: #fff;
  border: none;
  font-size: 1rem;
  line-height: 1.5;
  width: 18rem;
  &:hover{
    background-color: #e15b64;
  }
`;

const DateButton = styled.button`
  min-width: 72px;
  height: 32px;
  font-size: .875rem;
  background-color: #da3743;
  cursor: pointer;
  border-radius: 4px;
  text-align: center;
  color: #fff;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  padding: 0 .25rem;
  &:hover{
    background-color: #e15b64;
  }
`;

const OuterDateButtonDiv = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
`;

const DateButtonDiv = styled.div`
  margin-right: .5rem;
  margin-bottom: .5rem;
  display: inline-block;
  vertical-align: top;
  text-decoration: none;
`;


const Container = styled.div`
  box-shadow: 0 2px 8px rgba(153,153,153,.4);
`;

const HeaderDiv = styled.div`
  height: 48px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: end;
  -ms-flex-pack: end;
  justify-content: flex-end;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  background-color: #fff;
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
  text-align: center;
  padding: 0 1rem;
  position: relative;
`;

const HeaderText = styled.h3`
  font-size: 21px;
  height: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  border-bottom: 1px solid #d8d9db;
  margin: 0;
  font-weight: 1000;
  line-height: 24px;
`;

const Form = styled.form`
  padding: .5rem 1rem 1rem;
  border-bottom-left-radius: 2px;
  border-bottom-right-radius: 2px;
  background-color: #fff;
  margin-bottom: 1rem;
`;

const PartySize = styled.div`
  margin-left: 0;
  -webkit-box-flex: 1;
  -ms-flex: 1 50%;
  flex: 1 50%;
`;

const PartySizeText = styled.div`
  font-size: .875rem;
  font-weight: 600;
  padding-bottom: .25rem;
`;

const PartySizeSelect = styled.select`
  cursor: pointer;
  font-family: inherit;
  background-color: #fff;
  font-size: .875rem;
  display: block;
  outline: none;
  border: none;
  width: 100%;
  height: 35px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 0;
  border-bottom: 1px solid #d8d9db;
  &:hover{
    border-bottom: 1px solid #da3743;
  }
`;

const DateAndTime = styled.div`
  margin-top: .5rem;
  margin-left: 0;
  display: flex;
  -webkit-box-flex: 1;
  -ms-flex: 1 100%;
  flex: 1 100%;
`;

const DateDiv = styled.div`
  margin-left: 0;
  -webkit-box-flex: 1;
  -ms-flex: 1 50%;
  flex: 1 50%;
`;

const DateText = styled.div`
  font-size: .875rem;
  font-weight: 600;
  padding-bottom: .25rem;
`;

const DateInput = styled.input`
  cursor: pointer;
  border-right: none;
  position: relative;
  height: 35px;
  width: 100%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border-bottom: 1px solid #d8d9db;
  outline: none;
  &:hover{
    border-bottom: 1px solid #da3743;
  }
`;

const TimeDiv = styled.div`
  -webkit-box-flex: 1;
  -ms-flex: 1 50%;
  flex: 1 50%;
  margin-left: .5rem;
`;

const TimeText = styled.div`
  font-size: .875rem;
  font-weight: 600;
  padding-bottom: .25rem;
`;

const TimeSelect = styled.select`
  cursor: pointer;
  border-right: none;
  position: relative;
  height: 35px;
  width: 100%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border-bottom: 1px solid #d8d9db;
  outline: none;
  &:hover{
    border-bottom: 1px solid #da3743;
  }
`;

const ButtonDiv = styled.div`
  display: flex;
  margin: 1rem auto 0;
  overflow: hidden;
  width: 100%;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
`;

const Widget = ({
  match, availableTimes, handleSubmit, onChange,
  timeOptions, restaurantRef, createReservation,
}) => {
  let availableTimesButtons = [];
  if (!availableTimes.length) {
    availableTimesButtons.push(<Button type="submit" name="submit" key="findTable" id="findtable">Find a Table</Button>);
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
      return (<DateButtonDiv><DateButton type="submit" name="submit" key={timeSlot} id={timeSlot} class="timeslot" onClick={createReservation}>{readableTime}</DateButton></DateButtonDiv>);
    });
  }

  return (
    <Container>
      <HeaderDiv>
        <HeaderText>Make a Reservation</HeaderText>
      </HeaderDiv>
      <Form onSubmit={handleSubmit} ref={restaurantRef} restaurantid={match.params.id} id="widgetForm">
        <PartySize>
          <PartySizeText>Party Size</PartySizeText>
          <PartySizeSelect defaultValue="2" id="selectedPartySize" onChange={onChange}>
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
          </PartySizeSelect>
        </PartySize>
        <DateAndTime>
          <DateDiv>
            <DateText>Date</DateText>
            <DateInput type="date" id="selectedDate" min={format(Date.now(), 'YYYY-MM-DD')} onChange={onChange} />
          </DateDiv>
          <TimeDiv>
            <TimeText>Time</TimeText>
            <TimeSelect id="selectedTime" onChange={onChange}>
              {timeOptions}
            </TimeSelect>
          </TimeDiv>
        </DateAndTime>
        <OuterDateButtonDiv>
          <ButtonDiv>
            {availableTimesButtons}
          </ButtonDiv>
        </OuterDateButtonDiv>
      </Form>
    </Container>
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