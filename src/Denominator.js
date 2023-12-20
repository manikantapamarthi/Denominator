import {useState, useEffect} from 'react';
import { Col, Form, Row } from 'react-bootstrap';

function Denominator() {

  const notes = {two_thousand: '',
    five_hundred: '',
    two_hundred: '',
    one_hundred: '',
    fifty: '',
    twenty: '',
    ten: ''  
  }

  const  labels = { 
    two_thousand: 2000,
    five_hundred: 500,
    two_hundred: 200,
    one_hundred: 100,
    fifty: 50,
    twenty: 20,
    ten: 10 
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
      {Object.keys(inputFields).map((key, index) =>
        { 
          return(
            <Row key={index} className="justify-content-center mt-3">
              <Col sm={1}>
                <Form.Label>₹{labels[key]} X</Form.Label>
              </Col>
              <Col sm={2}>
                <Form.Control
                  type="text"
                  value={inputFields[key]}
                  placeholder={labels[key]}
                  onChange={e => handdleFormChange(key, e)}
                /> 
              </Col>
              =<Col sm={2} className={`${amounts[key] && "bg-white text-dark"}`}>
                {amounts[key]}
              </Col>
            </Row>  
          )
        }
      )}
      <Row className="justify-content-center mt-3 mb-3">
        <Col md={3} className="text-white bg-dark mt-3 mr-3 ">
          Total Notes: {totalNotes}
        </Col>
        <Col md={3} className="text-white bg-success mt-3 mr-3 pl-2">
          Total Amount: {totalAmount}
        </Col>
      </Row>
    </>
  )
}

export default Denominator;