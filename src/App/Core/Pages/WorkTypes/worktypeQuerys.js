import {gql} from 'apollo-boost';
const editWorkTypeMutation = gql`
mutation ($workTypeId: ID, $name: String!, $price: Float!) {
    upsertWorkType(workTypeId: $workTypeId, name: $name, price: $price){            
        success
        message
        worktype {
            id
            name
            price
        }
    }
}
`;

const removeWorkTypeMutation = gql`
mutation($workTypeId: ID!){
    removeWorkType(workTypeId: $workTypeId){
        success
        message
    }
}
`;
const getWorkTypes = gql`
query {
    worktypes {
        success
        message
        worktype {
            id
            name
            price
        }
    }
}
`;

export {getWorkTypes, removeWorkTypeMutation, editWorkTypeMutation};