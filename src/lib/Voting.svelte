<script>
    import { session } from '$app/stores';
    import supabase from '$lib/db'
    import { flip } from 'svelte/animate';
    import { onMount } from 'svelte';

    export let week;
    export let master_id;

    let submitted = false;
    let teams = []

    onMount(async () => {
      const { data, error } = await supabase
        .from('current_week_data')
        .select('name, id')
      if (error) throw new Error(error.message)
      teams = data
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

    let hovering = false;

  const drop = (event, target) => {
    event.dataTransfer.dropEffect = 'move'; 
    const start = parseInt(event.dataTransfer.getData("text/plain"));
    const newTracklist = teams

    if (start < target) {
      newTracklist.splice(target + 1, 0, newTracklist[start]);
      newTracklist.splice(start, 1);
    } else {
      newTracklist.splice(target, 0, newTracklist[start]);
      newTracklist.splice(start + 1, 1);
    }
    teams = newTracklist
    hovering = null
  }

  const dragstart = (event, i) => {
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.dropEffect = 'move';
    const start = i;
    event.dataTransfer.setData('text/plain', start);
  }
</script>

{#if !submitted}
<h1 class="text-center text-xl">Vote for {#if week === 0}Preseason{:else}Week {week}{/if} Power Rankings</h1>
<div class="grid grid-cols-1 justify-center justify-items-center gap-y-1">
    {#each teams as n, index  (n.name)}
      <div class="w-4/5 text-center bg-gray-100 border-2 border-gray-600 rounded-md hover:bg-gray-800 hover:text-white"
         animate:flip
         draggable={true} 
         on:dragstart={event => dragstart(event, index)}
         on:drop|preventDefault={event => drop(event, index)}
         ondragover="return false"
         on:dragenter={() => hovering = index}
         class:is-active={hovering === index}>
         {n.name}	
      </div>
    {/each}
    <button on:click={submitVote} class="inline-block text-sm px-4 py-2 leading-none border border-gray-600 rounded hover:text-white hover:bg-gray-600 mt-4 lg:mt-0">Submit Vote</button>
</div>


{:else}
<h1 class="text-center text-xl">Thanks for voting! Check back soon for this week's rankings.</h1>
{/if}