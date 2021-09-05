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

    let formData = [];
    let loading = false;
    
    async function submitData() {
      loading = true
      let result = await Promise.all(formData.map(async ({name, ...keepAttrs}) => {
        console.log(keepAttrs)
        const { data, error } = await supabase
            .from('weekly_results')
            .update(keepAttrs)
            .eq('id', keepAttrs.id)
        if (error) throw new Error(error.message)
      }))
      loading = false;
    }
</script>

<section class="max-w-xl mx-auto p-4 flex flex-col gap-1">
{#each data as row}
<div class="grid grid-cols-7 bg-gray-100 border-2 border-gray-600 rounded-md px-2">
  <div class="row-span-2 self-center"><strong>{row.ranking}</strong></div>
  <div class="col-span-5"><strong>{row.name}</strong> ({row.pts} pts{#if row.first_place_votes > 0}, {row.first_place_votes} first place vote{#if row.first_place_votes > 1}s{/if}{/if})</div>
  <div class="row-span-2 self-center">{#if row.week !== 0}<strong>{row.prev_ranking}</strong>{/if}</div>
  <div class="col-span-5">{row.wins}-{row.losses} {#if row.week === 0} Last Season{/if}, {row.place} in {row.division}</div>
  <div class="col-span-7 border-t border-gray-600">Form area</div>
</div>
{/each}
</section>