import { getAllProduct, getOneProduct } from '@/api/productApi'
import OneProduct from './OneProduct'
import Products from '@/components/homeComp/Products'

export async function generateMetadata({ params }) {
  const oneProduct = await getOneProduct(params?.id)

  return {
    title: oneProduct?.title,
    description: oneProduct?.description,
  }
}

const page = async ({ params }) => {
  const oneProduct = await getOneProduct(params?.id)
  const product = await getAllProduct({ limit: 8 })

  const formatDate = (data) => {
    const date = new Date(data)
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }

    return date.toLocaleDateString(undefined, options)
  }

  const info = [
    {
      name: 'Category',
      value: oneProduct?.category,
    },
    {
      name: 'Brand',
      value: oneProduct?.brand,
    },
    {
      name: 'Quantity',
      value: oneProduct?.quantity,
    },
    {
      name: 'Sold',
      value: oneProduct?.sold,
    },
    {
      name: 'Created',
      value: formatDate(oneProduct?.createdAt),
    },
    {
      name: 'Updated',
      value: formatDate(oneProduct?.updatedAt),
    },
  ]

  return (
    <>
      <div className="ml-0">
        <OneProduct product={product} info={info} oneProduct={oneProduct} />
      </div>
      <div className="ml-0">
        <Products products={product} oneProductPage={true} />
      </div>
    </>
  )
}

export default page
