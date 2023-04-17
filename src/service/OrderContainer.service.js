import axios from "axios";
import React from "react";
import jwt_decode from 'jwt-decode'
import { setInfoClient } from "../store/Module.action";
axios.defaults.withCredentials = true;
class OrderContainerService extends React.Component {
    constructor(props) {
        super(props);
        const url = 'http://localhost:8080/api'
        this.apiUrl = url;
        this.axiosJwt = axios.create();
        this.axiosJwt.interceptors.request.use(
            async (config) => {
                let date = new Date();
                const decodedToken = jwt_decode(localStorage.getItem("USER_KEY"));
                if (decodedToken.exp < date.getTime() / 1000) {
                    const data = await this.refreshToken();
                    this.state = {
                        token: data.data.access_token,
                    }
                    config.headers['Authorization'] = 'Bearer ' + data?.data?.access_token
                } else {
                    config.headers['Authorization'] = 'Bearer ' + localStorage.getItem("USER_KEY");
                    console.log('Bearer ' + localStorage.getItem("USER_KEY"));
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        )
    }

    componentDidMount() {

    }

    async getAllProduct(page) {
        const data = await axios.get( this.apiUrl +"/book/get?page=" + page)
        return data;
    }

    async refreshToken() {
        const data = axios.post(this.apiUrl + '/refresh');
        return data;
    }
    async cancelBill(id, status) {
        var params = new URLSearchParams();
        params.append("id", id + '');
        params.append("status", status + '');
        var request = {
            id: id + '',
            status: status + ''
        };
        const data = await this.axiosJwt.put(this.apiUrl + "/order/update", {id: id, status: status});
        return data;
    }

    async updateUser(user) {
        try {
            const data = await this.axiosJwt.put(this.apiUrl + "/update", user);
            return data;
        } catch (error) {
            console.log(error.response);
        }

    }

    async orderBook(data) {
        try {
            const dt = await
                this.axiosJwt
                    .post(this.apiUrl + '/order/book', data);
            return dt;
        } catch (error) {
            console.log(error);
        }
        // return dt;
    }

    async postRate(data) {
        try {
            const dt = await this.axiosJwt.post(this.apiUrl + "/rating/post", data)
            return dt;
        }catch(e) {

        }
    }

    async getRate(id) {
        try {
            const dt = await this.axiosJwt.get(this.apiUrl + "/rating/get/", id)
            return dt;
        }catch(e) {

        }
    }

    async booking(data) {
        try {
            const dt = await
                this.axiosJwt
                    .post(this.apiUrl + '/table',
                        data);
            return dt;
        } catch (error) {
            return error.response;
            console.log(error.response);
        }
    }
    async login(data) {
        const dt = await
            axios
                .post(this.apiUrl + '/login',
                    new URLSearchParams({
                        email: data?.email,
                        password: data?.password
                    }), {
                    withCredentials: true
                })

        return dt;
    }
    async signup(data) {
        const dt = await
            axios
                .post(this.apiUrl + '/save',
                    data)

        return dt;
    }

    async getOrder(id) {
        try {
            const dt = await this.axiosJwt.get(this.apiUrl + '/order/get');
            return dt;
        } catch (error) {
            return error.response;
        }
    }

    async getCommentBook(id) {
        try {
            const dt = await this.axiosJwt.get(this.apiUrl + "/rating/get/" + id);
            return dt;
        } catch (e) {
            return e;
        }
    }

    async getBook() {
        try {
            const dt = await this.axiosJwt.get(this.apiUrl + '/table/book');
            return dt;
        } catch (error) {
            return error.response;
        }
    }

    async forgetPass(email) {
        try {
            const dt = await axios.put(this.apiUrl + '/forget-password?email=' + email );
            console.log(dt);
            return dt;  
        } catch (error) {
            return error.response;
        }
    }

    async getOneBook(id) {
        const data = await this.axiosJwt.get(this.apiUrl + "/book/get/" + id);
        return data;
    }

    async getMe() {
        const data = await this.axiosJwt.get(this.apiUrl + "/me");
        return data;
    }

    async getOneOrderById(id) {
        const data = await this.axiosJwt.get(this.apiUrl + "/order/get/" + id);
        return data;
    }

    storeToRedux(data) {
        const dispatch = this.props;
        const dd = this.props;
        dispatch(setInfoClient({ ...dd, access_token: data }));
    }

}

export default OrderContainerService

