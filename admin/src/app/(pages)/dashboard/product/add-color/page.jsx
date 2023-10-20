import Title from '@/components/Title'
import AddingColor from './AddingColor'

const page = () => {
  return (
    <div>
      <Title title={'Create Color'} subtitle={'Add A New Color!'} />
      <div className="my-10"></div>
      <AddingColor />
    </div>
  )
}

export default page
