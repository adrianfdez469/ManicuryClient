import {useState} from 'react';

const useIngress = () => {

    const useWorkTypeState = useState("");
    const useClientState = useState("");
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