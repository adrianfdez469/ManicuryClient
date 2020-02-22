import {useState} from 'react';

const useIngress = () => {

    const useWorkTypeState = useState(null);
    const useClientState = useState(null);
    const useAmmountState = useState(0);
    const useTipState = useState(0);
    const useDateState = useState(new Date());

    return {
        useWorkTypeState,
        useClientState,
        useAmmountState,
        useTipState,
        useDateState
    }
}
export default useIngress;