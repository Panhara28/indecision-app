import React from 'react';
import AddOption from './AddOption';
import Action from './Action';
import Header from './Header';
import Options from './Options';
import OptionModal from './OptionModal';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

const GET_INDECISIONS = gql`
  query indecisionList($limit: Int = 0, $offset: Int = 0) {
    indecisionList(limit: $limit, offset: $offset){
      id
      title
    }
  }
`;

export default class IndecisionApp extends React.Component {

  state = {
    options: [],
    selectedOption: undefined
  };
  
  handleDeleteOptions = () => {
    this.setState(() => ({ options: [] }));
  };

  handleClearSelectedOption = () => {
    this.setState(() => ({ selectedOption: undefined }));
  }


  handlePick = () => {
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[randomNum];
    this.setState(() => ({
      selectedOption: option.title
    }));
  };

  handleAddOption = (option) => {
    let err = undefined;

    if (!option) {
      return 'Enter valid value to add item';
    }else{
      this.state.options.map(x => {
        if(x.title === option){
          err = 'This option already exists'; 
        }
      })
      return err;
    }



  };

  render() {
    const subtitle = 'Put your life in the hands of a computer';

    return (
      <div>
        <Header subtitle={subtitle} />
        <div className="container">
          <Action
            hasOptions={this.state.options.length > 0}
            handlePick={this.handlePick}
          />
          <div className="widget">
            <Query 
              query={GET_INDECISIONS}
              onCompleted={(data) => this.setState({ options: data.indecisionList })}
              variables={{
                limit: 10,
                offset: 0
              }}
            >
              {
                ({ loading, data }) => {
                  if(loading) return <div>Loading....</div>                  
                  return <Options
                    options={data.indecisionList}
                    handleDeleteOptions={this.handleDeleteOptions}
                  />
                }
              }
            </Query>

            <AddOption
              handleAddOption={this.handleAddOption}
            />
          </div>
        </div>
        <OptionModal
          selectedOption={this.state.selectedOption}
          handleClearSelectedOption={this.handleClearSelectedOption}
        />
      </div>
    );
  }
}
