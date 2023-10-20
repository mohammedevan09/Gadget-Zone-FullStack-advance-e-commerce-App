import Title from '@/components/Title'

const page = async () => {
  return (
    <div className="h-screen overflow-y-scroll">
      <Title title={'Catalogs'} subtitle={'All catalogs data!'} />
      <div className="my-10"></div>
    </div>
  )
}

export default page
