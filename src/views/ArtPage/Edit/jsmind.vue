<template>
  <div id="app">
    <div id="map" style="width: 100%; height: 600px"></div>
  </div>
</template>

<script setup>

import MindElixir, { E } from 'mind-elixir'
import { onMounted } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
let ME

const initMindElixir = () => {
  ME = new MindElixir({
    el: '#map',
    // direction: MindElixir.LEFT,
    draggable: true, // default true
    contextMenu: true, // default true
    toolBar: true, // default true
    nodeMenu: true, // default true
    keypress: true, // default true
    locale: store.getters.lanuage === 'zh' ? 'zh_CN' : 'en', // [zh_CN,zh_TW,en,ja,pt]
    primaryLinkStyle: 1,
    allowUndo: true,
    overflowHidden: false,
    contextMenuOption: {
      focus: false,
      link: false,
      extend: [
        {
          name: 'Node edit',
          onclick: () => {
            alert('extend menu')
          }
        }
      ]
    }
  })
  ME.init(MindElixir.new('中心思想'))
}

onMounted(() => {
  initMindElixir()
})

</script>

<style lang="scss" scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 20px;
  position: relative;
}
:deep(.lt){
  width: 40px;
}
:deep(.map-container .box  t  tpc){
  background-color: yellow;
  border: 2px solid red;
  &:hover{
    background-color: orange;
  }
}

</style>
