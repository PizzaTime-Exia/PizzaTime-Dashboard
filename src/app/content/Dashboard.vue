<template>
  <div class="content">
    <div class="mui-container-fluid">
      <benefits-chart :data="benefits.data" :options="benefits.options" />
    </div>
  </div>
</template>

<script>
import BenefitsChart from './charts/Benefits'

export default {
  name: 'Dashboard',
  components: {
    'benefits-chart': BenefitsChart
  },
  data() {
    return {
      benefits: {
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          datasets: [
            {
              label: 'Bénéfices',
              backgroundColor: '#f87979',
              data: [0, 20, 60, 40, 80, 90, 70, 120, 160, 120, 220, 300]
            }
          ]
        },
        options: {
          responsive: false
        }
      }
    }
  }
};
</script>
