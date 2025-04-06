<template>
  <div class="app-container2">
    <!-- 顶部标题栏 -->
    <div class="top-box">
      <div class="header-title">校园智慧管理平台</div>
      <div class="gx-time">
        <i class="el-icon-refresh"></i>
        数据更新时间10:25:30
      </div>
      <div class="home-icon">
        <i class="el-icon-s-home"></i>
        <i class="el-icon-switch-button"></i>
        <i class="el-icon-full-screen" @click="toggleFullScreen"></i>
      </div>
    </div>
    <div class="chartData-box">
      <!-- 左侧菜单栏 -->
      <div ref="leftMenu" class="left-menu" :style="{ left: boxPosition }">
        <div class="rl-btn" @click="toggleBox">
          <img
            :src="leftBtnImage"
            alt=""
            style="width: 60%; margin: 40% auto"
          />
        </div>
        <div class="leftMenu-box">
          <div class="leftMenu-title">
            <img src="../assets/3dIMG/04.png" alt="" style="width: 60%" />
            <div class="title-text">能源总耗</div>
            <div class="time-box">
              <div class="time-text time-textbgi">日</div>
              <div class="time-text">月</div>
              <div class="time-text">年</div>
            </div>
          </div>
          <div class="nyzh-box">
            <div class="nyzh-text">
              <div style="height: 100%; width: 50%">
                <div class="nyzh-img">
                  <img
                    src="../assets/3dIMG/05.png"
                    alt=""
                    style="height: 100%"
                  />
                  <span class="dian">电</span>
                </div>
                <div class="nyzl-kwh">55555kWh</div>
              </div>
              <div style="height: 100%; width: 50%">
                <div class="nyzh-img">
                  <img
                    src="../assets/3dIMG/06.png"
                    alt=""
                    style="height: 100%"
                  />
                  <span class="dian">水</span>
                </div>
                <div class="nyzl-kwh">55555kWh</div>
              </div>
            </div>
            <div class="nyzh-text">
              <div style="height: 100%; width: 50%">
                <div class="nyzh-img">
                  <img
                    src="../assets/3dIMG/07.png"
                    alt=""
                    style="height: 100%"
                  />
                  <span class="dian">汽</span>
                </div>
                <div class="nyzl-kwh">55555kWh</div>
              </div>
              <div style="height: 100%; width: 50%">
                <div class="nyzh-img">
                  <img
                    src="../assets/3dIMG/08.png"
                    alt=""
                    style="height: 100%"
                  />
                  <span class="dian">其他</span>
                </div>
                <div class="nyzl-kwh">55555kWh</div>
              </div>
            </div>
          </div>
        </div>
        <div class="leftMenu-box">
          <div class="leftMenu-title">
            <img src="../assets/3dIMG/04.png" alt="" style="width: 60%" />
            <div class="title-text">分项用能</div>
            <div class="time-box">
              <div class="time-text time-textbgi">日</div>
              <div class="time-text">月</div>
              <div class="time-text">年</div>
            </div>
          </div>
          <div class="fxyn-box">
            <div style="width: 60%; height: 100%">
              <PieChart :chart-data="chartData" chart-title="分项用能" />
            </div>
            <div
              style="
                width: 40%;
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: space-evenly;
              "
            >
              <div class="fxyn-data">
                <div class="fxyn-item">
                  <div class="color-box"></div>
                  照明用电
                </div>
                16.55%
              </div>
              <div class="fxyn-data">
                <div class="fxyn-item">
                  <div class="color-box"></div>
                  照明用电
                </div>
                16.55%
              </div>
              <div class="fxyn-data">
                <div class="fxyn-item">
                  <div class="color-box"></div>
                  照明用电
                </div>
                16.55%
              </div>
              <div class="fxyn-data">
                <div class="fxyn-item">
                  <div class="color-box"></div>
                  照明用电
                </div>
                16.55%
              </div>
            </div>
          </div>
        </div>
        <div class="leftMenu-box">
          <div class="leftMenu-title">
            <img src="../assets/3dIMG/04.png" alt="" style="width: 60%" />
            <div class="title-text">设备监控</div>
            <div class="time-box">
              <div class="time-text time-textbgi">照明</div>
              <div class="time-text">空调</div>
              <div class="time-text">更多</div>
            </div>
          </div>
          <div class="fxyn-box">
            <div style="width: 60%; height: 100%">
              <PieChart :chart-data="chartData" chart-title="分项用能" />
            </div>
            <div
              style="
                width: 40%;
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: space-evenly;
              "
            >
              <div class="fxyn-data">
                <div class="fxyn-item">
                  <div class="color-box"></div>
                  照明用电
                </div>
                16.55%
              </div>
              <div class="fxyn-data">
                <div class="fxyn-item">
                  <div class="color-box"></div>
                  照明用电
                </div>
                16.55%
              </div>
              <div class="fxyn-data">
                <div class="fxyn-item">
                  <div class="color-box"></div>
                  照明用电
                </div>
                16.55%
              </div>
              <div class="fxyn-data">
                <div class="fxyn-item">
                  <div class="color-box"></div>
                  照明用电
                </div>
                16.55%
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 右侧内容栏 -->
      <div
        ref="rightContent"
        class="right-content"
        :style="{ left: boxPosition2 }"
      >
        <div class="rl-btn2" @click="toggleBox2">
          <img
            :src="rightBtnImage"
            alt=""
            style="width: 60%; margin: 40% auto"
          />
        </div>

        <div class="rightContent-box">
          <div class="leftMenu-title">
            <img src="../assets/3dIMG/04.png" alt="" style="width: 60%" />
            <div class="title-text">基本信息</div>
            <div class="time-box">
              <div class="time-text time-textbgi">日</div>
              <div class="time-text">月</div>
              <div class="time-text">年</div>
            </div>
          </div>
          <div class="jbxx-box">
            <div class="jbxx-item">
              <div class="jbxx-data" v-for="(item, index) in 4" :key="index">
                <div class="jbxx-img">
                  <img
                    src="../assets/3dIMG/09.png"
                    alt=""
                    style="width: 0.9375vw; margin-right: 5px"
                  />
                  <span>建筑面积</span>
                </div>
                <div class="img-data">12万m²</div>
              </div>
            </div>
            <div class="jbxx-item2">
              <div class="jbxx-data" v-for="(item, index) in 4" :key="index">
                <div class="jbxx-img">
                  <img
                    src="../assets/3dIMG/09.png"
                    alt=""
                    style="width: 0.9375vw; margin-right: 5px"
                  />
                  <span>建筑面积</span>
                </div>
                <div class="img-data">12万m²</div>
              </div>
            </div>
          </div>
        </div>
        <div class="rightContent-box">
          <div class="leftMenu-title">
            <img src="../assets/3dIMG/04.png" alt="" style="width: 60%" />
            <div class="title-text">光伏电站</div>
            <div class="time-box">
              <div class="time-text time-textbgi">更多</div>
            </div>
          </div>
          <div class="gfdz-box">
            <div class="gfdz-item">
              <div class="gfdz-img">
                <div class="img-data">
                  <img
                    src="../assets/3dIMG/10.png"
                    alt=""
                    style="width: 100%"
                  />
                </div>
                <div class="img-data2">日发电量(kWh)</div>
                <div class="img-data3">13652.36</div>
              </div>
              <div class="gfdz-img">
                <div class="img-data">
                  <img
                    src="../assets/3dIMG/11.png"
                    alt=""
                    style="width: 100%"
                  />
                </div>
                <div class="img-data2">日发电量(kWh)</div>
                <div class="img-data3">13652.36</div>
              </div>
              <div class="gfdz-img">
                <div class="img-data">
                  <img
                    src="../assets/3dIMG/12.png"
                    alt=""
                    style="width: 100%"
                  />
                </div>
                <div class="img-data2">日发电量(kWh)</div>
                <div class="img-data3">13652.36</div>
              </div>
            </div>
            <div class="gfdz-item2">
              <div class="data-gf">
                <div class="data-text1">节能减排</div>
                <div class="data-text2">295.20t</div>
              </div>
              <div class="img-gf">
                <img src="../assets//3dIMG/13.png" alt="" style="width: 100%" />
              </div>
              <div class="data-gf">
                <div class="data-text1">等效绿植</div>
                <div class="data-text2">0.27公顷</div>
              </div>
            </div>
          </div>
        </div>
        <div class="rightContent-box">
          <div class="leftMenu-title">
            <img src="../assets/3dIMG/04.png" alt="" style="width: 60%" />
            <div class="title-text">校园预付费</div>
            <div class="time-box">
              <div class="time-text time-textbgi">日</div>
              <div class="time-text">月</div>
              <div class="time-text">年</div>
              <div class="time-text">更多</div>
            </div>
          </div>
          <div class="fxyn-box">
            <div style="width: 60%; height: 100%">
              <PieChart :chart-data="chartData" chart-title="分项用能" />
            </div>
            <div
              style="
                width: 40%;
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: space-evenly;
              "
            >
              <div class="fxyn-data">
                <div class="fxyn-item">
                  <div class="color-box"></div>
                  照明用电
                </div>
                16.55%
              </div>
              <div class="fxyn-data">
                <div class="fxyn-item">
                  <div class="color-box"></div>
                  照明用电
                </div>
                16.55%
              </div>
              <div class="fxyn-data">
                <div class="fxyn-item">
                  <div class="color-box"></div>
                  照明用电
                </div>
                16.55%
              </div>
              <div class="fxyn-data">
                <div class="fxyn-item">
                  <div class="color-box"></div>
                  照明用电
                </div>
                16.55%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 建筑定位信息 -->
    <div class="location-box1">
      <el-popover
        placement="bottom"
        title=""
        width="200"
        trigger="click"
        popper-class="custom-popover"
      >
        <template #reference>
          <el-button
            round
            size="mini"
            style="background-color: #01ada8; color: #fff; border: #01ada8"
          >
            图书馆
          </el-button>
        </template>
        <template #default>
          <div class="custom-popover-content">
            <p style="color: #4caf50">这是一段内容，且可以自定义样式。</p>
            <p>这里可以添加更多的内容，布局和颜色可以完全自定义。</p>
          </div>
        </template>
      </el-popover>
    </div>
    <div class="location-box2">
      <el-popover placement="bottom" title="标题" width="200" trigger="click">
        <template #reference>
          <el-button
            round
            size="mini"
            style="background-color: #01ada8; color: #fff; border: #01ada8"
          >
            图书馆
          </el-button>
        </template>
        <template #default>
          <div class="custom-popover-content">
            <p style="color: #4caf50">这是一段内容，且可以自定义样式。</p>
            <p>这里可以添加更多的内容，布局和颜色可以完全自定义。</p>
          </div>
        </template>
      </el-popover>
    </div>
  </div>
</template>

<script>
import PieChart from "./components/PieChart.vue";
export default {
  name: "Index",
  components: {
    PieChart,
  },
  data() {
    return {
      movedleft: false,
      movedright: false,
      leftWidth: 0, // 动态宽度
      rightWidth: 0, // 动态宽度
      visible: false,
      chartData: [
        { value: 1048, name: "照明用电" },
        { value: 735, name: "空调用电" },
        { value: 580, name: "插座用电" },
        { value: 300, name: "特殊用电" },
      ],
    };
  },

  computed: {
    boxPosition() {
      return this.movedleft ? `-${this.leftWidth}px` : "0px";
    },
    boxPosition2() {
      return this.movedright ? `${this.rightWidth}px` : "0px";
    },
    leftBtnImage() {
      return this.movedleft
        ? require("@/assets/3dIMG/14.png")
        : require("@/assets/3dIMG/15.png");
    },
    rightBtnImage() {
      return this.movedright
        ? require("@/assets/3dIMG/15.png")
        : require("@/assets/3dIMG/14.png");
    },
  },

  methods: {
    updateBoxWidths() {
      this.leftWidth = this.$refs.leftMenu.offsetWidth;
      this.rightWidth = this.$refs.rightContent.offsetWidth;
    },
    toggleBox() {
      this.movedleft = !this.movedleft;
    },
    toggleBox2() {
      this.movedright = !this.movedright;
    },

    // 全屏
    async toggleFullScreen() {
      const elem = document.documentElement; // 获取整个页面
      const isFullScreen = this.$store.state.app.fullScreen;

      try {
        if (!isFullScreen) {
          // 进入全屏
          const requestFullscreen =
            elem.requestFullscreen ||
            elem.webkitRequestFullscreen ||
            elem.msRequestFullscreen;

          if (requestFullscreen) await requestFullscreen.call(elem);
        } else {
          // 退出全屏
          const exitFullscreen =
            document.exitFullscreen ||
            document.webkitExitFullscreen ||
            document.msExitFullscreen;

          if (exitFullscreen) await exitFullscreen.call(document);
        }

        // 切换全屏状态
        this.$store.dispatch("app/toggleFullScreen", !isFullScreen);
      } catch (error) {
        console.error("切换全屏模式时发生错误:", error);
      }
    },
  },

  mounted() {
    this.updateBoxWidths();
    window.addEventListener("resize", this.updateBoxWidths);
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.updateBoxWidths);
  },
};
</script>

<style scoped lang="scss">
.custom-popover {
  background-color: transparent !important;
  border: none !important;
  box-shadow: none !important;
}
.app-container2 {
  height: 100vh;
  width: 100%;
  background: url("../assets//3dIMG/01.jpg") no-repeat center center;
  background-size: 100% 100%;
  position: relative;
  z-index: 10;
  overflow: hidden;
}

.top-box {
  height: 10%;
  width: 100%;
  padding: 0 30px;
  position: relative;

  .home-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 5vw;
    font-size: 1.62292vw;
    color: #2b9bdc;
  }
}

.header-title {
  height: 74%;
  width: 100%;
  background: url("../assets/3dIMG//02.png") no-repeat;
  background-size: 100%;
  font-weight: 700;
  font-size: 1.62292vw;
  color: #fff;
  text-align: center;
}

.gx-time {
  width: 14%;
  height: 26%;
  margin: 0 auto;
  background: url("../assets/3dIMG/03.png") no-repeat;
  background-size: 100%;
  text-align: center;
  color: #fff;
  font-size: 0.81146vw;
  font-weight: 700;
}

.chartData-box {
  height: 90%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  position: relative;
}

.left-menu {
  height: 97%;
  width: 24%;
  background: rgba(45, 66, 85, 0.57);
  position: relative;
  border-radius: 0 20px 20px 0;
  z-index: 11;
  transition: left 0.5s ease;
  padding: 1vw 0.5vw;
}

.right-content {
  height: 97%;
  width: 24%;
  background: rgba(45, 66, 85, 0.57);
  position: relative;
  border-radius: 20px 0px 0px 20px;
  z-index: 11;
  transition: left 0.5s ease;
  padding: 1vw 0.5vw;
}

.rl-btn {
  position: absolute;
  width: 2.08333vw;
  height: 3.90625vw;
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(45, 66, 85, 0.57);
  border-radius: 0 10px 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.rl-btn2 {
  position: absolute;
  width: 2.08333vw;
  height: 3.90625vw;
  right: 100%;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(45, 66, 85, 0.57);
  border-radius: 10px 0px 0px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.leftMenu-box,
.rightContent-box {
  height: 33.3%;
}

.leftMenu-title {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // height: 10%;

  .title-text {
    font-size: 1.5625vw;
    font-family: Adobe Heiti Std;
    font-weight: 600;
    color: #fff;
    top: -35%;
    left: 9%;
    position: absolute;
    font-style: oblique;
    text-shadow: 2px 3px 0 rgba(22, 22, 19, 0.27);
  }

  .time-box {
    display: flex;
    justify-content: flex-end;
    color: #fff;
    width: 35%;
  }

  .time-text {
    font-weight: 600;
    color: #fff;
    padding: 0 10px;
    cursor: pointer;
    font-size: 0.61146vw;
    white-space: nowrap;
  }

  .time-textbgi {
    background-image: linear-gradient(
      90deg,
      rgba(46, 190, 247, 0),
      rgba(46, 190, 247, 0.49019607843137253),
      rgba(46, 190, 247, 0)
    );
  }
}

.nyzh-box {
  height: 86%;

  .nyzh-text {
    height: 50%;
    display: flex;
  }

  .nyzh-img {
    height: 60%;
    margin: 0 1vw;
  }

  .nyzl-kwh {
    height: 40%;
    font-size: 0.9375vw;
    font-family: PangMenZhengDao;
    color: #fff;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: 700;
    text-align: center;
    padding-top: 5px;
    color: #2fc6e2;
  }

  .dian {
    color: #fff;
    padding-left: 15px;
  }
}

.fxyn-box {
  height: 86%;
  display: flex;
}

.fxyn-data {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  padding-right: 15px;
}

.fxyn-item {
  display: flex;
  align-items: center;
  color: #fff;
  font-size: 0.8vw;
  white-space: nowrap;
}

.color-box {
  width: 8px;
  height: 8px;
  background-color: #ee6666;
  margin-right: 5%;
}

.title-text2 {
  font-size: 1.5625vw;
  font-family: Adobe Heiti Std;
  font-weight: 600;
  color: #fff;
  top: -10%;
  left: 9%;
  position: absolute;
  font-style: oblique;
  text-shadow: 2px 3px 0 rgba(22, 22, 19, 0.27);
}

.jbxx-box,
.gfdz-box {
  height: 86%;
  color: #fff;
}

.jbxx-item,
.jbxx-item2 {
  height: 50%;
  display: flex;
}

.gfdz-item {
  display: flex;
  justify-content: space-between;
}

.jbxx-data {
  height: 90%;
  width: 25%;
}

.jbxx-img span {
  font-size: 0.7375vw;
}

.gfdz-img {
  width: 33%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.img-data {
  font-size: 0.9375vw;
  font-family: PangMenZhengDao;
  color: #fff;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 700;
  text-align: center;
  color: #2fc6e2;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}

.img-data {
  width: 76%;
  height: 60%;
}

.img-data2 {
  font-size: 0.83333vw;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #fff;
  opacity: 0.9;
  text-shadow: 0 4px 7px rgba(4, 0, 0, 0.83);
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.img-data3 {
  font-size: 0.9375vw;
  font-family: Source Han Sans CN;
  font-weight: 700;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #2fc6e2;
}

.gfdz-item2 {
  height: 48%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.img-gf {
  width: 20%;
  margin: 0 1.5vw;
}

.data-text2 {
  color: #f7fa70;
  margin-top: 10px;
  font-style: oblique;
  font-size: 0.95333vw;
  font-weight: 700;
}

.custom-popover-content {
  background: rgba(45, 66, 85, 0.57);
}

.location-box1 {
  position: absolute;
  top: 26%;
  left: 35%;
}
.location-box2 {
  position: absolute;
  top: 69%;
  left: 14%;
}
</style>
