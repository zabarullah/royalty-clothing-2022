import './form-input.styles.scss';

const FormInput = ({label, ...otherProps}) => {
   return (
    <div className="group">
        <input className="form-input" {...otherProps} />
        { label && (                                                                                         //if label exists then render the label in the ( ) 
        <label className={`${otherProps.value.length ? 'shrink' : null} form-input-label`}> {label} </label>)}  {/* if there is a value typed in it(otherProps.value.length) then add class shrink otherwise null, where it wont do anything. Besides this, there will always be a class form-input-label */}
    </div>
   ); 
};

export default FormInput;