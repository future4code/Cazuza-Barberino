import React, { Component } from "react";
import { DefaultBox } from "../global-style";
import styled from "styled-components";
import { connect } from "react-redux";
import { setFilter, setSort } from "../../actions/postExhibition";

export class ExhibitionMenu extends Component {
  render() {
    const { filter, sort, setFilter, setSort } = this.props;

    return (
      <Container>
        <Label>Sort by: </Label>
        <Select
          value={sort}
          onChange={(event) => {
            setSort(event.target.value);
          }}
          name="sort"
          as="select"
        >
          <Option as="option" value="new">
            New
          </Option>
          <Option as="option" value="top_rated">
            Top Rated
          </Option>
          <Option as="option" value="hot">
            Hot
          </Option>
        </Select>
        <Label>Filter: </Label>
        <Select
          value={filter}
          onChange={(event) => {
            setFilter(event.target.value);
          }}
          name="filter"
          as="select"
        >
          <Option value="all_posts" as="option">
            All Posts
          </Option>
          <Option value="my_posts" as="option">
            My Posts
          </Option>
        </Select>
      </Container>
    );
  }
}

const stateToProps = (state) => ({
  filter: state.exhibition.filter,
  sort: state.exhibition.sort,
});

const dispatchToProps = {
  setFilter: (filter) => setFilter(filter),
  setSort: (sort) => setSort(sort),
};

export default connect(stateToProps, dispatchToProps)(ExhibitionMenu);

const Container = styled(DefaultBox)`
  padding: 8px 16px;
  display: grid;
  justify-content: start;
  align-content: center;
  align-items: center;
  grid-auto-flow: column;
  column-gap: 16px;
  cursor: auto;
`;

const Label = styled.label``;

const Select = styled(DefaultBox)`
  height: 32px;
  padding: 4px 8px;
  border: none;
  -webkit-appearance: none;
`;

const Option = styled(DefaultBox)`
  display: grid;
  place-content: center;
  text-align: center;
`;
