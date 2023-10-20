import Title from '@/components/Title'
import AddingBrand from './AddingBrand'

const page = () => {
  return (
    <div>
      <Title title={'Create Brands'} subtitle={'Add A New Brand!'} />
      <div className="my-10"></div>
      <AddingBrand />
    </div>
  )
}

export default page
