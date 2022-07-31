import { Input } from 'antd';
import React , {useState} from 'react'
import {  Modal } from 'antd';
import axios from 'axios';
const { TextArea } = Input;
const QueryModal = ({ setIsModalvisible,isModalVisible}) => {
const [description,setDescription] = useState("");
const [email,setEmail] = useState("");
const [name ,setName] = useState("");
const [phoneNumber,setPhoneNumber] = useState("");
const [phoneErr,setPhoneErr] = useState("");

function phonenumber(inputtxt)
{
  console.log(inputtxt , "input Text");
  var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  if(phoneno.test(inputtxt)) {
    return true;
  }
  else {
    setPhoneErr("Invalid phone number");
    return false
  }
        
}
    const hanldeSubmit = () => {
      if(name && description && phoneNumber && email && phonenumber(phoneNumber)) {

        axios.post(`${process.env.REACT_APP_BACKEND_URL}/organizations/query` , {description,email,name,phoneNumber}).then((resp)=>{
          console.log(resp ,"Successfull")
        }).catch((err)=>{
           console.log(err)
        }).finally(()=>{
          setIsModalvisible(false);
        })
      }
    }
  return (
    <>
       <Modal title="How can we help you?" className='QueryModal' visible={isModalVisible} onOk={hanldeSubmit} onCancel={()=>setIsModalvisible(false)}>
       <TextArea rows={4} placeholder="Enter your Query"  value={description} onChange={(e)=>setDescription(e.target.value)} />
       <Input style={{marginTop : "10px" , padding :"10px"}} placeholder="Enter your email" value={email} onChange={(e)=>setEmail(e.target.value)}  type="email"/>
       <Input style={{marginTop : "10px" , padding :"10px"}} placeholder="Enter your Name" value={name} onChange={(e)=>setName(e.target.value)}  type="text"/>
       <Input style={{marginTop : "10px" , padding :"10px"}} placeholder="Enter your phone number XXX-XXX-XXXX" value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)}  type="email"/>
       <p style={{color : "red" , fontSize:"14px" , marginBottom :"0px" , marginTop :"5px"}}>{phoneErr}</p>
      </Modal>
    </>
  )
}

export default QueryModal