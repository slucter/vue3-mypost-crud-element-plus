<template>
    <mp-dialog title="Login">
        <el-form
            label-position="top"
            label-width="100px"
            :model="form"
        >
            <el-form-item label="User Id">
                <el-input placeholder="type = 1" v-model="form.id" />
            </el-form-item>
            <el-form-item label="Email">
                <el-input placeholder="type Sincere@april.biz" type="email" v-model="form.email" />
            </el-form-item>
            <el-space :size="15">
                <el-button 
                    type="primary" 
                    size="large"
                    @click="submitLogin"    
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
import { reactive } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
    components: { MpDialog },
    setup () {
        let form = reactive({
            id: '',
            email: ''
        })
        const store = useStore()
        const router = useRouter()

        const submitLogin = async () => {
            try {
                let user = (await store.dispatch('global/getUserLogin', form))
                localStorage.setItem('userMyPost', JSON.stringify(user[0]))
                router.go()
            } catch (error) {
                alert(error)
            }
        }
        return {
            form,
            submitLogin
        }
    }
}
</script>

<style lang="scss" scoped>

</style>