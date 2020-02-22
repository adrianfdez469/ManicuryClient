import {useState} from 'react';

const useWorktype = () => {

    const useCategoryState = useState(null);
    const useNameState = useState('');
    const usePriceState = useState(0);

    return {
        useCategoryState,
        useNameState,
        usePriceState
    }
}
export default useWorktype;