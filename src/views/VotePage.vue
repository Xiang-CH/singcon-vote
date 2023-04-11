<template>
<v-card class="mb-2" color="primary" rounded="0">
  <v-tabs
      v-model="tab"
      bg-color="primary"
      fixed-tabs
      density="compact"
    >
    <v-tab value="history" @click="getPast()">历史</v-tab>
    <v-tab value="vote" @click="getNow()">投票</v-tab>
  </v-tabs>
</v-card>
<img src="/loading.gif" v-if="loading" class="loading"/>
<v-window v-model="tab">
  <v-window-item value="history">
    <!-- 历史投票 -->
    <v-card 
      v-for="(round, i) in pastVote"
      :key="i"
      class="mx-2 w-auto py-2 px-2 mt-4 mb-2"
      max-width="400"
      :title ="round.vote_title"
      subtitle="晋级选手"
      rounded="xl"
      variant="elevated"
    >
      <v-list lines="three" class="mx-2" nav>
        
          <v-list-item
            variant = "flat"
            style="text-align: left; font-size:18px;"
            v-for= "(singer, j) in round.option_list"
            :key="j"
            :title="singer.singer_info.singer_name"
            :subtitle="singer.song_name"
            :prepend-avatar="singer.singer_info.singer_photo"
            rounded="xl"
            :class="'px-3 pt-3 pb-2 ' + (singer.is_win? 'active' : 'inactive')"  
            @click = "this.showjudge[i][j] = !this.showjudge[i][j]"      
          >
            <v-chip class="mr-1 my-0" size="x-small">观众分:{{ singer.vote_count }}</v-chip>
            <v-chip class="mr-1 my-0" size="x-small">评委分:{{ singer.judge_average_score.toFixed(1)}}</v-chip>
            <v-chip class="mr-1 my-0" size="x-small">总分:{{ singer.overall_score.toFixed(1) }}</v-chip>
            <v-chip class="my-0" size="x-small" v-if="singer.is_vote">已选</v-chip>

            <v-item-group v-if="this.showjudge[i][j]" class="my-2">
                <v-list-item 
                  lines="two"
                  v-for="(judge, k) in singer.judge_list" 
                  :key="k"
                  variant = "flat"
                  :title="judge.judge_info.judge_name"
                  :subtitle="judge.judge_info.judge_intro"
                  :prepend-avatar="judge.judge_info.judge_photo"
                  rounded="xl"
                >
                  <v-chip class="mr-1 my-0" size="x-small">音乐性: {{ judge.music_score }}/35</v-chip>
                  <v-chip class="mr-1 my-0" size="x-small">演唱: {{ judge.sing_score}}/35</v-chip>
                  <v-chip class="mr-1 my-0" size="x-small">台风: {{ judge.manner_score }}/20</v-chip>
                  <v-chip class="my-0" size="x-small">形象: {{ judge.image_score }}/10</v-chip>
                </v-list-item>
              
            </v-item-group>
          </v-list-item>

      </v-list>
    </v-card>
  </v-window-item>
  <v-window-item value="vote">
    <!-- 投票进行中 -->
    <div v-if="vote_status == 'open'">
      <!-- 已投票 -->
      <div v-if="voted">
        <v-card 
          class="mx-auto w-75 py-2 px-2 mt-4 mb-2"
          max-width="400"
          :title ="round"
          subtitle="已投选手"
          rounded="xl"
          variant="elevated"
        >
          <v-list lines="two" class="mx-2" nav>
              <v-list-item
                variant = "flat"
                style="text-align: left; font-size:15px;"
                v-for= "(item, i) in options"
                :key="i"
                :title="item.singer_info.singer_name"
                :subtitle="item.song_name"
                :prepend-avatar="item.singer_info.singer_photo"
                rounded="xl"
                :class=" (item.is_voted? 'active':'inactive') +' px-4'"          
              >

              </v-list-item>

          </v-list>
        </v-card>
      </div>
      <!-- 未投票 -->
      <div v-else>
        <v-card
          :title = "timer"
          variant="flat"
          rounded="xl"
          style="height: 50px;"
          class="mx-auto w-75 py-0 px-2 mb-2"
        ></v-card>
        <v-alert 
          :class= "'mb-2 w-75 mx-auto '+ (alert? '' : 'd-none') "
          color="warning"
          density="compact"
          :text = "'请选择 '+max_select+' 名选手!'"
          rounded = "xl"
        ></v-alert>
        <v-card 
          class="mx-auto w-75 py-2 px-2"
          max-width="400"
          :title ="round"
          rounded="xl"
          variant="elevated"
        >
          <v-list lines="two" class="mx-2" nav>
              <v-list-item
                variant = "flat"
                style="text-align: left; font-size:15px;"
                v-for= "(item, i) in options"
                :key="i"
                :value="item.singer_id"
                :title="item.singer_info.singer_name"
                :subtitle="item.song_name"
                :prepend-avatar="item.singer_info.singer_photo"
                rounded="xl"
                :class="'px-4 '+(chosen.indexOf(parseInt(item.option_id))>-1? 'active' : 'inactive')" 
                @click="toggleActive(item.option_id)" 
                :disabled="(chosen.length >= max_select && chosen.indexOf(parseInt(item.option_id))<0? true : false)"
              >

              </v-list-item>

          </v-list>
        </v-card>
        <v-btn 
          style="width: 30vw;"
          class="mt-8 mb-2"
          @click="submit()"
          size="large"
          color="primary"
          rounded="xl"
        >确认</v-btn>
      </div>

    </div>
    <!-- 投票已结束 -->
    <div v-else>
      <v-card variant = "flat" class="w-75 mx-auto mt-16" >
        <v-card-title v-if="vote_status == 'end'">投票已结束</v-card-title>
        <div v-if="vote_status == 'pending'">
          <v-card-title style="font-size: 28px; margin-bottom: 15px;">投票未开始</v-card-title>
          <v-card-text style="text-align: center;">请在投票开始时<br>刷新本页或重新扫描票面二维码</v-card-text>
        </div>
      </v-card>
    </div>
    
  </v-window-item>

</v-window>


</template>
  

<script>
import axios from 'axios';
export default {
  data() {
    return {
      loading: true,
      key: null,
      round: '',
      options: null,
      chosen: [],
      max_select: 1,
      alert: false,
      tab: "vote",
      voted: true,
      vote_id: null,
      vote_status: null,
      timer: null,
      endTime: null,
      pastVote: null,
      showjudge: null,
    };
  },
  computed: {
    
  },
  methods: {
    vote(index) {
      this.votes[index]++;
    },

    startTimer(){
      const timeNow = new Date().getTime();
      const timeDifference = this.endTime - timeNow;
      console.log(timeDifference)

      const millisecondsInOneSecond = 1000;
      const millisecondsInOneMinute = millisecondsInOneSecond * 60;
      const millisecondsInOneHour = millisecondsInOneMinute * 60;

      const remainderDifferenceInMinutes = (timeDifference % millisecondsInOneHour) / millisecondsInOneMinute;
      const remainderDifferenceInSeconds = (timeDifference % millisecondsInOneMinute) / millisecondsInOneSecond;

      const remainingMinutes = Math.floor(remainderDifferenceInMinutes);
      const remainingSeconds = Math.floor(remainderDifferenceInSeconds);

      if (remainingMinutes <= 0 && remainingSeconds <= 0){
        this.timer = "投票结束";
        setTimeout(() => {
          this.$router.push("/vote/"+this.key)
        }, 1000) 
      }
      else if (remainingMinutes <= 0)
        this.timer = "剩余时间:" + remainingSeconds + " 秒";
      else
        this.timer = "剩余时间: " + remainingMinutes + " 分 " + remainingSeconds + " 秒";

    },


    toggleActive(index) {
      index = parseInt(index)
      if (this.chosen.indexOf(index) > -1) {
        this.chosen.splice(this.chosen.indexOf(index), 1);
      } else {
        if (this.chosen.length < this.max_select) {
          this.chosen.push(index);
        }
      }
      console.log(this.chosen)
    },

    submit() {
      console.log(Array(this.chosen));
      if (this.chosen.length < this.max_select) {
        this.alert = true;
        setTimeout(() => {
          this.alert = false;
        }, 2000);
      } else {
        this.alert = false;
        //post and reload;
        axios.post("https://api.singcon23.hkupootal.com/vote/vote.php", {
          user_key: this.key,
          vote_id: this.vote_id,
          option_id_list: "[" + this.chosen.toString() + "]"
        }, {
          headers:{
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(
          res => {
            if (res.data.code == 200){
              this.voted = true;
              this.$router.push("/vote/"+this.key)
            } else {
              console.log(res.data);
              alert(res.data.msg);
            }
          }
        )
        .catch(
          err => {
            console.log(err);
            alert("投票失败");
          }
        )
      }

    },

    getNow(){
      this.loading = true;
      axios.post('https://api.singcon23.hkupootal.com/vote/getnow.php', {
        user_key: this.key
      },{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(
        res => {
          console.log(res.data)
          this.loading = false;
          if (res.data.code == 200) {
            this.vote_id = res.data.vote_detail.vote_id;
            this.voted = res.data.vote_detail.is_voted;
            this.max_select = res.data.vote_detail.vote_select_count;
            this.vote_status = res.data.vote_detail.vote_status;
            this.round = res.data.vote_detail.vote_title;
            this.options = res.data.vote_detail.option_list;
            this.endTime = res.data.vote_detail.vote_end_time * 1000;
            if(res.data.vote_detail.vote_status == 'open' && res.data.vote_detail.is_voted==false){
              this.startTimer();
              setInterval(() => {
                this.startTimer();
              }, 1000);
            }
          } else if (res.data.code == 201) {
            this.vote_status = "pending";
          } else {
            alert("投票信息获取时报，请重新扫描")
            this.$router.push('/home')
          }
        }
      ).catch(
        error => {
          this.loading = false;
          console.log(error);
          alert("投票信息获取失败，请重新扫描")
        }
      )
    },

    getPast(){
      this.loading = true;
      console.log(this.key)
      axios.post('https://api.singcon23.hkupootal.com/vote/getpast.php', {
        user_key: this.key
      },{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(
        res => {
          console.log(res.data)
          this.loading = false;
          if(res.data.code == 200){
            this.pastVote = res.data.vote_list;
            this.initializedJudgeNoshow()
          }
        }
      )
    },

    initializedJudgeNoshow(){
      var showjudge = [];
      for(var i=0;i<this.pastVote.length;i++){
        showjudge[i] = [];
        for(var j=0;j<this.pastVote[i].option_list.length;j++){
          showjudge[i][j] = false;
        }
      }
      this.showjudge = showjudge;
    },

    

    
  },

  mounted() {
    this.key = this.$router.currentRoute.value.params.user_key;
    this.getNow();
  }
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

.inactive {
  background-color: #F5F5F5;

}

.active {
  color: #045b53 ;
  background-color: #caeeeab1 ;

}
.loading {
  position: absolute;
  top:45vh;
  left:40vw;
  width: 20vw;
}


</style>

