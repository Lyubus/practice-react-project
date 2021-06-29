import { useState } from 'react';

import Card from './../UI/Card';
import Button from './../UI/Button';
import ErrorModal from './../UI/ErrorModal';
import classes from './AddUser.module.css';

const AddUser = (props) => {
    const [enteredUsername, setEnteredUsername] = useState('');
    const [enteredAge, setenteredAge] = useState('');
    const [error, setError] = useState();

    const addUserHabdler = (event) => {
        event.preventDefault();
        if (!enteredUsername.trim().length || !enteredAge.trim().length) {
            setError({
                title: 'Invalid input',
                message: 'Please enter a valid name and age (non-empty values).'
            });
            return;
        }

        if (+enteredAge < 1) {
            setError({
                title: 'Invalid age',
                message: 'Please enter a valid age (>0).'
            });
            return;
        }
        props.onAddUser(enteredUsername, enteredAge);
        setEnteredUsername('');
        setenteredAge('');
    };

    const usernameChangeHandler = (event) => {
        setEnteredUsername(event.target.value);
    };

    const ageChangeHandler = (event) => {
        setenteredAge(event.target.value);
    };

    const errorHandler = () => {
        setError(null);
    };

    return (
        <div>
            {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler}></ErrorModal>}
            <Card className={classes.input}>
                <form onSubmit={addUserHabdler}>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" onChange={usernameChangeHandler} value={enteredUsername}></input>

                    <label htmlFor="age">Age (Years)</label>
                    <input type="number" id="age" onChange={ageChangeHandler} value={enteredAge}></input>

                    <Button type="submit">Add User</Button>
                </form>
            </Card>
        </div>
    );
};

export default AddUser;