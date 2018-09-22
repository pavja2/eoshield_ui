<template>
  <div>
    <b-navbar toggleable="md" type="dark" variant="info">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand to="Operator">EOShield</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item v-on:click="showAddDatabaseEntry">Add Database Entry</b-nav-item>
          <b-nav-item v-on:click="showDatabase">Database</b-nav-item>
          <b-nav-item v-on:click="showStatistics">Statistics</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <AddDatabaseEntry v-if="!AddDatabaseEntryHidden"></AddDatabaseEntry>
    <Database v-if="!DatabaseHidden"></Database>
    <Statistics v-if="!StatisticsHidden"></Statistics>
  </div>
</template>

<script>
  import Statistics from "@/components/Statistics";
  import AddDatabaseEntry from "@/components/AddDatabaseEntry";
  import Database from "@/components/Database";

  export default {
    name: "Operator",
    components: {Database, AddDatabaseEntry, Statistics},
    data: function () {
      return {
        AddDatabaseEntryHidden: true,
        DatabaseHidden: true,
        StatisticsHidden: false,
      }
    },
    methods: {
      showAddDatabaseEntry() {
        this.AddDatabaseEntryHidden = false;
        this.DatabaseHidden = true;
        this.StatisticsHidden = true;
      },
      showDatabase() {
        this.AddDatabaseEntryHidden = true;
        this.DatabaseHidden = false;
        this.StatisticsHidden = true;
      },
      showStatistics() {
        this.AddDatabaseEntryHidden = true;
        this.DatabaseHidden = true;
        this.StatisticsHidden = false;
      }
    }
  }
</script>

<style scoped>

</style>
