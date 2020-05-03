import React, { Component } from "react";
import { Avatar, List, ListItem, ListText, Container } from "./styled";
import { connector, Props } from "./types";
import { Pages } from "../../reducers/routes/types";

class MatchScreen extends Component<Props> {
  render() {
    const { matches, setCurrenteProfile, updateCurrentPage } = this.props;

    return (
      <Container>
        <List>
          {matches &&
            matches.map((match) => (
              <ListItem
                key={match.id}
                onClick={() => {
                  updateCurrentPage(Pages.ProfileScreen);
                  setCurrenteProfile(match);
                }}
              >
                <Avatar src={match.photo} />
                <ListText>{match.name}</ListText>
              </ListItem>
            ))}
        </List>
      </Container>
    );
  }
}

export default connector(MatchScreen);
