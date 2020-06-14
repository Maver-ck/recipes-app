import React, { Component } from "react";
import ReactTable from "react-table";
import api from "../api";

import styled from "styled-components";

import "react-table/react-table.css";

const Wrapper = styled.div`
  padding: 0 40px 40px 40px;
`;

const Update = styled.div`
  color: #ef9b0f;
  cursor: pointer;
`;

const Delete = styled.div`
  color: #ff0000;
  cursor: pointer;
`;

class UpdateRecipe extends Component {
  updatedUser = (event) => {
    event.preventDefault();
    window.location.href = `/recipes/update/${this.props.id}`;
  };

  render() {
    return <Update onClick={this.updatedUser}>Update</Update>;
  }
}

class DeleteRecipe extends Component {
  deleteUser = (event) => {
    event.preventDefault();
    if (
      window.confirm(
        `Do tou want to delete the recipe ${this.props.id} permanently?`
      )
    ) {
      api.deleteRecipeById(this.props.id);
      window.location.reload();
    }
  };

  render() {
    return <Delete onClick={this.deleteUser}>Delete</Delete>;
  }
}

class RecipesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      columns: [],
      isLoading: false,
    };
  }

  componentDidMount = async () => {
    this.setState({ isLoading: true });

    await api.getAllRecipes().then((recipes) => {
      this.setState({
        recipes: recipes.data.data,
        isLoading: false,
      });
    });
  };

  render() {
    const { recipes, isLoading } = this.state;
    console.log("TCL: RecipesList -> render -> recipes", recipes);

    const columns = [
      {
        Header: "ID",
        accessor: "_id",
        filterable: true,
      },
      {
        Header: "Name",
        accessor: "name",
        filterable: true,
      },
      {
        Header: "Type",
        accessor: "type",
        filterable: true,
      },
      {
        Header: "",
        accessor: "",
        Cell: function (props) {
          return (
            <span>
              <DeleteRecipe id={props.original._id} />
            </span>
          );
        },
      },
      {
        Header: "",
        accessor: "",
        Cell: function (props) {
          return (
            <span>
              <UpdateRecipe id={props.original._id} />
            </span>
          );
        },
      },
    ];

    let showTable = recipes.length ? true : false;

    return (
      <Wrapper>
        {showTable && (
          <ReactTable
            data={recipes}
            columns={columns}
            loading={isLoading}
            defaultPageSize={10}
            showPageSizeOptions={true}
            minRows={0}
          />
        )}
      </Wrapper>
    );
  }
}

export default RecipesList;
