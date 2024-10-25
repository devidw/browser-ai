<script lang="ts">
    import "uno.css";
    import "@unocss/reset/tailwind.css";
</script>

<slot />

<style>
    :global(body) {
        --at-apply: "bg-black text-white";
    }
</style>
