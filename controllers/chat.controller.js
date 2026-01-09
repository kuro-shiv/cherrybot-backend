import message from "../models/message.model.js"


export const sendMessage = async (req, res) => {
    try {
        const{message} = req.body
        const userID = req.user._id

        if 