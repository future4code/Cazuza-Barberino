import React, { Component } from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";

export default class InputAnimated extends Component {
  state = {
    inFocus: false
  };

  onChangeHandler = event => {
    if (this.props.numberInput) {
      const re = /^[0-9\b]+$/;
      if (!re.test(event.target.value) && event.target.value !== "") return;
    }

    this.props.changeHandler(event);
  };

  render() {
    const { name, value, displayName, showError } = this.props;

    return (
      <>
        {value === "" && showError ? (
          <p style={{ color: "red" }}>Preencha o campo abaixo.</p>
        ) : null}
        <Wrapper>
          <Input
            type="text"
            name={name}
            id={name}
            onChange={this.onChangeHandler}
            value={value}
            onFocus={() => this.setState({ inFocus: true })}
            onBlur={() => this.setState({ inFocus: false })}
          />
          <Label animate={this.state.inFocus || value !== ""} htmlFor={name}>
            {displayName}
          </Label>
        </Wrapper>
      </>
    );
  }
}

const Wrapper = styled.div`
  width: 100%;
  position: relative;
`;

const Input = styled.input`
  box-sizing: border-box;
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
  transition: 0.2s ease-out;
  background-color: white;

  ${props =>
    props.animate &&
    css`
      top: 0;
      color: black;
      z-index: 1;
      padding: 0 2px;
      border-radius: 50px;
      font-size: 14px;
    `}
`;

InputAnimated.propTypes = {
  name: PropTypes.string.isRequired,
  numberInput: PropTypes.bool,
  value: PropTypes.string.isRequired,
  displayName: PropTypes.string,
  changeHandler: PropTypes.func.isRequired
};
