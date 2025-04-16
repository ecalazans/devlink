import { Link } from "react-router-dom"

export function ErrorPage() {
  return (
    <div className="flex flex-col w-full justify-center items-center text-white min-h-screen">
      <h1 className="font-bold text-5xl mb-2">404</h1>
      <h1 className="font-bold text-4xl mb-4">Página de Erro</h1>
      <p className="italic text-1xl mb-4">Você caiu em uma página não encontrada!</p>
      <Link
        className="bg-gray-50/20 py-1 px-4"
        to={'/'}>
        Voltar para Home
      </Link>
    </div>
  )
}