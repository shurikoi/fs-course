import axios from "axios"
const baseUrl = "/api/persons/"

export const getAllNotes = async () => await axios(baseUrl)

export const createNote = async (note) => await axios.post(baseUrl, note)

export const deleteNote = async (id) =>
  await axios.delete(`${baseUrl}${id}`)
