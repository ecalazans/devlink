import { FormEvent, useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";

import { MdLink } from "react-icons/md"

import { db } from "../../services/firebaseConnection"
import { setDoc, doc, getDoc } from "firebase/firestore"

export function Networks() {
  const [facebook, setFacebook] = useState("")
  const [instagram, setInstagram] = useState("")
  const [youtube, setYoutube] = useState("")

  useEffect(() => {
    function loadLinks() {
      const docRef = doc(db, "social", "link")
      getDoc(docRef)
        .then((snapshot) => {
          if (snapshot.data() !== undefined) {
            setFacebook(snapshot.data()?.facebook)
            setInstagram(snapshot.data()?.instagram)
            setYoutube(snapshot.data()?.youtube)
          }
        })

    }

    loadLinks()
  }, [])

  function handleSubmit(e: FormEvent) {
    e.preventDefault()

    setDoc(doc(db, "social", "link"), {
      facebook: facebook,
      instagram: instagram,
      youtube: youtube
    })
      .then(() => {
        console.log('Cadastrado!')
      })
      .catch((error) => {
        console.log('Erro ao cadastrar no banco: ' + error)
      })

  }

  return (
    <div className="flex flex-col items-center min-h-screen pb-7 px-2">
      <Header />

      <h1 className="font-medium text-white text-3xl my-9">
        Suas redes sociais
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-xl">
        <label className="text-white font-medium mt-2 mb-2">Link facebook</label>
        <Input
          type="url"
          placeholder="Digite a url..."
          value={facebook}
          onChange={(e) => setFacebook(e.target.value)}
        />

        <label className="text-white font-medium mt-2 mb-2">Link instagram</label>
        <Input
          type="url"
          placeholder="Digite a url..."
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
        />

        <label className="text-white font-medium mt-2 mb-2">Link youtube</label>
        <Input
          type="url"
          placeholder="Digite a url..."
          value={youtube}
          onChange={(e) => setYoutube(e.target.value)}
        />

        <button
          type="submit"
          className="flex flex-row gap-2 justify-center bg-blue-600 text-white font-medium mt-2 py-2 rounded cursor-pointer"
        >
          Salvar Links
          <MdLink size={24} />
        </button>
      </form>


    </div>
  )
}