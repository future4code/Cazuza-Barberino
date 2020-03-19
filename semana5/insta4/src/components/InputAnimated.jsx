import React, { Component } from "react";
import styled, { css } from "styled-components";

export default class InputAnimated extends Component {
  state = {
    inFocus: false
  };

  render() {
    return (
      <Wrapper>
        <Input
          type={this.props.type}
          name={this.props.name}
          onChange={this.props.handleChange}
          value={this.props.value}
          onFocus={() => this.setState({ inFocus: true })}
          onBlur={() => this.setState({ inFocus: false })}
        />
        <Label
          animate={this.state.inFocus || this.props.value !== ""}
          htmlFor={this.props.name}
        >
          {this.props.displayName}
        </Label>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  width: 100%;
  position: relative;
`;

const Input = styled.input`
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

const Label = styled.label`
  position: absolute;
  top: 50%;
  left: 10px;
  color: rgba(150, 150, 150);
  z-index: -1;
  transform: translateY(-50%);
  transition: 0.3s;

  ${props =>
    props.animate &&
    css`
      top: 0;
      color: black;
      z-index: 1;
      background-color: white;
      padding: 0 2px;
      border-radius: 50px;
    `}
`;
