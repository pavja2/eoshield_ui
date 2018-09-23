<template>
  <div class="page bg-dark">
    <b-container fluid class="text-white">
      <b-row class="account_row">
        <b-col cols="3"></b-col>
        <b-col cols="6">
          <b-form inline>
            <h1 class="account_text">Can I trust</h1>
            <b-input class="account_input bg-transparent mb-2 mr-sm-2 mb-sm-0" v-on:change="checkAccount(account_name)"
                     v-model="account_name"/>
            <h1 class="account_text">?</h1>
          </b-form>
        </b-col>
        <b-col cols="3"></b-col>
      </b-row>
      <b-row>
        <b-col cols="3"></b-col>
        <b-col cols="6">
          <b-alert show variant="danger" v-if="account_result === 'bad'"><b>No: </b> That account has been associated
            with malicious activity. Exercise extreme caution when interacting with it!
          </b-alert>
          <b-alert show variant="success" v-if="account_result === 'safe'"><b>Yes: </b> That account has been thoroughly
            vetted by EOShield and should be secure.
          </b-alert>
          <b-alert show variant="warning" v-if="account_result === 'unknown'"><b> Maybe: </b> No security issues have
            been reported with the account but it has not been verified either.
          </b-alert>
        </b-col>
        <b-col cols="3"></b-col>
      </b-row>
      <b-row class="bottom">
        <b-col cols="3" class="right">
          <b-button variant="secondary" v-b-modal.modalForm>Report</b-button>
        </b-col>
        <b-col cols="6"></b-col>
        <b-col></b-col>
      </b-row>
    </b-container>
    <b-modal ref="modalForm" id="modalForm" title="Report an Account">
      <b-form v-on:submit="report">
        <b-form-input id="account_name" class="form-fields" v-model="reportForm.submitter_account_name" placeholder="Your Account Name" required></b-form-input>
        <b-form-input id="account_name" class="form-fields" v-model="reportForm.malicious_account_name" placeholder="Malicious Account Name" required></b-form-input>
        <b-form-textarea id="reasons" class="form-fields" v-model="reportForm.reason" placeholder="Why are you reporting this account?" required :rows="3" :max-rows="6"></b-form-textarea>
        <b-button type="submit" class="form-fields" variant="secondary">Submit Report</b-button>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
  export default {
    name: "User",
    data: function () {
      return {
        number: 0,
        account_name: '',
        account_result: '',
        lowCount: 0,
        medCount: 0,
        highCount: 0,
        critCount: 0,
        reportForm: {
          submitter_account_name: '',
          malicious_account_name: '',
          reason: '',
        },
      };
    },
    mounted: function () {
      this.getStats();
    },
    methods: {
      getStats() {
        this.$eos.getTableRows({
          json: true,
          code: "firewall",
          scope: "firewall",
          table: "cve",
          limit: "1000"
        }).then(response => {
          this.lowCount = 0;
          this.medCount = 0;
          this.highCount = 0;
          this.critCount = 0;
          for (let row of response.rows) {
            if (row.riskLevel >= 9.0) {
              this.critCount += 1;
            }
            else if (row.riskLevel < 9.0 & row.riskLevel >= 7.0) {
              this.highCount += 1;
            }
            else if (row.riskLevel < 7.0 & row.riskLevel >= 4.0) {
              this.medCount += 1;
            }
            else if (row.riskLevel < 4.0) {
              this.lowCount += 1;
            }
            this.number += 1;
          }
        });
      },
      checkAccount(account_name) {
        this.$eos.contract("firewall").then(myaccount =>
          myaccount.checktrust(this.account_name, {authorization: 'firewall'}).then(response => {
              this.account_result = 'safe';
            },
            error => {
              this.$eos.contract("firewall").then(myaccount =>
                myaccount.checkacct(this.account_name, 0, {authorization: 'firewall'}).then(response => {
                    this.account_result = 'unknown';
                  },
                  error => {
                    this.account_result = 'bad';
                  }
                ));
            }
          ));
        },
      report() {
        this.$refs.modalForm.hide();
        console.log(this.reportForm.submitter_account_name);
        console.log(this.reportForm.malicious_account_name);
        console.log(this.reportForm.reason);
      }
    }
  }
</script>

<style scoped>
  .page {
    height: 100vh;
  }

  .account_row {
    padding-top: 30vh;
  }

  .account_text {
    font-style: italic;
    font-size: 60px;
    margin-bottom: 9px;
    margin-left:9px;
    margin-right:15px;
  }

  .account_input {
    background-color: transparent;
    border-color: transparent;
    border-bottom-color: white;
    color: white;
    font-style: italic;
    width: 340px;
    height:80px;
    font-size:60px;
    border-radius: 0 !important;
  }

  .bottom {
    position:absolute;
    bottom: 5%;
    width: 100%;
  }

  .right {
    margin:0px;
  }

  .form-fields {
    margin-bottom: 10px;
  }
</style>
