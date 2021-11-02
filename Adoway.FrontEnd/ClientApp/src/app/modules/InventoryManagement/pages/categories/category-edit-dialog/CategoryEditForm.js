// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
    Input,
    Select,
    DatePickerField
} from "../../../../../../_metronic/_partials/controls";

// Validation schema
const CategoryEditSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("Name is required"),
});

export function CategoryEditForm({
    saveCategory,
    category,
    actionsLoading,
    onHide,
}) {
    // Getting curret state of languages list from store (Redux)
    const { currentCategoriesState } = useSelector(
        (state) => ({ currentCategoriesState: state.categories }),
        shallowEqual
    );
    const { entities } = currentCategoriesState;
    const [filteredCategories, setFilteredCategories] = useState([]);
    useEffect(() => {
        let filterdList = category == null ? entities : entities.filter(e => e.id != category.id);
        setFilteredCategories(filterdList);
    }, [entities, category]);
    return (
        <>
            <Formik
                enableReinitialize={true}
                initialValues={category}
                validationSchema={CategoryEditSchema}
                onSubmit={(values) => {
                    saveCategory(values);
                }}
            >
                {({ values, handleSubmit, handleChange, handleBlur, setFieldValue }) => (
                    <>
                        <Modal.Body className="overlay overlay-block cursor-default">
                            {actionsLoading && (
                                <div className="overlay-layer bg-transparent">
                                    <div className="spinner spinner-lg spinner-success" />
                                </div>
                            )}
                            <Form className="form form-label-right">
                                <div className="form-group row">
                                    <div className="col-lg-12">
                                        <Field
                                            name="name"
                                            component={Input}
                                            placeholder="Name"
                                            label="Name"
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-lg-12">
                                        <Field
                                            name="description"
                                            as="textarea"
                                            className="form-control"
                                            label="Description"
                                        />
                                    </div>
                                </div>
                            
                                <div className="form-group row">
                                    <div className="col-lg-12">
                                        <Select name="parentId" label="Parent">
                                            <option value=""></option>
                                            {filteredCategories.map((entity) => (
                                                <option key={entity.id} value={entity.id}>
                                                    {entity.name}
                                                </option>
                                            ))}
                                        </Select>
                                    </div>
                                </div>
                           
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <button
                                type="button"
                                onClick={onHide}
                                className="btn btn-light btn-elevate"
                            >
                                Cancel
                            </button>
                            <> </>
                            <button
                                type="submit"
                                onClick={() => handleSubmit()}
                                className="btn btn-primary btn-elevate"
                            >
                                Save
                            </button>
                        </Modal.Footer>
                    </>
                )}
            </Formik>
        </>
    );
}
