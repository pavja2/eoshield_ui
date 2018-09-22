<template>
  <div>
    <b-form inline>
      <div class="iCountUp">
        <ICountUp
          :startVal=0
          :endVal="number"
          @ready="onReady"
        />
      </div>
      <h1>attacks blocked...</h1>
    </b-form>
  </div>
</template>

<script>
  export default {
    name: "Statistics",
    data: function () {
      return {
        number: 500,
      };
    },
    methods: {
      onReady: function(instance, CountUp) {
        const that = this;
        instance.update(that.endVal + 100);
      }
    }
  }
</script>

<style scoped>
  .iCountUp {
    font-size: 12em;
    margin-top: 0px;
    margin-bottom: 0px;
    margin: 20px;
    margin-right:20px;
    color: #4d63bc;
  }
  h1 {
    font-size:100px;
    font-style:italic;
  }
</style>
