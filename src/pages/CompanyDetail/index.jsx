import React,{useState} from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactLoading from "react-loading";
import { Button } from "antd";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./index.scss";
import ArticleDescriptionCard from "../../components/articleDescriptionCard/ArticleDescriptionCard";
import QueryModal from "../../components/queryModal/QueryModal";

const CompanyDetail = () => {
  const {id} = useParams();
  const [isLoading,setIsLoading] = useState(true);
  const [organizationData,setOrganizationData] = useState({});
  const [isModalVisible,setIsModalvisible] = useState(false);
 const history = useHistory()
  useEffect(()=>{
    axios
    .get(`${process.env.REACT_APP_BACKEND_URL}/organizations/${id}`)
     .then((resp)=>{
       console.log(resp , "resp here");
       setOrganizationData(resp.data?.data?.organization)
     }).catch((err)=>{
       console.log(err ,"err here")
     }).finally(()=>{
       setIsLoading(false);
     })
  },[])

  useEffect(()=>{
    console.log("Entered in useEffect")
    if(organizationData){
      console.log("Entered")
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/recentSearch/`,{organization_name : organizationData?.CompanyName , organization_id : organizationData?._id});
    }
  },[organizationData])
  return (
    <>
    <div className="detailWrapper">
      <div className="heading">
        <span className="tableSpan" style={{cursor:"pointer"}} onClick={()=>history.push("/")} >Djektro.com</span>
      </div>

      {isLoading ?
      <ReactLoading type="bars" color="#5f49d9" className="posCenter"/>
      :
        <div className="container">
          <div className="titleSection">
             <h1>{`${organizationData?.CompanyName} Phone Number`}</h1>
              <p>{`${organizationData?.CompanyName} ${organizationData?.DepartmentYourCalling} with Djecktro`}</p>
            </div>
      <div className="detailSectionWrapper">
        <div className="custom-card">
          <div className="section">
          <h1 className="link">{organizationData?.PhoneNumber}</h1>
          <p className="description">{organizationData?.DepartmentYourCalling}</p>
          </div>
          <div className="section" style={{display:"flex" , justifyContent:"space-between" ,width:"100%"}}>
            <div>
          <h1 className="link">{organizationData?.CallCenterHours}</h1>
          <p className="description">Service Hours</p>
          </div>
          <div>
          <h1 className="link">{organizationData?.BestTimeToDail}</h1>
          <p className="description">Best Time to Dail</p>
          </div>
            </div>
            <Button type="primary" onClick={()=>setIsModalvisible(true)}>Help with my issue</Button>
          </div>
          <ArticleDescriptionCard overview={organizationData?.description} />
        <div className="detailsSection">
          <h2>Company Details</h2>
          <div className="detailTable">
            <div>
              <span className="tableSpan">Company Name</span>
              <span className="tableSpan bold">{organizationData?.CompanyName}</span>
            </div>
            <div>
              <span className="tableSpan">Department You are Calling</span>
              <span className="bold tableSpan">{organizationData?.DepartmentYourCalling}</span>
            </div>
            <div>
              <span className="tableSpan">Call Center Hours</span>
              <span className="tableSpan bold">{organizationData?.CallCenterHours}</span>
            </div>
            <div>
              <span className="tableSpan">Best time to Dial</span>
              <span className="tableSpan bold">{organizationData?.BestTimeToDail}</span>
            </div>
            <div className="borderBottom">
              <span className="tableSpan">Phone Number</span>
              <span className="tableSpan bold">{organizationData?.PhoneNumber}</span>
            </div>
          </div>
        </div>
      </div>
      </div>
     }
    </div>
    <QueryModal setIsModalvisible = {setIsModalvisible} isModalVisible={isModalVisible}/>
    </>
  );
};

export default CompanyDetail;
