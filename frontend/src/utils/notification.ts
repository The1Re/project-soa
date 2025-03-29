import toast, { ToastOptions } from "react-hot-toast";

export const NotificationStyle: ToastOptions = {
    duration: 2000,
    position: "top-center",
    style: {
        backgroundColor: "var(--color-orange-600)",
        color: "#fff",
        fontSize: "16px",
        padding: "10px",
        borderRadius: "8px",
    },
    iconTheme: {
        primary: "#fff",
        secondary: "#4A5568",
    },
}

export const notification = {
    success: (message: string) => toast.success(message, NotificationStyle),
    error: (message: string) => toast.error(message, NotificationStyle),
    canel: (id: string) => toast.dismiss(id),
}