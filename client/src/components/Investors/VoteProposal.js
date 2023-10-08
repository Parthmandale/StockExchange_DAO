import "./investors.css"
function VoteProposal({state,account}){
  

    const voteProposal = async(event) => {
        
        try {
            event.preventDefault();
            const {contract} = state;
            const voteTo = document.querySelector("#voteId").value;
          
            await contract.methods.voteProposal(voteTo).send({ from:account,gas: 480000 })
        
        }   catch (error) {
                
            alert(error)
        }
        window.location.reload();
        
       
      }

    return<><form onSubmit={voteProposal}>
     <label className="label1" htmlFor="voteId">
     <span className="font">Proposal Id:</span>
        </label>
    <input type="text" id="voteId"></input>
    <button className ="button" type="submit">Vote</button>
    </form><br></br></>
   }
   export default VoteProposal;