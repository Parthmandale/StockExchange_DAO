import {useState,useEffect} from "react"
function InvestorList({state}){
 
const [list, setList] = useState([]);

   useEffect(()=>{                     // useEffect because whenever somone will become investor his name will be dispalyes automativcally
      const {contract}=state;
      async function investerList(){
         const arrayInvestor= await contract.methods.InvestorList().call();
         setList(arrayInvestor);
         console.log(arrayInvestor);
      }
      contract && investerList();
   },[state])


   return<>
    <div className="list">
    <h3>Investor's List</h3>
   
    {list.map((investorAddress) => {
return <p key={investorAddress}> {investorAddress} </p>
    })}
   
  
    </div>
   </>
  }
  export default InvestorList;