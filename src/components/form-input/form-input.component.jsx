import { FormInputLable, Input, Group }from './form-input.styles';

const FormInput = ({label, ...otherProps}) => {
   return (
    <Group>
        <Input {...otherProps} />
        { label && (                                                                                         //if label exists then render the label in the ( ) 
        <FormInputLable shrink={otherProps.value.length}> {label} </FormInputLable>)}   
    </Group>
        // if otherProps have any value(true) then this boolean will be passed on as prop otherwise false will be passed on 
   ); 
};

export default FormInput;