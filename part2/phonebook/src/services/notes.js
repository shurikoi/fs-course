import axios from "axios"
const baseUrl = "http://localhost:3001/persons/"

export const getAllNotes = async () => await axios(baseUrl)

export const createNote = async (note) => await axios.post(baseUrl, note)

export const deleteNote = async (id) =>
  await axios.delete(`http://localhost:3001/persons/${id}`)
