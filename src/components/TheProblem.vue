<template>
  <div class="demo">
    <table>
      <tr>
        <th>规格名称</th>
        <th>规格值</th>
        <th>操作</th>
      </tr>
      <tr v-for="(item, index) in specList" :key="index">
        <td>
          <input type="text" v-model="item.name">
        </td>
        <td>
          <div v-for="(value, valueIndex) in item.valueList" :key="valueIndex">
            <input type="text" v-model="value.name">
            <button @click="delSpecValue(index, valueIndex)">x</button>
          </div>
          <button @click="addSpecValue(index)">添加规格值</button>
        </td>
        <td>
          <button @click="delSpec(index)">删除规格</button>
        </td>
      </tr>
    </table>
    <button @click="addSpec()">添加规格</button>
    <button @click="generateSpec()">生成规格</button>
    <table>
      <tr>
        <td v-for="(item, index) in specGridHead" :key="index">{{item}}</td>
      </tr>
      <tr v-for="(item, index) in specGridCell" :key="index">
        <td v-for="item in item.propertyList" :key="item.value">
          <div>{{item.value}}</div>
        </td>
        <td>
          <input v-model="item.inventory" type="number" :min="0">
        </td>
        <td>
          <input v-model="item.discount" type="number" :min="0">
        </td>
        <td>
          <input v-model="item.price" type="number" :min="item.discount">
        </td>                           
        <td>
          <button @click="delSpecGrid(index)">删除规格</button>
        </td>
      </tr>
    </table>
    <button @click="submit">提交</button>
  </div>
</template>

<script>
export default {
  name: "demo",

  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    },
    specListProp: {
      type: Array,
      default () {
        return []
      }
    },    
  },

  data() {
    return {
      specList: this.specListProp,
      specGridHeadPreset: ["库存", "折扣价", "价格", "操作"],
      specGridCell: this.data,
    };
  },

  computed: {
    specGridHead () {
      return this.specList
        .map(item => item.name)
        .concat(this.specGridHeadPreset);
    }
  },

  watch: {
    data () {
      this.specGridCell = this.data
    },
    specList () {
      this.specList = this.specListProp
    }
  },

  methods: {
    // 添加规格
    addSpec() {
      // 最多添加三个
      if (this.specList.length < 3) {
        this.specList.push({
          name: "",
          valueList: [
            {
              name: ""
            }
          ]
        });
      }
    },
    // 删除规格
    delSpec(index) {
      this.specList.splice(index, 1);
    },
    // 添加规格值
    addSpecValue(index) {
      // 最多添加五个
      if (this.specList[index].valueList.length < 5) {
        this.specList[index].valueList.push({
          name: ""
        });
      }
    },
    // 删除规格值
    delSpecValue(index, valueIndex) {
      this.specList[index].valueList.splice(valueIndex, 1);
    },
    // 生成规格的全排列函数
    generate(arr) {
      function mix(item1, item2) {
        var arr1 = Array.isArray(item1.valueList) ? item1.valueList : item1;
        var arr2 = item2.valueList;
        var result = [];
        for (let i = 0; i < arr1.length; i++) {
          for (let j = 0; j < arr2.length; j++) {
            let item = [];
            if (Array.isArray(arr1[i])) {
              item = item.concat(arr1[i]);
              item.push({
                name: item2.name,
                value: arr2[j].name
              });
            } else {
              item.push({
                name: item1.name,
                value: arr1[i].name
              });
              item.push({
                name: item2.name,
                value: arr2[j].name
              });
            }
            result.push(item);
          }
        }
        return result;
      }
      if (arr.length < 1) {
        return [];
      } else if (arr.length < 2) {
          let result = [];
          let item = arr[0];
          item.valueList.map(value => {
            result.push([{
              name: item.name,
              value: value.name
            }]);
          });
          return result;
      } else {
        return arr.reduce((acc, item) => {
          return mix(acc, item);
        });
      }
    },
    // 生成规格
    generateSpec() {

      // 过滤空白的规格
      let normlizeList = this.specList.map(item => {
        return {
          name: item.name,
          valueList: item.valueList.filter(value => value.name)
        }
      });
      // 获取规格数据
      this.specGridCell = this.generate(normlizeList).map(item => {
        return {
          propertyList: item,
          inventory: "",
          discount: "",
          price: ""
        };
      });
    },
    delSpecGrid(index) {
      this.specGridCell.splice(index, 1);
    },
    submit() {
      // eslint-disable-next-line
      console.log(JSON.stringify(this.specGridCell, null, 2));
    }
  }
};
</script>
