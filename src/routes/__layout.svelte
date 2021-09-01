<script>
    import { supabase } from '$lib/db'
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    const session = supabase.auth.session()

    let loading = false;
    let email;
    let password;

    async function signOut() {
        const { error } = await supabase.auth.signOut()
    }

    async function signIn() {
      loading = true;
      let { error } = await supabase.auth.signIn({
        email,
        password
      });
      if (error) {
        loading = false;
        alert(error);
        return;
      }
      let redirect = '/';
      if (!password) {
        redirect = `${redirect}?magic_link=true`;
      }
      goto(redirect);
    }
</script>
  

<main>
    {#if session?.user?.id}<a href="#" on:click={signOut}>Sign Out</a><slot />
    {:else if $page.query.get('magic_link')}
    <span style="text-align: center;">Check your email for login link!</span>
    {:else}
    <div class="content">
        <h1>Login</h1>
      
        <form on:submit|preventDefault={signIn}>
          <div>
            <input
              id="email"
              type="email"
              autocomplete="email"
              placeholder="Email"
              required
              bind:value={email}
            />
          </div>
          <div>
            <input
              id="password"
              type="password"
              placeholder="Password (optional)"
              bind:value={password}
            />
          </div>
      
          <div>
            <button type="submit" class="submit" disabled={loading}>
              {loading ? 'Loading ...' : 'Log In'}
            </button>
          </div>
        </form>
      </div>
      

    {/if}
    
</main>


<style>
    .content {
      width: 100%;
      max-width: var(--column-width);
      margin: var(--column-margin-top) auto 0 auto;
    }
    .submit {
      border-radius: 20px;
      font-size: 12px;
      font-weight: bold;
      padding: 12px 45px;
      letter-spacing: 1px;
      text-transform: uppercase;
      transition: transform 80ms ease-in;
      cursor: pointer;
    }
  </style>