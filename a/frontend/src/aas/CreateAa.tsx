import client from '../api'
import { FormikHelpers } from 'formik'
import React from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { Aa, AaError } from '../types'
import AaForm from './AaForm'
import { useHistory } from 'react-router-dom'

function CreateAa() {
  const queryClient = useQueryClient()
  const history = useHistory()
  const createAa = useMutation<Aa, AaError, Aa>(
    (values) => {
      return client.post('/api/v1/aas', values)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('aas')
      },
    }
  )

  const handleSubmit = (values: Aa, { setSubmitting }: FormikHelpers<Aa>) => {
    createAa.mutate(values)
    setSubmitting?.(false)
    history.push('/aas')
  }

  return <AaForm onSubmit={handleSubmit} />
}

export default CreateAa
