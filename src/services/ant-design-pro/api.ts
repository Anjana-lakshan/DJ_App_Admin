// @ts-ignore
/* eslint-disable */
import env from '@/constants/env';
import { request ,history} from '@umijs/max';
import { message } from 'antd';

// const API_URL = process.env.API_URL;
const { API_URL } = env;
/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  const token = getAdminToken();
  return request<{
    data: API.CurrentUser;
  }>(API_URL + '/users/currentuser', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    ...(options || {}),
  });
}

/** 退出登录接口 POST /api/login/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/login/outLogin', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 登录接口 POST /api/login/account */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>(API_URL + '/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

function getAdminToken() {
  var token = localStorage.getItem('adminToken');
  if (token) {
    return token;
  }

  return '';
}

// function getGuestToken() {
//   var token = localStorage.getItem('guestToken');
//   if (token) {
//     return token;
//   }

//   return '';
// }

export function setAdminToken(token: string) {
  localStorage.setItem('adminToken', token);
}

// export function setGuestToken(token: string) {
//   localStorage.setItem('guestToken', token);
// }

export function clearLocalStorage() {
  history.push(`/user/login`);
  localStorage.clear();
}

/** GET Users */
export async function getUsers(
) {
  const token = getAdminToken();
  return request<API.Customers>(`${API_URL}/users/allusers`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },


  });
}

/** GET Users */
export async function getSongs(
) {
  const token = getAdminToken();
  return request<API.Customers>(`${API_URL}/songs/allsongs`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },


  });
}

/** GET Spotify Auth */
export async function getspotifyAuth(
) {
  const token = getAdminToken();
  return request<API.Customers>(`http://localhost:3000/spotifyAuth`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },


  });
}

/** GET AllCategories */
export async function getAllCategories(
) {
  const token = getAdminToken();
  return request<API.Customers>(`${API_URL}/songs/allcategories`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },


  });
}

/** GET AllCategoriesPlaylist */
export async function getAllCategoriesPlaylist(
  id:string
) {
  const token = getAdminToken();
  return request<API.Customers>(`${API_URL}/songs/categories/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },


  });
}

/** GET AllCategoriesPlaylist Songs */
export async function getAllCategoriesPlaylistSongs(
  id:string
) {
  const token = getAdminToken();
  return request<API.Customers>(`${API_URL}/songs/categoryplaylists/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },


  });
}

/** Update Playlist */
export async function addSongs(
  body?: { [key: string]: any },
) {
  const token = getAdminToken();
  return request(`${API_URL}/songs/addtracks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: body,
  }).then((response) => {
    if (response.errorMessage === null) {
      message.success(response.message).then(() => {
      });
    } else {
      message.error(response.errorMessage);
    }
  });
}

/** Delete Song */
export async function deleteSong(
  id?: { [key: string]: any },
) {
  const token = getAdminToken();
  return request(`${API_URL}/songs/deletetracks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    if (response.errorMessage === null) {
      message.success(response.message).then(() => {
      });
    } else {
      message.error(response.errorMessage);
    }
  });
}


//Guest Api

/** GET Guest Songs*/
export async function getGuestSongs(
) {
  const token = getAdminToken();
  return request<API.Customers>(`${API_URL}/songs/allsongs`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },


  });
}

/** Update Playlist */
export async function requestSongs(
  id?: { [key: string]: any },
) {
  const token = getAdminToken();
  return request(`${API_URL}/songs/guestuser/requestsong/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    if (response.errorMessage === null) {
      message.success(response.message).then(() => {
      });
    } else {
      message.error(response.errorMessage);
    }
  });
}

/** GET Guest Songs*/
export async function getGuestDJQue(
) {
  const token = getAdminToken();
  return request<API.Customers>(`${API_URL}/songs/getbpmque`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },


  });
}

/** GET MyRequest Songs*/
export async function getMyRequest(
) {
  const token = getAdminToken();
  return request<API.Customers>(`${API_URL}/songs/guestuser/myrequests`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },


  });
}

/** 此处后端没有提供注释 GET /api/notices */
export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取规则列表 GET /api/rule */
export async function rule(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>('/api/rule', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 更新规则 PUT /api/rule */
export async function updateRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'POST',
    data:{
      method: 'update',
      ...(options || {}),
    }
  });
}

/** 新建规则 POST /api/rule */
export async function addRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'POST',
    data:{
      method: 'post',
      ...(options || {}),
    }
  });
}

/** 删除规则 DELETE /api/rule */
export async function removeRule(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/rule', {
    method: 'POST',
    data:{
      method: 'delete',
      ...(options || {}),
    }
  });
}
