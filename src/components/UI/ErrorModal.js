import ReactDom from 'react-dom';

import Card from './Card';
import Button from './Button';
import classes from './ErrorModal.module.css';

const Backdrop = (props) => {
    return (
        <div onClick={props.onConfirm} className={classes.backdrop}></div>
    )
}

const ModalOverlay = (props) => {
    return (
        <Card className={classes.modal}>
            <header className={classes.header}>
                <h2>{props.title}</h2>
            </header>
            <div className={classes.content}>
                <p>{props.message}</p>
            </div>
            <footer className={classes.actions}>
                <Button onClick={props.onConfirm}>Ok</Button>
            </footer>
        </Card>
    )
}

const ErrorModal = (props) => {
    return (
        <>
            {ReactDom.createPortal(<Backdrop onConfirm={props.onConfirm}></Backdrop>, document.getElementById('backdrop-root'))}
            {ReactDom.createPortal(<ModalOverlay title={props.title} message={props.message} onConfirm={props.onConfirm}></ModalOverlay>, document.getElementById('overlay-root'))}
        </>
    )
}

export default ErrorModal;