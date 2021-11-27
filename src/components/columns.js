import { useEffect, useState } from "react";


const EditableCell = ({
    value: initialValue,
  }) => {
   
    const [value, setValue] = useState(initialValue)
  
    const onChange = e => {
      setValue(e.target.value)
    }
  
    useEffect(() => {
      setValue(initialValue)
    }, [initialValue])
  
    return <input value={value} onChange={onChange}  />
  }

  const DisplayImage = ({
    value: initialValue,
  }) => {
   
    const [value, setValue] = useState(initialValue)
  
    // const onChange = e => {
    //   setValue(e.target.value)
    // }
  
    useEffect(() => {
      setValue(initialValue)
    }, [initialValue])
  
    return <img src={value} alt='' style={{height:'100px',width:'100px'}}/>
  }



export const COLUMNS = [
    {
        Header:'Category',
        accessor:'category',
        disableSortBy:true
    },
    {
        Header:'Id',
        accessor:'id',
        disableSortBy:true
    },
    {
        Header:'Name',
        accessor:'name',
        
    },
    {
        Header:'Label',
        accessor:'label',
        disableSortBy:true
    },
    {
        Header:'Price',
        accessor:'price',
        Cell: EditableCell

        
    },
    {
        Header:'Image',
        accessor:'image',
        disableSortBy:true,
        Cell:DisplayImage
    },
    {
        Header:'Description',
        accessor:'description',
        disableSortBy:true
    }
    

]

