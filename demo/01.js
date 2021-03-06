let data = [
  {
    propertyList: [
      {
        name: "份数大小",
        value: "大"
      },
      {
        name: "微辣",
        value: "特辣"
      }
    ],
    inventory: "1",
    discount: "2",
    price: "3"
  },
  {
    propertyList: [
      {
        name: "份数大小",
        value: "大"
      },
      {
        name: "微辣",
        value: "微辣"
      }
    ],
    inventory: "4",
    discount: "5",
    price: "6"
  },
  {
    propertyList: [
      {
        name: "份数大小",
        value: "小"
      },
      {
        name: "微辣",
        value: "特辣"
      }
    ],
    inventory: "8",
    discount: "9",
    price: "8"
  },
  {
    propertyList: [
      {
        name: "份数大小",
        value: "小"
      },
      {
        name: "微辣",
        value: "微辣"
      }
    ],
    inventory: "4",
    discount: "10",
    price: "11"
  }
];
let result = []
data.forEach(item => {
    item.propertyList.forEach(property => {
        let target = result.find(spec => {
            return spec.name === property.name
        })
        if (!target) {
            result.push({
                name: property.name,
                valueList: [{name: property.value}]
            })
        } else {
            if (!target.valueList.find(value => value.name === property.value)) {
                target.valueList.push({name: property.value})
            }
        }
    })
})
console.log(result)