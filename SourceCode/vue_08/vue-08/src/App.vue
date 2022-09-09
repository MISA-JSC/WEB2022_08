<template>
  <the-header></the-header>
  <div class="main">
    <the-menu></the-menu>
    <the-content></the-content>
  </div>
</template>

<script>
// import MButton from './components/base/MButton.vue'
import TheHeader from './components/layout/TheHeader.vue'
import TheMenu from './components/layout/TheMenu.vue'
import TheContent from './components/layout/TheContent.vue'
export default {
  name: 'App',
  components: {
    TheMenu,TheHeader,TheContent
  }
}
</script>

<style>
  @import url(./css/main.css);
</style>
