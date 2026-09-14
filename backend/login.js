import "dotenv/config"
import express from "express";
import cors from "cors";
import conn from "./db.js";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const app = express();
const port = 5174;

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));
app.use(express.json());
app.use(cookieParser());

app.post('/login', async (req, res) => {
    try {
        const { name, password } = req.body;

        const [user] = await conn.execute("SELECT username, password FROM userData WHERE username = ?",[name]);

        if (user.length === 0) {
            return res.status(401).send({
                message: "Please sign up first"
            });
        }

        if (user[0].password !== password) {
            return res.status(401).send({
                message: "Invalid credentials"
            });
        }
        const accessToken = jwt.sign(
            {username: user[0].username},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn:"15m"}
        );

        const refreshToken = jwt.sign(
            {username: user[0].username},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn:"7d"}
        );

        res.cookie("accessToken",accessToken,{
            httpOnly:true,
            secure:true,
            sameSite:"strict",
            maxAge:15 * 60 * 1000
        })

        res.cookie("refreshToken",refreshToken,{
            httpOnly:true,
            secure:true,
            sameSite:"strict",
            maxAge:7 * 24 * 60 * 60 * 1000
        })

        return res.status(200).send({
            message: "Logged in successfully"
        });

    } catch (error) {
        console.log(error);

        return res.status(500).send({
            message: "Internal server error"
        });
    }
});


app.listen(port, () => {
    console.log(`app listening on port ${port}`);
})