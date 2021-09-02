<script>
    import Nav from '$lib/Nav.svelte'

    import "../app.postcss"
    import supabase from '$lib/db'
    import { session } from '$app/stores'
    import { browser } from '$app/env'
    import { goto } from '$app/navigation'

    if(browser) {
      $session = supabase.auth.session()
      $session ? goto('/') : goto('/signin')
      supabase.auth.onAuthStateChange((event, s) => {
        $session = s
        $session ? goto('/') : goto('/signin')
      })
    }
</script>

<Nav />

<slot />