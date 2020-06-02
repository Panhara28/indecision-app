import React from 'react';
import Option from './Option';
import { gql } from 'apollo-boost';
import { Mutation} from 'react-apollo';

const REMOVE_ALL_INDECISION = gql`
  mutation removeAllIndecision($option: String = "all"){
    removeAllIndecision(option: $option)
  }
`

const Options = (props) => {

  return (
    <div>
      <div className="widget-header">
        <h3 className="widget-header__title">Your Options</h3>
        <Mutation 
          mutation={REMOVE_ALL_INDECISION}
          refetchQueries={["indecisionList"]}
        >
          {
            (update) => {
              return(
                <button
                  className="button button--link"
                  onClick={() => {
                    update({
                      option: "all"
                    })
                  }}
                >
                Remove All
               </button>
              )
            }
          }
        </Mutation>

      </div>
  
      {props.options.length === 0 && <p className="widget__message">Please add an option to get started!</p>}
      {
        props.options.map((option, index) => (
          <Option
            key={option}
            optionText={option.title}
            optionId={option.id}
            count={index + 1}
            handleDeleteOption={() => props.handleDeleteOption(option.id)}
          />
        ))
      }
    </div>
  );
}

export default Options;
