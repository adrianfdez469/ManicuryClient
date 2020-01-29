import {gql} from 'apollo-boost';
const editClientMutation = gql`
mutation ($clientId: ID, $nombre: String!, $telefono: String, $direccion: String) {
    upsertClient(clientId:$clientId, name: $nombre, phone: $telefono, address: $direccion){            
        success
        message
        client {
            id
            name
            phone
            address
        }
    }
}
`;

const removeClientMutation = gql`
mutation($clientId: ID!){
    removeClient(clientId: $clientId){
        success
        message
    }
}
`;
const getClients = gql`
query {
    clients {
        success
        message
        client{
            id
            name
            phone
            address
        }
    }
}
`;

export {getClients, removeClientMutation, editClientMutation};