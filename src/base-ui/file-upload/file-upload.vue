<template>
  <div class="file-upload">
    <el-upload
      v-model:file-list="fileList"
      :action="serverUrl"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :limit="limitNum"
      :headers="headers"
    >
      <el-icon><Plus /></el-icon>
    </el-upload>

    <el-dialog v-model="dialogVisible">
      <img w-full :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>
  </div>
</template>

<script>
import { ref, watch } from "vue"
import LocalCache from "@/utils/cache"

export default {
  props: {
    serverUrl: {
      type: String,
      required: true
    },
    isSingle: {
      type: Boolean,
      default: true
    },
    localName: {
      type: String,
      required: false
    },
    limitNum: {
      type: Number,
      default: 1
    },
    autoSave: {
      type: Boolean,
      default: true
    },
    preview: {
      type: Array,
      default: () => []
    },
    hasHttp: {
      type: Boolean,
      default: true
    },
    token: {
      type: String,
      default: ""
    }
  },
  setup(props) {
    const fileList = ref([])
    const dialogImageUrl = ref("")
    const dialogVisible = ref(false)
    const hasHttp = props.hasHttp
    const headers = {
      token: props.token ?? ""
    }

    if (props.autoSave) {
      const imgUrl = LocalCache.getCache(props.localName)
      if (props.isSingle) {
        fileList.value = imgUrl
          ? [{ name: "", url: hasHttp ? imgUrl : "http://" + imgUrl }]
          : []
      } else {
        const imgUrls = imgUrl
          ? imgUrl.map((url) => ({
              name: "",
              url: hasHttp ? url : "http://" + url
            }))
          : []

        fileList.value = imgUrls
      }
    }
    // 动态监听图片地址变化
    watch(
      () => props.preview,
      (newVal) => {
        fileList.value = []
        if (newVal.length > 0) {
          newVal.forEach((url) => {
            if (!url) return // 避免图片地址还未请求到，为undefined时报错
            fileList.value.push({
              name: "",
              url: hasHttp ? url : "http://" + url
            })
          })
        }
      },
      { immediate: true, deep: true }
    )

    const handleSuccess = (res, file, files) => {
      let result = ""

      if (props.isSingle) {
        result = file.response.data.url
      } else {
        result = files.map((item) => item.response.data.url)
        console.log(1)
      }
      LocalCache.setCache(props.localName, result)
    }

    const handleRemove = (uploadFile, uploadFiles) => {
      console.log(uploadFile, uploadFiles)
      LocalCache.removeCache(props.localName)
    }

    const handlePictureCardPreview = (uploadFile) => {
      dialogImageUrl.value = uploadFile.url
      dialogVisible.value = true
    }

    return {
      headers,
      fileList,
      dialogImageUrl,
      dialogVisible,
      handleSuccess,
      handleRemove,
      handlePictureCardPreview
    }
  }
}
</script>

<style lang="scss" scoped>
.el-dialog__body {
  img {
    width: 100% !important;
  }
}
</style>
