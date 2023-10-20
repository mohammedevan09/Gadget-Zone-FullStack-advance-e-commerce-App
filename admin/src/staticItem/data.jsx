import { AiOutlineHome, AiOutlineFileSearch } from 'react-icons/ai'
import {
  BsPeople,
  BsCartPlus,
  BsDropletHalf,
  BsFillBoxSeamFill,
} from 'react-icons/bs'
import {
  BiBookHeart,
  BiSolidBookAdd,
  BiCategory,
  BiBookReader,
} from 'react-icons/bi'
import { FaListCheck, FaCartArrowDown } from 'react-icons/fa6'
import { SiGoldenline } from 'react-icons/si'
import { MdViewList } from 'react-icons/md'
import { GiDroplets } from 'react-icons/gi'
import { ImList } from 'react-icons/im'
import { CgMenuGridR } from 'react-icons/cg'

export const navItems = [
  {
    text: 'Dashboard',
    icon: <AiOutlineHome color="#6fddff" size={28} />,
    link: '/dashboard/',
  },
  {
    text: 'Product',
    icon: <BsFillBoxSeamFill color="#6fddff" size={24} />,
    link: '/dashboard/product',
    options: [
      {
        text: 'Product List',
        icon: <FaListCheck color="#6ca5ff" size={20} />,
        link: '/dashboard/product',
      },
      {
        text: 'Add Product',
        icon: <BsCartPlus color="#6ca5ff" size={20} />,
        link: '/dashboard/product/add-product',
      },
      {
        text: 'Add Brand',
        icon: <SiGoldenline color="#6ca5ff" size={20} />,
        link: '/dashboard/product/add-brand',
      },
      {
        text: 'Brand List',
        icon: <MdViewList color="#6ca5ff" size={20} />,
        link: '/dashboard/product/brand-list',
      },
      {
        text: 'Add Category',
        icon: <BiCategory color="#6ca5ff" size={20} />,
        link: '/dashboard/product/add-category',
      },
      {
        text: 'Category List',
        icon: <ImList color="#6ca5ff" size={20} />,
        link: '/dashboard/product/category-list',
      },
      {
        text: 'Add Color',
        icon: <BsDropletHalf color="#6ca5ff" size={20} />,
        link: '/dashboard/product/add-color',
      },
      {
        text: 'Color List',
        icon: <GiDroplets color="#6ca5ff" size={20} />,
        link: '/dashboard/product/color-list',
      },
    ],
  },
  {
    text: 'Customers',
    icon: <BsPeople color="#6fddff" size={28} />,
    link: '/dashboard/customers',
  },
  {
    text: 'Blog',
    icon: <BiBookHeart color="#6fddff" size={28} />,
    link: '/dashboard/blog',
    options: [
      {
        text: 'Blog List',
        icon: <FaListCheck color="#6ca5ff" size={20} />,
        link: '/dashboard/blog',
      },
      {
        text: 'Add Blog',
        icon: <BiSolidBookAdd color="#6ca5ff" size={20} />,
        link: '/dashboard/blog/add-blog',
      },
      {
        text: 'Add blog Category',
        icon: <BiCategory color="#6ca5ff" size={20} />,
        link: '/dashboard/blog/add-blog-category',
      },
      {
        text: 'Blog Category List',
        icon: <CgMenuGridR color="#6ca5ff" size={20} />,
        link: '/dashboard/blog/blog-category-list',
      },
    ],
  },
  {
    text: 'Orders',
    icon: <FaCartArrowDown color="#6fddff" size={28} />,
    link: '/dashboard/orders',
  },
  // {
  //   text: 'Catalog',
  //   icon: <BiBookReader color="#6fddff" size={28} />,
  //   link: '/dashboard/catalog',
  // },
  {
    text: 'Enquiries',
    icon: <AiOutlineFileSearch color="#6fddff" size={28} />,
    link: '/dashboard/enquiries',
  },
]

export const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

export const formattedMonths = [
  { x: 'Jan', y: 0 },
  { x: 'Feb', y: 0 },
  { x: 'Mar', y: 0 },
  { x: 'Apr', y: 0 },
  { x: 'May', y: 0 },
  { x: 'Jun', y: 0 },
  { x: 'Jul', y: 0 },
  { x: 'Aug', y: 0 },
  { x: 'Sep', y: 0 },
  { x: 'Oct', y: 0 },
  { x: 'Nov', y: 0 },
  { x: 'Dec', y: 0 },
]

export const colorGenerator = (currentColorIndex) => {
  const colors = [
    '#6fddff',
    '#539eff',
    '#ff6fdd',
    '#ff539e',
    '#6fffdd',
    '#6effff',
    '#ffdd6f',
    '#ff956f',
    '#6fdd95',
    '#957fff',
    '#dd6fff',
    '#6fddaa',
    '#ffaa6f',
    '#aaff6f',
    '#6faaff',
    '#ddaaff',
    '#aaffdd',
  ]

  // const color = currentColorIndex % 2 === 0 ? colors[0] : colors[1]

  return colors[currentColorIndex]
}

export const colorGeneratorBar = () => {
  return '#' + (((1 << 24) * Math.random()) | 0).toString(16).padStart(6, '0')
}
