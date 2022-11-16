<script lang="ts">
    export let sidebarType: string;

    const data = {
        AddComputer : {
            title : "Add computer",
            button: "Add"
        },
        EditComputer: {
            title: "Edit computer",
            button: "Save"
        },
        RemoveComputer:{
            title: "Remove Computer",
            button: "Remove"
        }
    }
</script>

<div class="flex flex-col justify-between w-80 bg-gray-600 px-4 absolute top-0 right-0 h-full drop-shadow-2xl">
    <div class="flex flex-col">
        <h2>
            {#if sidebarType == "add"}
                {data.AddComputer.title}
            {/if}
            {#if sidebarType == "edit"}
                {data.EditComputer.title}
            {/if}
            {#if sidebarType == "remove"}
                {data.RemoveComputer.title}
            {/if}
        </h2>
    </div>
    <div class="flex flex-row justify-between py-4">
        <button>
            {#if sidebarType == "add"}
                {data.AddComputer.button}
            {/if}
            {#if sidebarType == "edit"}
                {data.EditComputer.button}
            {/if}
            {#if sidebarType == "remove"}
                {data.RemoveComputer.button}
            {/if}
        </button>
        <button>Cancel</button>
    </div>
</div>