<template>
  <div class="flex flex-col items-center">
    <BounceLoader :loading="isReady"/>
    <ComTable v-if="!isReady"/>
  </div>
</template>

<script>
import ComTable from "@/components/ComTable";
import {mapActions, mapState} from 'vuex'
import BounceLoader from 'vue-spinner/src/BounceLoader'
export default {
  name: 'Home',
  created() {
    this.getCoinsApi()
  },
  components: {ComTable, BounceLoader},
  methods : {
    ...mapActions(['getCoinsApi'])
  },
  computed : {
    ...mapState(['isReady'])
  }
}
</script>
