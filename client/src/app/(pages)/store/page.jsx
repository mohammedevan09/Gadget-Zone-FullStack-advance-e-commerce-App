import { getAllCategory } from '@/api/categoryApi'
import ProductsShow from './ProductsShow'
import { getAllProduct } from '@/api/productApi'
import { getAllBrands } from '@/api/othersApi'

const page = async ({ searchParams }) => {
  const categories = await getAllCategory()
  const brand = await getAllBrands()

  const copiedCategories = categories.slice()

  const queryParams = {}
  if (searchParams.brand) {
    queryParams.brand = searchParams.brand
  }
  if (searchParams.category) {
    queryParams.category = searchParams.category
  }
  if (searchParams.search) {
    queryParams.title = searchParams.search
  }
  if (searchParams.sort) {
    queryParams.sort = searchParams.sort
  }

  // console.log(queryParams)

  let product = await getAllProduct(queryParams)

  return (
    <ProductsShow
      product={product}
      copiedCategories={copiedCategories}
      categories={categories}
      brand={brand}
    />
  )
}

export default page
