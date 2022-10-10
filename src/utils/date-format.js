import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"

dayjs.extend(utc) // 处理后端时间返回的是utc字符串

const DATE_TIME_FORMAT = "YYYY-MM-DD"

export function formatUtcString(utsString, format = DATE_TIME_FORMAT) {
  // return dayjs(utsString).format(format);
  return dayjs.utc(utsString).utcOffset(8).format(format)
}

export function formatTimestamp(timestamp, format = DATE_TIME_FORMAT) {
  return dayjs(timestamp).format(format) // 即可处理UTC也可处理时间戳
}
