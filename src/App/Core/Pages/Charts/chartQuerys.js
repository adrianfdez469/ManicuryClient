import {gql} from 'apollo-boost';

const DataIngresosGastos = gql`
query {
    ingresses{
      ingress{
        ingressAmount
        date
      }
    }
    
    spends{
      spend{
        spendamount
        date
      }
    }
  }
`;

export {DataIngresosGastos}