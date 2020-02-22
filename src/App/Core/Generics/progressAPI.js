import React, { useState } from 'react';
import {LinearProgress} from '@material-ui/core';

const CustomProgress = props => {
    const {show} = props;
    return show && <LinearProgress color='secondary'/>;
}

const useProgress = (initialState = true) => {
    const [show, setShow] = useState(initialState);
    const ProgressElement = <CustomProgress show={show} />;
    return [ProgressElement, setShow];
}

export {useProgress};