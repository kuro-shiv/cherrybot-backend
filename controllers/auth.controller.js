import jwt from "jsonwebtoken";


export const login = async (req, res) => {
  const { email, password } = req.body


  if (!email || !password) {
    return res.status(400).json({
        message: "Email and password are required"
    })
  }

  const user ={
    id: "123",
    email
  }

  const token = jwt.sign(
  {id: user.id, email: user.email},
  process.env.JWT_SECRET,
    {expiresIn: "1h"}
    )


    res.json({
        message: "Login successful",
        token
    })

}

