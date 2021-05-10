<template>
  <Toast position="top-right" />
  <div id="overlay" :class="{ visible: loading }" >
    <ProgressSpinner />
  </div>
  <div class="p-grid">
    <div class="p-col-12">
      <Fieldset legend="Type the URL">
        <div class="p-fluid p-formgrid p-grid">
          <div class="p-field p-col-12 p-md-9">
              <InputText id="firstname" type="text" :class="{'p-invalid': invalid}" v-model="url" />
          </div>
          <div class="p-field p-col-1" id="switch">
              <InputSwitch v-model="download" />
              <label for="address">Download</label>
          </div>
          <div class="p-field p-col-12 p-md-2">
              <Button label="Extract" icon="pi pi-sign-in" @click="getData" />
          </div>

      </div>
      </Fieldset>
    </div>

  </div>
  <div class="p-grid">
    <div class="p-col-12 p-md-6">
      <Panel header="All Images">
        <ScrollPanel style="width: 100%; height: 500px">
            <img v-for="(image, index) in images" :key=index :src="image.src" :alt="image.alt" /> 
        </ScrollPanel>
      </Panel>

    </div>
    <div class="p-col-12 p-md-6">
      <Panel header="Top 10 words">
        <div class="card">
            <h5>Vertical</h5>
            <Chart type="bar" :data="chartData" :options="chartOptions" />
        </div>
      </Panel>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
	data() {
		return {
			download: true,
      url: '',
      invalid: false,
      loading: false,
      images: [],
      bgColors: ['#2776f5', '#f52731', '#adf527', '#e8d017', '#78e0fa', '#42308c', '#8a308c', '#941b1f', '#fc7521', '#080300'],
      wordData: {
          labels: [],
          datasets: []
      },
      chartOptions: null
		}
	},
  computed: {
    chartData: function() {
      return this.wordData;
    }
  },
  methods:{
    getData(){
      if(!this.url.trim()) {
        this.showErrorMessage('Please type a valid URL');
        return;
      }
      const payload = {
        url:this.url,
        download: this.download,
      }
      var url = process.env.VUE_APP_API_URL;
      console.log(url);
      console.log(payload);
      this.loading=true;
      axios.post(url, payload).then((response) => {        
        this.clearForm();
        console.log(response.data);
        console.log("chartData", this.chartData)
        response.data.words
        this.processResponse(response.data);
        this.loading=false;
      }).catch((error) => {
        console.log(error);
        const message = error.message || "An error occurred when trying to fetch data";
        this.loading=false;
        this.showErrorMessage(message);
      })
    },
    processResponse(response) {
      this.images = response.images;
      this.mountChartData(response.words);
    },
    mountChartData(words) {
      console.log("words", words);
        words.forEach((item,index) => {
          console.log("item", item);
          console.log("index", index);
          this.wordData.labels[index] = item.word;
          let itemData = {
            label: item.word,
            backgroundColor: this.bgColors[index],
            data: Array(10),
          }
          itemData.data[index] = item.count;
          this.wordData.datasets[index] = itemData;
        });
        console.log("chartData", this.chartData);
    },
    clearForm(){
      this.value = "";      
    },
    showErrorMessage(message){
      this.$toast.add({severity:'error', summary: 'Sorry', detail: message, life: 3000});
    }
  }
}
</script>

<style>
#switch {
  max-width: 100px;
}
#overlay {
  display: none;
  position: fixed;
  top:0;
  left:0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.3);
  z-index: 9999;
}
#overlay.visible {
  display: flex;
  align-items: center;
}
</style>