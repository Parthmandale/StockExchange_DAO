import { useState,useEffect } from "react";

function ProposalList({state}){
 const[Proposal,setProposal] = useState([]);
   useEffect(()=>{
      const {contract}=state;
      async function proposals(){
         const arrayProposal= await contract.methods.ProposalList().call();
setProposal(arrayProposal);
         console.log(arrayProposal);
      }
      contract && proposals();
   },[state])

   return<>
  
  <div className="list">
    <h3>Proposal List</h3>
    <table>
      <tbody>
      {Proposal.map((proposal)=>{
         return (
                 <tr key={proposal.id}>
                 <td>{proposal.id}</td>
                 <td>{proposal.description}</td>
                 <td>{proposal.amount}</td>
                 <td>{proposal.receipient}</td>
                 <td>{proposal.votes}</td>
                 <td>{proposal.end}</td>
                 <td>{proposal.isExecuted}</td>
                 </tr>
      )})}
      </tbody>
      </table>
   </div>

   </>
  }
  export default ProposalList;