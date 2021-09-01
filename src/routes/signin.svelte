<script>
    import supabase from '$lib/db'

    let email
    let magic

    async function signIn() {
      magic = true
      let { error } = await supabase.auth.signIn({
        email
      });
      if (error) {
        magic = false;
        alert(error);
        return;
      }
    }
</script>

<div class="content">
        <h1>Enter Your Email to Receive Login Link</h1>
      
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
            <button type="submit" class="submit" disabled={magic}>
              {magic ? 'Check Email for Login Link' : 'Log In'}
            </button>
          </div>
        </form>
      </div>

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