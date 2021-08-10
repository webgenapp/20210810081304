import React from 'react'
import { Formik, Field, Form, FormikHelpers } from 'formik'
import { Aa } from '../types'

type CreateProps = {
  aa?: Aa
  onSubmit: (values: Aa, helpers: FormikHelpers<Aa>) => void
}

function AaForm({ aa, onSubmit }: CreateProps) {
  const initialValues: Aa = {
    a: aa ? aa.a : '',
  }

  return (
    <Formik
      initialValues={initialValues}
      validate={() => {
        return {}
      }}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field type='text' name='a' placeholder='A' />

          <button type='submit' disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  )
}

export default AaForm
