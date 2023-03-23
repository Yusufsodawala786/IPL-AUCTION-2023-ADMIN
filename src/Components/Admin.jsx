import React,{useState,useRef} from 'react'
import '../styles/Admin.css'
import axios from 'axios'

export default function Admin() {
    const [name, setName] = useState()
    const [slot, setSlot] = useState()
    const [deductedAmount, setDeductedAmount] = useState(0)
    const [playerName, setPlayerName] = useState()   
    const [powerCard,setPowerCard] = useState(null)  
    const teamButtonRef = useRef(null)
    const powerCardButtonRef = useRef(null)
    const penaltyButtonRef = useRef(null)
    const handleSubmitTeam = async()=>{ 
      try{
        const payload = {
          playerName,
          amount:deductedAmount*10000000,
          slot
          }
          teamButtonRef.current.disabled = true
          const {data} = await axios.put(`https://ipl-auction-admin.onrender.com/team/${name}`,payload,{headers:{"Content-Type":"application/json"}})
          alert(data.message)
        }catch(e){
          alert(e.response.data.message)
        }
        teamButtonRef.current.disabled = false
    }
    const handleSubmitPowerCard = async()=>{
        try{
            const amount = deductedAmount * 10000000
            const payload = {
              slot,
              amount,
              powerCard
          }
          powerCardButtonRef.current.disabled = true
          const {data} = await axios.put(`https://ipl-auction-admin.onrender.com/powercard/${name}`,payload,{headers:{"Content-Type":"application/json"}})
          alert(data.message)
        }catch(e){
          alert(e.response.data.message)
        }
        powerCardButtonRef.current.disabled = false
    }
    const handleSubmitPenalty = async()=>{
      try{
            const amount = deductedAmount * 10000000
            const payload = {
              slot,
              amount
          }
          penaltyButtonRef.current.disabled = true
          const {data} = await axios.put(`https://ipl-auction-admin.onrender.com/penalty/${name}`,payload,{headers:{"Content-Type":"application/json"}})
          alert(data.message)
      }catch(e){
          alert(e.response.data.message)
      }
          penaltyButtonRef.current.disabled = false
    }
    
  return (
    //player updating
    <div className='admin'>
        <div className='admin-container'>
          <div>
            <label htmlFor="name">Team Name</label>
            <input id='name' type="text" value={name} autocomplete="off" onChange={(e)=>{setName(e.target.value)}} placeholder='Enter Team Name'  className='input' />
          </div>
          <div>
            <label htmlFor="slot">Slot</label>
            <input id='slot' type="text" value={slot} autocomplete="off" onChange={(e)=>{Number(setSlot(e.target.value))}} placeholder='Slot' className='input' />
          </div>
          <div>
            <label htmlFor="amount">Amount</label>
            <input id='amount' type="text" value={deductedAmount} autocomplete="off" onChange={(e)=>{Number(setDeductedAmount(e.target.value))}} placeholder='Enter amount (in Cr)' className='input' />
          </div>
          <div>
            <label htmlFor="player-name">Player Name</label>
            <input id='player-name' type="text" value={playerName} autocomplete="off" onChange={(e)=>{setPlayerName(e.target.value)}} placeholder='Enter player name' className='input'/>
          </div>
            <button ref={teamButtonRef} className='button' onClick={handleSubmitTeam}>Submit</button>
        </div>  
        {/* penalty */}
        <div className='admin-container'>
          <div>
            <label htmlFor="name">Team Name</label>
            <input id='name' type="text" value={name} autocomplete="off" onChange={(e)=>{setName(e.target.value)}} placeholder='Enter Team Name'  className='input' />
          </div>
          <div>
            <label htmlFor="slot">Slot</label>
            <input id='slot' type="text" value={slot} autocomplete="off" onChange={(e)=>{Number(setSlot(e.target.value))}} placeholder='Slot' className='input' />
          </div>
          <div>
            <label htmlFor="amount">Amount</label>
            <input id='amount' type="text" autocomplete="off" value={deductedAmount} onChange={(e)=>{Number(setDeductedAmount(e.target.value))}} placeholder='Enter amount (in Cr)' className='input' />
          </div>
            <button ref={penaltyButtonRef} className='button' onClick={handleSubmitPenalty}>Submit</button>
        </div>  

        {/* power card used  */}
        <div className='admin-container'>
          <div>
            <label htmlFor="name">Team Name</label>
            <input id='name' type="text" autocomplete="off" value={name} onChange={(e)=>{setName(e.target.value)}} placeholder='Enter Team Name'  className='input' />
          </div>
          <div>
            <label htmlFor="slot">Slot</label>
            <input id='slot' type="text" autocomplete="off" value={slot} onChange={(e)=>{Number(setSlot(e.target.value))}} placeholder='Slot' className='input' />
          </div>
          <div>
            <label htmlFor="amount">Amount</label>
            <input id='amount' type="text" autocomplete="off" value={deductedAmount} onChange={(e)=>{Number(setDeductedAmount(e.target.value))}} placeholder='Enter amount (in Cr)' className='input' />
          </div>
          <div>
            <select onChange={(e)=>setPowerCard(e.target.value)}>
              <option value="juzzbuzz">juzzbuzz</option>
              <option value="focusfire">focusfire</option>
              <option value="nxt3">nxt3</option>
              <option value="godseye">godseye</option>
<option value="super substitution">super substitution</option>
            </select>
          </div>
            <button ref={powerCardButtonRef} className='button' onClick={handleSubmitPowerCard}>Submit</button>
        </div>  
    </div>
  )
}
