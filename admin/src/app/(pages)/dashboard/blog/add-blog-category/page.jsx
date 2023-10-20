import Title from '@/components/Title'
import AddingBlogCategory from './Adding-Blog-category'

const page = () => {
  return (
    <div className="text-center">
      <Title title={'Add Blog Category'} subtitle={'Create a blog category!'} />
      <div className="my-10"></div>
      <AddingBlogCategory />
    </div>
  )
}

export default page
