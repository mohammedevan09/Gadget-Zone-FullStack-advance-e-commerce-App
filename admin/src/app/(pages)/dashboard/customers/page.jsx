import { getAllUser } from '@/api/userApi'
import Title from '@/components/Title'
import CustomersGrid from '@/grids/CustomersGrid'

const page = async () => {
  const data = await getAllUser()
  return (
    <div className="w-full h-screen overflow-y-scroll">
      <Title title={'Customers'} subtitle={'All customers data!'} />
      <div className="my-10"></div>
      <CustomersGrid data={data} />
      <div className="my-32"></div>
    </div>
  )
}

export default page
