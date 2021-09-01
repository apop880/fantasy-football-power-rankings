export const handle = async ({ request, resolve }) => {
    // Parses `req.headers.cookie` adding them as attribute `req.cookies, as `auth.api.getUserByCookie` expects parsed cookies on attribute `req.cookies`
    const expressStyleRequest = toExpressRequest(request);
    // We can then fetch the authenticated user using this cookie
    const { user } = await auth.api.getUserByCookie(expressStyleRequest);
  
    // Add the user and the token to our locals so they are available on all SSR pages
    request.locals.token = expressStyleRequest.cookies['sb:token'] || undefined;
    request.locals.user = user || { guest: true };
  
    // If we have a token, set the supabase client to use it so we can make authorized requests as that user
    if (request.locals.token) {
      supabase.auth.setAuth(request.locals.token);
    }
  
    let response = await resolve(request);
  
    // if auth request - set cookie in response headers
    if (request.method == 'POST' && request.path === '/api/auth.json') {
      auth.api.setAuthCookie(request, toExpressResponse(response));
      response = toSvelteKitResponse(response);
    }
  
    return response;
  };