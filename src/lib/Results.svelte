<script>
    import { onMount } from 'svelte'
    import supabase from '$lib/db'

    let teams = []

    onMount(async () => {
      let { data, err } = await supabase
        .from('final_results')
        .select()
        .eq('week', 2)
      teams = data
    })
</script>

<section class="max-w-xl mx-auto p-4 flex flex-col gap-2">
{#if teams.length === 0}
<h1 class="text-center text-xl">Check Back for Results on Thursday</h1>
{/if}
{#each teams as row, i}
<div class="grid grid-cols-7 bg-gray-100 border-2 border-gray-600 rounded-md px-2">
  <div class="row-span-2 self-center text-xl"><strong>{row.ranking}</strong></div>
  <div class="col-span-5"><strong>{row.name}</strong> ({row.pts} pts{#if row.first_place_votes > 0}, {row.first_place_votes} first place vote{#if row.first_place_votes > 1}s{/if}{/if})</div>
  <div class="row-span-2 self-center inline-flex font-bold">
  {#if row.week !== 0}
  {#if row.prev_ranking === row.ranking}&mdash;
  {:else if row.prev_ranking > row.ranking}
  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 fill-current text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
  </svg>
  {row.prev_ranking - row.ranking}
  {:else}
  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 fill-current text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
  </svg>
  {row.ranking - row.prev_ranking}
  {/if}
  {/if}</div>
  <div class="col-span-5">{row.wins}-{row.losses}{#if row.week === 0}&nbsp;Last Season{/if}, {row.place} in {row.division}</div>
  <div class="col-span-7 border-t border-gray-600 pt-1 pb-1 mt-1">{row.description}</div>
</div>
{/each}
</section>
