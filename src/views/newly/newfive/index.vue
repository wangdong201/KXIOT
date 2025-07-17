<template>
  <div class="new_view">
    <!-- 头部内容 -->
    <div class="nav_header">
      <div class="nav_header_left">
        <div class="nav_ht_title">
          <div style="text-align: center; font-size: 0.6rem; padding-top: 3px">
            公开数据展示
          </div>
          <div>
            <div class="nav_ht_box">
              <div class="nav_color1 nav_box">1</div>
              <div class="nav_color2 nav_box">2</div>
              <div class="nav_color3 nav_box">3</div>
            </div>
            <div class="nav_ht_box">
              <div class="nav_color4 nav_box_bt">1</div>
              <div class="nav_color5 nav_box_bt">2</div>
              <div class="nav_color6 nav_box_bt">3</div>
              <div class="nav_color7 nav_box_bt">4</div>
            </div>
          </div>
        </div>
        <div class="nav_hb_title">
          <div style="text-align: center; font-size: 0.6rem; padding-top: 3px">
            公开数据展示
          </div>
          <div>
            <dv-capsule-chart
              :config="config"
              style="width: 100%; height: 100%"
            />
          </div>
        </div>
      </div>
      <div class="nav_header_title">
        <div class="nav_header_title_text">
          <div class="header_title">
            <span style="color: #0efcff; font-size: 2rem">数据大屏3</span>
          </div>
          <div class="header_desc">
            <div class="header_desc_title">xxx测试数据</div>
            <div class="hd_shuju" v-for="(item, index) in 5" :key="index">
              6
            </div>
          </div>
        </div>
        <div class="nav_bottom">
          <div class="nav_bottom_left">
            <div class="nbl_title">xx数据占比</div>
            <new-view-echart1></new-view-echart1>
          </div>
          <div class="nav_bottom_right">
            <div class="nbl_title">xx数据占比</div>
            <new-view-echart1></new-view-echart1>
          </div>
        </div>
      </div>
      <div class="nav_header_right">
        <div class="nav_ht_title">
          <div style="text-align: center; font-size: 0.6rem; padding-top: 3px">
            公开数据展示
          </div>
          <div>
            <div class="nav_ht_box">
              <div class="nav_color1 nav_box_rt">1</div>
              <div class="nav_color2 nav_box_rt">2</div>
            </div>
            <div class="nav_ht_box">
              <div class="nav_color3 nav_box">1</div>
              <div class="nav_color6 nav_box">2</div>
              <div class="nav_color4 nav_box">3</div>
            </div>
          </div>
        </div>
        <div class="nav_hb_title">
          <div style="text-align: center; font-size: 0.6rem; padding-top: 3px">
            公开数据展示
          </div>
          <newViewEchart2 />
        </div>
      </div>
    </div>
    <!-- center -->
    <div class="center_box">
      <div class="center_box_left">
        <div class="cbl_title">xxx指南</div>
        <!--
        <div class="cbl_data" v-for="index in 10" :key="index">
          <span>这是一条测试数据xxx</span>
          <span>2024/03/05</span>
        </div> -->
        <dv-scroll-board :config="config1" style="width: 100%; height: 150px" />
      </div>
      <div class="center_box_center">
        <div class="cbl_title">xxx指南</div>
        <newViewEchart3 class="cbl_chart" />
      </div>
      <div class="center_box_right">
        <div class="cbl_title">xxx指南</div>

        <!-- <div class="cbl_data" v-for="index in 10" :key="index">
          <span>这是一条测试数据xxx</span>
          <span>2024/03/05</span>
        </div> -->
        <dv-scroll-board :config="config1" style="width: 100%; height: 150px" />
      </div>
    </div>
    <!-- 底部内容 -->
    <div class="bottom_box">
      <div class="bbl_box">
        <div class="bbl_title">xxxx占比</div>
        <newViewEchart4 style="margin-top: 20px" />
      </div>
      <div class="bbc_box1">
        <div class="bbl_title">xxxx占比</div>
        <newViewEchart5 class="bbc_chart" />
      </div>
      <div class="bbc_box2">
        <div class="bbl_title">xxxx占比</div>
        <newViewEchart5 class="bbc_chart" />
      </div>
      <div class="bbr_box">
        <div class="bbl_title">xxxx占比</div>
        <dv-water-level-pond
          :config="config2"
          style="width: 150px; height: 200px; margin: 60px auto"
        />
      </div>
    </div>
  </div>
</template>
<script>
import newViewEchart1 from "./components/newViewEchart1.vue";
import newViewEchart2 from "./components/newViewEchart2.vue";
import newViewEchart3 from "./components/newViewEchart3.vue";
import newViewEchart4 from "./components/newViewEchart4.vue";
import newViewEchart5 from "./components/newViewEchart5.vue";
// import newViewEchart6 from "@/views/newView/components/newViewEchart6.vue";

export default {
  name: "newView5",
  components: {
    newViewEchart1,
    newViewEchart2,
    newViewEchart3,
    newViewEchart4,
    newViewEchart5,
    // newViewEchart6,
  },
  data() {
    return {
      config: {
        data: [
          {
            name: "南阳",
            value: 167,
          },
          {
            name: "周口",
            value: 67,
          },
          {
            name: "漯河",
            value: 123,
          },
          {
            name: "郑州",
            value: 55,
          },
          {
            name: "西峡",
            value: 98,
          },
        ],
        lineWidth: 10,
        digitalFlopStyle: {
          fontSize: 10,
        },
      },
      config1: {
        data: [
          ["行1列1", "行1列2", "行1列3"],
          ["行2列1", "行2列2", "行2列3"],
          ["行3列1", "行3列2", "行3列3"],
          ["行4列1", "行4列2", "行4列3"],
          ["行5列1", "行5列2", "行5列3"],
          ["行6列1", "行6列2", "行6列3"],
          ["行7列1", "行7列2", "行7列3"],
          ["行8列1", "行8列2", "行8列3"],
          ["行9列1", "行9列2", "行9列3"],
          ["行10列1", "行10列2", "行10列3"],
        ],
        oddRowBGC: "#2A4C74",
        evenRowBGC: "#2A4C74",
      },
      config2: {
        data: [55],
        shape: "round",
      },
    };
  },
  mounted() {},

  methods: {},
};
</script>
<style scoped>
.new_view {
  height: calc(100vh - 64px);
  padding: 10px;
  background-color: #2a4c74;
}

.text_fs {
  font-size: 0.8rem;
}

.nav_header {
  display: flex;
  justify-content: space-between;
}

.nav_header_left {
  width: 22%;
  height: 20rem;
}

.nav_ht_title,
.nav_hb_title {
  background-image: url("../../../assets/shujuimgs/a04.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  height: 48%;
  padding: 0px 20px;
}

.nav_hb_title {
  margin-top: 10px;
}

.nav_ht_box {
  display: flex;
  margin-top: 10px;
  height: 50%;
  width: 100%;
  justify-content: space-between;
}

.nav_box {
  width: calc(33.33% - 10px);
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.nav_box_bt {
  width: calc(25% - 10px);
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.nav_color1 {
  background-color: #37d2d4;
}

.nav_color2 {
  background-color: #19ca88;
}

.nav_color3 {
  background-color: #858ff8;
}

.nav_color4 {
  background-color: #fd9133;
}

.nav_color5 {
  background-color: #f6d10e;
}

.nav_color6 {
  background-color: #2e8cff;
}

.nav_color7 {
  background-color: #f6580e;
}

.nav_header_title {
  width: 50%;
  height: 20rem;
}
.nav_header_right {
  width: 22%;
  height: 20rem;
}

.nav_header_title_text {
  height: 50%;
}

.nav_bottom,
.header_desc {
  height: 50%;
}

.header_title {
  height: 45%;
  background-image: url("../../../assets/shujuimgs/a11.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  text-align: center;
  line-height: 45%;
  font-size: 24px;
  color: #fff;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
}

.header_desc {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.hd_shuju {
  background-image: url("../../../assets/shujuimgs/a02.png");
  height: 4rem;
  width: 4rem;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  text-align: center;
  line-height: 5rem;
  font-size: 2.6rem;
  font-weight: bold;
  color: #0efcff;
  margin-left: 20px;
}

.header_desc_title {
  position: absolute;
  top: 50%;
  left: 10%;
  transform: translate(-50%, -50%);
  font-size: 1.5rem;
  color: #0efcff;
}

.nav_bottom {
  display: flex;
  justify-content: space-between;
}

.nav_bottom_left,
.nav_bottom_right {
  width: calc(50% - 10px);
  background-image: url("../../../assets/shujuimgs/a08.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  padding: 10px;
  position: relative;
}

.nbl_title {
  position: absolute;
  top: 15px;
  left: 30px;
  color: #0efcff;
}

.nav_box_rt {
  width: calc(50% - 10px);
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.center_box {
  width: 100%;
  height: 15rem;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}

.center_box_left,
.center_box_center,
.center_box_right {
  width: calc(33.33% - 10px);
  height: 100%;
  background-image: url("../../../assets/shujuimgs/a05.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: relative;
}

.center_box_center {
  background-image: url("../../../assets/shujuimgs/a06.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.center_box_left,
.center_box_right {
  padding: 70px 10px 10px 20px;
  overflow: hidden;
}

.cbl_title {
  position: absolute;
  top: 2.3rem;
  left: 3.2rem;
}

.cbl_data {
  display: flex;
  justify-content: space-between;
}

.cbl_chart {
  position: absolute;
  left: 60px;
  top: 90px;
}

.bottom_box {
  height: 22rem;
  width: 100%;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}

.bbl_box,
.bbr_box {
  width: calc(19% - 10px);
  /* border: 1px solid #ccc; */
  height: 100%;
  background-image: url("../../../assets/shujuimgs/a04.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.bbc_box1,
.bbc_box2 {
  width: calc(30% - 10px);
  /* border: 1px solid #ccc; */
  height: 100%;
  background-image: url("../../../assets/shujuimgs/a03.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.bbl_title {
  text-align: center;
  padding-top: 15px;
}

.bbc_chart {
  margin-top: 40px;
}
</style>
