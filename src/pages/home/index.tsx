import { useEffect, useState } from "react"
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa"

import { Social } from "../../components/Social"
import { db } from "../../services/firebaseConnection"
import {
  getDocs,
  collection,
  orderBy,
  query,
  doc,
  getDoc
} from "firebase/firestore"

interface LinkProps {
  id: string;
  name: string;
  url: string;
  bg: string;
  color: string;
}

interface SocialLinksProps {
  facebook: string;
  instagram: string;
  youtube: string;
}

export function Home() {
  const [links, setLinks] = useState<LinkProps[]>([])
  const [socialLinks, setSocialLinks] = useState<SocialLinksProps>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const linksRef = collection(db, "links")
    const queryRef = query(linksRef, orderBy("created", "asc"))

    getDocs(queryRef)
      .then((snapshot) => {
        const lista = [] as LinkProps[]

        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            name: doc.data().name,
            url: doc.data().url,
            bg: doc.data().bg,
            color: doc.data().color
          })
        })

        setLoading(false)
        setLinks(lista)
      })
      .catch((error) => {
        console.log("Erro ao consumir dados do banco: " + error)
      })

  }, [])

  useEffect(() => {
    function loadSocialLinks() {
      const docRef = doc(db, "social", "link")

      getDoc(docRef)
        .then((snapshot) => {
          if (snapshot.data() !== undefined) {
            setSocialLinks({
              facebook: snapshot.data()?.facebook,
              instagram: snapshot.data()?.instagram,
              youtube: snapshot.data()?.youtube,
            })
          }
        })
        .catch((error) => {
          console.log("Erro ao consumir dados do banco: " + error)
        })
    }

    loadSocialLinks()
  }, [])

  return (
    <div className="flex flex-col w-full py-4 items-center justify-center">
      <h1 className="md:text-4xl text-3xl font-bold text-white mt-20">Erick D. Calazans</h1>
      <span className="text-gray-50 mb-5 mt-3">Veja meus links 👇</span>

      <main className="flex flex-col w-11/12 max-w-xl text-center">
        {loading ? <p className="text-gray-500 italic mb-3">Carregando...</p> : links.map((link) => (
          <section
            style={{ backgroundColor: link.bg }}
            key={link.id}
            className="bg-white mb-4 w-full py-2 rounded-lg select-none transition-transform hover:scale-105 cursor-pointer">
            <a href={link.url} target="_blank">
              <p
                style={{ color: link.color }}
                className="text-base md:text-lg">{link.name}</p>
            </a>
          </section>
        ))}

        {socialLinks && Object.keys(socialLinks).length > 0 && (
          <footer className="flex justify-center gap-3 my-4">
            <Social url={socialLinks.facebook}>
              <FaFacebook size={35} color="#FFF" />
            </Social>

            <Social url={socialLinks.instagram}>
              <FaInstagram size={35} color="#FFF" />
            </Social>

            <Social url={socialLinks.youtube}>
              <FaYoutube size={35} color="#FFF" />
            </Social>
          </footer>
        )}
      </main>
    </div>
  )
}