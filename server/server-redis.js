import { Server } from "@hocuspocus/server";
import { TiptapTransformer } from "@hocuspocus/transformer";
import { Redis } from "@hocuspocus/extension-redis";
import process from "node:process";
import {config} from "dotenv";
import {Database} from "@hocuspocus/extension-database";

config();

const keyPrefix = `collaborant:${process.env.NODE_ENV}`;
const nodesStr = process.env.REDIS_CLUSTER_NODES;
if (!nodesStr) {
    throw new Error("Missing required environment variable: REDIS_CLUSTER_NODES");
}

const nodes = nodesStr.split(',').map(el => {
    const ar = el.split(':');
    return {
        host: ar[0].toString(),
        port: parseInt(ar[1]),
    }
});


// Configure the server …
const server = new Server({
    port:  1235,
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
        // The Redis extension does not persist data; it only syncs data between instances. Use the Database extension to store your documents.
        new Redis({
            nodes,
            prefix: keyPrefix,
        }),
    ],
});

server.listen();
