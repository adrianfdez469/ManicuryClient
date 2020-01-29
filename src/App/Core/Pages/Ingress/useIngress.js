import {useState} from 'react';

const useClient = () => {

    const useNameState = useState('');
    const usePhoneState = useState('');
    const useAddressState = useState('');

    return {
        useNameState,
        usePhoneState,
        useAddressState
    }
}
export default useClient;