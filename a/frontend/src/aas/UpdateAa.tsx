import client from '../api'
import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import AaForm from './AaForm'
import { Aa } from '../types'
import { useQuery, useMutation, useQueryClient } from 'react-query'

function UpdateAa() {
  const { id } = useParams<{ id: string }>()
  const queryClient = useQueryClient()
  const history = useHistory()

  const { data, isLoading } = useQuery<Aa>(['aas', id], () =>
    client.get(`/api/v1/aas/${id}`).then((response) => response.data)
  )

  const updateAa = useMutation<Aa, any, Aa>(
    (values: Aa) =>
      client.put(`/api/v1/aas/${id}`, values).then((response) => response.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('aas')
      },
    }
  )

  if (isLoading) {
    return <div>Loading...</div>
  }

  const aa = data as Aa
  return (
    <AaForm
      aa={aa}
      onSubmit={(values, { setSubmitting }) => {
        updateAa.mutate(values)
        setSubmitting?.(false)
        history.push('/aas')
      }}
    />
  )
}

export default UpdateAa
