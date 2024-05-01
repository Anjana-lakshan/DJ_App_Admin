// @ts-ignore
/* eslint-disable */
import env from '@/constants/env';
import { request } from '@umijs/max';

// const API_URL = process.env.API_URL;
const { API_URL } = env;
/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  const token = getToken();
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

function getToken() {
  var token = localStorage.getItem('token');
  if (token) {
    return token;
  }

  return '';
}

export function setToken(token: string) {
  localStorage.setItem('token', token);
}

export function clearLocalStorage() {
  localStorage.clear();
}

/** GET Users */
export async function getUsers(
) {
  const token = getToken();
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
  const token = getToken();
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
  const token = getToken();
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
  const token = getToken();
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
  const token = getToken();
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
  const token = getToken();
  return request<API.Customers>(`${API_URL}/songs/categoryplaylists/${id}`, {
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
