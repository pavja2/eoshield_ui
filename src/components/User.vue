<template>
  <div class="page bg-dark text-white">
    <b-container fluid>
      <!--
      <b-row>
        <b-col></b-col>
        <b-col>
          <div v-if='account_result == ""' bg-variant="transparent" class="info_card">
          </div>
          <b-card v-if="account_result === 'unknown'" header="Unknown Account" bg-variant="warning" class="info_card">
          <p class="card-text">We don't have any information on this account. If you think the account is malicious click the report button to report it.</p>
          <center><b-btn variant="primary">Report Account</b-btn>
          </center>
          </b-card>
          <b-card v-if="account_result === 'safe'" header="Safe Account" bg-variant="success" class="info_card">
            <p class="card-text">That account has been verified as secure. Feel free to use it.</p>
            <center><b-btn variant="primary">Report Account</b-btn>
            </center>
          </b-card>
          <b-card v-if="account_result === 'bad'" header="Dangerous Account" bg-variant="danger" class="info_card">
            <p class="card-text">That count has been associated with malicious activity. Exercise extreme caution when interacting with it!</p>
          </b-card>
        </b-col>
      </b-row>-->

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

      <!--
      <b-row>
        <b-col></b-col>
        <b-col cols="8">
          <h1 class="report_text">Report a User</h1>
        </b-col>
        <b-col></b-col>
        <b-col></b-col>
      </b-row>
      <b-row>
        <b-col></b-col>
        <b-col cols="8">
          <b-form inline v-on:submit="report">
            <b-input-group>
              <b-form-input class="bg-transparent report_input_1" v-model=reportForm.account_name
                            placeholder="account name"/>
              <b-form-input class="bg-transparent report_input_2" v-model=reportForm.reason
                            placeholder="Why are you reporting this user?"/>
              <b-input-group-append>
                <b-btn type="submit">Report</b-btn>
              </b-input-group-append>
            </b-input-group>
          </b-form>
        </b-col>
        <b-col></b-col>
        <b-col></b-col>
      </b-row>
      <b-row>
        <b-col></b-col>
        <b-col cols="8">
          <h1>
            <b-badge class="report_results" v-if="!SubmitHidden" variant="success">Submitted</b-badge>
          </h1>
        </b-col>
        <b-col></b-col>
        <b-col></b-col>
      </b-row>-->
    </b-container>
  </div>
</template>

<script>
  import PieChart from '@/components/PieChart'

  export default {
    name: "User",
    components: {PieChart},
    data: function () {
      return {
        number: 0,
        account_name: '',
        account_result: '',
        accountType: '',
        SubmitHidden: true,
        lowCount: 0,
        medCount: 0,
        highCount: 0,
        critCount: 0,
        reportForm: {
          account_name: '',
          reason: '',
        },
      };
    },
    mounted: function () {
      this.getStats();
    },
    computed: {
      pieData: function () {
        return {
          labels: ['Low', 'Medium', 'High', 'Critical'],
          datasets:
            [
              {
                backgroundColor: [
                  '#4fdf4f',
                  '#FFB653',
                  '#F28A08',
                  '#f87979',
                ],
                data: [
                  this.lowCount,
                  this.medCount,
                  this.highCount,
                  this.critCount,
                ],
              }
            ]
        }
      }
    },
    methods: {
      onReady: function (instance, CountUp) {
        const that = this;
        instance.update(that.endVal + 100);
      },
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
        this.SubmitHidden = false;
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
  }

  .account_input {
    background-color: transparent;
    border-color: transparent;
    border-bottom-color: white;
    color: white;
    font-style: italic;
    width: 340px;
    font-size: 50px;
    height: 70px;
  }

  .account_results {
    margin-bottom: 10px;
    margin-left: 0px;
    margin-right: 0px;
  }

  .report_text {
    margin-top: 5px;
    margin-left: 0px;
    margin-right: 0px;
  }

  .report_input_1 {
    width: 200px;
    margin-left: 0px;
    margin-right: 0px;
    margin-bottom: 0px;
  }

  .report_input_2 {
    width: 450px;
  }

  .report_results {
    margin-top: 0px;
    margin-left: 0px;
    margin-right: 0px;
  }
</style>
