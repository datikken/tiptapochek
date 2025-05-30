import { Server } from "@hocuspocus/server";
import { Database } from '@hocuspocus/extension-database';
import { TiptapTransformer } from "@hocuspocus/transformer";
import {JSDOM} from "jsdom";

// Configure the server …
const server = new Server({
    port: 1234,
    async onChange(data) {
        // Convert the y-doc to something you can actually use in your views.
        // In this example we use the TiptapTransformer to get JSON from the given
        // ydoc.
        const prosemirrorJSON = TiptapTransformer.fromYdoc(data.document);
        console.log(JSON.stringify(prosemirrorJSON))
    },
    extensions: [
        new Database({
            fetch: async (data) => {
                // Load document from your database
                return null; // Return stored Yjs update or null for new documents
            },
            store: async (data) => {
                // console.log(data)
            },
        }),
    ],
});

server.listen();
