import { push } from "connected-react-router";
import React from "react";
import { useDispatch } from "react-redux";
import styled, { css } from "styled-components";
import { Routes } from "../../App";
import LoadingSpinner from "../../Components/LoadingSpinner";
import { setSubscribeID } from "../../reducers/trips/actions";
import { getTripDetails } from "../../services/api";
import CandidateCard from "../CandidateCard";
import { Btn } from "../global-styled";

interface Props {
  trip: {
    id: string;
    date: string;
    name: string;
    description: string;
    planet: string;
    durationInDays: number;
  };
}

interface Candidate {
  id: string;
  applicationText: string;
  profession: string;
  age: number;
  name: string;
  country: string;
}

interface Candidates {
  approved: Candidate[];
  pendencies: Candidate[];
}

type CandidatesAction =
  | { type: "DECIDE"; payload: { id: string; approve: boolean } }
  | { type: "SET_CANDIDATES"; payload: { candidates: Candidates } };

const reducer = (state: Candidates, action: CandidatesAction): Candidates => {
  switch (action.type) {
    case "SET_CANDIDATES":
      return action.payload.candidates;
    case "DECIDE":
      let candidateToDecide = null;
      const newPendencies = state.pendencies.filter((candidate) => {
        if (candidate.id === action.payload.id) {
          candidateToDecide = candidate;
          return false;
        } else return true;
      });
      const newApproved = [...state.approved];
      if (action.payload.approve && candidateToDecide)
        newApproved.push(candidateToDecide);
      return {
        approved: newApproved,
        pendencies: newPendencies,
      };
    default:
      return state;
  }
};

const TripCard = ({ trip }: Props) => {
  const { name, description, planet, durationInDays, date, id } = trip;

  const [showCandidates, setShowCandidates] = React.useState(false);

  const [loading, setLoading] = React.useState(false);

  const [candidates, candidatesDispatch] = React.useReducer(reducer, {
    approved: [],
    pendencies: [],
  });

  const dispatch = useDispatch();

  const decideAction = React.useCallback(
    (approve: boolean, id: string) =>
      candidatesDispatch({
        type: "DECIDE",
        payload: {
          id,
          approve,
        },
      }),
    []
  );

  const tripDetailsReponse = (
    pendencies: Candidate[],
    approved: Candidate[]
  ) => {
    setLoading(false);
    candidatesDispatch({
      type: "SET_CANDIDATES",
      payload: {
        candidates: {
          approved,
          pendencies,
        },
      },
    });
  };

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoading(true);
      getTripDetails(token, id, tripDetailsReponse);
    }
  }, []);

  return (
    <div>
      <Container>
        <TripDataWrapper>
          <div>
            <h2>{name}</h2>
            <h4>{description}</h4>
          </div>
          <div>
            <p>
              <strong>Planeta: </strong>
              {planet}.
            </p>
            <p>
              <strong>Duração: </strong>
              {durationInDays} dias.
            </p>
            <p>
              <strong>Data: </strong>
              {date}
            </p>
          </div>
        </TripDataWrapper>
        <BtnWrapper>
          {loading ? (
            <LoadingSpinner />
          ) : (
            <>
              <Btn
                color="secondary"
                onClick={() => {
                  dispatch(setSubscribeID(id));
                  dispatch(push(Routes.tripSubscription));
                }}
              >
                Inscrever-se
              </Btn>
              {(candidates.pendencies.length > 0 ||
                candidates.approved.length > 0) && (
                <Btn
                  color="secondary"
                  onClick={() => setShowCandidates((c) => !c)}
                >
                  {!showCandidates ? "Mostrar " : "Esconder "}Candidatos
                  {candidates.pendencies.length > 0 && (
                    <Badge>{candidates.pendencies.length}</Badge>
                  )}
                </Btn>
              )}
            </>
          )}
        </BtnWrapper>
      </Container>
      <CandidateContainer
        nOfCandidates={
          candidates.pendencies.length + candidates.approved.length
        }
        showCandidates={
          showCandidates &&
          candidates.pendencies.length + candidates.approved.length > 0
        }
      >
        {candidates.pendencies.map((candidate) => (
          <CandidateCard
            tripID={id}
            approved={false}
            key={candidate.id}
            candidate={candidate}
            decideAction={decideAction}
          />
        ))}
        {candidates.approved.map((candidate) => (
          <CandidateCard
            tripID={id}
            approved={true}
            key={candidate.id}
            candidate={candidate}
            decideAction={decideAction}
          />
        ))}
      </CandidateContainer>
    </div>
  );
};

const Container = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  background-color: ${(props) => props.theme.light};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.4);
  color: ${(props) => props.theme.secondary};
`;

const TripDataWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 3;
  width: 500px;
  row-gap: 20px;
`;

const Badge = styled.div`
  pointer-events: none;
  background-color: #b33771;
  border-radius: 4px;
  padding: 4px;
`;

const BtnWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  flex: 1;
`;

interface CandidateContainerProps {
  showCandidates: boolean;
  nOfCandidates: number;
}

const CandidateContainer = styled.div<CandidateContainerProps>`
  width: 95%;
  margin: 0 auto;
  background-color: ${(props) => props.theme.light};
  padding: 20px;
  overflow: hidden;
  transition: 0.3s;
  height: ${(props) => `${props.nOfCandidates * 130 + 20}px`};
  display: flex;
  flex-direction: column;
  row-gap: 20px;

  ${(props) =>
    !props.showCandidates &&
    css`
      height: 0;
      padding: 0 20px;
    `};
`;

export default TripCard;
