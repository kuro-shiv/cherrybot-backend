import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema(
    {
        userID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        role: {
            type: String,
            enum: ['user', 'assistant'],
            required: true,
        },
        content: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
)

const Message = mongoose.model('Message', messageSchema)
export default messageSchema