<script setup>
import { ref } from 'vue'
import useUserInfoStore from '@/stores/userInfo.js';
import { useTokenStore } from '@/stores/token';
const tokenStore = useTokenStore()
const userInfoStore = useUserInfoStore()
const userInfo = ref({...userInfoStore.info})
const rules = {
    old_pwd: [
        { required: true, message: '请输入原密码', trigger: 'blur' },
        {
            pattern: /^\S{2,10}$/,
            message: '原密码必须是2-10位的非空字符串',
            trigger: 'blur'
        }
    ],
    new_pwd: [
        { required: true, message: '请输入新密码', trigger: 'blur' },
        {
            pattern: /^\S{2,10}$/,
            message: '新密码必须是2-10位的非空字符串',
            trigger: 'blur'
        }
    ],
    re_pwd: [
        { required: true, message: '请输入确认密码', trigger: 'blur' },
        {
            pattern: /^\S{2,10}$/,
            message: '确认密码必须是2-10位的非空字符串',
            trigger: 'blur'
        }
    ]
}

// 调用接口更新用户密码
import { userPasswordResetService } from '@/api/user.js';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router'
const router = useRouter()
const updatePassword = async () => { 
    let result = await userPasswordResetService(userInfo.value)
    ElMessage.success(result.msg ? result.msg : '更新用户密码成功');
    // 更新pinia中的用户信息
    userInfoStore.setInfo(userInfo.value)
    // 密码设置成功，跳转到登录页面
    // tokenStore.removeToken()
    router.push('/login')

}
</script>
<template>
    <el-card class="page-container">
        <template #header>
            <div class="header">
                <span>基本资料</span>
            </div>
        </template>
        <el-row>
            <el-col :span="12">
                <el-form :model="userInfo" :rules="rules" label-width="100px" size="large">
                    <el-form-item label="原密码" prop="old_pwd">
                        <el-input v-model="userInfo.old_pwd" type="password"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码" prop="new_pwd" >
                        <el-input v-model="userInfo.new_pwd" type="password"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="re_pwd">
                        <el-input v-model="userInfo.re_pwd" type="password"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="updatePassword">提交修改</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </el-card>
</template>