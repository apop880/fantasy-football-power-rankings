<script>
    import { session } from '$app/stores';

    import supabase from '$lib/db'

    async function getRole() {
        const { data, error } = await supabase
        .from('user_access')
        .select('role')
        .eq('id', $session.user.id)
        if (error) throw new Error(error.message)
        return data[0]['role']
    }

    async function signOut() {
        const { error } = await supabase.auth.signOut()
    }
</script>

<nav class="flex items-center flex-wrap justify-around bg-green-800 p-6">
    <div class="flex items-center flex-no-shrink text-white mr-6">
    
      <img alt="football" src="data:image/png;base64,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"/>
      <a href="/"> <span class="font-semibold text-xl tracking-tight">The Dynasty League</span>
    </a>
    </div>
    {#if $session?.user}
    <div>
    {#await getRole() then role}
        {#if role > 0}
        <a href="/editor" class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-blue-900 hover:bg-white mt-4 lg:mt-0">Editor</a>
        {/if}
        {#if role === 2}
        <a href="/admin" class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-blue-900 hover:bg-white mt-4 lg:mt-0">Admin</a>
        {/if}
    {/await}
    <button on:click={signOut} class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-blue-900 hover:bg-white mt-4 lg:mt-0">Sign Out</button>
    </div>
    {/if}
</nav>