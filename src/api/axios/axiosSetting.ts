import { BASE_URL } from "api/URL/BaseURL";
import axios from "axios";
import { Letterlists, LoginData } from "interface/Interface";
import Cookie from "js-cookie";
export const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "X-CSRFToken": Cookie.get("csrftoken") || "",
  },
  // xsrfCookieName: "csrftoken",
  // xsrfHeaderName: "X-CSRFToken",
  withCredentials: true,
});

export const getFeeds = async (url: string) =>
  await instance.get(url).then((res) => {
    return res.data;
  });

export const login = async (data: any) =>
  await instance.post(`/users/login/`, data).then((res) => {
    console.log(res);
    return res.data;
  });

export const getLetterlists = (): Promise<Letterlists[]> => {
  return instance.get(`letterlists/`).then((res) => res.data);
};
export const getFeedDetail = async (feedID: number, group: string) =>
  await instance.get(`/feeds/${group}/${feedID}/`).then((res) => {
    return res.data;
  });

export const postCategory = async (name: string, group: string) =>
  await instance.post(`/categories/${group}`, { name }).then((res) => {
    return res.data;
  });

export const deleteCategory = async (group: string, id: number) =>
  await instance.delete(`/categories/${group}/${id}`).then((res) => {
    return res.data;
  });
