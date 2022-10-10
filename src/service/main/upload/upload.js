import myRequest from "@/service"

const uploadAPI = {
  UPLOAD_IMAGE: "/upload-me"
}

export function uploadImageRequest(data) {
  return myRequest.post({
    headers: { "Content-Type": "multipart/form-data" },
    url: uploadAPI.UPLOAD_IMAGE,
    data
  })
}
