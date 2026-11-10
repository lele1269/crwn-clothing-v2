import { useState } from 'react'

const formFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUp = () =>{

const [formValues, setFormValues] = useState(formFields);

const { displayName, email, password, confirmPassword } = formValues;

const onChangeHandler = (e) =>{
    const { name, value } = e.target;
    setFormValues({
        ...formValues,
        [name]: value
    });
}
    return (
      <div>
        <h1>Sign Up form</h1>
        <form onSubmit={() => {}}>
          <label>Display Name:</label>
          <input
            onChange={onChangeHandler}
            name="displayName"
            type="text"
            value={displayName}
            required
          />
          <label>Email:</label>
          <input
            onChange={onChangeHandler}
            name="email"
            type="email"
            value={email}
            required
          />
          <label>Password:</label>
          <input
            onChange={onChangeHandler}
            name="password"
            type="password"
            value={password}
            required
          />
          <label>Confirm Password:</label>
          <input
            onChange={onChangeHandler}
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            required
          />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    );
}
export default SignUp;