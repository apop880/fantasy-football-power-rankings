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

<div class="flex items-center justify-center h-screen">
  <div class="bg-gray-800 flex flex-col w-80 border border-gray-900 rounded-lg px-8 py-10">
  <div class="text-white mt-10">
    <h1 class="font-bold text-4xl">Sign In</h1>
    <p class="font-semibold">Enter Your Email to Receive a Login Link</p>
  </div>
  <form class="flex flex-col space-y-8 mt-10" on:submit|preventDefault={signIn}>
    <input
              id="email"
              type="email"
              autocomplete="email"
              placeholder="Email"
              required
              bind:value={email}
              class="border rounded-lg py-3 px-3 bg-gray-700 border-gray-700 placeholder-gray-500"
            />
    <button type="submit" disabled={magic} class="border border-blue-500 bg-blue-500 text-white rounded-lg py-3 font-semibold">
      {magic ? 'Check Email for Login Link' : 'Log In'}
    </button>
  </form>
</div>
</div>