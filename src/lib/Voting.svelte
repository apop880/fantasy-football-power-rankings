<script>
    import { session } from '$app/stores';
    import supabase from '$lib/db'
    import { onMount } from 'svelte';
    import DragDrop from "svelte-dragdroplist";

    export let week;
    export let master_id;

    let submitted = false;
    let teams = []

    onMount(async () => {
      const { data, error } = await supabase
        .from('current_week_data')
        .select('name, id, wins, losses, points, division, place')
      if (error) throw new Error(error.message)
      teams = data.map(x => ({...x, html: `${x.name} (${x.wins}-${x.losses}, ${x.place} in ${x.division}`}))
      console.log(teams)
    })

    async function submitVote() {
        let result = []
        teams.forEach((team, index) => {
            result[index] = {}
            result[index]['submitted_by'] = $session.user.id
            result[index]['team_rank'] = 10-index
            result[index]['team_id'] = team['id']
            result[index]['master_id'] = master_id
        })
        const { data, error } = await supabase
            .from('voting_results')
            .insert(result)
        if (error) throw new Error(error.message)
        submitted = true;
    }


</script>

{#if !submitted}
<h1 class="text-center text-xl">Vote for {#if week === 0}Preseason{:else}Week {week}{/if} Power Rankings</h1>
<h2 class="text-center text-lg">Drag and Drop to Rank Teams</h2>
<div class="max-w-xl mx-auto flex flex-col gap-2 justify-center justify-items-center">
     <DragDrop bind:data={teams} />
    <button on:click={submitVote} class="inline-block text-sm px-4 py-2 leading-none border border-gray-600 rounded hover:text-white hover:bg-gray-600 mt-4 lg:mt-0">Submit Vote</button>
</div>


{:else}
<h1 class="text-center text-xl">Thanks for voting! Check back soon for this week's rankings.</h1>
{/if}