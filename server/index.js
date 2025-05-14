import { Server } from "@hocuspocus/server";
import { Database } from '@hocuspocus/extension-database';
import * as Y from "yjs";

// Configure the server …
const server = new Server({
    port: 1234,
    extensions: [
        new Database({
            fetch: async ({ documentName }) => {
                // Load document from your database
                return null; // Return stored Yjs update or null for new documents
            },
            store: async ({ documentName, state }) => {
                console.log(`Saving document ${documentName}:`, state);
            },
        }),
    ],
});

// … and run it!
server.listen();