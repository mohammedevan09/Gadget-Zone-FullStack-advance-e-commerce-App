'use client'

import { useState, useEffect, useMemo } from 'react'
import Select from 'react-select'

const SelectProducts = ({
  categories,
  text,
  placeholder,
  isMulti,
  setValue,
  value,
}) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1300) {
        setIsSmallScreen(true)
      } else {
        setIsSmallScreen(false)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const formattedData = useMemo(() => {
    return categories?.reduce((acc, curr) => {
      acc.push({
        value: curr?.title,
        label: curr?.title?.substring(0, 12)?.toUpperCase(),
      })
      return acc
    }, [])
  }, [categories])

  const onChange = (selectedOption) => {
    setValue(selectedOption)
  }

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: 'black',
      boxShadow: 'none',
      padding: isSmallScreen ? '0 4px' : '0 9px',
      color: 'white',
      fontWeight: 'bold',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'white',
      backgroundColor: 'black',
      fontSize: isSmallScreen ? '13px' : '17px',
      padding: isSmallScreen ? '0 4px' : '2px 9px',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#ffffff4f',
      fontSize: isSmallScreen ? '13px' : '17px',
      padding: isSmallScreen ? '0 4px' : '2px 9px',
    }),
    input: (provided) => ({
      ...provided,
      color: 'white',
      fontSize: isSmallScreen ? '13px' : '17px',
      padding: isSmallScreen ? '0 4px' : '0px 9px',
      border: 'none',
    }),
    menu: (base) => ({
      ...base,
      borderRadius: 0,
      marginTop: 0,
    }),
    menuList: (base) => ({
      ...base,
      // kill the white space on first and last option
      padding: '4px 5px',
      backgroundColor: 'black',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? 'white' : 'black',
      color: state.isSelected ? 'black' : 'white',
      fontSize: isSmallScreen ? '13px' : '17px',
      padding: isSmallScreen ? '0 4px' : '2px 9px',
      '&:hover': {
        backgroundColor: 'white',
        color: 'black',
        cursor: 'pointer',
      },
      fontWeight: 'bold',
    }),
  }
  return (
    <div className="flex xl:justify-center justify-between items-center xl:w-auto w-full">
      <span className="xl:text-2xl text-lg">
        {text ? text : 'Show only'}: &nbsp;
      </span>
      <Select
        isMulti={isMulti ? true : false}
        placeholder={placeholder || 'Category'}
        isClearable
        options={formattedData}
        value={value}
        onChange={onChange}
        styles={customStyles}
        // value={value}
        // onChange={onChange}
        closeMenuOnSelect={false}
        //   getOptionLabel={(option) => option.name}
        //   getOptionValue={(option) => option.id}
        //   className="react-select-container genresDD"
      />
    </div>
  )
}

export default SelectProducts
