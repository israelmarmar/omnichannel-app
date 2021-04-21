
import { Input } from './styles';

export default function InputComponent({id, placeholder, type, onChange}){
    return(
        <Input className="input">
            <input type={type} id={id} name={id} placeholder={placeholder} onChange={event => onChange(event.target.value)} />
        </Input>
      );
}