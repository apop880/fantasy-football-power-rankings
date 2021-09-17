<script context="module">
  import supabase from '$lib/db'

  export async function load({ error, status }) {
    let { data, err } = await supabase
      .from('final_results')
      .select()
      .eq('complete', false)
		return {
			props: {
				data: data
			}
		};
	}
</script>

<script>
    export let data

    let loading = false;
    
    async function submitData() {
      loading = true
      let result = await Promise.all(data.map(async ({result_id, description, ...dropAttrs}) => {
        const { data, error } = await supabase
            .from('weekly_results')
            .update({description})
            .eq('id', result_id)
        if (error) throw new Error(error.message)
      }))
      loading = false;
    }
</script>

<section class="max-w-xl mx-auto p-4 flex flex-col gap-1">
{#each data as row, i}
<div class="grid grid-cols-7 bg-gray-100 border-2 border-gray-600 rounded-md px-2">
  <div class="row-span-2 self-center"><strong>{row.ranking}</strong></div>
  <div class="col-span-5"><strong>{row.name}</strong> ({row.pts} pts{#if row.first_place_votes > 0}, {row.first_place_votes} first place vote{#if row.first_place_votes > 1}s{/if}{/if})</div>
  <div class="row-span-2 self-center inline-flex font-bold">
  {#if row.week !== 0}
  {#if row.prev_ranking === row.ranking}-
  {:else if row.prev_ranking > row.ranking}
  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
  </svg>
  {row.prev_ranking - row.ranking}
  {:else}
  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
  </svg>
  {row.ranking - row.prev_ranking}
  {/if}
  {/if}</div>
  <div class="col-span-5">{row.wins}-{row.losses}{#if row.week === 0}&nbsp;Last Season{/if}, {row.place} in {row.division}</div>
  <div class="col-span-7 border-t border-gray-600"><textarea rows="6" placeholder="Team Description" class="border border-gray-500 mt-2 rounded-md w-full p-2" bind:value="{row.description}"></textarea></div>
</div>
{/each}
<button disabled={loading} on:click|preventDefault="{submitData}" type="submit" class="border border-blue-500 bg-blue-500 text-white rounded-lg py-3 font-semibold">
  Submit
</button>
</section>