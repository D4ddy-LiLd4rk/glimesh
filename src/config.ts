require('dotenv').config();

export let config = {
    client_id: process.env.CLIENT_ID || "",
    secret: process.env.SECRET || "",
    access_token: process.env.ACCESS_TOKEN || "",
    refresh_token: process.env.REFRESH_TOKEN || ""
}