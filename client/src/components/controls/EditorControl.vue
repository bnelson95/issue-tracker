<template>
  <control-wrapper :title="title">
    <template v-slot:control-content>
      <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
        <div class="menubar border-bottom">
          <b-button-group class="border-right">
            <b-button
              variant="light"
              :class="{ 'active': isActive.bold() }"
              @click="commands.bold">
              <i class="fas fa-bold"></i>
            </b-button>
            <b-button
              variant="light"
              :class="{ 'active': isActive.italic() }"
              @click="commands.italic">
              <i class="fas fa-italic"></i>
            </b-button>
            <b-button
              variant="light"
              :class="{ 'active': isActive.strike() }"
              @click="commands.strike">
              <i class="fas fa-strikethrough"></i>
            </b-button>
            <b-button
              variant="light"
              :class="{ 'active': isActive.underline() }"
              @click="commands.underline">
              <i class="fas fa-underline"></i>
            </b-button>
          </b-button-group>

          <b-button-group>
          <b-button
              variant="light"
            :class="{ 'active': isActive.heading({ level: 1 }) }"
            @click="commands.heading({ level: 1 })">
            H1
          </b-button>

          <b-button
              variant="light"
            :class="{ 'active': isActive.heading({ level: 2 }) }"
            @click="commands.heading({ level: 2 })">
            H2
          </b-button>

          <b-button
              variant="light"
            :class="{ 'active': isActive.heading({ level: 3 }) }"
            @click="commands.heading({ level: 3 })">
            H3
          </b-button>
          </b-button-group>

          <b-button-group>
          <b-button
              variant="light"
            :class="{ 'active': isActive.bullet_list() }"
            @click="commands.bullet_list">
            <i class="fas fa-list-ul"></i>
          </b-button>
          <b-button
              variant="light"
            :class="{ 'active': isActive.ordered_list() }"
            @click="commands.ordered_list">
            <i class="fas fa-list-ol"></i>
          </b-button>
          </b-button-group>

          <b-button
              variant="light"
            :class="{ 'active': isActive.blockquote() }"
            @click="commands.blockquote">
            <i class="fas fa-quote-left"></i>
          </b-button>

          <b-button
              variant="light"
            @click="commands.horizontal_rule"
          >
            <i class="fas fa-window-minimize"></i>
          </b-button>

          <b-button-group>
          <b-button
              variant="light"
            @click="commands.undo">
            <i class="fas fa-undo"></i>
          </b-button>
          <b-button
              variant="light"
            @click="commands.redo">
            <i class="fas fa-redo"></i>
          </b-button>
          </b-button-group>
        </div>
      </editor-menu-bar>
      <div class="mx-2 my-1">
        <editor-content class="editor__content" :editor="editor" />
      </div>
    </template>
  </control-wrapper>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History
} from 'tiptap-extensions'
import ControlWrapper from '@/components/controls/ControlWrapper.vue'
export default {
  name: 'EditorControl',
  components: {
    EditorContent,
    EditorMenuBar,
    ControlWrapper
  },
  data () {
    return {
      editor: null
    }
  },
  mounted () {
    this.editor = new Editor({
      extensions: [
        new Blockquote(),
        new BulletList(),
        new CodeBlock(),
        new HardBreak(),
        new Heading({ levels: [1, 2, 3] }),
        new HorizontalRule(),
        new ListItem(),
        new OrderedList(),
        new TodoItem(),
        new TodoList(),
        new Link(),
        new Bold(),
        new Code(),
        new Italic(),
        new Strike(),
        new Underline(),
        new History()
      ],
      onUpdate: ({ getHTML }) => {
        // get new content on update
        const newContent = getHTML()
        this.input(newContent)
      }
    })
    var unwatch = this.$watch('value', () => {
        this.editor.setContent(this.value)
        if (unwatch) unwatch()
      },
      { immediate: true }
    )
  },
  props: {
    title: {
      type: String
    },
    value: {
      type: String
    },
    input: {
      type: Function
    }
  },
  beforeDestroy() {
    this.editor.destroy()
  }
}
</script>

<style>

</style>
