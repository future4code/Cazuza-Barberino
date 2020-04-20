import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../reducers";
import { updateCurrentPage } from "../../reducers/routes/actions";
import { Pages } from "../../reducers/routes/types";

interface Props {}

const ProfileScreen = (props: Props) => {
  const profile = useSelector(
    (state: RootState) => state.profiles.currentProfile
  );

  const dispatch = useDispatch();

  if (profile)
    return (
      <Container>
        <Header>
          <ExitBtn
            onClick={() => dispatch(updateCurrentPage(Pages.MatchScreen))}
          >
            X
          </ExitBtn>
          <Name>{profile.name}</Name>
          <Photo src={profile.photo} />
        </Header>
        <Bio>{profile.bio}</Bio>
      </Container>
    );

  return <></>;
};

export default ProfileScreen;

const Container = styled.div`
  width: 100%;
  height: 100%;
  border: 2px solid red;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const Name = styled.p`
  font-size: 35px;
  color: white;
  text-align: center;
`;

const Bio = styled.p`
  padding: 20px;
  padding-top: 100px;
  font-size: 25px;
  text-align: justify;
  color: ${(props) => props.theme.primary};
`;

const Header = styled.div`
  position: relative;
  background-color: ${(props) => props.theme.primary};
  height: 200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
`;

interface AvatarProps {
  src: string;
}

const Photo = styled.div<AvatarProps>`
  position: relative;
  left: 0;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.5);
  flex-shrink: 0;
  height: 200px;
  width: 200px;
  margin-right: 10px;
  border-radius: 50%;
  background: url(${(props) => props.src});
  background-position: center center;
  background-size: 100%;
  background-repeat: no-repeat;
  border: 5px solid ${(props) => props.theme.secondary};
  background-color: ${(props) => props.theme.secondary};
`;

const ExitBtn = styled.div`
  box-sizing: content-box;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  background-color: ${(props) => props.theme.secondary};
  color: white;
  font-weight: bolder;
  font-size: 25px;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  text-align: center;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;

  :hover {
    filter: opacity(0.8);
  }
`;
