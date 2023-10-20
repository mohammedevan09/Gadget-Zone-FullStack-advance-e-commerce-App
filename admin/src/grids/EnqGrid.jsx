'use client'

import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid'
import { MdDeleteOutline } from 'react-icons/md'
import { FiEdit3 } from 'react-icons/fi'
import { QuickSearchToolbar } from './ProductsGrid'

const EnqGrid = ({ data }) => {
  return (
    <div>
      <DataGrid
        columns={[
          {
            field: '_id',
            headerName: 'ID',
            flex: 0.2,
            headerAlign: 'center',
            align: 'center',
          },
          {
            field: 'name',
            headerName: 'Name',
            flex: 0.1,
            editable: false,
            headerAlign: 'center',
            align: 'center',
          },
          {
            field: 'email',
            headerName: 'Email',
            flex: 0.2,
            editable: false,
            headerAlign: 'center',
            align: 'center',
          },
          {
            field: 'mobile',
            headerName: 'Mobile',
            flex: 0.1,
            editable: false,
            headerAlign: 'center',
            align: 'center',
          },
          {
            field: 'comment',
            headerName: 'Comment',
            flex: 0.3,
            editable: false,
            headerAlign: 'center',
            align: 'center',
          },
          {
            field: 'status',
            headerName: 'Status',
            flex: 0.1,
            editable: false,
            headerAlign: 'center',
            align: 'center',
          },
          // {
          //   field: 'actions',
          //   headerName: 'Actions',
          //   type: 'actions',
          //   flex: 0.1,
          //   getActions: (params) => [
          //     // <GridActionsCellItem
          //     //   icon={<FiEdit3 color="#6fddff" size={22} />}
          //     //   label="Edit"
          //     //   // onClick={() => editData(params.id)}
          //     // />,
          //     // <GridActionsCellItem
          //     //   icon={<MdDeleteOutline color="#ff7b92" size={22} />}
          //     //   label="Delete"
          //     //   //   onClick={() => deleteData(params.id)}
          //     // />,
          //   ],
          //   headerAlign: 'center',
          //   align: 'center',
          // },
        ]}
        rows={data}
        getRowId={(row) => row?._id}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        rowHeight={70}
        pageSizeOptions={[10, 15, 25]}
        disableRowSelectionOnClick
        slots={{ toolbar: QuickSearchToolbar }}
      />{' '}
    </div>
  )
}

export default EnqGrid
