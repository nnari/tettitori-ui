import React, { useEffect, useState } from 'react';
import { Icon, Message, IconProps, Segment } from 'semantic-ui-react';

const css: any = {
    minWidth: "300px",
    borderLeft: "solid 15px",
    borderColor: "#32CD32",
    borderRadius: "0 !important",
    fontSize: "1.1em",
    position: "fixed",
    bottom: "10px",
    right: "10px",
    zIndex: 100,
}

interface Props {
    timeout: number,
}

let snackbarNotify = (message: string) => { };

const Snackbar = ({ timeout = 6000 }: Props) => {
    const [visible, setVisible] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    
    const openWithMessage = (message: string) => {
        setMessage(message);
        setVisible(true);
        setTimeout(() => setVisible(false), timeout);
    }

    snackbarNotify = openWithMessage;
    return visible ? (
        <Segment inverted style={css}>
            <b>
                {message}
            </b>
            <Icon
                name="times"
                style={{ float: "right", cursor: "pointer" }}
                onClick={() => setVisible(false)}
            />
        </Segment>
    ) : null;
}

export { Snackbar, snackbarNotify };