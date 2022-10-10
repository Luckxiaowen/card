import myRequest from "@/service"

const memberStaffAPI = {
  LIST_STAFF: "/admin/list-staff",
  PAGE_STAFF: "/admin/page-staff",
  RESTFUL_STAFF: "/admin/staff/",
  UPLOAD_FILE: "/admin/upload/file",
  EXCEL_IMPORT: "/admin/add-listUser"
}

export function excelImportRequest(data) {
  return myRequest.post({
    url: memberStaffAPI.EXCEL_IMPORT,
    data
  })
}

export function listStaffRequest(data) {
  return myRequest.get({
    url: memberStaffAPI.LIST_STAFF
  })
}

export function pageStaffRequest(data) {
  return myRequest.get({
    url: memberStaffAPI.PAGE_STAFF,
    params: data
  })
}

export function addStaffRequest(data) {
  return myRequest.post({
    url: memberStaffAPI.RESTFUL_STAFF,
    data
  })
}

export function updateStaffRequest(data) {
  return myRequest.put({
    url: memberStaffAPI.RESTFUL_STAFF,
    data
  })
}

export function getStaffRequest(id) {
  return myRequest.get({
    url: memberStaffAPI.RESTFUL_STAFF + id
  })
}

export function deleteStaffRequest(id) {
  return myRequest.delete({
    url: memberStaffAPI.RESTFUL_STAFF + id
  })
}

export function uploadFileRequest(file) {
  return myRequest.post({
    headers: { "Content-Type": "multipart/form-data" },
    url: memberStaffAPI.UPLOAD_FILE,
    data: { file }
  })
}
