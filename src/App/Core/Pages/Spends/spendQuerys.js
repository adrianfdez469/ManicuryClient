import {gql} from 'apollo-boost';
const editSpendMutation = gql`
    mutation ($spendId: ID, $spendtype: String!, $spendammount: Float!, $date: Date) {
        upsertSpend(spendId: $spendId, spendtype: $spendtype, amount: $spendammount, date: $date){
            success
            message
            spend{
            id
            spendtype
            spendamount
            date
            }
        }
    }
`;

const removeSpendMutation = gql`
mutation($spendId: ID!){
    removeSpend(spendId: $spendId){
      success
      message
    }
  }
`;
const getSpends = gql`
query ($spendtype: String, $gte:Float, $lte: Float, $eq: Float, $before: Date, $after: Date, $start: Int, $limit: Int){
    spends(
          spendtype: $spendtype,
          spendamount: {gte:$gte, lte:$lte, eq: $eq},
          dateRange:{
            before: $before,
            after: $after
        },
          pagination:{
            start: $start,
            limit: $limit
        }
    ){
      success
      message
      spend{
        id
        spendtype
        spendamount
        date
      }
    }
  }
`;

export {getSpends, removeSpendMutation, editSpendMutation};