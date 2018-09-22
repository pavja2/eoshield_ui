<template>
  <div>
    <b-navbar toggleable="md" type="dark" variant="info">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand to="User">EOShield</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item v-on:click="showStatistics">Statistics</b-nav-item>
          <b-nav-item v-on:click="showCheckAccount">Check Account</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <Statistics v-if="!StatisticsHidden"></Statistics>
    <CheckAccount v-if="!CheckAccountHidden"></CheckAccount>
  </div>
</template>

<script>
  import Statistics from "@/components/Statistics";
  import CheckAccount from "@/components/CheckAccount";

  export default {
    name: "User",
    components: {CheckAccount, Statistics},
    data: function () {
      return {
        StatisticsHidden: false,
        CheckAccountHidden: true,
      }
    },
    methods: {
      showStatistics() {
        this.StatisticsHidden = false;
        this.CheckAccountHidden = true;
      },
      showCheckAccount() {
        this.StatisticsHidden = true;
        this.CheckAccountHidden = false;
      }
    }
  }
</script>

<style scoped>

</style>
