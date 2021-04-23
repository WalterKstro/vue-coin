<template>
  <table class="container mx-auto">
    <thead>
    <tr class="border-b-2">
      <th class="py-3">Rank</th>
      <th class="py-3">Name</th>
      <th class="py-3">Price</th>
      <th class="py-3">Market Cap</th>
      <th class="py-3">Change (24Hr)</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="coin in computedFilteredCoins" :key="coin.id"
        class="border-b-2 py-10 xl:hover:bg-green-500 hover:text-white"
        @click="viewCriptoCurrency(coin.id)">
      <td class="py-2">{{coin.rank}}</td>
      <td class="flex items-center py-2">
        <img :src="`https://static.coincap.io/assets/icons/${coin.symbol}@2x.png`" :alt="coin.name" class="w-8 h-8">
        <span class="ml-5">
          {{coin.name}} <small class="text-gray-300">{{coin.symbol.toUpperCase()}}</small>
        </span>
      </td>
      <td class="py-2">{{coin.price | formatMoneyDollar}}</td>
      <td class="py-2">{{coin.market | formatMoneyDollar}}</td>
      <td class="py-2 font-semibold" :class="markChanges(coin.change)" >{{coin.change | formatPercentegeChange}}</td>
    </tr>
    </tbody>
  </table>
</template>

<script>
import {mapState, mapGetters} from 'vuex'
import mixinFilters from "@/mixins/mixins";

export default {
  name: "ComTable",
  methods:{
    markChanges(value) {
      return (value<=0) && 'text-red-600'
    },
    viewCriptoCurrency(name){
      this.$router.push({
        name: 'Cripto',
        params: {name}
      })
    }
  },
  computed : {
    ...mapState(['coins','searchCoin']),
    ...mapGetters(['getCoinsFiltered']),
    computedFilteredCoins() {
      return this.getCoinsFiltered(this.searchCoin)
    }
  },
  mixins: [mixinFilters]
}
</script>

<style scoped>
tr{
  cursor: pointer;
}
</style>