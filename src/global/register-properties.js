import { formatUtcString } from "@/utils/date-format"
import { formatTimestamp } from "@/utils/date-format"

export default function registerProperties(app) {
  // 全局对象 => 可以在template里面直接使用，setup里面通过，全局属性以$开头
  app.config.globalProperties.$filters = {
    formatTime(value) {
      if (typeof value === "string") {
        return formatUtcString(value)
      } else {
        return formatTimestamp(value)
      }
    }
  }
}
