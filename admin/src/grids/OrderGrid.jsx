'use client'

import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid'
import { MdDeleteOutline } from 'react-icons/md'
import { FaRegEye } from 'react-icons/fa'
import { FiEdit3 } from 'react-icons/fi'
import { QuickSearchToolbar } from './ProductsGrid'
import { useSelector } from 'react-redux'
import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'

const OrderGrid = ({ data, limit = 5 }) => {
  const pathname = usePathname()
  const router = useRouter()

  const viewOrder = (id) => {
    router.push(`${pathname}/${id}`)
  }

  return (
    <div>
      <DataGrid
        columns={[
          {
            field: '_id',
            headerName: 'ID',
            flex: 0.1,
            headerAlign: 'center',
            align: 'center',
          },
          {
            field: 'view',
            headerName: 'View',
            type: 'actions',
            flex: 0.05,
            getActions: (params) => [
              <>
                <GridActionsCellItem
                  key={params.row._id}
                  icon={<FaRegEye color="#ff7b92" size={22} />}
                  label="Delete"
                  onClick={() => viewOrder(params.row._id)}
                />
              </>,
            ],
            headerAlign: 'center',
            align: 'center',
          },
          {
            field: 'products[0].product',
            headerName: 'Products',
            flex: 0.1,
            renderCell: (params) => {
              const imageUrl = params?.row?.products[0]?.product?.images[0]?.url
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
            field: 'products',
            headerName: 'Total Quantity',
            flex: 0.07,
            editable: false,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => {
              const TotalCount = params.value.reduce((acc, curr) => {
                acc += curr?.quantity
                return acc
              }, 0)
              return <div>{TotalCount}</div>
            },
          },
          {
            field: 'payment_status',
            headerName: 'Payment Status',
            flex: 0.1,
            editable: false,
            headerAlign: 'center',
            align: 'center',
          },
          {
            field: 'delivery_status',
            headerName: 'Delivery Status',
            flex: 0.1,
            editable: false,
            headerAlign: 'center',
            align: 'center',
          },
          {
            field: 'shipping.address',
            headerName: 'Address',
            flex: 0.1,
            editable: false,
            renderCell: (params) => {
              return (
                <div>
                  {params?.row?.shipping?.address?.city +
                    ', ' +
                    params?.row?.shipping?.address?.country}
                </div>
              )
            },
            headerAlign: 'center',
            align: 'center',
          },
          {
            field: 'shipping.phone',
            headerName: 'Phone No',
            flex: 0.1,
            editable: false,
            renderCell: (params) => {
              return <div>{params?.row?.shipping?.phone}</div>
            },
            headerAlign: 'center',
            align: 'center',
          },
          {
            field: 'shipping.email',
            headerName: 'Order By',
            flex: 0.1,
            editable: false,
            renderCell: (params) => {
              return <div>{params?.row?.shipping?.email}</div>
            },
            headerAlign: 'center',
            align: 'center',
          },
          {
            field: 'subtotal',
            headerName: 'Total Price',
            sortable: false,
            flex: 0.1,
            renderCell: (params) => {
              const price = Number(params.value / 100).toFixed(2)
              return `$${price}`
            },
            headerAlign: 'center',
            align: 'center',
          },
          {
            field: 'createdAt',
            headerName: 'Created At',
            flex: 0.1,
            editable: false,
            headerAlign: 'center',
            align: 'center',
          },
          {
            field: 'updatedAt',
            headerName: 'Updated At',
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

export default OrderGrid
