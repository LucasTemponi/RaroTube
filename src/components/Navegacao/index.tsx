export const Navegacao = () => {
  if (false) {
    return (
      <a href='/'>
        <button className='rounded-md bg-raro-oceano text-white px-4 py-2 text-sm'>
          Login
        </button>
      </a>
    );
  }
  return (
    <>
      <span>Olá Usuario</span>
      <a href='/'>
        <button className='rounded-md bg-raro-oceano text-white px-4 py-2 text-sm'>
          Logout
        </button>
      </a>
    </>
  );
};
