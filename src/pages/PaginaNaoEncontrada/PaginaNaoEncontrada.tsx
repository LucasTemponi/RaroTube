export const PaginaNaoEncontrada = () => {
  return (
    <div className="flex h-screen">
      <div className="m-auto">
        <img className="object-none"
          src="/erro404.jpg"
        />
        <h3 className="font-medium leading-tight text-sky-400 mt-2 mb-5 text-4xl font-bold">Ops...</h3>
        <p className="leading-normal mt-0 mb-10 text-xl">A gente procurou, mas não encontrou esta página </p>
        <a href="/" className="text-sky-400 border-solid border-sky-400 border p-3 mt-6 rounded-full hover:text-white hover:bg-sky-400 text-lg ">Volte ao Início</a>
      </div>
    </div>
  )
}

