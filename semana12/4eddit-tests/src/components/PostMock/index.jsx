import React, { Component } from "react";
import { FaCommentAlt } from "react-icons/fa";
import { RiArrowUpSLine } from "react-icons/ri";
import { GoArrowDown, GoArrowUp } from "react-icons/go";
import styled, { keyframes } from "styled-components";
import { DefaultBox, RateButton } from "../global-style";

class PostMock extends Component {
  "";
  render() {
    return (
      <Container>
        <RateBar>
          <RateButton>
            <GoArrowUp color="#fff" size="20px" />
          </RateButton>
          <PlaceHolderPill width="40%" />
          <RateButton>
            <GoArrowDown color="#fff" size="20px" />
          </RateButton>
        </RateBar>
        <PostContent>
          <PlaceHolderPill />
          <PlaceHolderPill width="70%" height={18} />
          <PlaceHolderPill width="100%" height={14} />
          <PlaceHolderPill width="100%" height={14} />
          <PlaceHolderPill width="30%" height={14} />
          <PostActions>
            <PostButton>
              <FaCommentAlt />
              Comments{"  "}
              <RotatableIcon>
                <RiArrowUpSLine size="16px" />
              </RotatableIcon>
            </PostButton>
          </PostActions>
        </PostContent>
      </Container>
    );
  }
}

export default PostMock;

const mockAnimation = keyframes`
  0%{background-position:0% 50%}
  100%{background-position:200% 50%}
`;

const PlaceHolderPill = styled.div.attrs((props) => ({
  height: props.height || 12,
  borderRadius: props.height / 2 || 6,
  width: props.width || "50%",
}))`
  background: linear-gradient(90deg, #999, #ddd, #999);
  background-size: 200% 200%;
  animation: ${mockAnimation} 2s linear infinite;
  width: ${({ width }) => width};
  height: ${({ height }) => `${height}px`};
  border-radius: ${({ borderRadius }) => `${borderRadius}px`};
`;

const expand = keyframes`
  0%{
    transform: scale(0);
  }
  100%{
    transform: scale(1);
  }
`;

const Container = styled(DefaultBox)`
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 40px 1fr;
  border: 1px solid #fff;
  transition: transform 0.2s, box-shadow 0.2s;
  animation: ${expand} 0.2s ease-out;
  padding-bottom: 12px;

  &:hover {
    border: 1px solid #999;
    transform: translateY(-4px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }
`;

const RateBar = styled.div`
  position: relative;
  top: -4px;
  left: -8px;
  z-index: 1;
  /* background-color: #f7f9fa; */
  background-color: #ed7f61;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(3, 24px);
  justify-items: center;
  align-items: center;
  border-bottom-right-radius: 40px;
  border-top-left-radius: 4px;
  box-shadow: 7px 3px 10px rgba(0, 0, 0, 0.2);

  padding: 8px 4px;
`;

const PostContent = styled.div`
  width: 100%;
  padding: 8px;
  display: grid;
  justify-items: flex-start;
  align-items: flex-start;
  row-gap: 8px;
`;

const PostActions = styled.div`
  display: grid;
  align-items: center;
`;

const PostButton = styled.div`
  display: grid;
  grid-template-columns: 20px 1fr 20px;
  align-items: center;
  color: #999;
  padding: 4px;
  border-radius: 4px;
  font-size: 12px;
  user-select: none;

  &:hover {
    background-color: #eee;
  }
`;

const RotatableIcon = styled.div`
  transition: 0.2s ease-out;
  transform: rotate(${(props) => (props.showComments ? "180deg" : "0deg")});
  display: grid;
  place-content: center;
`;
