import Server from '../clean-server/dist/index.js'


const server = new Server({
    port: 1234,

    async onConnect() {
        console.log('🔮')
    },

    extensions: [],
});
