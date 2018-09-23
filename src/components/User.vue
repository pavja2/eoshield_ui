<template>
  <div class="page bg-dark text-white">
    <h1 class="page_title">EOShield</h1>
    <b-container>
      <b-row>
        <b-col></b-col>
        <b-col></b-col>
        <b-col></b-col>
      </b-row>
      <b-row>
        <b-col></b-col>
        <b-col>
          <div class="pie_chart">
            <PieChart></PieChart>
          </div>
        </b-col>
        <b-col>
          <div class="iCountUp">
            <ICountUp
              :startVal=0
              :endVal="number"
              @ready="onReady"
            />
          </div>
          <h1 class="threats_tracked">threats tracked</h1>
        </b-col>
        <b-col></b-col>
      </b-row>
      <b-row class="account_row">
        <b-col></b-col>
        <b-col cols="8">
          <b-form inline>
            <h1 class="account_text">Can I trust</h1>
            <b-input class="account_input bg-transparent mb-2 mr-sm-2 mb-sm-0" v-on:input="checkAccount(account_name)" v-model="account_name" placeholder="account name" />
            <h1 class="account_text">?</h1>
          </b-form>
        </b-col>
        <b-col>
          <h1><b-badge class="account_results" v-if="!SuccessHidden" variant="success">Yes</b-badge></h1>
          <h1><b-badge class="account_results" v-if="!FailHidden" variant="danger">No</b-badge></h1>
          <h1><b-badge class="account_results" v-if="!UnknownHidden" variant="warning">Unknown</b-badge></h1>
        </b-col>
        <b-col></b-col>
      </b-row>
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
              <b-form-input class="bg-transparent report_input_1" v-model=reportForm.account_name placeholder="account name" />
              <b-form-input class="bg-transparent report_input_2" v-model=reportForm.reason placeholder="Why are you reporting this user?" />
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
          <h1><b-badge class="report_results" v-if="!SubmitHidden" variant="success">Submitted</b-badge></h1>
        </b-col>
        <b-col></b-col>
        <b-col></b-col>
      </b-row>
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
        number: 500,
        account_name: '',
        SuccessHidden: true,
        FailHidden: true,
        UnknownHidden: true,
        SubmitHidden: true,
        reportForm: {
          account_name: '',
          reason: '',
        },
      };
    },
    methods: {
      onReady: function (instance, CountUp) {
        const that = this;
        instance.update(that.endVal + 100);
      },
      checkAccount(account_name) {
        console.log(account_name)
        if (account_name === "Flavio") {
          this.SuccessHidden = false;
          this.FailHidden = true;
          this.UnknownHidden = true;
        }
        else if (account_name === "Eve") {
          this.SuccessHidden = true;
          this.FailHidden = false;
          this.UnknownHidden = true;
        }
        else {
          this.SuccessHidden = true;
          this.FailHidden = true;
          this.UnknownHidden = false;
        }
      },
      report() {
        this.SubmitHidden = false;
      }
    }
  }
</script>

<style scoped>
  .page {
    height:100vh;
  }
  .page_title {
    font-size:200px;
    margin:0px;
    padding:0px;
    border:0px;
    text-align:center;
  }
  .pie_chart {
    height:400px;
    width:400px
  }
  .iCountUp {
    font-size: 16em;
    margin-top:45px;
    margin-left:0px;
    margin-right:0px;
    margin-bottom:70px;
    border:0px;
    padding:0px;
    height:200px;
    color: #4d63bc;
  }
  .threats_tracked {
    font-style:italic;
    margin-left:160px;
    margin-right:0px;
  }
  .account_row {
    margin-top:10px;
  }
  .account_text {
    font-style:italic;
    font-size:60px;
    margin-bottom:9px;
    margin-right:10px;
  }
  .account_input {
    background-color: transparent;
    border-color: transparent;
    border-bottom-color: white;
    color: white;
    font-size: 2.5em;
    font-style:italic;
    width:340px;
    margin-top:5px;
    margin-bottom:0px;
  }
  .account_results {
    margin-bottom:10px;
    margin-left:0px;
    margin-right:0px;
  }
  .report_text {
    margin-top:5px;
    margin-left:0px;
    margin-right:0px;
  }
  .report_input_1 {
    width: 200px;
    margin-left:0px;
    margin-right:0px;
    margin-bottom:0px;
  }
  .report_input_2 {
    width: 450px;
  }
  .report_results {
    margin-top:0px;
    margin-left:0px;
    margin-right:0px;
  }
</style>
