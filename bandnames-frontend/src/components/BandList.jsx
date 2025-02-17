import { useContext, useEffect, useState } from "react"
import { SocketContext } from "../context/SocketContext"

const BandList = () => {

    const [bands, setBands] = useState([])
    const { socket } = useContext(SocketContext)

    useEffect(() => {
        socket.on('current-bands', (bands) => {
            setBands(bands)
        })
        return () => socket.off('current-bands')
    }, [socket])
    
    const changeName = (event, id) => {
        const newName = event.target.value;

        setBands( bands => bands.map( (band) => {
            if(band.id === id){
                band.name = newName
            }
            return band
        }))
    }

    const handleOnBlur = (id, name) => {
        socket.emit('change-name-band', { id, name }) 
    }

    const voteBand = (id) => {
        socket.emit('vote-band', id) 
      }
    
    const removeBand = (id) => {
    socket.emit('remove-band', id) 
    }

    const createRows = () => {
        return (
            <>
                {
                    bands.map((band) => {
                        return (
                        <tr key={ band.id }>
                            <td>
                                <button className="btn btn-primary"
                                    onClick={() => voteBand(band.id)}
                                > +1 </button>
                            </td>
                            <td>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    value={ band.name } 
                                    onChange={(event) => changeName(event, band.id)}
                                    onBlur={() => handleOnBlur(band.id, band.name)}
                                    />
                            </td>
                            <td> { band.votes } </td>
                            <td> <button className="btn btn-danger"
                                onClick={() => removeBand(band.id)}
                            >Borrar</button></td>
                        </tr>
                        )
                    })
                }
                
            </>
        )
    }

    return (
        <div>
            <h3>Bandas Actuales</h3>
            <table className="table table-stripped">
                <thead>
                    <tr>
                        <th></th>
                        <th>Nombre</th>
                        <th>Votos</th>
                        <th>Borrar</th>
                    </tr>
                </thead>
                <tbody>
                    { createRows() }
                </tbody>
            </table>

        </div>
    )
}

export default BandList
