<template>
  <!-- 系统报警设置 -->
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="80px" :inline="true">
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column
          prop="smstz"
          label="短信通知"
          width="150"
        ></el-table-column>
        <el-table-column prop="details" label="">
          <template slot-scope="scope">
            <div v-if="scope.row.smstz === '手机号码1'">
              <el-form-item>
                <el-input
                  v-model="form.phone1"
                  placeholder="请输入手机号码"
                  style="width: 200px"
                ></el-input>
              </el-form-item>
            </div>
            <div v-else-if="scope.row.smstz === '手机号码2'">
              <el-form-item>
                <el-input
                  v-model="form.phone2"
                  placeholder="请输入手机号码"
                  style="width: 200px"
                ></el-input>
              </el-form-item>
            </div>
            <div v-else-if="scope.row.smstz === '说明'">
              <div>
                1. 该页面设置的报警触发短信仅发送给管理员,每次触发发送一次
              </div>
              <div>2. 请确保短信余额充足 ，发送失败不扣费。点击充值 短信</div>
              <div>3. 最多支持设置2个手机号接收报警通知信息</div>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <el-table :data="tableData2" style="width: 100%; margin: 20px 0" border>
        <el-table-column
          prop="setup"
          label="电能表报警设置"
          width="150"
        ></el-table-column>
        <el-table-column label="">
          <template slot-scope="scope">
            <div
              v-if="
                scope.row.setup === 'A相有功功率反向' ||
                scope.row.setup === 'B相有功功率反向' ||
                scope.row.setup === 'C相有功功率反向'
              "
            >
              指示电流方向是否正常，进出线接反时触发报警。
            </div>

            <div v-if="scope.row.setup === '断电报警'">
              指示线路通断状态，表端拉闸状态时触发报警,拉闸原因通常包含余额不足，手动拉闸，超负荷，开表盖。
            </div>
            <div v-if="scope.row.setup === '开盖报警'">
              支持开盖检测的设备表盖打开时触发报警，可防止非法打开电表盖的偷电行为。
            </div>

            <div
              v-if="
                scope.row.setup === 'A相过载' ||
                scope.row.setup === 'B相过载' ||
                scope.row.setup === 'C相过载'
              "
            >
              设备运行期间长时间超过设定的负荷限制，通常会引起电表跳闸断电。（长时间超过额定最大功率易导致设备过热损坏并引起安全问题）
            </div>

            <div v-if="scope.row.setup === '计量故障'">
              设备因电网剧烈波动或内部元器件损坏原因导致无法正常计量。
            </div>

            <div v-if="scope.row.setup === '温度过高'" class="wendu-err">
              <span>指示电表内部是否温度过高</span>
              <span>
                高温阈值：<el-input
                  v-model="form.wendu"
                  placeholder="请输入手机号码"
                  style="width: 100px"
                ></el-input
                >℃
              </span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="" width="280">
          <template slot="header" slot-scope="scope">
            <el-form-item>
              <el-checkbox-group
                v-model="form.type"
                @change="toggleAllCheckboxes2"
              >
                <el-checkbox label="允许报警" name="type"></el-checkbox>
                <el-checkbox label="短信通知" name="type"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </template>
          <template slot-scope="scope">
            <el-form-item>
              <el-checkbox-group
                v-model="scope.row.selectedOptions"
                @change="updateHeaderCheckbox2"
              >
                <el-checkbox label="允许报警" name="type"></el-checkbox>
                <el-checkbox label="短信通知" name="type"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </template>
        </el-table-column>
      </el-table>

      <el-table :data="tableData3" style="width: 100%; margin: 20px 0" border>
        <el-table-column prop="setup2" label="采集器报警设置" width="150">
        </el-table-column>
        <el-table-column label=""> </el-table-column>
        <el-table-column width="280" label="允许报警">
          <template slot="header" slot-scope="scope">
            <el-form-item>
              <el-checkbox-group
                v-model="form.type3"
                @change="toggleAllCheckboxes3"
              >
                <el-checkbox label="允许报警" name="type"></el-checkbox>
                <el-checkbox label="短信通知" name="type"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </template>
          <template slot-scope="scope">
            <el-form-item>
              <el-checkbox-group
                v-model="scope.row.selectedOptions3"
                @change="updateHeaderCheckbox3"
              >
                <el-checkbox label="允许报警" name="type"></el-checkbox>
                <el-checkbox label="短信通知" name="type"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </template>
        </el-table-column>
      </el-table>

      <el-form-item>
        <el-button type="primary" @click="submitForm">保存全部设置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "AlarmSettings",
  components: {},
  data() {
    return {
      form: {
        phone1: "",
        phone2: "",
        type: [],
        type2: [],
        type3: [],
        wendu: "75",
      },
      tableData: [
        {
          smstz: "说明",
        },
        {
          smstz: "手机号码1",
        },
        {
          smstz: "手机号码2",
        },
      ],
      tableData2: [
        { setup: "A相有功功率反向", selectedOptions: ["允许报警"] },
        { setup: "B相有功功率反向", selectedOptions: ["允许报警"] },
        { setup: "C相有功功率反向", selectedOptions: ["允许报警"] },
        { setup: "断电报警", selectedOptions: ["允许报警"] },
        { setup: "开盖报警", selectedOptions: ["允许报警"] },
        { setup: "A相过载", selectedOptions: ["允许报警"] },
        { setup: "B相过载", selectedOptions: ["允许报警"] },
        { setup: "C相过载", selectedOptions: ["允许报警"] },
        { setup: "计量故障", selectedOptions: ["允许报警"] },
        { setup: "电费透支", selectedOptions: ["允许报警"] },
        { setup: "余额不足一级报警", selectedOptions: ["允许报警"] },
        { setup: "余额不足二级报警", selectedOptions: ["允许报警"] },
        { setup: "电表连续通讯异常", selectedOptions: ["允许报警"] },
        { setup: "设备信号弱", selectedOptions: ["允许报警"] },
        { setup: "连续用电量过低", selectedOptions: ["允许报警"] },
        { setup: "连续用电量过高", selectedOptions: ["允许报警"] },
        { setup: "温度过高", selectedOptions: ["允许报警"] },
      ],
      tableData3: [
        { setup2: "设备信号弱", selectedOptions3: [] },
        { setup2: "通讯设备长时间离线", selectedOptions3: [] },
      ],
    };
  },
  methods: {
    submitForm() {},
    // 电能表报警设置
    toggleAllCheckboxes(values, tableData, formField) {
      tableData.forEach((row) => {
        row[formField] = [...values];
      });
    },
    updateHeaderCheckbox(tableData, formField) {
      const allSelectedOptions = tableData.map((row) => row[formField]);
      const isAllSame = allSelectedOptions.every(
        (options) =>
          JSON.stringify(options) === JSON.stringify(allSelectedOptions[0])
      );
      if (isAllSame) {
        this.form[formField] = allSelectedOptions[0];
      } else {
        // 确保已经选中的多选框不会被取消
        const currentSelected = new Set();
        allSelectedOptions.forEach((options) => {
          options.forEach((option) => currentSelected.add(option));
        });
        this.form[formField] = Array.from(currentSelected);
      }
    },
    toggleAllCheckboxes2(values) {
      this.toggleAllCheckboxes(values, this.tableData2, "selectedOptions");
    },
    toggleAllCheckboxes3(values) {
      this.toggleAllCheckboxes(values, this.tableData3, "selectedOptions3");
    },
    updateHeaderCheckbox2() {
      this.updateHeaderCheckbox(this.tableData2, "selectedOptions");
    },
    updateHeaderCheckbox3() {
      this.updateHeaderCheckbox(this.tableData3, "selectedOptions3");
    },
  },
  watch: {},
};
</script>

<style scoped lang="scss">
.wendu-err {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.el-form-item {
  margin-bottom: 0px !important;
}
</style>
