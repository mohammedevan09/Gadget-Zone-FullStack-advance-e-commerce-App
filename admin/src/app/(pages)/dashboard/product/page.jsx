import { getAllProduct } from '@/api/productApi'
import ProductsGrid from '@/grids/ProductsGrid'
import Title from '@/components/Title'

const page = async () => {
  const products = await getAllProduct()
  return (
    <div className="h-screen overflow-y-scroll">
      <Title title={'Products List'} subtitle={'List of all products!'} />
      <div className="my-10"></div>

      <ProductsGrid products={products} limit={10} />
      <div className="my-32"></div>
    </div>
  )
}

export default page
