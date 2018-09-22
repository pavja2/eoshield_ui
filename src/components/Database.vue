<template>
  <div class="dataTable">
        <h1>Blacklisted Accounts and Contracts</h1>
        <b-table striped hover :items="items" :fields="fields">
          <template slot="show_details" slot-scope="row">
            <b-button size="sm" @click.stop="row.toggleDetails" class="mr-2">
              {{ row.detailsShowing ? 'Hide' : 'Show'}} Details
            </b-button>
          </template>
          <template slot="row-details" slot-scope="row">
            <b-card :title="infoCardTitle(row.item.Account)">
              <b-row>
                <b-col>
                  <p>{{row.item.details}}</p>
                </b-col>
              </b-row>
              <b-button-group>
                <b-button variant="secondary"
                          v-on:click="modifyContract(row.item.Account, row.item.RiskLevel, row.item.details)">Modify
                  Blacklist Entry
                </b-button>
              </b-button-group>
            </b-card>
          </template>
        </b-table>
    <b-modal ref="myModalRef" title="Update Blacklist Entry">
      <AddDatabaseEntry v-bind:update="true" v-bind:account_name="modifyAccountName"
                        v-bind:details="modifyDetails"
                        v-bind:risk_level="modifyRiskLevel"></AddDatabaseEntry>
      <div slot="modal-footer">
        <b-btn class="float-right" variant="primary" @click="hideModal()">
          Close
        </b-btn>
      </div>
    </b-modal>
  </div>
</template>

<script>
  import AddDatabaseEntry from "./AddDatabaseEntry";

  export default {
    name: "Database",
    components: {AddDatabaseEntry},
    data: function () {
      return {
        fields: {
          Account: {
            sortable: true
          },
          RiskLevel: {
            sortable: true
          },
          show_details: {
            sortable: false
          }
        },
        modifyAccountName: "",
        modifyRiskLevel: 0,
        modifyDetails: "",
        items: []
      }
    },
    mounted: function () {
      this.getEntries();
    },
    methods: {
      getCVSSStyle(CVSS_score) {
        console.log(CVSS_score)
        if (CVSS_score >= 9.0) {
          return 'danger';
        }
        else if (CVSS_score < 9.0 & CVSS_score >= 7.0) {
          return 'warning';
        }
        else if (CVSS_score < 7.0 & CVSS_score >= 4.0) {
          return 'success';
        }
        else if (CVSS_score < 4.0) {
          return 'info';
        }
      },
      getEntries() {
        this.$eos.getTableRows(true, "firewall", "firewall", "cve").then(response => {
          this.items = [];
          for (let row of response.rows) {
            this.items.push({
              Account: row.accountName,
              RiskLevel: row.riskLevel,
              details: row.details,
              _cellVariants: {RiskLevel: this.getCVSSStyle(row.riskLevel)},
            });
          }
        });
      },
      infoCardTitle(accountName) {
        return "Blacklist Entry for " + accountName;
      },
      modifyContract(accountName, riskLevel, details) {
        this.$refs.myModalRef.show();
        this.modifyAccountName = accountName;
        this.modifyRiskLevel = riskLevel;
        this.modifyDetails = details;
      },
      hideModal() {
        this.$refs.myModalRef.hide();
        this.modifyAccountName = "";
        this.modifyRiskLevel = 0;
        this.modifyDetails = "";
        this.getEntries();
      }
    }
  }
</script>

<style scoped>
  .dataTable{
    padding-right: 20px;
    padding-left: 20px;
  }
</style>
