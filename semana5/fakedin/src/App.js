import React from "react";
import "./App.css";
import BigCard from "./Components/BigCard/BigCard";
import SmallCard from "./Components/SmallCard/SmallCard";
import ImgBtn from "./Components/ImgBtn/ImgBtn";
import SectionTitle from "./Components/SectionTitle/SectionTitle";

function App() {
  return (
    <div className="App">
      <SectionTitle title="Dados Pessoais" />
      <BigCard
        cardTitle="Astrodev"
        cardText="Oi, eu sou o Astrodev. Sou chefe dos alunos da Future4.
         Adoro pedir e-mails na sexta-feira e esperar os alunos
          responderem só para responder com uma bronca e dar mais
           trabalho para eles."
        cardImg={require("./images/astronauta2.png")}
      />
      <SmallCard
        cardTitle="Email"
        cardImg={require("./images/mail.png")}
        cardText="future4code@gmail.com"
      />
      <SmallCard
        cardTitle="Address"
        cardImg={require("./images/home-run.png")}
        cardText="Rua do Futuro, 4"
      />
      <ImgBtn btnImg={require("./images/down-arrow.png")} btnText="Ver mais" />
      <SectionTitle title="Experiências Profissionais" />
      <BigCard
        cardTitle="Future4"
        cardText="Formando Desenvolvedores para o futuro!"
        cardImg={require("./images/f4icon.png")}
      />
      <SectionTitle title="Redes Sociais" />
      <ImgBtn btnImg={require("./images/facebook.png")} btnText="Facebook" />
    </div>
  );
}

export default App;
