<template>
    <div id="login">
        <Tabs>
            <Tab-pane label="登录">
                <Form ref="formLogin" :model="formLogin" :rules="ruleAuth">
                    <Form-item prop="username">
                        <Input type="text" v-model="formLogin.username" placeholder="用户名">
                           <Icon type="ios-person-outline" slot="prepend"></Icon>
                        </Input>
                    </Form-item>
                    <Form-item prop="password">
                        <Input type="password" v-model="formLogin.password" placeholder="密码">
                           <Icon type="ios-locked-outline" slot="prepend"></Icon>
                        </Input>
                    </Form-item>

                    <Form-item>
                        <Button type="primary" @click="handleSubmit('formLogin')" long>登录</Button>
                    </Form-item>
                </Form>
            </Tab-pane>
            <Tab-pane label="注册">
                <Form ref="formRegister" :model="formRegister" :rules="ruleAuth">
                    <Form-item prop="username">
                        <Input type="text" v-model="formRegister.username" placeholder="用户名">
                           <Icon type="ios-person-outline" slot="prepend"></Icon>
                        </Input>
                    </Form-item>
                    <Form-item prop="password">
                        <Input type="password" v-model="formRegister.password" placeholder="密码">
                           <Icon type="ios-locked-outline" slot="prepend"></Icon>
                        </Input>
                    </Form-item>

                    <Form-item>
                        <Button type="primary" @click="handleSubmit('formRegister')" long>注册</Button>
                    </Form-item>
                </Form>
            </Tab-pane>
        </Tabs>
<!--         <Modal v-model="modalAuth" @on-ok="handleSubmit(authState)" title="请登录">
            <Form ref="formAuth" :model="formAuth" :label-width="80" :rules="ruleAuth" inline>
                <Form-item prop="username">
                    <Input type="text" v-model="formAuth.username" placeholder="用户名">
                       <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </Form-item>
                <Form-item prop="password">
                    <Input type="password" v-model="formAuth.password" placeholder="密码">
                       <Icon type="ios-locked-outline" slot="prepend"></Icon>
                    </Input>
                </Form-item>

                <Form-item>
                    <Button type="primary" @click="handleSubmit('login')">登录</Button>
                    <Button type="ghost" @click="handleSubmit('register')" style="margin-left: 8px">注册</Button>
                </Form-item>
            </Form>
        </Modal> -->
    </div>
</template>

<script>
    import {HTTP} from '../http-common';
    import bus from '../assets/eventBus';

    export default {
        data() {
            return {
                // modalAuth: false,
                // login: true,
                authState: '',
                user: '',
                // formLogin: {
                //     username:'miaoji',
                //     password:'juiojo'
                // },
                formLogin: {
                    username:'',
                    password:''
                },
                formRegister: {
                    username:'',
                    password:''
                },
                ruleAuth: {
                    username: [
                        { required: true, message: '请填写用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请填写密码', trigger: 'blur' },
                        { type: 'string', min: 5, message: '密码长度不能小于6位', trigger: 'blur' }
                    ]
                }
            }
        },
        created() {
            
        },
        methods: {
            login() {
                console.log('LOGIN:', this.formLogin);
                HTTP.post(`users/login`, this.formLogin)
                .then(res => {
                    var token = res.data.token
                    sessionStorage.setItem('token', res.data.token);
                    sessionStorage.setItem('username', this.formLogin.username);
                    this.$Message.success('登录成功!');
                    this.user = this.formLogin.username;
                    var redirect = this.$router.currentRoute.query &&
                        this.$router.currentRoute.query.redirect;
                    console.log('QUERY?', redirect)
                    if (redirect) {
                        this.$router.push(redirect)
                    } else {
                        this.$router.push('/')
                    }
                    bus.$emit('loginEvent', this.user);
                })
                .catch(e => {
                    this.$Message.error('登录失败!');
                    this.errors.push(e)
                })
            },
            register() {
                console.log('REGISTER:', this.formRegister);
                HTTP.post(`users/register`, this.formRegister)
                .then(res => {
                    console.log('REGISTER:', res.data);
                    this.$Message.success('注册成功!');
                    this.$router.push('/');
                })
                .catch(e => {
                    this.$Message.error('注册失败!');
                    this.errors.push(e)
                })
            },
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    console.log('Valid?', valid, name);
                    if (valid) {
                        this.$Message.success('提交成功!');
                        if (name == 'formLogin') {
                            console.log('Click Login!')
                            this.login();
                        } else if (name == 'formRegister') {
                            console.log('Click Register!')
                            this.register();
                        }
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            }
        }
    }
</script>

<style type="text/css">
    #login {
        width: 300px;
        margin: 100px auto;
    }
    /**{margin: 0; padding: 0}*/
/*    fieldset{
        width: 300px;
        padding: 30px;
        margin: 100px auto;
    }
    fieldset p{
        line-height: 50px;
        text-align: center;
    }
    fieldset input[type = "button"]{
        padding-left: 5px;
        padding-right: 5px;
    }*/
</style>
