import Title from '@/components/Title'
import AddingCategory from './AddingCategory'

const page = () => {
  return (
    <div className="h-screen overflow-y-scroll">
      <Title title={'Create Category'} subtitle={'Create product category!'} />
      <AddingCategory />
    </div>
  )
}

export default page
