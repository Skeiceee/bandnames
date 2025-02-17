import { useContext, useState } from "react";
import { SocketContext } from "../context/SocketContext";

const BandAdd = () => {

  const [ newName, setNewName ] = useState('')

  const { socket } = useContext(SocketContext)
  
  const addBand = ( newName ) => {
    socket.emit('add-band', newName) 
  }

  const handlerSubmit = (event) => {
    event.preventDefault();
    if(newName.trim().length > 0){
      addBand(newName)
      setNewName('')
    }
  };

  return (
    <div>
        <h3>Agregar Banda</h3>
        <form onSubmit={handlerSubmit}>
            <input 
                type="text"  
                className='form-control'
                placeholder='Nuevo nombre de banda'
                value={newName}
                onChange={(event) => setNewName(event.target.value)}
            />
            <button type="submit">Añadir</button>
        </form>
    </div>
  )
}

export default BandAdd
