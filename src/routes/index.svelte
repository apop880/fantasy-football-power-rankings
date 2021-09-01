<script>
    import supabase from '$lib/db'
    async function getData() {
      const { data, error } = await supabase.from('teams').select()
      console.log(data)
      if (error) throw new Error(error.message)
      
      return data
  }
</script>

<h1>Teams</h1>

{#await getData()}
  <p>Fetching data...</p>
{:then data}
  {#each data as team}
    <li>{team.name}</li>
  {/each}
{:catch error}
  <p>Something went wrong while fetching the data:</p>
  <pre>{error}</pre>
{/await}
