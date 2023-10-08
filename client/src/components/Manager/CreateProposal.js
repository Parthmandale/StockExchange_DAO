import "./manager.css"
function CreateProposal({state,account}){
    
    const proposalCreation = async(event) => {
        try {
            event.preventDefault();
        const {contract} = state;
        const description = document.querySelector("#description").value;
        const amount = document.querySelector("#amount").value;
        const recipient = document.querySelector("#recipient").value;
    
        // console.log(description, amount, recipient);
    
        //but if ui hhave to talk with smart contract thenm I have to use Contract Instance
        await contract.methods.createProposal(description, amount, recipient).send({from: account });  // send() while you write on SC and from is the one who is calling the fuc so he will pay the gas fess (max is already defined) and he will only execute it on its address and call() when you read your SC 
         // createProposal is the name of func in the sol
        } catch (error) {
            alert(error)
        }
        window.location.reload();
        
        
        
    }
   
    return<>
    <form onSubmit={proposalCreation} >
    <label className="label1" htmlFor="name">
    <span className="font">Description:</span>
    </label>
    <input type="text" id="description"></input>
    <label className="label1" htmlFor="amount">
    <span className="font"> Amount Neeed(in Wei):</span>
        </label>
    <input type="text" id="amount"></input>
    <label className="label1" htmlFor="recipient">
    <span className="font">Recipient Address:</span>
        </label>
    <input type="text" id="recipient"></input>
    <button className="button" type="submit">Create Proposal</button>
    </form><br></br></>
    
   }
   export default CreateProposal;