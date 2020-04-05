import React, { Component } from "react";
import { FiPlusCircle, FiXCircle } from "react-icons/fi";
import { DefaultWrapper } from "../global-styles";
import {
  CreateInputIcon,
  DeleteInputIcon,
  NumberInput,
  AInput,
} from "./styles";

export default class ArtistInput extends Component {
  render() {
    const {
      artistValue,
      numberValue,
      nameChangeHandler,
      numberChangeHandler,
      showCreate,
      showDelete,
      createInput,
      deleteInput,
      innerRef,
    } = this.props;

    return (
      <DefaultWrapper>
        <AInput
          as="input"
          placeholder="Artist"
          onChange={nameChangeHandler}
          name="artistInput"
          value={artistValue}
          type="text"
          ref={innerRef}
        />
        <NumberInput
          as="input"
          placeholder="Number"
          onChange={numberChangeHandler}
          name="artistInput"
          value={numberValue}
          type="text"
        />
        <CreateInputIcon showCreate={showCreate} onClick={createInput}>
          <FiPlusCircle size="100%" />
        </CreateInputIcon>
        <DeleteInputIcon showDelete={showDelete} onClick={deleteInput}>
          <FiXCircle size="100%" />
        </DeleteInputIcon>
      </DefaultWrapper>
    );
  }
}
