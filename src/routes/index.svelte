<script>
    import { session } from '$app/stores';

    import supabase from '$lib/db'
</script>

<h1>Teams</h1>

{#if $session?.user}
Gated Content Here
{/if}

