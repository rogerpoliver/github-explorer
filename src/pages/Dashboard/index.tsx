import React from "react";
import { FiChevronRight } from "react-icons/fi";
import logo from "../../assets/logo.svg";
import { Title, Form, Repositories } from "./styles";

const Dashboard: React.FC = () => {
  return (
    <>
      <img src={logo} alt="GitHub Explorer"></img>
      <Title>Explore Github repositories</Title>
      <Form>
        <input placeholder="Search the repository here..."></input>
        <button type="submit">Search</button>
      </Form>
      <Repositories>
        <a href="teste">
          <img
            src="https://avatars3.githubusercontent.com/u/30274518?s=460&u=b332aaee380877aaf48c66e1ef220588e46d9c7b&v=4"
            alt="Avatar"
          />
          <div>
            <strong>rogerpolvr/rogerpolvr</strong>
            <p>Descrição de teste</p>
          </div>
          <FiChevronRight size={20} />
        </a>
      </Repositories>
    </>
  );
};

export default Dashboard;
