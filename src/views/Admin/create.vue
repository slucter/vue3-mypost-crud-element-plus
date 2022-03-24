<template>
    <mp-dialog title="Create Post">
        <el-form
            ref="ruleFormRef"
            label-position="top"
            label-width="100px"
            :model="form"
            :rules="rules"
        >
            <el-form-item label="Title" prop="title">
                <el-input v-model="form.title" />
            </el-form-item>
            <el-form-item label="Body" prop="body">
                <el-input type="textarea" v-model="form.body" />
            </el-form-item>
            <el-space :size="15">
                <el-button @click="submit(ruleFormRef)" type="primary" size="large">
                    Submit
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

export default {
    components: { MpDialog },
    setup () {
        const ruleFormRef = ref(null)
        let form = reactive({
            userId: '',
            title: '',
            body: ''
        })
        let rules = reactive({
            title: [
                {
                    required: true,
                    message: 'Field Is Required',
                    trigger: 'blur'
                }
            ],
            body: [
                {
                    required: true,
                    message: 'Field Is Required',
                    trigger: 'blur'
                }
            ]
        })
        let store = useStore()

        const submit = async (elmref) => {
            if (!elmref) return
            await elmref.validate(async (valid, fields) => {
                if (valid) {
                    form.userId = (JSON.parse(localStorage.userMyPost)).id
                    try {
                        await store.dispatch('global/createPost', form)
                        ElNotification({
                            title: 'Success',
                            message: `Success Creating Post`,
                            type: 'success',
                        })
                    } catch (error) {
                        alert(error)
                    }
                }
            })
        }
        return {
            form,
            submit,
            ruleFormRef,
            rules
        }
    }
}
</script>

<style lang="scss" scoped>

</style>