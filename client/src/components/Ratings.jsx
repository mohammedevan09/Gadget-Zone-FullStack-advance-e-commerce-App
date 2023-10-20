'use client'

import Rating from 'react-rating'
import { BsStarFill, BsStar } from 'react-icons/bs'

const Ratings = ({ item, color, size }) => {
  return (
    <div>
      <Rating
        initialRating={item?.toString()}
        readonly
        emptySymbol={<BsStar color={color || 'white'} size={size || 25} />}
        fullSymbol={<BsStarFill color={color || 'white'} size={size || 25} />}
      />
    </div>
  )
}

export default Ratings
