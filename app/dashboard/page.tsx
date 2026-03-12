'use client'

import { useState, useEffect } from "react";
import { auth, db } from "../../lib/firebase";
import { useRouter } from "next/navigation";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

export default function DashboardPage() {

  const [user, setUser] = useState<any>(null);

  const [sites, setSites] = useState<any[]>([]);
  const [newSite, setNewSite] = useState("");

  const [productName, setProductName] = useState("");
  const [chatReply, setChatReply] = useState("");

  const [showMenu, setShowMenu] = useState(false);
  const [showSites, setShowSites] = useState(false);

  const router = useRouter();

  useEffect(() => {

    const loadUserAndSites = async () => {

      const currentUser = auth.currentUser;

      if (!currentUser) {
        router.push("/login");
        return;
      }

      setUser(currentUser);

      try {

        const q = query(
          collection(db, "sites"),
          where("userId", "==", currentUser.uid)
        );

        const snapshot = await getDocs(q);

        const list: any[] = [];

        snapshot.forEach(doc =>
          list.push({ id: doc.id, ...doc.data() })
        );

        setSites(list);

      } catch (err) {

        console.error("Ошибка загрузки сайтов:", err);

      }

    };

    loadUserAndSites();

  }, [router]);

  const addSite = async () => {

    if (!newSite.trim() || !user) return;

    let url = newSite.trim().replace(/^https?:\/\//, "");
    url = "https://" + url;

    try {

      const docRef = await addDoc(
        collection(db, "sites"),
        { userId: user.uid, url }
      );

      setSites(prev => [...prev, { id: docRef.id, url }]);

      setNewSite("");

    } catch (err) {

      console.error("Ошибка добавления сайта:", err);

    }

  };

  const searchProduct = async () => {

  if (!productName.trim()) return;

  setChatReply("🔍 Анализируем товар...");

  try {

    const res = await fetch("/api/product-analysis", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ product: productName })
    });

    if (!res.ok) {
      throw new Error("Ошибка API");
    }

    const data = await res.json();

    console.log("Ответ API:", data);

    if (data.result) {
      setChatReply(data.result);
    } else {
      setChatReply("Ответ от GPT пустой");
    }

  } catch (err) {

    console.error("Ошибка запроса:", err);

    setChatReply("Ошибка анализа товара");

  }

};

  const handleLogout = async () => {

    await auth.signOut();

    router.push("/login");

  };

  return (

    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-8 font-sans">

      {/* верхняя панель */}

      <div className="w-full flex justify-between items-center mb-10">

        <button
          onClick={() => setShowSites(prev => !prev)}
          className="text-sm bg-gray-200 px-4 py-2 rounded"
        >
          Мониторинг сайтов
        </button>

        {user && (

          <div className="relative">

            <button
              className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center font-bold text-white"
              onClick={() => setShowMenu(prev => !prev)}
            >
              {user.email[0].toUpperCase()}
            </button>

            {showMenu && (

              <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow z-10">

                <p className="p-2 border-b">
                  {user.email}
                </p>

                <button
                  className="w-full text-left p-2 hover:bg-gray-100"
                  onClick={handleLogout}
                >
                  Выйти
                </button>

              </div>

            )}

          </div>

        )}

      </div>

      {/* Главный заголовок */}

      <h1 className="text-4xl font-bold mb-12">
        Поиск стоматологических товаров
      </h1>

      {/* Поиск товара */}

      <div className="w-full max-w-xl flex gap-3 mb-10">

        <input
          type="text"
          placeholder="Введите название товара"
          value={productName}
          onChange={e => setProductName(e.target.value)}
          onKeyDown={e => {
             if (e.key === "Enter") {
                e.preventDefault();
                searchProduct(); }
            }}
          className="flex-1 p-3 border rounded-lg"
        />

        <button
        type="button"
          onClick={searchProduct}
          className="px-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Найти
        </button>

      </div>

      {/* Результат анализа */}

      {chatReply && (

        <div className="w-full max-w-3xl bg-white p-6 rounded shadow">

          <h2 className="text-xl font-semibold mb-4">
            Анализ товара
          </h2>

          <pre className="whitespace-pre-wrap text-sm">
            {chatReply}
          </pre>

        </div>

      )}

      {/* Мониторинг сайтов */}

      {showSites && (

        <div className="w-full max-w-md mt-12 p-6 border rounded shadow bg-white">

          <h2 className="text-xl font-semibold mb-4">
            Мониторинг сайтов
          </h2>

          <input
            type="text"
            placeholder="Введите URL сайта"
            value={newSite}
            onChange={e => setNewSite(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") addSite(); }}
            className="w-full p-2 border rounded mb-3"
          />

          <button
            onClick={addSite}
            className="w-full p-2 rounded bg-green-500 text-white hover:bg-green-600"
          >
            Добавить сайт
          </button>

          <ul className="mt-4 space-y-2">

            {sites.map(site => (

              <li
                key={site.id}
                className="border p-2 rounded"
              >
                {site.url}
              </li>

            ))}

          </ul>

        </div>

      )}

    </div>

  );

}