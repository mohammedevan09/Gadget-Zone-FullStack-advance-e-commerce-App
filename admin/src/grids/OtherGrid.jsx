'use client'

import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid'
import { MdDeleteOutline } from 'react-icons/md'
import { FiEdit3 } from 'react-icons/fi'
import { QuickSearchToolbar } from './ProductsGrid'

const OtherGrid = ({ data, headerName, limit = 5 }) => {
  const columns = [
    {
      field: '_id',
      headerName: 'ID',
      flex: 0.2,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'title',
      headerName: headerName,
      flex: 0.2,
      editable: false,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        return (
          <>
            {headerName !== 'Colors' ? (
              params.value
            ) : (
              <div className="grid justify-center items-center gap-2">
                <div
                  className={`rounded-full mx-auto`}
                  style={{
                    background: params.value.toLowerCase(),
                    width: '20px',
                    height: '20px',
                  }}
                ></div>
                <div className="text-[20px]">{params?.value}</div>
              </div>
            )}
          </>
        )
      },
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
      flex: 0.2,
      editable: false,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'updatedAt',
      headerName: 'Updated At',
      flex: 0.2,
      editable: false,
      headerAlign: 'center',
      align: 'center',
    },
    // {
    //   field: 'actions',
    //   headerName: 'Actions',
    //   type: 'actions',
    //   flex: 0.2,
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
  ]

  return (
    <div>
      <DataGrid
        columns={columns}
        rows={data}
        getRowId={(row) => row?._id}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: limit,
            },
          },
        }}
        rowHeight={70}
        pageSizeOptions={[limit, 10, 25]}
        disableRowSelectionOnClick
        slots={{ toolbar: QuickSearchToolbar }}
      />{' '}
    </div>
  )
}

export default OtherGrid
