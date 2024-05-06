/**
 * @see https://umijs.org/docs/max/access#access
 * */
export default function access(initialState: { currentUser?: API.CurrentUser } | undefined) {
  const { currentUser } = initialState ?? {};
  return {
    canAdmin: currentUser && currentUser.role === 'admin',
    canGuestUser : currentUser && currentUser.role === 'Guest',
    canDj : currentUser && currentUser.role === 'DJ'
  };
}
