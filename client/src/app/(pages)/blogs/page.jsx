import { getAllBlogs, getAllBlogsCategory } from '@/api/blogApi'
import BlogToShow from './BlogToShow'

const page = async () => {
  let blogs = await getAllBlogs()
  const categories = await getAllBlogsCategory()
  // console.log(categories)

  return (
    <>
      <BlogToShow blogs={blogs} categories={categories} />
    </>
  )
}

export default page
