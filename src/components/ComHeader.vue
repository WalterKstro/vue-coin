<template>
  <header class="bg-green-700">
    <div class="container flex items-center justify-between  px-10 py-2">
      <div class="brand" @click="goToHome"><img src="../assets/brand.svg" alt="Brand coin"> </div>
      <nav class="nav w-1/6 flex justify-between">
        <input type="search"  v-if="showInputSearch" placeholder="Search currency..." class="rounded-full border-0 outline-none py-1.5 px-5"
        v-model="termSearch" @keyup="setSearchCoin(termSearch)">
      </nav>
    </div>
  </header>
</template>

<script>
import {mapActions} from 'vuex'
export default {
name: "ComHeader",
  data() {
  return {
    termSearch : ''
  }
  },
  methods : {
    goToHome(){
      this.$router.push({
        name : 'Home',
      })
    },
    ...mapActions(['setSearchCoin'])
  },
  computed : {
    showInputSearch() {
      return this.$route.params.name ? false : true;
    }
  }
}
</script>

<style scoped>
img{
  width: 20%;
}
.brand{cursor:pointer}
</style>