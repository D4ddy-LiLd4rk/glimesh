import { Category } from "./API/Category/Category";
import { ApiClient } from "./ApiClient";
import { ClientCredentialsAuthProvider } from "./Auth";

export let Glimesh = {
    "client_id": "fa28803678093d0bd240b7816e5dd76aa6f0176721d1723f1ef9eb4bcfde0dee",
    "secret": "03fda2826632b380f14e97a6387d86cceccd97b196a74b39777497780ee14aba"
}






















let authProvider = new ClientCredentialsAuthProvider(Glimesh.client_id, Glimesh.secret);
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