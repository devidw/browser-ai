<script lang="ts">
    import type { Msg } from "./our_types";
    import SvelteMarkdown from "svelte-markdown";

    export let msg: Msg;
</script>

<div
    class="msg rounded-2xl px5 py3 {msg.role === 'user'
        ? 'w-90% mx-auto'
        : 'bg-stone-7'}"
>
    {#if msg.role === "bot"}
        <SvelteMarkdown source={msg.content} />
    {:else}
        {msg.content}
    {/if}
</div>

<style>
    :global(.msg p),
    :global(.msg ul) {
        --at-apply: "mt-2";
    }

    :global(.msg li) {
        list-style-type: "- ";
        --at-apply: "mt1 ml4";
    }
</style>
