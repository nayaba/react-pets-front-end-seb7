import { useState, useEffect } from 'react'

const PetForm = (props) => {

    let initialState =  {
            name: '', 
            age: '',
            breed: '',
        }

    const [formData, setFormData] = useState(
    props.selected ? props.selected : initialState
  )

    useEffect(() => {
    setFormData(props.selected ? props.selected : initialState);
  }, [props.selected])

    const handleChange = (evt) => {
        setFormData({...formData, [evt.target.name]: evt.target.value})
    }

    const handleSubmit = (evt) => {
        evt.preventDefault()
        if (props.selected) {
            console.log('udpate pet')
            props.handleUpdatePet(formData, props.selected._id)
            setFormData(initialState)
        } else {
            console.log('add pet')
            props.handleAddPet(formData)
            setFormData(initialState)
        }
    }

    return (
        <>
            <h1>Pet Form</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input type="text" name="name" id="name" 
                value={formData.name} onChange={handleChange} />

                <label htmlFor="age">Age:</label>
                <input type="text" name="age" id="age" 
                value={formData.age} onChange={handleChange} />

                <label htmlFor="breed">Breed:</label>
                <input type="text" name="breed" value={formData.breed} id="breed" onChange={handleChange} />

                <button type="submit">{props.selected ? 'Update Pet' : 'Add New Pet'}</button>
            </form>
        </>
    )
}

export default PetForm