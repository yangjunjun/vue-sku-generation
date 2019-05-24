var arr = [
  { name: "份数大小", valueList: [{ name: "大" }, { name: "小" }] },
  { name: "辣度", valueList: [{ name: "特辣" }, { name: "微辣" }] },
  { name: "饮料", valueList: [{ name: "有" }, { name: "无" }] }
];

function generate(arr) {
    function mix(item1, item2) {
      var arr1 = Array.isArray(item1.valueList) ? item1.valueList : item1;
      var arr2 = item2.valueList;
      var result = [];
      for (let i = 0; i < arr1.length; i++) {
        for (let j = 0; j < arr2.length; j++) {
          let item = [];
          if (Array.isArray(arr1[i])) {
              item = item.concat(arr1[i])
              item.push({
                name: item2.name,
                value: arr2[j].name                  
              })
          } else {
            item.push({
                name: item1.name,
                value: arr1[i].name
            })
            item.push({
                name: item2.name,
                value: arr2[j].name
            })
          }
          result.push(item);
        }
      }
      return result;
    }
    return arr.reduce((acc, item) => {
        return mix(acc, item);
    });    
}
console.log(JSON.stringify(generate(arr), null, 2));

/* out
[
  [
    {
      "name": "份数大小",
      "value": "大"
    },
    {
      "name": "辣度",
      "value": "特辣"
    },
    {
      "name": "饮料",
      "value": "有"
    }
  ],
  [
    {
      "name": "份数大小",
      "value": "大"
    },
    {
      "name": "辣度",
      "value": "特辣"
    },
    {
      "name": "饮料",
      "value": "无"
    }
  ],
  [
    {
      "name": "份数大小",
      "value": "大"
    },
    {
      "name": "辣度",
      "value": "微辣"
    },
    {
      "name": "饮料",
      "value": "有"
    }
  ],
  [
    {
      "name": "份数大小",
      "value": "大"
    },
    {
      "name": "辣度",
      "value": "微辣"
    },
    {
      "name": "饮料",
      "value": "无"
    }
  ],
  [
    {
      "name": "份数大小",
      "value": "小"
    },
    {
      "name": "辣度",
      "value": "特辣"
    },
    {
      "name": "饮料",
      "value": "有"
    }
  ],
  [
    {
      "name": "份数大小",
      "value": "小"
    },
    {
      "name": "辣度",
      "value": "特辣"
    },
    {
      "name": "饮料",
      "value": "无"
    }
  ],
  [
    {
      "name": "份数大小",
      "value": "小"
    },
    {
      "name": "辣度",
      "value": "微辣"
    },
    {
      "name": "饮料",
      "value": "有"
    }
  ],
  [
    {
      "name": "份数大小",
      "value": "小"
    },
    {
      "name": "辣度",
      "value": "微辣"
    },
    {
      "name": "饮料",
      "value": "无"
    }
  ]
]
*/ 
