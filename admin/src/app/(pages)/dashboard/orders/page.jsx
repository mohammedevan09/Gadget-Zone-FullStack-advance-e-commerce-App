import { getAllOrders } from '@/api/orderApi'
import Title from '@/components/Title'
import OrderGrid from '@/grids/OrderGrid'

const page = async () => {
  const data = await getAllOrders()
  return (
    <div className="w-full h-screen overflow-y-scroll">
      <Title title={'Orders'} subtitle={'All Orders List!'} />
      <div className="my-10"></div>
      <OrderGrid data={data} limit={10} />
      <div className="my-32"></div>
    </div>
  )
}

export default page
