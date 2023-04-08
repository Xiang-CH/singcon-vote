<template>
    <v-app class="vote-container" >

      <v-card :class="(alert? 'mb-2' : 'mb-10')" color="primary" rounded="0">
        <h1>SingCon 2023</h1>
        <v-tabs
            v-model="tab"
            bg-color="primary"
            fixed-tabs
            density="compact"
          >
          <v-tab value="history">历史</v-tab>
          <v-tab value="vote">投票</v-tab>
        </v-tabs>
      </v-card>

      <v-window v-model="tab">
        <v-window-item value="vote">
          <v-alert 
            :class= "'mb-2 w-75 mx-auto '+ (alert? '' : 'd-none') "
            color="warning"
            density="compact"
            :text = "'请选择 '+max_select+' 名选手!'"
          ></v-alert>
          <v-card 
            class="mx-auto w-75 py-2"
            max-width="400"
            :title ="round"
          >
            <v-list lines="two" class="mx-2" nav>
                <v-list-item
                  v-for= "(item, i) in options"
                  :key="i"
                  :value="item"
                  :title="item"
                  subtitle="..."
                  rounded="xl"
                  :class="{active: chosen.indexOf(i)>-1}" 
                  @click="toggleActive(i)" 
                >
                </v-list-item>

            </v-list>
          </v-card>
          <v-btn 
            class="mt-8"
            @click="submit()"
            size="large"
            color="primary"
          >确认</v-btn>
        </v-window-item>
      </v-window>

    </v-app>
</template>
  

<script>
export default {
  data() {
    return {
      round: '第一轮',
      options: ['选手 1', '选手 2', '选手 3', '选手 4', '选手 5'],
      chosen: [],
      max_select: 3,
      alert: false,
      tab: "vote"
    };
  },
  computed: {
    
  },
  methods: {
    vote(index) {
      this.votes[index]++;
    },

    toggleActive(index) {
      if (this.chosen.indexOf(index) > -1) {
        this.chosen.splice(this.chosen.indexOf(index), 1);
      } else {
        if (this.chosen.length < this.max_select) {
          this.chosen.push(index);
        }
      }
    },

    submit() {
      console.log(this.chosen);
      if (this.chosen.length < this.max_select) {
        this.alert = true;
        setTimeout(() => {
          this.alert = false;
        }, 2000);
      } else {
        this.alert = false;
        
      }

    }
  },
};
</script>


<style scoped>
.vote-container {
  width: 100%;
  display: block;
  flex-direction: column;
  align-items: center;
}

ul {
  list-style-type: none;
  padding: 0;
}

h1{
  padding-top: 15px;
  margin-bottom: 15px;
}

.active {
  color: #b25bbc;
  background-color: #cd9ed293;
}


</style>

