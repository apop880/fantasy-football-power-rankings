<script>
    import { onMount } from 'svelte'
    import supabase from '$lib/db'

    let teams = []

    onMount(async () => {
      let { data, err } = await supabase
        .from('final_results')
        .select()
        .eq('week', 1)
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
  <div class="row-span-2 self-center">{#if row.week !== 0}<strong>{row.prev_ranking}</strong>{/if}</div>
  <div class="col-span-5">{row.wins}-{row.losses}{#if row.week === 0}&nbsp;Last Season{/if}, {row.place} in {row.division}</div>
  <div class="col-span-7 border-t border-gray-600 pt-1 pb-1 mt-1">{row.description}</div>
</div>
{/each}
</section>