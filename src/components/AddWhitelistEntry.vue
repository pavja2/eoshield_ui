<template>
  <div>
    <b-card>
      <b-form v-on:submit="addEntry">
        <b-form-group v-if="!update" label="Account Name" label-for="account_name">
          <b-form-input id="account_name" class="form-control" v-model="account_name" placeholder="Account Name" required></b-form-input>
        </b-form-group>
        <p v-if="update"><b>Account: </b> {{account_name}}</p>
        <b-form-group label="Verified Contract Signature" label-for="signature_form">
          <b-form-input id="signature_form" class="form-control" v-model="signature" placeholder="Contract Signature Hash" required></b-form-input>
        </b-form-group>
        <b-form-group label="Details" label-for="details">
          <b-form-textarea id="details" class="form-control" v-model="details" placeholder="Details About the Account" required :rows="3" :max-rows="6">></b-form-textarea>
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
      signature: {

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
          myaccount.addtrusted(this.account_name, this.details, this.signature, {authorization: 'firewall'}).then(
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
          myaccount.addtrusted(this.account_name, this.details, this.signature, {authorization: 'firewall'}).then(
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
