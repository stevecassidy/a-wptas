
import {useState} from 'react';   


const ImageBlock = ({label, image, respond, callback}: any) => {

    const [selected, setSelected] = useState(false);

    const onClick = () => {
        if (respond) {
            callback(!selected);
            setSelected(!selected);
        }
    }

    let className = 'image';
    if (selected) {
        className += ' selected';
    }

    return (                
    <div className={className} onClick={onClick}>
        <img src={image} alt={label}></img>
    </div>
    )
}

export default ImageBlock;