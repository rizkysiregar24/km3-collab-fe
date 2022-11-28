import { useState } from "react";
import "./FormInput.css"

const FormInput = (props) => {
    const [focused,setFocused] = useState(false)
    const { label, errorMessage, onChange, id, ...inputProps } = props;

    const handleFokus = (e) => {
        setFocused(true);
    };
    return (
        <div className="formInput">
            <label>{label}</label>
            <input
             {...inputProps} 
             onChange={onChange} 
             onBlur={handleFokus} 
             focused={focused.toString()} />
            <span>{errorMessage}</span>
        </div>
    );
};

export default FormInput;  