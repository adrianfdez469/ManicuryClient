import {gql} from 'apollo-boost';

const DashBoardData = gql`
    query($before: Date, $after:Date) {
        totalSpends(dateRange: {before: $before, after: $after}){
            success
            message
            total
        }
        totalIngresses(dateRange: {before: $before, after: $after}){
            success
            message
            total
        }
    }
`;

export {DashBoardData}