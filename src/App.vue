<template>
  <div id="app">
    <ComHeader/>
    <router-view class="container mx-auto my-5" />
  </div>
</template>



<script>
import ComHeader from "@/components/ComHeader";

export default {
  name: "App",
  components : {ComHeader}
}
</script>

<style>
*,
*::before,
*::after{
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
