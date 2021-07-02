import { useState, useRef } from 'react';

import Card from './../UI/Card';
import Button from './../UI/Button';
import ErrorModal from './../UI/ErrorModal';
import classes from './AddUser.module.css';

const AddUser = (props) => {
    const nameInputRef = useRef();
    const ageInputRef = useRef();

    const [error, setError] = useState();

    const addUserHabdler = (event) => {
        event.preventDefault();
        const enteredName = nameInputRef.current.value;
        const enteredUserAge = ageInputRef.current.value;

        if (!enteredName.trim().length || !enteredUserAge.trim().length) {
            setError({
                title: 'Invalid input',
                message: 'Please enter a valid name and age (non-empty values).'
            });
            return;
        }

        if (+enteredUserAge < 1) {
            setError({
                title: 'Invalid age',
                message: 'Please enter a valid age (>0).'
            });
            return;
        }
        props.onAddUser(enteredName, enteredUserAge);
        nameInputRef.current.value = ''
        ageInputRef.current.value = ''
    };

    const errorHandler = () => {
        setError(null);
    };

    return (
        <>
            {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler}></ErrorModal>}
            <Card className={classes.input}>
                <form onSubmit={addUserHabdler}>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" ref={nameInputRef}></input>

                    <label htmlFor="age">Age (Years)</label>
                    <input type="number" id="age" ref={ageInputRef}></input>

                    <Button type="submit">Add User</Button>
                </form>
            </Card>
        </>
    );
};

export default AddUser;