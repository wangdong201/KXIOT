<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="第一页" name="one">
        <div>
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="菜单标签">
              <el-input
                v-model="form.menuLabel"
                style="width: 300px"
              ></el-input>
            </el-form-item>
            <el-form-item label="是否开启">
              <el-radio-group v-model="form.isOpen">
                <el-radio label="开启"></el-radio>
                <el-radio label="关闭"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="功能项">
              <el-select
                v-model="form.functionItems"
                multiple
                placeholder="请选择"
                style="width: 300px"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">保存</el-button>
              <el-button>返回</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane label="第二页" name="two">
        <div>
          <el-form ref="form2" :model="form2" label-width="80px">
            <el-form-item label="菜单标签">
              <el-input
                v-model="form2.menuLabel"
                style="width: 300px"
              ></el-input>
            </el-form-item>
            <el-form-item label="是否开启">
              <el-radio-group v-model="form2.isOpen">
                <el-radio label="开启"></el-radio>
                <el-radio label="关闭"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="功能项">
              <el-select
                v-model="form2.functionItems"
                multiple
                placeholder="可选择多项"
                style="width: 300px"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit2">保存</el-button>
              <el-button>返回</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane label="第三页" name="three">
        <div>
          <el-form ref="form3" :model="form3" label-width="80px">
            <el-form-item label="菜单标签">
              <el-input
                v-model="form3.menuLabel"
                style="width: 300px"
              ></el-input>
            </el-form-item>
            <el-form-item label="是否开启">
              <el-radio-group v-model="form3.isOpen">
                <el-radio label="开启"></el-radio>
                <el-radio label="关闭"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="功能项">
              <el-select
                v-model="form3.functionItems"
                multiple
                placeholder="可选择多项"
                style="width: 300px"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit3">保存</el-button>
              <el-button>返回</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "one",
      form: {
        menuLabel: "用电量",
        isOpen: "开启",
        functionItems: ["电表读数", "电表电压"],
      },
      form2: {
        menuLabel: "",
        isOpen: "",
        functionItems: [],
      },
      form3: {
        menuLabel: "",
        isOpen: "",
        functionItems: [],
      },
      options: [
        { value: "1", label: "电表读数" },
        { value: "2", label: "电表电压" },
        { value: "3", label: "电表电流" },
      ],
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    onSubmit() {},
    onSubmit2() {},
    onSubmit3() {},
  },
};
</script>
