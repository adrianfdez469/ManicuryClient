import {gql} from 'apollo-boost';

const editIngressMutation = gql`
mutation ($ingressId: ID, $worktypeId: ID!, $clientId: ID,
    $ammount: Float!, $tip: Float!, $date: Date
  ) {
    upsertIngress(
      ingressId: $ingressId, 
      worktypeId: $worktypeId, 
      clientId: $clientId,
      amount: $ammount,
      tip: $tip,
      date: $date
    ){
      success
      message
      ingress{
        id
      }
    }
  }
`;

const removeIngressMutation = gql`
mutation($ingressId: ID!) {
    removeIngress(ingressId: $ingressId){
      success
      message
    }
  }
`;

const getIngresses = gql`
query($worktype: String, $clientname: String, $ingress_gte: Float, $ingress_lte: Float, $ingress_eq: Float,
        $tip_gte: Float, $tip_lte: Float, $tip_eq: Float, 
        $wtcategoryIds: [ID],$before: Date, $after: Date, $start: Int, $limit: Int
    ) {
    ingresses(
        worktype: $worktype,
        client: $clientname,
        ingress: {gte: $ingress_gte, lte:$ingress_lte,eq:$ingress_eq},
        tip: {gte: $tip_gte, lte:$tip_lte,eq:$tip_eq},
        dateRange:{ before: $before, after: $after },
        pagination:{start: $start, limit: $limit},
        wtcategoryIds: $wtcategoryIds   
    )
    {
      success
      message
      ingress {
        id
        workType{
          id 
          name 
          price
          category {
            id
            name
            color
          }
        }
        client {id name phone address imgUrl}
        ingressAmount
        tip
        date      
      }
    }
  }
`;

export {getIngresses, removeIngressMutation, editIngressMutation};