import XLSX from "xlsx"
import store from "@/store"

// 获取数据
export function getExcelData(rawFile) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    // 注意顺序
    reader.onload = (e) => {
      // 1. 获取到解析后的数据
      const data = e.target.result
      // 2. 利用 XLSX 对数据进行解析
      const workbook = XLSX.read(data, { type: "array" })
      // 3. 获取第一张表格（工作簿）名称
      const firstSheetName = workbook.SheetNames[0]
      // 4. 读取 sheet1（第一张表格）的数据
      const workSheet = workbook.Sheets[firstSheetName]
      // 5. 解析数据表头
      const header = getHeaderRow(workSheet)
      // 6. 解析数据体
      const result = XLSX.utils.sheet_to_json(workSheet)
      // 7. 返回出数据
      resolve({ header, result })
    }

    reader.readAsArrayBuffer(rawFile)
  })
}

// 获取表头
export function getHeaderRow(sheet) {
  const headers = []
  const range = XLSX.utils.decode_range(sheet["!ref"])
  let C
  const R = range.s.r
  for (C = range.s.c; C <= range.e.c; ++C) {
    const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })]
    let hdr = "UNKNOWN" + C
    if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
    headers.push(hdr)
  }
  return headers
}

// 将表头转换成对应参数
export function transformExcelData({ data, callback }) {
  const arr = []
  data.forEach((item) => {
    const userInfo = {}

    Object.keys(item).forEach((key) => {
      userInfo[USER_RELATIONS[key]] = item[key]
    })
    callback && callback()
    arr.push(userInfo)
  })

  return arr
}

// 将文字转换成相应ID
export function transformToId(data) {
  const originList = store.state.optionsOrganize.departmentList // 获取要映射id的数据
  const idArr = getValueAndId(originList)

  const beforeData = DeepClone(data)

  const afterData = beforeData.map((item1) => {
    const findOut = idArr.find((item2) => item2.label === item1.depId)
    item1.depId = findOut.value
    return item1
  })

  return afterData
}

// 获取相应值和ID
export function getValueAndId(list) {
  const arr = []

  const recurse = (list) => {
    list.forEach((item) => {
      if (item.children.length >= 0) {
        arr.push({ label: item.label, value: item.value }) // 将要映射id的数据转化成固定格式
        recurse(item.children)
      }
    })
  }
  recurse(list)

  return arr
}

// 深拷贝
export function DeepClone(obj) {
  if (obj === null || typeof obj !== "object") return obj
  var cpObj = obj instanceof Array ? [] : {}
  for (var key in obj) cpObj[key] = DeepClone(obj[key])
  return cpObj
}

// 表头参数对应关系
export const USER_RELATIONS = {
  所属部门: "depId",
  邮箱: "email",
  员工姓名: "username",
  岗位名称: "station",
  手机号: "phonenumber",
  微信: "telWeixin"
}
