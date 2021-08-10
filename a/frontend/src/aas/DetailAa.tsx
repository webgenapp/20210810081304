import React from 'react'
import { useParams } from 'react-router-dom'
import client from '../api'
import { useQuery } from 'react-query'
import { Aa } from '../types'

function DetailAa() {
  const { id } = useParams<{ id: string }>()

  const { data, isLoading } = useQuery<Aa>(['aas', id], () =>
    client.get(`/api/v1/aas/${id}`).then((response) => response.data)
  )

  if (isLoading) {
    return <div>Loading...</div>
  }

  const aa = data as Aa

  return (
    <div>
      <label>{aa.a}</label>
      <br />
    </div>
  )
}

export default DetailAa
