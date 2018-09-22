<template>
  <div>
    <h1>Check Account</h1>
    <b-container fluid>
      <b-row>
        <b-col></b-col>
        <b-col>
          <b-form v-on:submit="checkAccount">
            <b-input-group>
              <b-form-input id="account_name" class="form-control" v-model="checkAccountForm.account_name" placeholder="Account Name" required></b-form-input>
              <b-input-group-append>
                <b-btn variant="info" type="submit">Submit</b-btn>
              </b-input-group-append>
            </b-input-group>
          </b-form>
        </b-col>
        <b-col></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
  export default {
    name: "CheckAccount",
    data: function () {
      return {
        checkAccountForm: {
          account_name: '',
        },
      }
    },
    methods: {
      checkAccount() {
        console.log(this.checkAccountForm.account_name);
      }
    }
  }
</script>

<style scoped>

</style>
