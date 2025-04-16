import { FormEvent, useEffect, useState } from "react"

import { Header } from "../../components/Header"
import { Input } from "../../components/Input"

import { FiTrash } from "react-icons/fi"

import { db } from "../../services/firebaseConnection"
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  deleteDoc
} from "firebase/firestore"

interface LinkProps {
  id: string;
  name: string;
  url: string;
  bg: string;
  color: string;
}

export function Admin() {
  const [nameInput, setNameInput] = useState("")
  const [urlInput, setUrlInput] = useState("")
  const [textColorInput, setTextColorInput] = useState("#F1F1F1")
  const [backgroundColorInput, setBackgroundColorInput] = useState("#121212")
  const [links, setLinks] = useState<LinkProps[]>([])

  useEffect(() => {
    const linksRef = collection(db, "links")
    const queryRef = query(linksRef, orderBy("created", "asc"))

    const unsub = onSnapshot(queryRef, (snapshot) => {
      let lista = [] as LinkProps[]

      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          name: doc.data().name,
          url: doc.data().url,
          bg: doc.data().bg,
          color: doc.data().color
        })
      })

      setLinks(lista)
    })

    // Removendo o listener quando sairmos do componente
    return () => {
      unsub()
    }

  }, [])

  function handleRegister(e: FormEvent) {
    e.preventDefault()

    if (nameInput === '' || urlInput === '') {
      alert('Preencha todos os campos!')
      return
    }

    addDoc(collection(db, "links"), {
      name: nameInput,
      url: urlInput,
      bg: backgroundColorInput,
      color: textColorInput,
      created: new Date()
    })
      .then(() => {
        setNameInput("")
        setUrlInput("")
        console.log("Cadastrado com sucesso!")
      })
      .catch((error) => {
        console.log('Erro ao cadastrar no banco: ' + error)
      })
  }

  async function handleDeletLink(id: string) {
    const docRef = doc(db, "links", id)
    await deleteDoc(docRef)
  }

  return (
    <div className="flex flex-col items-center min-h-screen pb-7 px-2">
      <Header />

      <form onSubmit={handleRegister} className="flex flex-col w-full max-w-xl mt-8 mb-3">
        <label className="text-white font-medium mt-2 mb-2">Nome do Link</label>
        <Input
          placeholder="Digite o nome do link..."
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
        />

        <label className="text-white font-medium mt-2 mb-2">Url do Link</label>
        <Input
          placeholder="Digite a url..."
          type="url"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
        />

        <section className="flex my-4 gap-5">
          <div>
            <label className="text-white font-medium mt-2 mb-2 mr-3">Cor do Link</label>
            <input
              type="color"
              value={textColorInput}
              onChange={(e) => setTextColorInput(e.target.value)}
            />
          </div>

          <div>
            <label className="text-white font-medium mt-2 mb-2 mr-3">Fundo do Link</label>
            <input
              type="color"
              value={backgroundColorInput}
              onChange={(e) => setBackgroundColorInput(e.target.value)}
            />
          </div>
        </section>

        {nameInput != '' && (
          <div className="flex flex-col items-center justify-start mb-7 p-1 border-gray-100/25 border rounded-md">
            <label className="text-white font-medium mt-2 mb-3">Cor do Link</label>
            <article
              className="w-11/12 max-w-lg flex flex-col items-center justify-between bg-zinc-900 rounded px-1 py-3"
              style={{ marginBottom: 8, marginTop: 8, backgroundColor: backgroundColorInput }}
            >
              <p className="font-medium" style={{ color: textColorInput }}>{nameInput}</p>
            </article>
          </div>
        )}

        <button type="submit" className="mb-7 bg-blue-600 h-9 rounded-md text-white font-medium flex items-center justify-center gap-4 cursor-pointer">
          Cadastrar
        </button>

      </form >

      <h2 className="font-bold text-white mb-4">
        Meus Links
      </h2>

      {links && links.map((link) => (
        <article
          key={link.id}
          className="flex items-center justify-between w-11/12 max-w-lg rounded py-2 px-3 mb-4 select-none"
          style={{ backgroundColor: link.bg, color: link.color }}
        >
          <p>{link.name}</p>
          <div>
            <button
              onClick={() => handleDeletLink(link.id)}
              className="border border-white border-dashed p-1 rounded bg-neutral-900 cursor-pointer">
              <FiTrash size={18} color="#FFF" />
            </button>
          </div>
        </article>
      ))}

    </div >
  )
}