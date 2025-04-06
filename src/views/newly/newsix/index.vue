<template>
  <div class="newView6">
    <div class="header-container">
      <div class="header-title">光储充一体化系统</div>
      <div class="header-time">{{ formattedDateTime }}</div>
    </div>
    <div class="content-container">
      <div class="content-left">
        <div class="content-left-img"></div>
        <div class="content-left-table">
          <el-table
            :data="tableData"
            border
            :show-header="false"
            style="width: 100%"
          >
            <el-table-column prop="date" border label="" width="131%">
            </el-table-column>
            <el-table-column prop="name" border label="" width="130%">
            </el-table-column>
          </el-table>
        </div>
        <div class="DailyPowerGeneration">
          <img
            src="../../../assets/shujuimgs/B10.svg"
            alt=""
            style="width: 2.5rem; height: 2.5rem"
          />
          <div class="DailyPowerGeneration-title">
            <div class="DPG-text1">3040.08</div>
            <div>
              <span class="DPG-text2"
                ><i class="el-icon-caret-top"></i>50.55%</span
              >
              <span class="textColor">日发电量kwh</span>
            </div>
          </div>
        </div>
        <div class="electric">
          <div class="electric-left">日卖电量</div>
          <div class="electric-right">
            <div
              style="
                margin-left: 9.12px;
                margin-right: 9.12px;
                font-weight: bold;
                color: rgb(23, 187, 151);
              "
            >
              <span>
                <i class="el-icon-bottom"></i>
                35.52%
              </span>
            </div>
            <div>
              <div>昨日同时段: 9512.35kwh</div>
              <div>今日同时段: 9512.35kwh</div>
            </div>
          </div>
        </div>
        <div class="electric">
          <div class="electric-left">日卖电量</div>
          <div class="electric-right">
            <div
              style="
                margin-left: 9.12px;
                margin-right: 9.12px;
                font-weight: bold;
                color: rgb(23, 187, 151);
              "
            >
              <span>
                <i class="el-icon-bottom"></i>
                35.52%
              </span>
            </div>
            <div>
              <div>昨日同时段: 9512.35kwh</div>
              <div>今日同时段: 9512.35kwh</div>
            </div>
          </div>
        </div>
        <p style="color: #fff">xxx园区光储一体化项目</p>
        <div style="color: #fff">工程地址:xxxxx园区xxxxx路xxxx号</div>
        <span style="color: #fff">工程地址:xxxxx园区xxxxx路xxxx号</span>
      </div>
      <div class="content-right">
        <div
          v-for="index in 9"
          :key="'content-right-bgimg' + index"
          :class="'content-right-bgimg' + index + ' cr-bgimg'"
        ></div>
        <!-- 表格 -->
        <div class="table-container">
          <table>
            <tr>
              <th>列1</th>
              <th>列2</th>
              <th>列2</th>
              <th>列2</th>
            </tr>
            <tr>
              <td>行1列1</td>
              <td>行1列2</td>
              <td>行1列2</td>
              <td>行1列2</td>
            </tr>
            <tr>
              <td>行2列1</td>
              <td>行2列2</td>
              <td>行1列2</td>
              <td>行1列2</td>
            </tr>
          </table>
        </div>

        <div class="table-container2">
          <table>
            <tr>
              <th>列1</th>
              <th>列2</th>
              <th>列2</th>
            </tr>
            <tr>
              <td>行1列1</td>
              <td>行1列2</td>
              <td>行1列2</td>
            </tr>
            <tr>
              <td>行2列1</td>
              <td>行2列2</td>
              <td>行1列2</td>
            </tr>
            <tr>
              <td>行2列1</td>
              <td>行2列2</td>
              <td>行1列2</td>
            </tr>
          </table>
        </div>

        <div class="table-container3">
          <table>
            <tr>
              <td>行1列1</td>
              <td>行1列2</td>
            </tr>
            <tr>
              <td>行2列1</td>
              <td>行2列2</td>
            </tr>
          </table>
        </div>

        <div class="table-container4">
          <table>
            <tr>
              <th>列1</th>
              <th>列2</th>
              <th>列2</th>
              <th>列2</th>
            </tr>
            <tr>
              <td>行1列1</td>
              <td>行1列2</td>
              <td>行1列2</td>
              <td>行1列2</td>
            </tr>
            <tr>
              <td>行2列1</td>
              <td>行2列2</td>
              <td>行1列2</td>
              <td>行1列2</td>
            </tr>
          </table>
        </div>

        <div class="table-container5">
          <table>
            <tr>
              <th>列1</th>
              <th>列2</th>
              <th>列2</th>
              <th>列2</th>
            </tr>
            <tr>
              <td>行1列1</td>
              <td>行1列2</td>
              <td>行1列2</td>
              <td>行1列2</td>
            </tr>
          </table>
        </div>

        <div class="table-container6">
          <table>
            <tr>
              <th>列1</th>
              <th>列2</th>
              <th>列2</th>
              <th>列2</th>
            </tr>
            <tr>
              <td>行1列1</td>
              <td>行1列2</td>
              <td>行1列2</td>
              <td>行1列2</td>
            </tr>
            <tr>
              <td>行2列1</td>
              <td>行2列2</td>
              <td>行1列2</td>
              <td>行1列2</td>
            </tr>
            <tr>
              <td>行2列1</td>
              <td>行2列2</td>
              <td>行1列2</td>
              <td>行1列2</td>
            </tr>
          </table>
        </div>

        <div class="table-container7">
          <table>
            <tr>
              <th>列1</th>
              <th>列2</th>
              <th>列2</th>
              <th>列2</th>
              <th>列2</th>
              <th>列2</th>
            </tr>
            <tr>
              <td>行1列1</td>
              <td>行1列2</td>
              <td>行1列2</td>
              <td>行1列2</td>
              <td>行1列2</td>
              <td>行1列2</td>
            </tr>
          </table>
        </div>

        <div class="table-container8">
          <table>
            <tr>
              <th>列1</th>
              <th>列2</th>
              <th>列2</th>
              <th>列2</th>
              <th>列2</th>
            </tr>
            <tr>
              <td>行1列1</td>
              <td>行1列2</td>
              <td>行1列2</td>
              <td>行1列2</td>
              <td>行1列2</td>
            </tr>
          </table>
        </div>

        <div class="table-container9">
          <table>
            <tr>
              <th>列1</th>
              <th>列2</th>
              <th>列2</th>
              <th>列2</th>
              <th>列2</th>
            </tr>
            <tr>
              <td>行1列1</td>
              <td>行1列2</td>
              <td>行1列2</td>
              <td>行1列2</td>
              <td>行1列2</td>
            </tr>
          </table>
        </div>

        <!-- svg动画 -->
        <div class="svg-container">
          <img class="svg-img" src="../../../assets/shujuimgs/b03.svg" alt="" />
        </div>
        <div class="svg-container2">
          <img class="svg-img" src="../../../assets/shujuimgs/b03.svg" alt="" />
        </div>
        <div class="svg-container3">
          <img class="svg-img" src="../../../assets/shujuimgs/b03.svg" alt="" />
        </div>
        <div class="svg-container4">
          <img class="svg-img" src="../../../assets/shujuimgs/b03.svg" alt="" />
        </div>
        <div class="svg-container5">
          <img class="svg-img" src="../../../assets/shujuimgs/b03.svg" alt="" />
        </div>
        <div class="svg-container6">
          <img class="svg-img" src="../../../assets/shujuimgs/b03.svg" alt="" />
        </div>
        <div class="svg-container7">
          <img class="svg-img" src="../../../assets/shujuimgs/b03.svg" alt="" />
        </div>
        <div class="svg-container8">
          <img class="" src="../../../assets/shujuimgs/b033.svg" alt="" />
        </div>
        <div class="svg-container9">
          <img class="" src="../../../assets/shujuimgs/b03.svg" alt="" />
        </div>

        <div class="svg-container10">
          <img class="svg-img" src="../../../assets/shujuimgs/b03.svg" alt="" />
        </div>

        <div class="svg-container11">
          <img
            class="svg-img"
            src="../../../assets/shujuimgs/b033.svg"
            alt=""
          />
        </div>
        <div class="svg-container12">
          <img
            class="svg-img"
            src="../../../assets/shujuimgs/b033.svg"
            alt=""
          />
        </div>
        <div class="svg-container13">
          <img
            class="svg-img"
            src="../../../assets/shujuimgs/b033.svg"
            alt=""
          />
        </div>
        <div class="svg-container14">
          <img class="svg-img" src="../../../assets/shujuimgs/b03.svg" alt="" />
        </div>
      </div>
    </div>
    <div class="footer-container"></div>
  </div>
</template>

<script>
export default {
  name: "newView6",
  data() {
    return {
      formattedDateTime: "",
      tableData: [
        {
          date: "光伏容量/kwp",
          name: "14.4",
        },
        {
          date: "储能容量/kwh",
          name: "6.5",
        },
        {
          date: "充电桩容量/kw",
          name: "2*7kw",
        },
      ],
    };
  },
  mounted() {
    // 定时器，每秒更新一次时间
    setInterval(() => {
      this.updateTime();
    }, 1000);
    // 页面加载完成时立即更新时间
    this.updateTime();
  },
  methods: {
    updateTime() {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1; // 月份从 0 开始，需要加 1
      const day = now.getDate();
      const weekday = this.getDayOfWeek(now.getDay());
      const hour = now.getHours();
      const minute = now.getMinutes();
      const second = now.getSeconds();

      // 构造特定格式的日期时间字符串
      const formatted = `${year}-${month}-${day} ${weekday} ${this.formatTime(
        hour
      )}:${this.formatTime(minute)}:${this.formatTime(second)}`;

      // 更新 formattedDateTime
      this.formattedDateTime = formatted;
    },
    getDayOfWeek(dayIndex) {
      const weekdays = [
        "星期日",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六",
      ];
      return weekdays[dayIndex];
    },
    formatTime(time) {
      // 补零处理
      return String(time).padStart(2, "0");
    },
  },
};
</script>

<style scoped lang="scss">
.newView6 {
  height: calc(100vh - 64px);
  padding: 10px;
  background-image: url("../../../assets/shujuimgs/b01.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.header-container {
  height: 71px;
  background-image: url("../../../assets/shujuimgs/b02.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  position: relative;
}

.header-title {
  line-height: 71px;
  padding-right: 3rem;
  font-size: 2.125rem;
  font-weight: bold;
}

.header-time {
  position: absolute;
  right: 26%;
  top: 50%;
  transform: translate(50%, -50%);
  font-size: 1rem;
}

.content-container {
  display: flex;
  height: 75%;
  margin-top: 20px;
  justify-content: space-between;

  .textColor {
    color: #b2ddff;
  }

  .content-left,
  .content-right {
    width: 25%;
    height: 100%;
    border-color: rgba(98, 162, 205, 0.5);
    color: rgba(0, 234, 255, 0.4);
    background-color: rgba(10, 52, 112, 0.4);
    border-style: solid;
    box-shadow: 0 0 10px inset;
    padding: 10px 30px;
  }

  .content-right {
    width: 73%;
  }

  .content-left-img {
    background-image: url("../../../assets/shujuimgs/b12.jpg");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    height: 30%;
  }

  .content-left-table {
    margin-top: 10px;
  }

  .DailyPowerGeneration {
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    border: 1px solid rgb(98, 162, 205);
  }

  .DPG-text1 {
    font-weight: 700;
    font-size: 1.5rem;
    text-align: right;
    color: #b2ddff;
  }

  .DPG-text2 {
    padding-right: 5px;
    font-size: 0.8rem;
    color: red;
  }

  .electric {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;

    .electric-left {
      width: 5rem;
      height: 3rem;
      border: 1px solid #b2ddff;
      box-shadow: 0 0 4px inset;
      text-align: center;
      line-height: 3rem;
      font-size: 0.8rem;
      color: #fff;
    }

    .electric-right {
      width: 76%;
      border: 1px solid #b2ddff;
      font-size: 0.8rem;
    }
  }

  .electric-right {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
}

.content-right {
  table {
    width: 100%;
    border-collapse: collapse;
  }

  th,
  td {
    border: 1px solid #ddd;
    padding: 2px;
    text-align: center;
  }

  position: relative;

  .cr-bgimg {
    background-size: 100% 100%;
    background-repeat: no-repeat;
    width: 80px;
    height: 80px;
  }

  .content-right-bgimg1 {
    background-image: url("../../../assets/shujuimgs/b04.png");
    position: absolute;
    top: 5%;
    left: 7%;
  }

  .content-right-bgimg2 {
    background-image: url("../../../assets/shujuimgs/b05.png");
    position: absolute;
    top: 5%;
    left: 35%;
  }

  .content-right-bgimg3 {
    background-image: url("../../../assets/shujuimgs/b04.png");
    position: absolute;
    top: 40%;
    left: 7%;
  }

  .content-right-bgimg4 {
    background-image: url("../../../assets/shujuimgs/b05.png");
    position: absolute;
    top: 40%;
    left: 35%;
  }

  .content-right-bgimg5 {
    background-image: url("../../../assets/shujuimgs/b06.png");
    position: absolute;
    top: 40%;
    left: 63%;
  }

  .content-right-bgimg6 {
    background-image: url("../../../assets/shujuimgs/b07.png");
    position: absolute;
    top: 40%;
    right: 5%;
  }

  .content-right-bgimg7 {
    background-image: url("../../../assets/shujuimgs/b08.png");
    position: absolute;
    bottom: 20%;
    left: 7%;
  }

  .content-right-bgimg8 {
    background-image: url("../../../assets/shujuimgs/b09.png");
    position: absolute;
    bottom: 20%;
    left: 35%;
  }

  .content-right-bgimg9 {
    background-image: url("../../../assets/shujuimgs/b09.png");
    position: absolute;
    bottom: 20%;
    left: 57%;
  }

  .table-container,
  .table-container2,
  .table-container3,
  .table-container4,
  .table-container5,
  .table-container6,
  .table-container7,
  .table-container8,
  .table-container9 {
    position: absolute;
    top: 24%;
    left: 2%;
    width: 200px;
    font-size: 10px;
    color: #b2ddff;
  }

  .table-container2 {
    top: 24%;
    left: 23%;
  }

  .table-container3 {
    top: 24%;
    left: 40%;
  }

  .table-container4 {
    top: 55%;
    left: 2%;
  }

  .table-container5 {
    top: 55%;
    left: 30%;
  }

  .table-container6 {
    top: 55%;
    left: 63%;
  }

  .table-container7 {
    width: 270px;
    top: 83%;
    left: 2%;
  }

  .table-container8 {
    width: 250px;
    top: 83%;
    left: 30%;
  }

  .table-container9 {
    width: 250px;
    top: 83%;
    left: 57%;
  }

  .svg-img {
    transform: scaleX(-1);
  }

  .svg-container,
  .svg-container2,
  .svg-container3,
  .svg-container4,
  .svg-container5,
  .svg-container6,
  .svg-container7,
  .svg-container8,
  .svg-container9,
  .svg-container10,
  .svg-container11,
  .svg-container12,
  .svg-container13,
  .svg-container14 {
    overflow: hidden;
    position: absolute;
  }

  .svg-container {
    height: 20px;
    width: 20%;
    top: 10%;
    left: 14%;
    img {
      height: 20px;
      width: 100%;
    }
  }

  .svg-container2 {
    width: 23%;
    height: 20px;
    top: 10%;
    left: 42%;
    img {
      height: 20px;
      width: 110%;
    }
  }

  .svg-container3 {
    width: 13%;
    height: 26%;
    top: 13%;
    left: 64%;

    img {
      transform: rotate(270deg);
      transform-origin: center center;
      width: 100%;
    }
  }

  .svg-container4 {
    height: 20px;
    width: 20%;
    top: 41%;
    left: 14%;

    img {
      height: 20px;
      width: 100%;
    }
  }

  .svg-container5 {
    height: 20px;
    width: 20%;
    top: 41%;
    left: 42.5%;

    img {
      height: 20px;
      width: 100%;
    }
  }

  .svg-container6 {
    height: 20px;
    width: 16%;
    top: 41%;
    left: 70.5%;

    img {
      height: 20px;
      width: 100%;
    }
  }

  .svg-container7 {
    height: 20px;
    width: 10%;
    top: 47%;
    left: 24%;

    img {
      height: 20px;
      width: 100%;
    }
  }

  .svg-container8 {
    height: 20px;
    width: 9%;
    top: 74%;
    left: 14%;

    img {
      height: 20px;
      width: 100%;
    }
  }

  .svg-container9 {
    height: 20px;
    width: 9%;
    top: 74%;
    left: 43%;

    img {
      height: 20px;
      width: 100%;
    }
  }

  .svg-container10 {
    top: 50%;
    left: 11%;

    img {
      transform: rotate(90deg);
      transform-origin: center center;
      width: 70%;
    }
  }

  .svg-container11 {
    width: 10%;
    height: 20px;
    top: 45%;
    left: 52%;

    img {
      width: 120%;
      height: 100%;
    }
  }

  .svg-container12 {
    width: 3%;
    height: 20px;
    top: 50%;
    left: 59%;

    img {
      width: 158%;
      height: 100%;
    }
  }

  .svg-container13 {
    top: 50%;
    left: 39.5%;

    img {
      transform: rotate(90deg);
      transform-origin: center center;
      width: 70%;
    }
  }

  .svg-container14 {
    width: 13%;
    height: 13%;
    top: 53%;
    left: 57%;

    img {
      transform: rotate(270deg);
      transform-origin: center center;
      width: 100%;
    }
  }
}
</style>
