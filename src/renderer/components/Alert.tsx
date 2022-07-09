import * as React from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";

type AlertAction = {
    text: string,
    onPress: () => void
}

interface AlertProps {
    title: string;
    description?: string;
    content?: JSX.Element[];
    actions: AlertAction[],
    onClose: () => void,
    isOpen: boolean
}

export function Alert({title, content, description, actions, onClose, isOpen}: AlertProps) {

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {description}
                </DialogContentText>
                {content}
            </DialogContent>
            <DialogActions>
                {
                    actions.map(item => {
                        return (
                            <Button onClick={item.onPress}>{item.text}</Button>
                        )
                    })
                }
            </DialogActions>
        </Dialog>

    );
}
