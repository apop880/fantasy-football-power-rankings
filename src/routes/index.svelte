<script>
    import { session } from '$app/stores'
    import supabase from '$lib/db'
    import Voting from '$lib/Voting.svelte'
    import Results from '$lib/Results.svelte'

    async function getVoting() {
      const { data, error } = await supabase
        .from('pending_votes')
        .select('id, week, master_id')
        .eq('id', $session.user.id)
      if (error) throw new Error(error.message)

      return data
    }
</script>

{#if $session?.user}
<!--Begin Gated Content-->

<!--Voting block for current week-->
{#await getVoting()}
  <p>Loading...</p>
{:then data}
  {#if data.length === 1}
    <Voting week={data[0].week} master_id={data[0].master_id} />
  {/if}
{:catch error}
  <p>Something went wrong while fetching the data:</p>
  <pre>{error}</pre>
{/await}

<!--Previous results-->
<Results />
{/if}

