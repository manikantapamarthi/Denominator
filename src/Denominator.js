import {useState, useEffect} from 'react';
import { Form,Table } from 'react-bootstrap';

function Denominator() {

  const notes = {two_thousand: '',
    five_hundred: '',
    two_hundred: '',
    one_hundred: '',
    fifty: '',
    twenty: '',
    ten: '',
    five_rupees: '',
    two_repees: '',
    one_rupee:''
  }

  const  labels = { 
    two_thousand: 2000,
    five_hundred: 500,
    two_hundred: 200,
    one_hundred: 100,
    fifty: 50,
    twenty: 20,
    ten: 10,
    five_rupees: 5,
    two_repees: 2,
    one_rupee: 1
  }

  const [inputFields, setInputFields] = useState(notes)

  const [totalNotes, updatetotalNotes] = useState(0)

  const [amounts, setAmounts] = useState(notes)

  const [totalAmount, setTotalAmount] = useState(0)

  const handdleFormChange = (key, e) => {
    setInputFields({
      ...inputFields,
      [key]: e.target.value
    })
    
    setAmounts({
      ...amounts,
      [key]: e.target.value * labels[key]
    })

  }

  useEffect(()=>{
    handdleTotalNotes(inputFields)
    handdleTotalAmounts(amounts)
  },[inputFields],[amounts])

  function handdleTotalNotes(inputFields){
   let total =  getTotals(inputFields)
    updatetotalNotes(total)
  }

  function handdleTotalAmounts(amounts){
    let total = getTotals(amounts)
    setTotalAmount(total)
  }
  
  function getTotals(inputFields){
    let total = Object.values(inputFields).reduce((accumulator, currentvalue) =>{
      return accumulator +  Number(currentvalue)
    },0);

    return total
  }

    return(
    <>
      <Table>
        <thead>
          <tr className='table-info'>
            <th>Currency</th>
            <th>Count</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(inputFields).map((key, index) =>{
            return(
              <tr key={index}>
                <td className='col-md-2'>₹{labels[key]} X</td>
                <td className='col-md-2'><Form.Control
                  type="number"
                  value={inputFields[key]}
                  placeholder={labels[key]}
                  onChange={e => handdleFormChange(key, e)}
                  /> 
                </td>
                <td className={`${amounts[key] && "bg-info text-dark"} col-md-2`}>{amounts[key]}</td>  
              </tr>
            )
          })}
          <tr>
            <td></td>
            <td className='bg-dark text-white'>Total Notes: {totalNotes}</td>
            <td className='bg-success text-white'>Total Amount: {totalAmount}</td>
          </tr>
        </tbody>
      </Table>

    </>
  )
}

export default Denominator;