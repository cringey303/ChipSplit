import { Player } from "@/components/PlayerCard";

export type Session = {
    id: string;
    updatedAt: number; //time of last save
    players: Player[];
}

const STORAGE_KEY = "chipsplit_current_game";

//group all storage functions
export const storageService = {

    /* 
     * Loads current game from local storage
     * Returns null if no saved game exists
     */
    loadGame(): Player[] | null {
        // check if running on browser to ensure localstorage exists(Next.js runs on server too)
        if (typeof window == "undefined") return null;

        try {
            // get raw string local data
            const serializedState = localStorage.getItem(STORAGE_KEY);
            if (!serializedState) return null;

            // deserialize if local data exists. Only return Players
            const session: Session = JSON.parse(serializedState);
            return session.players;
        } catch (error) {
            console.error("Failed to load game state:", error);
            return null;
        }
    },

    /* 
     * Saves current game to local storage
     * Future: add paid feature of saving to cloud
     */
    saveGame(players: Player[]): void {
        // same safety check as above
        if (typeof window == "undefined") return;

        try {
            const session: Session = {
                // future: use dynamic ID for multiple sessions
                id: "current-session",
                updatedAt: Date.now(),
                players: players,
            };

            // save session to local storage
            localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
        } catch (error) {
            console.error("Failed to save game state:", error);
        }
    },

    /* 
     * Clear current game in local storage
     */
    clearGame(): void {
        if (typeof window === "undefined") return;
        localStorage.removeItem(STORAGE_KEY);
    }
};