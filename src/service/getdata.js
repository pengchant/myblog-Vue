import qs from 'qs';
import axios from 'axios';
import mconfig from '../common/config';
import { Loading } from 'element-ui';
import mylocalstorage from '../common/localstorage'

// 封装请求方法
async function formateReq(url = '', data = {}, type = "GET") {
    return new Promise((resolve, reject) => {
        // 模态框: loadingInstance
        let loadingInstance = null;

        // 1.创建实例
        const instance = axios.create({
            timeout: 15000
        });

        // 2.设置request拦截器
        instance.interceptors.request.use(
            config => { 
                // TODO: loading
                loadingInstance = Loading.service({ fullscreen: true });
                let token = localStorage.getItem("x-auth-token"); 
                if (token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
                    config.headers.token = `${token}`;
                }  
                return config;
            },
            err => {
                return Promise.reject(err);
            }
        );

        // 3.返回数据拦截器
        instance.interceptors.response.use(res => { 
            // TODO:隐藏loading 
            if (loadingInstance !== null) {
                loadingInstance.close();
            } 
            let req_url = res.request.responseURL || ""; 
            if(req_url.indexOf("login")!== -1 && res.data.ok==true){ 
                // 设置localstorage 
                mylocalstorage.set("x-auth-token", res.data.data.token||""); 
            } 
            return res;
        });

        // 4. 请求处理
        type = type.toUpperCase();
        url = mconfig.url + url; 
        // 若为get请求需要封装请求参数
        if (type === "GET") {
            let dataStr = "";
            Object.keys(data).forEach(key => {
                dataStr += key + "=" + data[key] + '&';
            });
            if (dataStr !== '' && dataStr.indexOf("?") === -1) {
                dataStr = dataStr.substr(0, dataStr.lastIndexOf("&"));
                url = url + "?" + dataStr;
            } else {
                url = url + "&" + dataStr;
            }
        } 
        instance({
            method: type,
            headers: {
                'content-Type': 'application/json;charset=UTF-8'
            },
            url: url,
            data: data // java后台
        }).then(r => { 
            loadingInstance.close();
            resolve(r);
        }).catch(e => { 
            loadingInstance.close();
            reject(e.message);
            // TODO: 提示错误
        });
    });
}


const MyHttp = {
    get: async (url, data) => formateReq(url, data, 'GET'),
    post: async (url, data) => formateReq(url, data, 'POST'),
    put: async (url, data) => formateReq(url, data, 'PUT'),
    patch: async (url, data) => formateReq(url, data, 'PATCH'),
    delete: async (url, data) => formateReq(url, data, 'DELETE')
}

export default MyHttp;


