"use client";

import { useState, useEffect } from "react";
import { auth, db } from "../../lib/firebase";
import { useRouter } from "next/navigation";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [sites, setSites] = useState<any[]>([]);
  const [newSite, setNewSite] = useState("");
  const [productName, setProductName] = useState("");
  const [productImage, setProductImage] = useState<File | null>(null);
  const [chatReply, setChatReply] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showSites, setShowSites] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Подписка и баланс
  const [subscriptionActive, setSubscriptionActive] = useState(false);
  const [balance, setBalance] = useState(0);

  const [filters, setFilters] = useState({
    priceMin: 0,
    priceMax: 5000,
    maxSites: 10,
    deliveryTime: "Любой",
  });

  const router = useRouter();

  // Проверка подписки и баланс
  useEffect(() => {
    const subscription = document.cookie.includes("subscription=active");
    setSubscriptionActive(subscription);
    setBalance(0); // заглушка
  }, []);

  useEffect(() => {
    const loadUserAndSites = async () => {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        router.push("/login");
        return;
      }
      setUser(currentUser);

      try {
        const q = query(collection(db, "sites"), where("userId", "==", currentUser.uid));
        const snapshot = await getDocs(q);
        const list: any[] = [];
        snapshot.forEach((doc) => list.push({ id: doc.id, ...doc.data() }));
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
      const docRef = await addDoc(collection(db, "sites"), { userId: user.uid, url });
      setSites((prev) => [...prev, { id: docRef.id, url }]);
      setNewSite("");
    } catch (err) {
      console.error("Ошибка добавления сайта:", err);
    }
  };

  const searchProduct = async () => {
    if (!productName.trim()) return;
    setChatReply("🔍 Анализируем товар...");
    setTimeout(() => {
      setChatReply(
        `Результат анализа для "${productName}" (тестовые данные)\n\nФильтры:\n` +
          `Цена: ${filters.priceMin}–${filters.priceMax} ₽\n` +
          `Макс. сайтов: ${filters.maxSites}\n` +
          `Сроки доставки: ${filters.deliveryTime}`
      );
    }, 800);
  };

  const searchProductByImage = async () => {
    if (!productImage) return;
    setIsAnalyzing(true);
    setChatReply("🔍 Анализируем изображение...");
    setTimeout(() => {
      setChatReply(
        `Результат анализа изображения "${productImage.name}" (тестовые данные)\nФильтры:\n` +
          `Цена: ${filters.priceMin}–${filters.priceMax} ₽\n` +
          `Макс. сайтов: ${filters.maxSites}\n` +
          `Сроки доставки: ${filters.deliveryTime}`
      );
      setIsAnalyzing(false);
    }, 1000);
  };

  const handleLogout = async () => {
    await auth.signOut();
    router.push("/login");
  };

  const HorizontalPriceSliders = () => {
    const min = 0;
    const max = 5000;
    const step = 100;
    return (
      <div className="flex items-center gap-6">
        <div className="flex-1">
          <label className="block mb-1 font-semibold text-sm">Мин. цена</label>
          <input
            type="range"
            min={min}
            max={filters.priceMax - step}
            step={step}
            value={filters.priceMin}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, priceMin: Number(e.target.value) }))
            }
            className="w-full"
          />
          <div className="text-xs mt-1">{filters.priceMin} ₽</div>
        </div>

        <div className="flex-1">
          <label className="block mb-1 font-semibold text-sm">Макс. цена</label>
          <input
            type="range"
            min={filters.priceMin + step}
            max={max}
            step={step}
            value={filters.priceMax}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, priceMax: Number(e.target.value) }))
            }
            className="w-full"
          />
          <div className="text-xs mt-1">{filters.priceMax} ₽</div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-8 font-sans">
      {/* Верхняя панель */}
      <div className="w-full flex justify-between items-center mb-6">
        {/* Кнопка назад */}
        <button
          onClick={() => router.back()}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm"
        >
          ← Назад
        </button>

        {user && (
          <div className="relative flex items-center gap-4">
            {/* Статус подписки */}
            <div className="bg-yellow-200 text-black px-3 py-1 rounded text-sm">
              {subscriptionActive ? "Подписка активна" : "Нет подписки"}
            </div>
            <div className="bg-blue-200 text-black px-3 py-1 rounded text-sm">
              Баланс: {balance} ₽
            </div>
            <button
              onClick={() => router.push("/pricing")}
              className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
            >
              Пополнить / Подписка
            </button>

            <button
              className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center font-bold text-white"
              onClick={() => setShowMenu((prev) => !prev)}
            >
              {user.email[0].toUpperCase()}
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-2 w-44 bg-white border rounded shadow z-10">
                <p className="p-2 border-b">{user.email}</p>
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

      <h1 className="text-4xl font-bold mb-6">Поиск стоматологических товаров</h1>

      {/* Кнопка фильтры */}
      <div className="w-full max-w-xl flex justify-end mb-3">
        <button
          onClick={() => setShowFilters((prev) => !prev)}
          className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-black dark:text-white rounded cursor-pointer hover:bg-gray-400"
        >
          ⚙️ Фильтры
        </button>
      </div>

      {/* Фильтры */}
      {showFilters && (
        <div className="w-full max-w-xl p-4 mb-6 bg-white dark:bg-gray-800 rounded shadow space-y-4">
          <HorizontalPriceSliders />

          {/* Макс. количество сайтов */}
          <div>
            <label className="block mb-1 font-semibold">Макс. количество сайтов</label>
            <input
              type="range"
              min={1}
              max={50}
              step={1}
              value={filters.maxSites}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, maxSites: Number(e.target.value) }))
              }
              className="w-full"
            />
            <span>{filters.maxSites} сайтов</span>
          </div>

          {/* Сроки доставки */}
          <div>
            <label className="block mb-1 font-semibold">Сроки доставки</label>
            <select
              value={filters.deliveryTime}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, deliveryTime: e.target.value }))
              }
              className="w-full p-2 border rounded"
            >
              <option>Любой</option>
              <option>1–3 дня</option>
              <option>3–7 дней</option>
              <option>7–14 дней</option>
              <option>14+ дней</option>
            </select>
          </div>
        </div>
      )}

      {/* Поиск по имени */}
      <div className="w-full max-w-xl flex gap-3 mb-6">
        <input
          type="text"
          placeholder="Введите название товара"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              searchProduct();
            }
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

      {/* Drag & Drop фото с крестиком */}
      <div
        className="w-full max-w-xl h-40 border-2 border-dashed rounded flex flex-col items-center justify-center mb-4 cursor-pointer relative"
        onDrop={(e) => {
          e.preventDefault();
          if (e.dataTransfer.files.length > 0) setProductImage(e.dataTransfer.files[0]);
        }}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => document.getElementById("fileInput")?.click()}
      >
        {productImage ? (
          <>
            <img
              src={URL.createObjectURL(productImage)}
              alt="Выбранное фото"
              className="w-32 h-32 object-cover rounded"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                setProductImage(null);
              }}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
            >
              ✕
            </button>
          </>
        ) : (
          <span>Перетащите фото сюда или кликните для выбора</span>
        )}
        <input
          type="file"
          accept="image/*"
          id="fileInput"
          onChange={(e) => e.target.files && setProductImage(e.target.files[0])}
          className="hidden"
        />
      </div>

      <button
        onClick={searchProductByImage}
        disabled={!productImage || isAnalyzing}
        className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 mb-10"
      >
        {isAnalyzing ? "Анализируем..." : "Анализировать фото"}
      </button>

      {/* Результат анализа */}
      {chatReply && (
        <div className="w-full max-w-3xl bg-white p-6 rounded shadow mb-10">
          <h2 className="text-xl font-semibold mb-4">Результат анализа</h2>
          <pre className="whitespace-pre-wrap text-sm">{chatReply}</pre>
        </div>
      )}

      {/* Мониторинг сайтов */}
      {showSites && (
        <div className="w-full max-w-md p-6 border rounded shadow bg-white">
          <h2 className="text-xl font-semibold mb-4">Мониторинг сайтов</h2>
          <input
            type="text"
            placeholder="Введите URL сайта"
            value={newSite}
            onChange={(e) => setNewSite(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") addSite();
            }}
            className="w-full p-2 border rounded mb-3"
          />
          <button
            onClick={addSite}
            className="w-full p-2 rounded bg-green-500 text-white hover:bg-green-600"
          >
            Добавить сайт
          </button>
          <ul className="mt-4 space-y-2">
            {sites.map((site) => (
              <li key={site.id} className="border p-2 rounded">
                {site.url}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}