import React from "react";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from 'yup';

import "./trees.css"

const BASE_URL = "http://localhost:3004";

const SignupSchema = Yup.object().shape({
    name: Yup.string()
        .min(1, 'Too Short!')
        .max(100, 'Too Long!')
        .required('Required'),
    addres: Yup.string()
        .min(1, 'Too Short!')
        .max(100, 'Too Long!')
        .required('Required'),
    addres2: Yup.string()
        .max(100, 'Too Long!'),
    city: Yup.string()
        .min(1, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    state: Yup.string()
        .min(2, 'Too Short!')
        .max(2, 'Too Long!')
        .required('Required'),
    code: Yup.string()
        .min(5, 'Is have to be 5 letter')
        .max(5, 'Is have to be 5 letter')
        .required('Required'),
});

function searchTree(element, matchingTitle) {
    if (element.id === matchingTitle) {
        return element;
    } else if (element.child != null) {
        let i;
        let result = null;
        for (i = 0; result == null && i < element.child.length; i++) {
            result = searchTree(element.child[i], matchingTitle);
        }
        return result;
    }
    return null;
}


export default class Trees extends React.Component {
    constructor(props) {
        super(props);


        this.state = {
            posts: []
        };
        fetch(`${BASE_URL}/posts`)
            .then(response => response.json())
            .then(data => {
                const posts = data;
                this.setState({posts})
            })
    }


    render() {
        if (!this.state.posts[0]) return <div>Loading...</div>;
        let element = this.state.posts[0];
        let result = searchTree(element, 4);

        return <div>
            <div>{console.log(result)}</div>
            <Formik
                initialValues={{
                    name: '',
                    addres: '',
                    addres2: '',
                    city: '',
                    state: '',
                    code: ''
                }}
                validationSchema={SignupSchema}
                onSubmit={values => {
                    // same shape as initial values
                    console.log(values);
                }}
            >
                {({
                      errors,
                      touched,
                      handleReset,
                      isSubmitting,
                      values,
                      dirty,
                      handleChange,
                      handleBlur,
                  }) => (
                    <Form>
                        <label>Name</label>
                        <Field name="name"/>
                        {errors.name && touched.name ? (
                            <div className="error">{errors.name}</div>
                        ) : null}
                        <label>Address</label>
                        <Field name="addres"/>
                        {errors.addres && touched.addres ? (
                            <div className="error">{errors.addres}</div>
                        ) : null}
                        <label>Address 2</label>
                        <Field name="addres2"/>
                        {errors.addres2 && touched.addres2 ? (
                            <div className="error">{errors.addres2}</div>
                        ) : null}
                        <label>City</label>
                        <Field name="city"/>
                        {errors.city && touched.city ? (
                            <div className="error">{errors.city}</div>
                        ) : null}
                        <label>State</label>
                        <select
                            name="state"
                            value={values.state}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            style={{ display: 'block' }}
                        >
                            <option value="" label="Select state" />
                            <option value="05" label="05" />
                            <option value="43" label="43" />
                            <option value="127" label="127" />
                        </select>
                        {errors.state && touched.state ? (
                            <div className="error">{errors.state}</div>
                        ) : null}
                        <label>Code</label>
                        <Field name="code"/>
                        {errors.code && touched.code ? (
                            <div className="error">{errors.code}</div>
                        ) : null}

                        <button type="submit" disabled={isSubmitting} >
                            Submit
                        </button>
                        <button
                            type="button"
                            className="outline"
                            onClick={handleReset}
                            disabled={!dirty || isSubmitting}
                        >
                            Reset
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    }
}

