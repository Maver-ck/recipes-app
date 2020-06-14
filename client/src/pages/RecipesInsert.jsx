import React, { Component } from "react";
import styled from "styled-components";
import api from "../api";

const Title = styled.h1.attrs({
  className: "h1",
})``;

const Wrapper = styled.div.attrs({
  className: "form-group",
})`
  margin: 0 30px;
`;

const Label = styled.label`
  margin: 5px;
`;

const InputText = styled.input.attrs({
  className: "form-control",
})`
  margin: 5px;
`;

const Button = styled.button.attrs({
  className: `btn btn-primary`,
})`
  margin: 15px 15px 15px 5px;
`;

const CancelButton = styled.a.attrs({
  className: `btn btn-danger`,
})`
  margin: 15px 15px 15px 5px;
`;

class RecipesInsert extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      type: "",
    };
  }

  handleChangeInputName = async (event) => {
    const name = event.target.value;
    this.setState({ name });
  };

  handleChangeInputType = async (event) => {
    const type = event.target.value;
    this.setState({ type });
  };

  handleIncludeRecipe = async (event) => {
    const { name, type } = this.state;
    const payload = { name, type };

    await api.insertRecipe(payload).then((res) => {
      window.alert("Recipe inserted successfully");
      this.setState({
        name: "",
        type: "",
      });
    });
  };

  render() {
    const { name, type } = this.state;
    return (
      <Wrapper>
        <Title>Create Recipe</Title>
        <Label>Name: </Label>
        <InputText
          type="text"
          value={name}
          onChange={this.handleChangeInputName}
        />

        <Label>Type: </Label>
        <InputText
          type="text"
          value={type}
          onChange={this.handleChangeInputType}
        />

        <Button onClick={this.handleIncludeRecipe}>Add Recipe</Button>
        <CancelButton href={"/recipes/list"}>Cancel</CancelButton>
        <div>
          <p>In this page you'll see the form to add a recipe</p>
        </div>
      </Wrapper>
    );
  }
}

export default RecipesInsert;
