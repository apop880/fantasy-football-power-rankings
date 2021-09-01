<script context="module">
  // see https://kit.svelte.dev/docs#loading
  export const load = async ({ fetch, session }) => {
    // redirect to login if user is not logged in
    if (!session?.user?.id) {
      return {
        status: 301,
        redirect: '/login'
      };
    }
  };
</script>



<h1>Teams</h1>


