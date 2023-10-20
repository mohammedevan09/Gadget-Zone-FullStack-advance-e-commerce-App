import { getAllUser } from '@/api/userApi'
import { getAllProduct } from '@/api/productApi'
import { getAllOrders } from '@/api/orderApi'

import Bar from '@/charts/Bar'
import Title from '../Title'
import Pie from '@/charts/Pie'
import ProductsGrid from '@/grids/ProductsGrid'
import Main from './Main'
import { getAllBlogs } from '@/api/blogApi'

const Dashboard = async ({ searchParams }) => {
  // const queryParams = {}
  // if (searchParams?.limit) {
  //   queryParams.limit = searchParams.limit
  // } else {
  //   queryParams.limit = 10
  // }

  const users = await getAllUser()
  const products = await getAllProduct()
  const orders = await getAllOrders()
  const blogs = await getAllBlogs()

  return (
    <div className="w-full h-screen overflow-y-auto grid grid-cols-12 justify-center">
      <div className="grid col-span-12 lg:mx-7 mx-1">
        <Title title={'DashBoard'} subtitle={'Welcome to your Dashboard'} />
        <Main users={users} products={products} orders={orders} blogs={blogs} />
      </div>
      <div className="xl:col-span-7 col-span-12 min-h-[390px] sm:min-h-[550px]">
        <Bar products={products} />
      </div>
      <div className="xl:col-span-5 col-span-12 min-h-[390px] sm:min-h-[550px]">
        <Pie products={products} />
      </div>

      <div className="col-span-12 mx-7 my-4">
        <ProductsGrid products={products} />
      </div>
      <div className="my-10"></div>
    </div>
  )
}

export default Dashboard
