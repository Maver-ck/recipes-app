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

class RecipesUpdate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
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

  handleUpdateRecipe = async (event) => {
    const { id, name, type } = this.state;
    const payload = { name, type };

    await api.updateRecipeById(id, payload).then((res) => {
      window.alert(`Recipe updated successfully`);
      this.setState({
        name: "",
        type: "",
      });
    });
  };

  componentDidMount = async () => {
    const { id } = this.state;
    const recipe = await api.getRecipeById(id);

    this.setState({
      name: recipe.data.data.name,
      type: recipe.data.data.type,
    });
  };

  render() {
    const { name, type } = this.state;
    return (
      <Wrapper>
        <Title>Update Recipe</Title>

        <Label>Name: </Label>
        <InputText
          type="text"
          value={name}
          onChange={this.handleChangeInputName}
        />

        <InputText
          type="text"
          value={type}
          onChange={this.handleChangeInputType}
        />

        <Button onClick={this.handleUpdateRecipe}>Update Recipe</Button>
        <CancelButton href={"/recipes/list"}>Cancel</CancelButton>
      </Wrapper>
    );
  }
}

export default RecipesUpdate;
