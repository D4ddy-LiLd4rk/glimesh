export { ApiClient } from './ApiClient';
export type { ApiConfig } from './ApiClient';

export type { GlimeshResponse, GlimeshPaginatedResponse, GlimeshPaginatedResponseWithTotal } from './API/GlimeshResponse';

export { Category } from './API/Category/Category';
export { Channel } from './API/Channel/Channel';
export { Stream } from './API/Channel/Stream';
export { Follower } from './API/Follower/Follower';
//export { Subscription } from './API/Sub/Subscription';
export { User } from './API/User/User';

export { AuthScopes } from './Tools'

export * from './Auth/index';


//=============================
//Testing

import { ApiClient } from './ApiClient';
import { RefreshableAuthProvider, StaticAuthProvider, AuthProviderTokens } from './Auth/index';
import { config } from './config';
import { AuthScopes } from './Tools';

let authProvider = new RefreshableAuthProvider(
    new StaticAuthProvider(config.client_id,
        config.access_token,
        [AuthScopes.Public, AuthScopes.Email, AuthScopes.Chat, AuthScopes.Streamkey],
        AuthProviderTokens.App), {
    clientSecret: config.secret,
    refreshToken: config.refresh_token,
    onRefresh: ({ accessToken, refreshToken, expiryDate }) => {
        console.log(`Access Token: ${accessToken}
        Refresh Token: ${refreshToken}
        Expiry Date: ${expiryDate}`);
    }
});
let client = new ApiClient({ authProvider });

client.channels.getChannelByName("jolan666")
    .then(channel => {
        console.log(channel);
    })
    .catch(err => {
        console.log(err);
    });