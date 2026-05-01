import axios from "axios";
import useAuthStore from "@/store/useAuthStore";
const apiurl=process.env.NEXT_PUBLIC_API_URL||"http://localhost:8080";
const api = axios.create({
  baseURL: apiurl,
  headers: { "Content-Type": "application/json" },
  withCredentials: true, //자동으로 알아서 쿠키를 보내준다
});
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error;
    // 401 에러(권한 없음)이고, 재시도한 적이 없을 때
    if (response?.status === 401 && !config._retry) {
      config._retry = true;
      try {
            const res = await axios.post(
              `${apiurl}/api/reissue`,
              {},
              {
                withCredentials: true,
              },
            );
            const {  userName, roles } = res.data;
            console.log("userName", userName, "role", roles);
            useAuthStore.getState().setLogin({
              userName,
              roles,
            });
            console.log("전체 config:", config);
            
            return api(config);

      } catch (reissueError) {

        useAuthStore.getState().setLogout();
        if(typeof window!=='undefined'){
          window.location.href = "/login";
        }
        return Promise.reject(reissueError);
      }
    }
    return Promise.reject(error);
  },
);

export default api;
