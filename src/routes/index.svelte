<script>
    import { session } from '$app/stores';

    import supabase from '$lib/db'

    async function signOut() {
        const { error } = await supabase.auth.signOut()
    }
</script>

<button on:click={signOut}>Sign Out</button>

<h1>Teams</h1>

{#if $session?.user}
Gated Content Here
{/if}

