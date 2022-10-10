import myRequest from "@/service"

const previewAPI = {
  PERSONAL_CARD: "/user/personal-card",
  GET_COMMENTS: "/notes_manage/notes",
  GET_PHOTO: "/user/professional-photo",
  GET_DESC: "/user/userinfo"
}

export function getPersonalRequest(id) {
  return myRequest.get({
    url: previewAPI.PERSONAL_CARD,
    params: {
      userId: id
    }
  })
}

export function getCommentsRequest(id) {
  return myRequest.get({
    url: previewAPI.GET_COMMENTS,
    params: {
      userId: id
    }
  })
}

export function getPhotoRequest(id) {
  return myRequest.get({
    url: previewAPI.GET_PHOTO,
    params: {
      userId: id
    }
  })
}

export function getDescRequest(id) {
  return myRequest.get({
    url: previewAPI.GET_DESC,
    params: {
      userId: id
    }
  })
}
