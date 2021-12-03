import { HexColorPicker } from "react-colorful";
import React, { useState } from 'react';
import {useField} from "formik"
export const ColorPicker = (props) => {
  
    const [field, meta, helpers] = useField(props.name);
    const [color, setColor] = useState(field.value);
    debugger;
    const handleChange = color => {
        setColor(color);
    };
    return <HexColorPicker color={color} onChange={handleChange} />;
};