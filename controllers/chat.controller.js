import axios from "axios"
import Message from "../models/Message.js"

console.log("HF KEY PRESENT:", !!process.env.HF_API_KEY)

console.log("MESSAGE MODEL TYPE:", typeof Message)

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body
    const userId = req.user.id

    if (!message) {
      return res.status(400).json({ message: "Message is required" })
    }

    await Message.create({
      userId,
      role: "user",
      content: message
    })

    const hfResponse = await axios.post(
      "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2",
      { inputs: message },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    )

    const aiReply =
      hfResponse.data?.[0]?.generated_text ||
      "AI responded but format was unexpected."

    await Message.create({
      userId,
      role: "assistant",
      content: aiReply
    })

    res.json({ reply: aiReply })
  } catch (error) {
    console.error("HF ERROR STATUS:", error.response?.status)
    console.error("HF ERROR DATA:", error.response?.data)

    res.status(500).json({ message: "AI service error" })
  }
}
