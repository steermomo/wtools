<template>
<div class="app">
    <div>
        <v-card>
            <v-tabs bg-color="teal-darken-3" slider-color="teal-lighten-3" show-arrows>
                <v-tab to="/">Home</v-tab>
                <v-tab to="/image-processor">水印二向箔</v-tab>
            </v-tabs>
        </v-card>

        <router-view />
    </div>

    <v-footer class="text-center d-flex flex-column fixed-bottom bg-slate-100" style="padding: 10px;">

        <div class="pt-0 underline bg-clip-border bg-slate-100 rounded-sm">
            Better Call Saul
        </div>

        <v-divider></v-divider>

        <div>
            {{ new Date().getFullYear() }} — <strong>Steer</strong>
        </div>
    </v-footer>
</div>
</template>

<script>
export default {
    name: 'App',
};
</script>

<style>
.app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    display: grid;
    grid-template-rows: 1fr auto;
    min-height: 100vh;
    /* margin-top: 10px; */
}
</style>
