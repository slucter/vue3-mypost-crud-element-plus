<template>
    <mp-dialog title="Create Post">
        <el-form
            label-position="top"
            label-width="100px"
            :model="form"
        >
            <el-form-item label="Title">
                <el-input v-model="form.id" />
            </el-form-item>
            <el-form-item label="Pos">
                <el-input type="textarea" v-model="form.email" />
            </el-form-item>
            <el-space :size="15">
                <el-button type="primary" size="large">
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
import { reactive } from 'vue'
export default {
    components: { MpDialog },
    setup () {
        let form = reactive({
            id: '',
            email: ''
        })

        return {
            form
        }
    }
}
</script>

<style lang="scss" scoped>

</style>