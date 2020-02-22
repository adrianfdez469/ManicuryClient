import {gql} from 'apollo-boost';
const editWorkTypeMutation = gql`
mutation ($workTypeId: ID, $wtcategoryId: ID!, $name: String!, $price: Float!) {
    upsertWorkType(workTypeId: $workTypeId, wtcategoryId: $wtcategoryId, name: $name, price: $price){            
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
            category {
                id
                name
                color
            }
        }
    }
}
`;

const getWorkTypeCategories = gql`
    query {
        worktypecategory {
            success
            message
            worktypecategory{
                id
                name
                color
            }
        }
    }
`;

export {getWorkTypeCategories, getWorkTypes, removeWorkTypeMutation, editWorkTypeMutation};