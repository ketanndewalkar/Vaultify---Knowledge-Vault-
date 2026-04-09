import Folder from "../models/folder.model.js"
import Note from "../models/note.model.js"



// Folder Tools
export const getProfile = async () => {

}
export const getFolder = async (userId) => {
    const res = await Folder.find({ userId });
    console.log(res)
    return res
}

export const makeFolder = async (userId, data) => {
    const res = await Folder.create({ userId, ...data })
    console.log(res)
    return res
}


export const updateFolder = async (id, data) => {
    await Folder.findByIdAndUpdate(id, data)
}

export const deleteFolder = async (id) => {
    await Folder.findByIdAndDelete(id)
}

// Note Tools
export const getNote = async (userId, folderId) => {
    const res = await Note.find({ userId, folderId })
    console.log(res)
    return res
}

export const makeNote = async (folderId, data) => {
    const res = await Note.create({ folderId, ...data })
    console.log(res)
    return res
}

export const updateNote = async (id, data) => {
    await Note.findByIdAndUpdate(id, data)
}

export const deleteNote = async (id) => {
    await Note.findByIdAndDelete(id);
}


const Tools = {
    makeFolder, updateFolder, deleteFolder, makeNote, updateNote, deleteNote, getNote, getFolder
}

export default Tools

