<template>
    <v-btn 
        variant="tonal"
        class="button"
        @click="toAdmin()"
    >
        后台管理
    </v-btn>
</template>

<script>
export default {
    methods: {
        toAdmin() {
            this.$router.push('/admin');
        }
    }
}
</script>

<style>
.button{
    position: absolute;
    bottom: 5vh;
    right: 20px;
}
</style>