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
        <td v-for="(value, key) in item" :key="key">
          <div v-if="key.includes('field')">{{value}}</div>
          <input v-if="!key.includes('field')" v-model="item[key]">
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

  data() {
    return {
      specList: [
        {
          name: "份数大小",
          valueList: [
            {
              name: "大"
            },
            {
              name: "小"
            }
          ]
        },
        {
          name: "微辣",
          valueList: [
            {
              name: "特辣"
            },
            {
              name: "微辣"
            }
          ]
        }
      ],
      specGridHeadPreset: ["库存", "折扣价", "价格", "操作"],
      specGridHead: [],
      specGridCell: []
    };
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
      function mix(arr1, arr2) {
        var result = [];
        for (let i = 0; i < arr1.length; i++) {
          for (let j = 0; j < arr2.length; j++) {
            let item = {};
            if (typeof arr1[i] === "object") {
              let keyLength = Object.keys(arr1[i]).length + 1;
              item = Object.assign({}, arr1[i], {
                ["field" + keyLength]: arr2[j]
              });
            } else {
              item = {
                field1: arr1[i],
                field2: arr2[j]
              };
            }
            result.push(item);
          }
        }
        return result;
      }
      return arr.reduce((acc, item) => {
        return mix(acc, item);
      });
    },
    // 生成规格
    generateSpec() {
      this.specGridHead = this.specList
        .map(item => item.name)
        .concat(this.specGridHeadPreset);
      // this.specGridCell
      let normlizeList = this.specList.map(item => {
        return item.valueList
          .filter(value => value.name)
          .map(value => value.name);
      });
      this.specGridCell = this.generate(normlizeList).map(item => {
        return {
          ...item,
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
      console.log(this.specGridCell);
    }
  }
};
</script>
