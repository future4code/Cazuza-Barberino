import React, { Component } from "react";
import { FiPlusCircle, FiXCircle } from "react-icons/fi";
import { DefaultBox, DefaultWrapper } from "../global-styles";
import { CreateInputIcon, DeleteInputIcon } from "./styles";

export default class ArtistInput extends Component {
  render() {
    const {
      value,
      changeHandler,
      showCreate,
      showDelete,
      createInput,
      deleteInput,
      innerRef,
    } = this.props;

    return (
      <DefaultWrapper>
        <DefaultBox
          as="input"
          placeholder="Artist"
          onChange={changeHandler}
          name="artistInput"
          value={value}
          type="text"
          ref={innerRef}
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
