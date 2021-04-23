<template>
  <div class="flex flex-col items-center">
    <BounceLoader :loading="isReady" />
    <template v-if="!isReady">
    <div class="flex flex-wrap justify-evenly container items-center">
      <div class="brand flex flex-col items-center">
        <img :src="`https://static.coincap.io/assets/icons/${currency.symbol}@2x.png`" :alt="currency.name" class="w-20">
        <p class="font-bold text-4xl my-2">{{currency.name}}</p>
      </div>
      <div class="detail text-right text-xl">
        <p>Ranking: <span class="font-semibold">{{currency.rank}}</span></p>
        <p>Price current: <span class="font-semibold">{{currency.price | formatMoneyDollar}}</span></p>
        <p>Price down: <span class="font-semibold">{{minPrice | formatMoneyDollar}}</span></p>
        <p>Price hight: <span class="font-semibold">{{maxPrice | formatMoneyDollar}}</span></p>
        <p>Price average: <span class="font-semibold">{{averagePrice | formatMoneyDollar}}</span></p>
        <p>Change (24Hr): <span class="font-semibold">{{currency.change | formatPercentegeChange}}</span></p>
      </div>
      <line-chart
          :min="minPrice"
          :max="maxPrice"
          :data="dataChart"
          label="Price Today"
          class="mt-10"
      ></line-chart>
    </div>
    </template>

  </div>
</template>


<script>
import {mapGetters, mapActions, mapState} from 'vuex'
import mixinFilters from "@/mixins/mixins";
import BounceLoader from 'vue-spinner/src/BounceLoader'
export default {
  name : 'PageCripto',
  async created() {
    this.currency = await this.getOneCurrency(this.name)
    await this.getMoreDetailCurrencyCurrent(this.name)
  },
  props: {
    name: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      currency : {}
    }
  },
  components : {BounceLoader},
  methods : {
    ...mapActions(['getMoreDetailCurrencyCurrent'])
  },
  computed : {
    ...mapGetters(['getOneCurrency']),
    ...mapState(['detailCurrency','isReady']),
    maxPrice(){
      return Math.max(...this.detailCurrency.map( h => Number(h.price).toFixed(2) ))
    },
    minPrice(){
      return Math.min(...this.detailCurrency.map( h => Number(h.price).toFixed(2) ))
    },
    averagePrice(){
      return Math.abs(...this.detailCurrency.map( h => Number(h.price).toFixed(2) ))
    },
    dataChart(){
      return this.detailCurrency.map( c => [c.date, c.price] )
    }
  },
  mixins: [mixinFilters]
}
</script>