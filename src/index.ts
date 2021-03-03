import { ApiClient } from "./ApiClient";
import { ClientCredentialsAuthProvider } from "./Auth";
import { config } from "./config";


let authProvider = new ClientCredentialsAuthProvider(config.client_id, config.secret);
let client = new ApiClient({ authProvider });/*
client.users.getUserByName("D4ddyLiLd4rk")
    .then(user => {
        console.log(`With name => ID: ${user?.id}, Name: ${user?.username}`);
    })
    .catch(err => {
        console.log(err);
    });

client.users.getUserById(2299)
    .then(user => {
        console.log(`With id => ID: ${user?.id}, Name: ${user?.username}`);
    })
    .catch(err => {
        console.log(err);
    });*/

client.categories.getCategoryBySlug("tech")
    .then(category => {
        console.log(`With slug => ID: ${category?.id}, Name: ${category?.name}`);
    })
    .catch(err => {
        console.log(err);
    });
/*
client.categories.getCategoryById(2299)
    .then(category => {
        console.log(`With id => ID: ${category?.id}, Name: ${category?.ame}`);
    })
    .catch(err => {
        console.log(err);
    });*/