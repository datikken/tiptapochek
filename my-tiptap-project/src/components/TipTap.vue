<template>
  <editor-content :editor="editor" />
</template>

<script setup>
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Collaboration from '@tiptap/extension-collaboration'
import { HocuspocusProvider } from '@hocuspocus/provider'
import {CollaborationCursor} from "@tiptap/extension-collaboration-cursor";

// Set up the Hocuspocus WebSocket provider
const provider = new HocuspocusProvider({
  url: 'ws://127.0.0.1:1234',
  name: 'test',
})

const editor = new Editor({
  extensions: [
    StarterKit.configure({
      // The Collaboration extension comes with its own history handling
      history: false,
    }),
    // Register the document with Tiptap
    Collaboration.configure({
      document: provider.document,
    }),
    CollaborationCursor.configure({
      provider: provider,
      user: {
        name: 'Cyndi Lauper',
        color: '#f783ac',
      },
    }),
  ],
})
</script>
