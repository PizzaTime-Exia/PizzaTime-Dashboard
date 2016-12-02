import {Line} from 'vue-chartjs';

export default Line.extend({
  name: 'BenefitsChart',
  props: ["data", "options"],
  mounted() {
    this.renderChart(this.data, this.options);
  }
});
