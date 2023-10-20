'use client'

import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid'
import { MdDeleteOutline } from 'react-icons/md'
import { FiEdit3 } from 'react-icons/fi'
import { QuickSearchToolbar } from './ProductsGrid'
import Image from 'next/image'

const BlogListGrid = ({ data, limit = 5 }) => {
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
            field: 'images',
            headerName: 'Image',
            flex: 0.2,
            renderCell: (params) => {
              const imageUrl = params.value && params.value[0]?.url
              // console.log(imageUrl)
              return (
                <Image
                  src={imageUrl}
                  alt="Product"
                  width={500}
                  height={500}
                  className="product-img max-w-[75px]"
                />
              )
            },
            headerAlign: 'center',
            align: 'center',
          },
          {
            field: 'title',
            headerName: 'Title',
            flex: 0.2,
            editable: false,
            headerAlign: 'center',
            align: 'center',
          },
          {
            field: 'description',
            headerName: 'Description',
            flex: 0.2,
            editable: false,
            headerAlign: 'center',
            align: 'center',
          },
          {
            field: 'category',
            headerName: 'Category',
            flex: 0.2,
            editable: false,
            headerAlign: 'center',
            align: 'center',
          },
          {
            field: 'likes',
            headerName: 'Likes',
            flex: 0.1,
            editable: false,
            renderCell: (param) => {
              return param?.value?.length
            },
            headerAlign: 'center',
            align: 'center',
          },
          {
            field: 'dislikes',
            headerName: 'DisLikes',
            flex: 0.1,
            editable: false,
            renderCell: (param) => {
              return param?.value?.length
            },
            headerAlign: 'center',
            align: 'center',
          },
          {
            field: 'numViews',
            headerName: 'Total Views',
            flex: 0.2,
            editable: false,
            headerAlign: 'center',
            align: 'center',
          },
          {
            field: 'author',
            headerName: 'Author',
            flex: 0.2,
            editable: false,
            headerAlign: 'center',
            align: 'center',
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
        ]}
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

export default BlogListGrid
