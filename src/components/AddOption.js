import React from 'react';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';

const CREATE_INDECISION = gql`
  mutation createIndecision($data: IndecisionInput){
    createIndecision(data: $data)
  }
`

export default class AddOption extends React.Component {

  state = {
    error: undefined,
    title: ''
  };

  handleAddOption = (e, update) => {
    e.preventDefault();

    this.setState({
      title: e.target.elements.option.value.trim()
    })
    
    const option = e.target.elements.option.value.trim();

    const data = {
      title: option
    }

    const error = this.props.handleAddOption(option);

    this.setState(() => ({ error }));

    if (!error) {
      e.target.elements.option.value = '';
    }
    
    if(data.title === ''){
      e.target.elements.option.value = '';
    }else{
      update({
        variables: {
          data
        }
      })
      e.target.elements.option.value = '';
    }
  };

  renderAddOption = (update) => {
    return (
    <form className="add-option" onSubmit={(e) => this.handleAddOption(e, update)}>
      <input className="add-option__input" type="text" name="option" />
      <button className="button">Add Option</button>
    </form>)
  }

  render() {    

    return (
      <div>
        {this.state.error && <p className="add-option-error">{this.state.error}</p>}
        <Mutation 
          mutation={CREATE_INDECISION}
          refetchQueries={["indecisionList"]}
          onCompleted={data => {
            this.props.onCompletedCreate({
              id: data.createIndecision,
              title: this.state.title
            });
          }}
        >
          {
            this.renderAddOption
          }
        </Mutation>


      </div>
    );
  }
}
