const dotenv = require('dotenv');
dotenv.config();

export let config = {
    client_id: process.env.CLIENT_ID || "",
    secret: process.env.SECRET || ""
}