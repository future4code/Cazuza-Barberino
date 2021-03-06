import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { clearSwipes } from "../../reducers/profiles/actions";
import styled from "styled-components";

const ClearButton = styled.button`
  position: fixed;
  bottom: 5px;
  right: 5px;
`;

function ClearButtonWrapper(props) {
  return (
    <ClearButton
      onClick={() => {
        if (!props.fetching) props.clearSwipes();
      }}
    >
      Limpar swipes e matches
    </ClearButton>
  );
}

ClearButtonWrapper.propTypes = {
  clearSwipes: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    clearSwipes: () => dispatch(clearSwipes()),
  };
}

function mapState(state) {
  return {
    fetching: state.profiles.fetching,
  };
}

export default connect(mapState, mapDispatchToProps)(ClearButtonWrapper);
