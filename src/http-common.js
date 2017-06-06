import axios from 'axios';
import router from './router'

// axios 配置
axios.defaults.timeout = 5000;
axios.defaults.baseURL = `http://localhost:3000`;

// http request 拦截器
axios.interceptors.request.use(   //发送之前加token到请求报文的headers
    config => {
        var token = sessionStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Token ${token}`;
        }
        return config;
    },
    err => {
        // return Promise.reject(err);
    });

// http response 拦截器
axios.interceptors.response.use(  //拦截返回报文的错误代码并作出响应
    response => {  
        // console.log("Good", response);
        return response;
    },
    err => {
        if (err.response) {
            console.log("Bad", err.response);
            switch (err.response.status) {
                case 500:
                case 401:
                case 403:
                    sessionStorage.removeItem('token');
                    console.log("redirect to Login", router.currentRoute);
                    if (router.currentRoute.path != '/login') {
                        // console.log(router.currentRoute.fullPath);
                        router.replace({
                            path: '/login',
                            query: {redirect: router.currentRoute.fullPath}
                        })
                    }
            }
        }
        // return Promise.reject(err.response.data)
    })

export const HTTP = axios;    //axios被打包成HTTP对象并export