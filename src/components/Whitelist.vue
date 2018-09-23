<template>
  <div class="dataTable">
    <h1>Trusted Contracts <b-button class="float-right" variant="success" v-on:click="createModal()">+</b-button></h1>
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
                      v-on:click="modifyTrusted(row.item.Account, row.item.Signature, row.item.details)">Modify
              Trusted Entry
            </b-button>
          </b-button-group>
        </b-card>
      </template>
    </b-table>
    <b-modal ref="myModalRef" title="Update Verified Account">
      <AddWhitelistEntry :account_name="modifyAccountName" :signature="modifySignature" :details="modifyDetails" :update="true"></AddWhitelistEntry>
      <div slot="modal-footer">
        <b-btn class="float-right" variant="primary" @click="hideModal()">
          Close
        </b-btn>
      </div>
    </b-modal>
    <b-modal ref="createModalRef" title="Create Trusted Entry">
      <AddWhitelistEntry v-bind:update="false"></AddWhitelistEntry>
      <div slot="modal-footer">
        <b-btn class="float-right" variant="primary" @click="hideModal()">
          Close
        </b-btn>
      </div>
    </b-modal>
  </div>
</template>

<script>
  import AddWhitelistEntry from "./AddWhitelistEntry";

  export default {
    name: "Whitelist",
    components: {AddWhitelistEntry},
    data: function () {
      return {
        fields: {
          Account: {
            sortable: true
          },
          Signature: {
            sortable: true
          },
          show_details: {
            sortable: false
          }
        },
        modifyAccountName: "",
        modifySignature: "",
        modifyDetails: "",
        items: []
      }
    },
    mounted: function () {
      this.getEntries();
    },
    methods: {
      getCVSSStyle(CVSS_score) {
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
        this.$eos.getTableRows(true, "firewall", "firewall", "trusted").then(response => {
          this.items = [];
          for (let row of response.rows) {
            this.items.push({
              Account: row.account,
              Signature: row.codeHash,
              details: row.description,
              _cellVariants: {RiskLevel: this.getCVSSStyle(row.riskLevel)},
            });
          }
        });
      },
      infoCardTitle(accountName) {
        return "Trusted Entry for " + accountName;
      },
      modifyTrusted(account, codeHash, details) {
        this.$refs.myModalRef.show();
        this.modifyAccountName = account;
        this.modifySignature = codeHash ;
        this.modifyDetails = details;
      },
      hideModal() {
        this.$refs.myModalRef.hide();
        this.$refs.createModalRef.hide();
        this.modifyAccountName = "";
        this.modifySignature = "";
        this.modifyDetails = "";
        this.getEntries();
      },
      createModal(){
        this.$refs.createModalRef.show();
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
