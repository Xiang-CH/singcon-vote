<template>
  <img src="/loading.gif" v-if="loading" class="loading" />
  <div>
    <v-card
      v-for="(round, i) in realtimeVote"
      :key="i"
      class="mx-auto py-2 px-2 mt-4 mb-2"
      style="width: 95%"
      max-width="400"
      :title="round.vote_title"
      :subtitle="round.vote_status == 'open' ? '实时更新' : '已结束'"
      rounded="xl"
      variant="elevated"
    >
      <v-list lines="three" class="mx-2" nav>
        <v-list-item
          variant="flat"
          style="text-align: left; font-size: 18px"
          v-for="(singer, j) in round.option_list"
          :key="j"
          :title="singer.singer_info.singer_name"
          :subtitle="singer.song_name"
          :prepend-avatar="singer.singer_info.singer_photo"
          rounded="xl"
          :class="'px-3 pt-3 pb-2 ' + (singer.is_win ? 'active' : 'inactive')"
          @click="this.showjudge[i][j] = !this.showjudge[i][j]"
        >
          <v-chip class="mr-1 my-0" size="x-small"
            >观众投票:{{ singer.vote_count }}</v-chip
          >
          <v-chip
            class="mr-1 my-0"
            size="x-small"
            v-if="round.vote_status == 'end'"
            >评委评分:{{ singer.judge_average_score.toFixed(1) }}</v-chip
          >
          <v-chip
            class="mr-1 my-0"
            size="x-small"
            v-if="round.vote_status == 'end'"
            >总分:{{ singer.overall_score.toFixed(1) }}</v-chip
          >
          <v-chip class="my-0" size="x-small" v-if="singer.is_vote"
            >已选</v-chip
          >

          <v-item-group v-if="this.showjudge[i][j]" class="my-2">
            <v-list-item
              lines="two"
              v-for="(judge, k) in singer.judge_list"
              :key="k"
              variant="flat"
              :title="judge.judge_info.judge_name"
              :subtitle="judge.judge_info.judge_intro"
              :prepend-avatar="judge.judge_info.judge_photo"
              rounded="xl"
            >
              <v-chip class="mr-1 my-0" size="x-small"
                >音乐性: {{ judge.music_score }}/35</v-chip
              >
              <v-chip class="mr-1 my-0" size="x-small"
                >演唱: {{ judge.sing_score }}/35</v-chip
              >
              <v-chip class="mr-1 my-0" size="x-small"
                >台风: {{ judge.manner_score }}/20</v-chip
              >
              <v-chip class="my-0" size="x-small"
                >形象: {{ judge.image_score }}/10</v-chip
              >
            </v-list-item>
          </v-item-group>
        </v-list-item>
      </v-list>
    </v-card>
  </div>
</template>
  

<script>
import axios from "axios";
export default {
  data() {
    return {
      loading: false,
      round: "",
      options: null,
      chosen: [],
      max_select: 1,
      alert: false,
      realtimeVote: null,
      showjudge: null,
    };
  },
  computed: {},
  methods: {
    getRealtime() {
      axios
        .post(
          "https://api.singcon23.hkupootal.com/vote/getrealtime.php",
          {
            user_key: this.key,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          if (res.data.code == 200) {
            this.realtimeVote = res.data.vote_list;
            this.initializedJudgeNoshow();
            setTimeout(() => {
              this.getRealtime();
            }, 1000);
          }
        });
    },
    initializedJudgeNoshow() {
      if (this.showjudge) {
        return;
      }
      var showjudge = [];
      for (var i = 0; i < this.realtimeVote.length; i++) {
        showjudge[i] = [];
        for (var j = 0; j < this.realtimeVote[i].option_list.length; j++) {
          showjudge[i][j] = false;
        }
      }
      this.showjudge = showjudge;
    },
  },

  mounted() {
    this.key = this.$router.currentRoute.value.params.user_key;
    this.getRealtime();
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

h1 {
  padding-top: 15px;
  margin-bottom: 15px;
}

.inactive {
  background-color: #f5f5f5;
}

.active {
  color: #5c6bc0;
  background-color: #c5cae9;
}
.loading {
  position: absolute;
  top: 45vh;
  left: 40vw;
  width: 20vw;
}
</style>

