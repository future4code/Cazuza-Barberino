import React from "react";
import styled from "styled-components";
import { TextField, Grid, Button } from "@material-ui/core";

interface Props {}

const TrustfulForm = (props: Props) => {
  const [stole, setStole] = React.useState(false);

  return (
    <Container>
      {!stole ? (
        <>
          <Msg>
            Você alcançou o seu limite de matches diários. Mas não fique triste!
            Para continuar basta apenas preencher corretamente os campos abaixo.
            <span role="img" aria-label="heart">
              ♥️
            </span>
          </Msg>
          <Form onSubmit={() => setStole(true)}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <TextField
                  fullWidth={true}
                  variant="outlined"
                  label="Nome Completo"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth={true} variant="outlined" label="CPF" />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth={true}
                  variant="outlined"
                  label="Numero do Cartão"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth={true}
                  variant="outlined"
                  label="Data de Expiração"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth={true}
                  variant="outlined"
                  label="Código de Segurança"
                />
              </Grid>
              <Grid item xs={3} />
              <Grid item xs={6}>
                <SubmitBtn type="submit" fullWidth={true} variant="contained">
                  Enviar
                </SubmitBtn>
              </Grid>
              <Grid item xs={3} />
            </Grid>
          </Form>
        </>
      ) : (
        <>
          <BigMsg>Parabéns!</BigMsg>
          <Msg>
            Você foi roubado.
            <span role="img" aria-label="heart">
              ♥️
            </span>
          </Msg>
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Form = styled.form``;

const Msg = styled.p`
  text-align: center;
`;

const BigMsg = styled.h2`
  color: ${(props) => props.theme.primary};
  text-align: center;
`;

const SubmitBtn = styled(Button)`
  background: ${(props) => props.theme.secondary};
`;

export default TrustfulForm;
