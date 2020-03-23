import React, { Component } from "react";
import styled from "styled-components";

export default class SelectAnimated extends Component {
  render() {
    return (
      <Select
        value={this.props.value}
        name={this.props.name}
        onChange={this.props.onChange}
      >
        {this.props.children}
      </Select>
    );
  }
}

const Select = styled.select`
  width: 100%;
  flex: 1;
  background-color: transparent;
  border: 2px solid black;
  border-radius: 5px;
  padding: 10px 5px;
  color: black;
  -webkit-appearance: none;
  -moz-appearance: textfield;
  min-width: 0;
`;
