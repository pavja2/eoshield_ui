<script>
  import VueCharts from 'vue-chartjs'

  export default {
    extends: VueCharts.Doughnut,
    mounted () {
      this.renderChart({
        datasets: [
          {
            backgroundColor: [
              '#4fdf4f',
              '#FFB653',
              '#F28A08',
              '#f87979',
            ],
            data: [
              90,
              130,
              200,
              80,
            ],
          }
        ],
        labels: [
          'low',
          'medium',
          'high',
          'critical'
        ],
        options: {
          legend: {
            labels: {
              fontColor: 'white'
            }
          }
        }
      })
    }
  }
</script>
