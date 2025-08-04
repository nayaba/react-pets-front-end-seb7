import * as petService from './services/petService'
import { useEffect, useState } from 'react'
import PetList from './components/PetList/PetList'
import PetDetail from './components/PetDetail/PetDetail'
import PetForm from './components/PetForm/PetForm'

const App = () => {
  const [pets, setPets] = useState([])
  const [selected, setSelected] = useState(null)
  
  useEffect(() => {
    const fetchPets = async() => {
      try {
        const fetchedPets = await petService.index()
        setPets(fetchedPets)
      } catch (err) {
        console.log(err)
      }
    }
    fetchPets()
  }, [])

  const handleSelect = (pet) => {
    setSelected(pet)
  }

  const handleAddPet = async (formData) => {
    const newPet = await petService.create(formData)
    setPets([newPet, ...pets])
  }

  const handleUpdatePet = async (formData, petId) => {
   const updatedPet = await petService.update(formData, petId)
   console.log(updatedPet)
  }

  return (
    <>
      <PetList pets={pets} handleSelect={handleSelect} />
      <hr />
      <PetForm selected={selected} handleAddPet={handleAddPet} handleUpdatePet={handleUpdatePet} />
      <hr />
      <PetDetail selected={selected} />
    </>
  )
}

export default App