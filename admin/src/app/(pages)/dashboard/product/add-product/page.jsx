import Title from '@/components/Title'
import { getAllCategory } from '@/api/categoryApi'
import AddingProduct from './Adding-Product'
import { getAllBrands } from '@/api/othersApi'

const page = async () => {
  const category = await getAllCategory()
  const brands = await getAllBrands()
  return (
    <div className="w-full h-screen overflow-y-scroll">
      <Title title={'Create Products'} subtitle={'Add A New product!'} />
      <div className="my-10"></div>
      <AddingProduct category={category} brands={brands} />
      <div className="my-32"></div>
    </div>
  )
}

export default page
