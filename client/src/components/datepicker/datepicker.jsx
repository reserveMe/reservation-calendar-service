import React from "react";
import DatePicker from "react-datepicker";
import * as Styled from './styles';
import "react-datepicker/dist/react-datepicker.css";

export default class Datepicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date()
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  render() {
    return (
      // <Styled.DatePickerDiv>
      <DatePicker
        selected={this.state.startDate}
        onChange={this.handleChange}
        calendarClassName="datepicker"
      />
      // </Styled.DatePickerDiv>
    );
  }
}