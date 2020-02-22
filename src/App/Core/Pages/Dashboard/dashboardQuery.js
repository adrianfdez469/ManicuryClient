import {gql} from 'apollo-boost';

const DashBoardData = gql`
    query($worktypeIds: [ID], $wtcategoryIds: [ID], $before: Date, $after:Date) {
        totalSpends(dateRange: {before: $before, after: $after}){
            success
            message
            total
        }
        totalIngresses(worktypeIds: $worktypeIds, wtcategoryIds: $wtcategoryIds, dateRange: {before: $before, after: $after}, ){
            success
            message
            total
        }
        ingresses(dateRange: {before:$before, after: $after}, 
            pagination: {start: null, limit: null}, worktypeIds: $worktypeIds, wtcategoryIds: $wtcategoryIds){
            success
            message
            ingress{
                ingressAmount
                date
                workType{
                    id
                    name
                    category{
                        id
                        name
                    }
                }
            }
        }
        spends(dateRange: {before:$before, after: $after}, , pagination: {start: null, limit: null}){
            success
            message
            spend{
                spendamount
                date
            }
        }
    }
`;

export {DashBoardData}