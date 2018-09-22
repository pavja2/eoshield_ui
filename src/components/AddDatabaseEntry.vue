<template>
  <div>
    <h1>Add Database Entry</h1>
    <b-container fluid>
      <b-row>
        <b-col></b-col>
        <b-col>
          <b-form v-on:submit="addEntry">
            <b-form-group label="CVE Number" label-for="CVE_number">
              <b-form-input id="CVE_number" class="form-control" v-model="entryForm.CVE_number" placeholder="CVE-2018-1234" required></b-form-input>
            </b-form-group>
            <b-form-group label="CVSSScore" label-for="CVSS_score">
              <b-form-input id="CVSS_score" class="form-control" v-model="entryForm.CVSS_score" placeholder="10.0" required></b-form-input>
            </b-form-group>
            <b-form-group label="Details" label-for="details">
              <b-form-textarea id="details" class="form-control" v-model="entryForm.details" placeholder="Details Here" required :rows="3" :max-rows="6">></b-form-textarea>
            </b-form-group>
            <b-button type="submit" variant="info">Submit</b-button>
          </b-form>
        </b-col>
        <b-col></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
  export default {
    name: "AddDatabaseEntry",
    data: function () {
      return {
        entryForm: {
          CVE_number: '',
          CVSS_score: '',
          details: '',
        },
      }
    },
    methods: {
      addEntry() {
        console.log(this.entryForm.CVE_number);
        console.log(this.entryForm.CVSS_score);
        console.log(this.entryForm.details);
      }
    }
  }
</script>

<style scoped>

</style>
