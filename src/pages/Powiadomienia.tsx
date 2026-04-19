import { Bell, SquareArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { NOTIFICATIONS } from "../lib/notificationConfig";
import { useNotifications } from "../hooks/useNotifications";


interface UstawieniaPowiadomien {
    id: string;
    title: string;
    active: boolean;
    icon: React.ReactNode;
}

// COOKIES 
const COOKIE_KEY = "user_notifications_preferences";

function getCookie(key: string): string | undefined {
    return document.cookie.split("; ")
        .find(row => row.startsWith(key + "="))
        ?.split("=")[1];
}

function setCookie(key: string, value: string, days: number): void {
    const expires = new Date();
    expires.setDate(expires.getDate() + days);
    document.cookie = `${key}=${value}; expires=${expires.toUTCString()}; path=/`;
}


function Powiadomienia() {

    // Sprawdzamy czy przeglądarka obsługuje powiadomienia
    const [pushSupported, setPushSupported] = useState<boolean | null>(null);
    const { permission, requestPermission } = useNotifications();

    useEffect(() => {
        const supported = "Notification" in window
            && "serviceWorker" in navigator
            && "PushManager" in window;
        setPushSupported(supported);
    }, []);

    // Stan przechowujący wybory użytkownika
    const [settings, setSettings] = useState<UstawieniaPowiadomien[]>(() => {
        const savedCookies = getCookie(COOKIE_KEY);

        const defaultSettings = NOTIFICATIONS.map((n) => ({
            ...n,
            active: true,
            icon: <Bell size={17} />,
        }));


        if (savedCookies) {
            try {
                const parsed = JSON.parse(savedCookies);
                // Łączymy ikony z zapisanymi stanami powiadomien
                return defaultSettings.map(ds => ({
                    ...ds,
                    active: parsed[ds.id] ?? ds.active
                }));
            } catch (error) {
                // W przypadku wystąpienia błędu przy cookies, ustawiamy domyśne ustawienia
                console.error("Błąd podczas odczytywania cookies:", error); // wyswietlenie bledu
                return defaultSettings;
            }
        }
        return defaultSettings;
    });

    // Funkcja przełączająca stan konkretnego powiadomienia i zapisująca nowy stan do COOKIES   
    const toggle = (id: string) => {
        const newSettings = settings.map(item =>
            item.id === id ? { ...item, active: !item.active } : item
        );

        setSettings(newSettings);


        // Zapisywanie uproszczonego obiektu do COOKIES {id, active}
        const configToSave = newSettings.reduce((acc, curr) => ({
            ...acc, [curr.id]: curr.active
        }), {});

        // Po 365 dniach COOKIES zostaje usuniete
        setCookie(COOKIE_KEY, JSON.stringify(configToSave), 365);
    };

    return (
        <div className="min-h-screen w-full bg-gray-100 flex flex-col items-center p-10 relative">

            {/* Przycisk powrotu */}
            <Link
                to="/Ustawienia"
                className="absolute left-6 top-10 p-3 bg-white text-black rounded-full shadow-lg active:scale-95 transition-all hover:bg-gray-50"
            >
                <SquareArrowLeft size={20} />
            </Link>

            {/* Nagłówek strony */}
            <div className="w-full max-w-md flex items-center mb-8">
                <h1 className="text-4xl font-bold text-gray-800">Powiadomienia</h1>
            </div>

            {/* Lista opcji do wyboru */}
            <div className="w-full max-w-md space-y-3">
                {settings.map((item) => (
                    <div
                        key={item.id}
                        onClick={() => toggle(item.id)}
                        className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm cursor-pointer active:bg-gray-50 transition-colors"
                    >
                        {/* Ikonka i naglowek powiadomienia */}
                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                {item.icon}
                            </div>

                            <span className="font-medium text-gray-600">
                                {item.title}</span>
                        </div>

                        {/* Toggle - przycisk switch */}
                        <div className={`w-12 h-6 rounded-full transition-colors relative ${item.active ? 'bg-green-500' : 'bg-gray-300'}`}>
                            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${item.active ? 'left-7' : 'left-1'}`} />
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-auto mb-6 text-center px-4">

                {pushSupported === false ? (  // przeglądarka nie obsługuje push
                    <p className="text-red-400 text-sm">
                        Twoja przeglądarka nie obsługuje powiadomień push.
                    </p>
                )
                    : pushSupported === true && permission !== "granted" ? ( // przeglądarka obsługuje push
                        <button
                            onClick={requestPermission}
                            className="px-4 py-2 bg-blue-500 text-white rounded-xl text-sm"
                        >
                            Włącz powiadomienia
                        </button>
                    ) : null}
            </div>
        </div>
    );
}

export default Powiadomienia
