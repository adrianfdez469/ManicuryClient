import React, { useState } from 'react';
import {LinearProgress} from '@material-ui/core';

const CustomProgress = props => {
    const {show} = props;
    return show && <LinearProgress color='secondary'/>;
}

const useProgress = () => {
    const [show, setShow] = useState(true);
    const ProgressElement = <CustomProgress show={show} />;
    return [ProgressElement, setShow];
}

export {useProgress};