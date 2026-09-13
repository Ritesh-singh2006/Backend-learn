import "dotenv/config"
import express from "express";
import cors from "cors";
import conn from "./db.js";

const app = express();
const port = 5174;

app.use(cors());
app.use(express.json());

app.post('/login', async (req, res) => {
    try {
        const username = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        const [user] = await conn.execute("SELECT username FROM userData WHERE username = ?", [username]);
        if (user.length == 0) {
            await conn.execute("INSERT INTO userData (username, email, password) VALUES (?, ?, ?)", [username, email, password]);
            console.log("logged in successfully");
        }
        else {
            console.log("user already exists");
        }
    } catch (error) {
        console.log(error);
    }

})

app.listen(port, () => {
    console.log(`app listening on port ${port}`);
})