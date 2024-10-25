<script lang="ts">
    import MsgComp from "./msg.svelte";
    import type { Msg } from "./our_types";
    import { onMount, tick } from "svelte";
    import autosize from "svelte-autosize";

    let the_textarea: HTMLTextAreaElement;
    let llm: AILanguageModel;
    let the_input = "";
    let messages: Msg[] = [
        //{
        //    role: "user",
        //    content: "hey",
        //},
        //{
        //    role: "bot",
        //    content: `this is some very long ai output  asdkt laskdf alks dfka sdkfl
        //        asdflk alsdf this is some very long ai output  asdkt laskdf alks
        //        asdflk alsdf this is some very long ai output  asdkt laskdf alks
        //        dfka sdkfl asdflk alsdf`,
        //},
    ];
    let status: "idle" | "busy" = "idle";

    onMount(async () => {
        if (typeof window === "undefined") {
            return;
        }

        llm = await window.ai.languageModel.create({});
        0;
    });

    function scroll_to_bottom() {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth",
        });
    }

    function onKey(e: KeyboardEvent) {
        if (e.key !== "Enter") {
            return;
        }

        go();
    }

    async function go() {
        if (the_input.trim().length === 0) {
            return;
        }

        status = "busy";

        const user_msg: Msg = {
            role: "user",
            content: the_input,
        };

        messages = [...messages, user_msg];

        the_input = "";

        const bot_msg: Msg = {
            role: "bot",
            content: "",
        };

        messages = [...messages, bot_msg];

        const stream = llm.promptStreaming(user_msg.content);

        for await (const chunk of stream) {
            const msg = messages.at(-1)!;
            msg.content = chunk;
            messages = messages;

            await tick();
            scroll_to_bottom();
        }

        status = "idle";

        await tick();
        the_textarea?.focus();
    }
</script>

<div class="max-w-lg mx-auto pt2">
    <div class="space-y-2">
        {#each messages as msg}
            {#if msg.content.length > 0}
                <MsgComp {msg} />
            {/if}
        {/each}
    </div>

    {#if status === "idle"}
        <fieldset disabled={status === "busy"} class="mt-6">
            <textarea
                bind:this={the_textarea}
                use:autosize
                bind:value={the_input}
                on:keydown={onKey}
                rows="1"
                autofocus
                placeholder="Message"
                class="bg-transparent border-white border-op50 border-b-1
            outline-none pb2 w-[calc(80%_+_20px)] px10px mx-auto block"
            ></textarea>
        </fieldset>
    {/if}
</div>
