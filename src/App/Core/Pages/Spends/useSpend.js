import {useState} from 'react';

const useSpend = () => {

    const useSpendTypeState = useState('');
    const useSpendAmmountState = useState(0);
    const useSpendDate = useState(new Date());

    return {
        useSpendTypeState,
        useSpendAmmountState,
        useSpendDate
    }
}
export default useSpend;