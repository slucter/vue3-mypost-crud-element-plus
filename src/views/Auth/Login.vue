<template>
    <mp-dialog title="Login">
        <el-form
            ref="ruleFormRef"
            label-position="top"
            label-width="100px"
            :model="form"
            :rules="rules"
        >
            <el-form-item label="User Id" prop="id">
                <el-input placeholder="type = 1" v-model="form.id" />
            </el-form-item>
            <el-form-item label="Email" prop="email">
                <el-input placeholder="type Sincere@april.biz" type="email" v-model="form.email" />
            </el-form-item>
            <el-space :size="15">
                <el-button 
                    type="primary" 
                    size="large"
                    @click="submitLogin(ruleFormRef)"    
                >
                    Login
                </el-button>
                <el-button type="default" size="large">
                    Cancel
                </el-button>
            </el-space>
        </el-form>
    </mp-dialog>
</template>

<script>
import MpDialog from '@/components/MpDialog/index.vue'
import { reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
    components: { MpDialog },
    setup () {
        const ruleFormRef = ref(null)
        let form = reactive({
            id: '',
            email: ''
        })
        let rules = reactive({
            id: [
                { required: true, message: 'Field Is Required', trigger: 'blur' },
            ],
            email: [
                { 
                    required: true, 
                    message: 'Field Is Required', 
                    trigger: 'blur' 
                },
                {
                    type: 'email',
                    required: true,
                    message: 'Please type valid email',
                    trigger: 'blur',
                },
            ],
        })
        const store = useStore()
        const router = useRouter()

        const submitLogin = async (elmref) => {
            if (!elmref) return
            await elmref.validate(async (valid, fields) => {
                if (valid) {
                    try {
                        let user = (await store.dispatch('global/getUserLogin', form))
                        localStorage.setItem('userMyPost', JSON.stringify(user[0]))
                        router.go()
                    } catch (error) {
                        alert(error)
                    }
                }
            })
        }
        return {
            form,
            submitLogin,
            rules,
            ruleFormRef
        }
    }
}
</script>

<style lang="scss" scoped>

</style>