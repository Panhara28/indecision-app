import React from 'react';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';

const REMOVE_INDECISION = gql`
  mutation removeIndecision($id: Int!){
    removeIndecision(id: $id)
  }
`

const Option = (props) => {  
  return (
    <div className="option">
      <p className="option__text">{props.count}. {props.optionText}</p>
      <Mutation 
        mutation={REMOVE_INDECISION}
        refetchQueries={["indecisionList"]}
      >
       {
         (update) => {
           return <button
            className="button button--link"
              onClick={() => {
                props.handleDeleteOption(props.optionId);
                update({
                  variables: {
                    id: Number(props.optionId)
                  }
                })
              }}
            >
            remove
           </button>
         }
       }
      </Mutation>

    </div>
  );
  
}
export default Option;
