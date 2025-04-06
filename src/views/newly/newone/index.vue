<template>
  <div class="app-container">
    <el-button type="text" @click="dialogVisible = true"
      >点击打开 Dialog</el-button
    >
    <el-dialog
      title="分配数据权限"
      :visible.sync="dialogVisible"
      width="500px"
      :before-close="handleClose"
    >
      <div class="dialog-body">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="角色名称">
            <el-input placeholder="普通角色" disabled></el-input>
          </el-form-item>
          <el-form-item label="权限字符">
            <el-input placeholder="common" disabled></el-input>
          </el-form-item>
          <el-form-item label="权限范围">
            <el-select v-model="form.region" placeholder="请选择权限范围">
              <el-option
                v-for="option in regionOptions"
                :key="option.value"
                :label="option.label"
                :value="option.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="权限范围">
            <el-checkbox v-model="isTreeCollapsed" @change="zhedie"
              >展开/折叠</el-checkbox
            >
            <el-checkbox v-model="checked2" @change="handleCheckAllChange"
              >全选/全不选</el-checkbox
            >
            <el-checkbox v-model="checked3" @change="Changeguzi"
              >父子联动</el-checkbox
            >
            <el-tree
              class="tree-border"
              :data="data"
              ref="dept"
              show-checkbox
              node-key="id"
              :check-strictly="fuziliand"
              :default-expanded-keys="TreeShwo"
              :props="defaultProps"
            >
              <span class="custom-tree-node" slot-scope="{ node, data }">
                <i
                  :class="data.iconClass ? data.iconClass : defaultIconClass"
                  class="tree-node-icon"
                ></i>
                <span>{{ node.label }}</span>
              </span>
            </el-tree>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogVisible: false,
      // 表单数据
      form: {
        region: "1",
      },
      // 权限范围选项
      regionOptions: [
        { label: "全部数据权限", value: "1" },
        { label: "自定义数据权限", value: "2" },
        { label: "本部门数据权限", value: "3" },
        { label: "本部门及以下数据权限", value: "4" },
        { label: "仅本人数据权限", value: "5" },
      ],
      // 复选框数据
      isTreeCollapsed: false,
      checked2: false,
      checked3: false,
      fuziliand: true,
      TreeShwo: [],

      // 树形选择器数据
      data: [
        {
          id: 1,
          label: "能耗科技",
          iconClass: "el-icon-eleme",
          children: [
            {
              id: 2,
              label: "深圳总公司",
              iconClass: "el-icon-eleme",
              children: [
                {
                  id: 4,
                  label: "研发部门",
                  iconClass: "el-icon-eleme",
                },
                {
                  id: 5,
                  label: "市场部门",
                  iconClass: "el-icon-eleme",
                },
                {
                  id: 6,
                  label: "测试部门",
                  iconClass: "el-icon-eleme",
                },
                {
                  id: 7,
                  label: "财务部门",
                  iconClass: "el-icon-eleme",
                },
                {
                  id: 8,
                  label: "运维部门",
                  iconClass: "el-icon-eleme",
                },
              ],
            },
            {
              id: 3,
              label: "长沙分公司",
              iconClass: "el-icon-eleme",
              children: [
                {
                  id: 9,
                  label: "市场部门",
                  iconClass: "el-icon-eleme",
                },
                {
                  id: 10,
                  label: "财务部门",
                  iconClass: "el-icon-eleme",
                },
              ],
            },
          ],
        },
      ],
      checkedKeys: [],
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },

  methods: {
    // 提取所有节点的ID
    extractIds(data) {
      return data.flatMap((obj) => [
        obj.id,
        ...(obj.children ? this.extractIds(obj.children) : []),
      ]);
    },

    // 展开/折叠
    zhedie(a) {
      if (a) {
        this.TreeShwo = this.extractIds(this.data);
      } else {
        this.$refs.dept.store.nodesMap[1].expanded = false;
      }
    },

    // 父子联动
    Changeguzi() {
      if (this.checked3) {
        this.fuziliand = false;
      } else {
        this.fuziliand = true;
      }
    },

    // 全选/反选
    handleCheckAllChange(checked) {
      this.checkedAll = checked;
      const tree = this.$refs.dept;
      const checkedKeys = checked ? this.getAllNodeKeys() : [];
      tree.setCheckedKeys(checkedKeys);
    },

    // 获取所有节点的ID
    getAllNodeKeys() {
      const keys = [];
      const traverse = (nodes) => {
        nodes.forEach((node) => {
          keys.push(node.id);
          if (node.children) {
            traverse(node.children);
          }
        });
      };
      traverse(this.data);
      return keys;
    },

    // 处理选中变化
    handleCheckChange(checkedKeys) {
      if (checkedKeys && checkedKeys.checkedKeys) {
        this.checkedKeys = checkedKeys.checkedKeys;
        const allNodeKeys = this.getAllNodeKeys();
        this.checkedAll = this.checkedKeys.length === allNodeKeys.length;
      }
    },

    // 弹出层关闭回调
    handleClose(done) {
      done();
    },
  },
};
</script>
<style scoped lang="scss">
.tree-border {
  border: 1px solid #fff;
}
</style>
