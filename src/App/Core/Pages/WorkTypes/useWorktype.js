import {useState} from 'react';

const useWorktype = () => {

    const useNameState = useState('');
    const usePriceState = useState(0);

    return {
        useNameState,
        usePriceState
    }
}
export default useWorktype;