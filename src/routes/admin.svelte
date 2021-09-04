<script>
    import supabase from '$lib/db'

    let formData = [];
    let loading = false;

    async function getData() {
      let { data, error } = await supabase
      .from('fill_week')
      .select()
      if (error) throw new Error(error.message)
      formData = data
      return
    }

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

<div class="flex items-center justify-center h-screen">
  <div class="bg-gray-800 flex flex-col w-2/3 border border-gray-900 rounded-lg px-8 py-10">
  <div class="text-white mt-10">
    <h1 class="font-bold text-4xl">Fill Week Data</h1>
  </div>
  <form use:getData class="flex flex-col space-y-8 mt-10 text-white">
    {#if formData.length === 0}No Data to Display
    {:else}
    <table class="table-auto border-solid border border-light-blue-500">
      <thead>
        <tr>
          <th class="border-solid border border-light-blue-500">Team</th>
          <th class="border-solid border border-light-blue-500">Wins</th>
          <th class="border-solid border border-light-blue-500">Losses</th>
          <th class="border-solid border border-light-blue-500">Points</th>
          <th class="border-solid border border-light-blue-500">Division</th>
          <th class="border-solid border border-light-blue-500">Place</th>
        </tr>
      </thead>
      <tbody>
        {#each formData as team, i}
        <tr>
          <td class="border-solid border border-light-blue-500 text-center">{team.name}</td>
          <td class="border-solid border border-light-blue-500 text-center">
            <input class="text-gray-700 w-14" type=number bind:value={formData[i].wins} />
          </td>
          <td class="border-solid border border-light-blue-500 text-center">
            <input class="text-gray-700 w-14" type=number bind:value={formData[i].losses} />
          </td>
          <td class="border-solid border border-light-blue-500 text-center">
            <input class="text-gray-700 w-14" type=number bind:value={formData[i].points} />
          </td>
          <td class="border-solid border border-light-blue-500 text-center">
            <input class="text-gray-700 w-24" bind:value={formData[i].division} />
          </td>
          <td class="border-solid border border-light-blue-500 text-center">
            <input class="text-gray-700 w-14" type=number bind:value={formData[i].place} />
          </td>
        </tr>
        {/each}
      </tbody>
    </table>
    {/if}
    <button disabled={loading} on:click|preventDefault="{submitData}" type="submit" class="border border-blue-500 bg-blue-500 text-white rounded-lg py-3 font-semibold">
      Submit
    </button>
  </form>
</div>
</div>