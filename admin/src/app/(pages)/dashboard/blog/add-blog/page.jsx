import { getAllBlogsCategory } from '@/api/blogApi'
import AddingBlog from './Adding-blog'

const page = async () => {
  const blogCategory = await getAllBlogsCategory()
  return (
    <>
      <AddingBlog category={blogCategory} />
    </>
  )
}

export default page
