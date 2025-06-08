import {Server} from "Server";


const server = new Server({
    port: 1234,

    async onConnect() {
        console.log('🔮')
    },

    extensions: [
    ],
});

server.listen();
console.log('executed')