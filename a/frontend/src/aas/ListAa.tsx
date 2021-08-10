import React from 'react'
import { useQueryClient, useQuery, useMutation } from 'react-query'
import client from '../api'
import { Aa } from '../types'
import { useHistory } from 'react-router-dom'

type AaPreviewProps = {
  aa: Aa
  handleEdit: (aa: Aa) => void
  handleDelete: (aa: Aa) => void
  handleDetail: (aa: Aa) => void
}

function AaPreview({
  aa,
  handleEdit,
  handleDelete,
  handleDetail,
}: AaPreviewProps) {
  return (
    <>
      {aa.a}
      <br />
      <button type='button' onClick={() => handleDetail(aa)}>
        detail
      </button>
      <button type='button' onClick={() => handleEdit(aa)}>
        edit
      </button>
      <button type='button' onClick={() => handleDelete(aa)}>
        delete
      </button>
    </>
  )
}

function ListAas() {
  const history = useHistory()
  const queryClient = useQueryClient() // eslint-disable-line no-unused-vars
  const aasQuery = useQuery<Aa[]>('aas', () => {
    return client
      .get('/api/v1/aas')
      .then((response) => response.data) as Promise<Aa[]>
  })

  const deleteAa = useMutation<any, any, Partial<Aa>>(
    ({ id }) => {
      return client.delete(`/api/v1/aas/${id}`)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('aas')
      },
    }
  )

  const handleEdit = ({ id }: Aa) => {
    history.push(`/aas/update/${id}`)
  }

  const handleDelete = ({ id }: Aa) => {
    deleteAa.mutate({ id })
  }

  const handleDetail = ({ id }: Aa) => {
    history.push(`/aas/detail/${id}`)
  }

  return (
    <>
      <p>{aasQuery.data?.length} aas</p>
      <ul>
        {aasQuery.data?.map((aa) => (
          <li key={aa.id}>
            <AaPreview
              aa={aa}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              handleDetail={handleDetail}
            />
          </li>
        ))}
      </ul>
    </>
  )
}

export default ListAas
