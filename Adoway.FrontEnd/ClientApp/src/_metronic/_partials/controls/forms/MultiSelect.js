import React from "react";
import { useField } from "formik";
import Select from "react-select";

export function MutiSelect({ name, options, values, label}) {
    const [field, state, { setValue, setTouched }] = useField(name);
    React.useEffect(() => {
        setValue(values);
    }, []);

    const onChange = (value) => {
        setValue(value);
    };
    return (
        <>
            {label && <label>Select {label}</label>}
            <Select
                options={options}
                value={state?.value}
                isMulti
                onChange={onChange}
                onBlur={setTouched}
            />
        </>
    );
}