<script>
    import { page, session } from '$app/stores';
    import { supabase } from '$lib/db';
    import { setAuthCookie, unsetAuthCookie } from '$lib/utils/session';

    // this should run on every page so I put this code in my `__layout.svelte` file
    supabase.auth.onAuthStateChange(async (event, _session) => {
    if (event !== 'SIGNED_OUT') {
        session.set({ user: _session.user });
        await setAuthCookie(_session);
    } else {
        session.set({ user: { guest: true } });
        await unsetAuthCookie();
    }
    });
</script>

<main>
    {#if $page.query.get('magic_link')}
        <span style="text-align: center;">Check your email for login link!</span>
    {/if}
    <slot />
</main>