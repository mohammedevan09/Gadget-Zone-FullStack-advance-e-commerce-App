'use client'

import { Box } from '@mui/material'
import {
  DataGrid,
  GridActionsCellItem,
  GridToolbarContainer,
  GridToolbarQuickFilter,
} from '@mui/x-data-grid'
import { MdDeleteOutline } from 'react-icons/md'
import { FiEdit3 } from 'react-icons/fi'
import Ratings from '@/components/Ratings'
import { FaRegEye } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

const ProductsGrid = ({ products, limit = 5 }) => {
  const router = useRouter()

  const viewProduct = (id) => {
    router.push(`${process.env.NEXT_PUBLIC_MAIN_SITE}${id}`)
  }

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
            field: 'view',
            headerName: 'View',
            type: 'actions',
            flex: 0.1,
            getActions: (params) => [
              <GridActionsCellItem
                key={params.row._id}
                icon={<FaRegEye color="#ff7b92" size={22} />}
                label="View"
                onClick={() => viewProduct(params.row._id)}
              />,
            ],
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
            field: 'totalRating',
            headerName: 'Ratings',
            flex: 0.2,
            editable: false,
            renderCell: (params) => {
              const totalRatingsCount = params.row.ratings.length
              return (
                <div className="flex items-center justify-start gap-2">
                  <Ratings item={params?.value} size={19} />{' '}
                  <div className="text-white text-xl">{params?.value}</div>
                  <div>{`(${totalRatingsCount})`}</div>
                </div>
              )
            },
            headerAlign: 'center',
            align: 'center',
          },
          {
            field: 'category',
            headerName: 'Category',
            flex: 0.1,
            editable: false,
            headerAlign: 'center',
            align: 'center',
          },
          {
            field: 'brand',
            headerName: 'Brand',
            flex: 0.1,
            editable: false,
            headerAlign: 'center',
            align: 'center',
          },
          {
            field: 'price',
            headerName: 'Price',
            sortable: false,
            flex: 0.1,
            renderCell: (params) => {
              const price = Number(params.value).toFixed(2)
              return `$${price}`
            },
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
          //     <GridActionsCellItem
          //       icon={<MdDeleteOutline color="#ff7b92" size={22} />}
          //       label="Delete"
          //       //   onClick={() => deleteData(params.id)}
          //     />,
          //   ],
          //   headerAlign: 'center',
          //   align: 'center',
          // },
        ]}
        rows={products}
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

export default ProductsGrid

export function QuickSearchToolbar() {
  return (
    <Box
      sx={{
        p: 0.5,
        pb: 0,
        color: 'white',
      }}
    >
      <GridToolbarContainer>
        <GridToolbarQuickFilter />
      </GridToolbarContainer>
    </Box>
  )
}
