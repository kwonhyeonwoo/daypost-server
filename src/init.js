import "dotenv/config"
import app from "./server";
import './db';
import './model/Comment'
import './model/User'
import './model/Post'
const PORT = 4000;
const handleListening = () => console.log(`node server open => http://localhost:${PORT}`);

app.listen(PORT, handleListening)
