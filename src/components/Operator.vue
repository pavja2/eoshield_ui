<template>
  <div>
    <b-navbar toggleable="md" type="dark" variant="info">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand to="Operator">EOShield</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item v-on:click="showDatabase">Malicious Accounts</b-nav-item>
          <b-nav-item v-on:click="showMalware">Malicious Contracts</b-nav-item>
          <b-nav-item v-on:click="showWhitelistDatabase">Trusted Accounts</b-nav-item>
          <b-nav-item v-on:click="showReports">Reported Accounts</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <Whitelist v-if="!whitelistDatabaseHidden"></Whitelist>
    <Database v-if="!databaseHidden"></Database>
    <Malware v-if="!malwareDatabaseHidden"></Malware>
  </div>
</template>

<script>
  import AddDatabaseEntry from "@/components/AddDatabaseEntry";
  import Database from "@/components/Database";
  import Malware from "@/components/Malware";
  import Whitelist from "@/components/Whitelist";

  export default {
    name: "Operator",
    components: {Database, AddDatabaseEntry, Malware, Whitelist},
    data: function () {
      return {
        whitelistDatabaseHidden: true,
        databaseHidden: false,
        reportedDatabaseHidden: true,
        malwareDatabaseHidden: true,
      }
    },
    methods: {
      showWhitelistDatabase() {
        this.whitelistDatabaseHidden = false;
        this.databaseHidden = true;
        this.malwareDatabaseHidden = true;
        this.reportedDatabaseHidden = true;
      },
      showDatabase() {
        this.whitelistDatabaseHidden = true;
        this.databaseHidden = false;
        this.malwareDatabaseHidden = true;
        this.reportedDatabaseHidden = true;
      },
      showMalware(){
        this.whitelistDatabaseHidden = true;
        this.databaseHidden = true;
        this.malwareDatabaseHidden = false;
        this.reportedDatabaseHidden = true;
      },
      showReports(){
        this.whitelistDatabaseHidden = true;
        this.databaseHidden = true;
        this.malwareDatabaseHidden = true;
        this.reportedDatabaseHidden = false;
      }
    }
  }
</script>

<style scoped>

</style>
