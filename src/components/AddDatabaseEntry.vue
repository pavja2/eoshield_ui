<template>
  <div>
    <b-card>
        <b-form v-on:submit="addEntry">
          <b-form-group v-if="!update" label="Account Name" label-for="account_name">
            <b-form-input id="account_name" class="form-control" v-model="account_name" placeholder="CVE-2018-1234" required></b-form-input>
          </b-form-group>
          <p v-if="update"><b>Account: </b> {{account_name}}</p>
          <b-form-group label="Risk Level" label-for="risk_level">
            <b-form-input id="risk_level" class="form-control" v-model="risk_level" placeholder="10.0" required></b-form-input>
          </b-form-group>
          <b-form-group label="Details" label-for="details">
            <b-form-textarea id="details" class="form-control" v-model="details" placeholder="Details Here" required :rows="3" :max-rows="6">></b-form-textarea>
          </b-form-group>
          <b-button v-if="!update" v-on:click="addEntry">Submit</b-button>
          <b-button v-if="update" v-on:click="modifyEntry">Update</b-button>

        </b-form>
    </b-card>
  </div>
</template>

<script>
  export default {
    name: "AddDatabaseEntry",
    props: {
      account_name: {

      },
      risk_level: {

      },
      details: {

      },
      update: {
        default: false,
      }
    },
    data: function () {
      return {}
    },
    methods: {
      addEntry() {
        this.$eos.contract('firewall').then(myaccount =>
          myaccount.addacct(this.account_name, this.risk_level,
            "", this.details, "", {authorization: 'firewall'}).then(
              response => {
                console.log(response);
              },
            error => {
                console.log(error);
            }
          )
        );
      },
      modifyEntry(){
        this.$eos.contract('firewall').then(myaccount =>
        myaccount.updateacct(this.account_name, this.risk_level, "", this.details, "", {authorization: 'firewall'}).then(
          response => {
            console.log(response);
          },
          error => {
            console.log(error);
          }
        ));
      }
    }
  }
</script>

<style scoped>

</style>
