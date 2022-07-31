/* eslint-disable jsx-a11y/anchor-is-valid */
import React ,{useEffect,useState} from 'react'
import axios from 'axios';
import ReactLoading from "react-loading";
import './RecentSearch.scss';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const RecentSearch = () => {
  const [recentSearch,setRecentSearch] = useState([]);
  const [isLoading,setIsLoading] = useState(true);
  const history = useHistory();
  useEffect(()=>{
    axios
    .get(`${process.env.REACT_APP_BACKEND_URL}/recentSearch/`)
     .then((resp)=>{
       console.log(resp);
       setRecentSearch(resp.data?.searches)
     }).catch((err)=>{
       console.log(err ,"err here")
     }).finally(()=>{
       setIsLoading(false);
     })
  },[])
  return (
    <div className='searchesWrapper'>
        <h2>
        Recent Searches
        </h2>
        {isLoading ? 
         <ReactLoading type="bars" color="#5f49d9" className="posCenter"/>
         :
         <div className='Links'>
          {
            recentSearch.map((organization,index)=>(<a key={index} onClick={(e)=>{e.preventDefault()
              history.push(`/${organization?.organization_id}`)
            }}>{organization.organization_name}</a>))
          }
        </div>
        }

    </div>
  )
}

export default RecentSearch