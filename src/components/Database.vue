<template>
  <div class="div">
    <h1>Database</h1>
    <b-table striped hover :items="items" :fields="fields"></b-table>
  </div>
</template>

<script>
  export default {
    name: "Database",
    data: function () {
      return {
        fields: {
          CVE_number: {
            sortable: true
          },
          CVSS_score: {
            sortable: true
          },
          details: {
            sortable: true
          }
        },

        items: [
          {
            CVE_number: "2018-012",
            CVSS_score: 10.0,
            details: "remote code execution",
            _cellVariants: {CVSS_score: this.getCVSSStyle(10.0)},
          },
          {
            CVE_number: "2018-345",
            CVSS_score: 8.5,
            details: "remote code execution",
            _cellVariants: {CVSS_score: this.getCVSSStyle(8.5)},
          },
          {
            CVE_number: "2018-678",
            CVSS_score: 5.8,
            details: "denial of service",
            _cellVariants: {CVSS_score: this.getCVSSStyle(5.8)},
          },
          {
            CVE_number: "2018-900",
            CVSS_score: 3.0,
            details: "cross-site scripting",
            _cellVariants: {CVSS_score: this.getCVSSStyle(3.0)},
          },
        ]
      }
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
      addEntry() {
        this.items.push({
          CVE_number: this.entryForm.CVE_number,
          CVSS_score: this.entryForm.CVSS_score,
          details: this.entryForm.details,
          _cellVariants: {CVSS_score: this.getCVSSStyle(this.entryForm.CVSS_score)}
        })
      }
    }
  }
</script>

<style scoped>

</style>
