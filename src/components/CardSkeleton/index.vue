<template>
    <el-card shadow="hover">
        <el-row :gutter="20" class="no-mobile">
            <el-col :xs="100" :sm="8" :md="5">
               <el-skeleton-item variant="image" class="w-full h-full" />
            </el-col>
            <el-col :xs="100" :sm="12" :md="10">
                <el-space :size="10" wrap>
                    <el-skeleton-item variant="text" style="width: 100px; height: 20px"/>
                    <el-skeleton-item variant="text" style="width: 500px; height: 20px"/>
                    <el-skeleton-item variant="text" style="width: 120px; height: 20px"/>
                    <el-skeleton-item variant="text" style="width: 120px; height: 20px"/>
                    <el-skeleton-item variant="text" style="width: 120px; height: 20px"/>
                    <el-skeleton-item variant="text" style="width: 120px; height: 20px"/>
                </el-space>
            </el-col>
            <el-col :xs="100" :sm="4" :md="9" class="d-flex justify-end items-center">
                <el-space :size="15">
                    <el-skeleton-item variant="circle" />
                    <el-skeleton-item variant="circle" />
                    <el-skeleton-item variant="circle" />
                </el-space>
            </el-col>
        </el-row>
        <el-row :gutter="20" class="no-destop mobile-gap">
            <el-col :xs="100" :sm="8" :md="5">
               <el-skeleton-item variant="image" class="w-full" style="height: 200px" />
            </el-col>
            <el-col :xs="100" :sm="12" :md="10">
                <el-space :size="10" wrap>
                    <el-skeleton-item variant="text" style="width: 100px; height: 20px"/>
                    <el-skeleton-item variant="text" style="width: 200px; height: 20px"/>
                    <el-skeleton-item variant="text" style="width: 170px; height: 20px"/>
                    <el-skeleton-item variant="text" style="width: 220px; height: 20px"/>
                    <el-skeleton-item variant="text" style="width: 160px; height: 20px"/>
                    <el-skeleton-item variant="text" style="width: 140px; height: 20px"/>
                </el-space>
            </el-col>
            <el-col :xs="100" :sm="4" :md="9" class="d-flex justify-end items-center">
                <el-space :size="15">
                    <el-skeleton-item variant="circle" />
                    <el-skeleton-item variant="circle" />
                    <el-skeleton-item variant="circle" />
                </el-space>
            </el-col>
        </el-row>
    </el-card>
</template>

<script>
export default {
    name: 'CardSkeleton',
    setup () {
        

        return {}
    }
}
</script>

<style lang="scss" scoped>

</style>