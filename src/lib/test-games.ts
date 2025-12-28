import { Player } from "@/components/PlayerCard";

export type TestGame = {
    name: string;
    description: string;
    players: Player[];
};

export const TEST_GAMES: TestGame[] = [
    {
        name: "Back to the Future",
        description: "Standard game with mixed results",
        players: [
            { id: "t1", name: "Marty", buyIn: 20, cashOut: 0, profit: -20 },
            { id: "t2", name: "Doc", buyIn: 30, cashOut: 10, profit: -20 },
            { id: "t3", name: "Biff", buyIn: 10, cashOut: 70, profit: 60 },
            { id: "t4", name: "Einie", buyIn: 15, cashOut: 4, profit: -11 },
            { id: "t5", name: "Lorraine", buyIn: 10, cashOut: 21, profit: 11 },
            { id: "t6", name: "George", buyIn: 10, cashOut: 12, profit: 2 },
            { id: "t7", name: "Griff", buyIn: 10, cashOut: 4, profit: -6 },
            { id: "t8", name: "Jennifer", buyIn: 10, cashOut: 14, profit: 4 },
            { id: "t9", name: "Strickland", buyIn: 20, cashOut: 0, profit: -20 },
        ],
    },
    {
        name: "Highlander",
        description: "One Winner Takes All (Aggregation Test)",
        players: [
            { id: "h1", name: "Connor MacLeod", buyIn: 10, cashOut: 110, profit: 100 },
            { id: "h2", name: "Kurgan", buyIn: 50, cashOut: 0, profit: -50 },
            { id: "h3", name: "Ramirez", buyIn: 25, cashOut: 0, profit: -25 },
            { id: "h4", name: "Kastagir", buyIn: 25, cashOut: 0, profit: -25 },
        ],
    },
    {
        name: "They Live",
        description: "Precision Test (Small decimals)",
        players: [
            { id: "tl1", name: "Nada", buyIn: 10, cashOut: 10.01, profit: 0.01 },
            { id: "tl2", name: "Frank", buyIn: 10.01, cashOut: 10, profit: -0.01 },
            { id: "tl3", name: "Drifter", buyIn: 5, cashOut: 5, profit: 0 },
            { id: "tl4", name: "Alien", buyIn: 100, cashOut: 100, profit: 0 },
        ],
    },
    {
        name: "Amazing World of Gumball",
        description: "Disjoint Groups (Should solve separately)",
        players: [
            { id: "ag1", name: "Gumball", buyIn: 10, cashOut: 20, profit: 10 },
            { id: "ag2", name: "Darwin", buyIn: 10, cashOut: 0, profit: -10 },
            { id: "ag3", name: "Anais", buyIn: 20, cashOut: 15, profit: -5 },
            { id: "ag4", name: "Nicole", buyIn: 10, cashOut: 15, profit: 5 },
            // Group 2 (Perfect Match)
            { id: "ag5", name: "Richard", buyIn: 50, cashOut: 0, profit: -50 },
            { id: "ag6", name: "Larry", buyIn: 0, cashOut: 50, profit: 50 },
        ],
    },
    {
        name: "Regular Show",
        description: "Periodic Decimals (1/3 split)",
        players: [
            { id: "rs1", name: "Mordecai", buyIn: 100, cashOut: 133.33, profit: 33.33 },
            { id: "rs2", name: "Rigby", buyIn: 100, cashOut: 133.33, profit: 33.33 },
            { id: "rs3", name: "Benson", buyIn: 100, cashOut: 133.34, profit: 33.34 }, // One penny off due to sum
            { id: "rs4", name: "Skips", buyIn: 100, cashOut: 0, profit: -100 },
        ],
    },
    {
        name: "Seinfeld",
        description: "Perfect Pairs (Multiple simple matches)",
        players: [
            { id: "sf1", name: "Jerry", buyIn: 50, cashOut: 150, profit: 100 },
            { id: "sf2", name: "George", buyIn: 100, cashOut: 0, profit: -100 },
            { id: "sf3", name: "Elaine", buyIn: 20, cashOut: 70, profit: 50 },
            { id: "sf4", name: "Kramer", buyIn: 50, cashOut: 0, profit: -50 },
            { id: "sf5", name: "Newman", buyIn: 10, cashOut: 10, profit: 0 },
        ],
    },
    {
        name: "Breaking Bad",
        description: "Large Numbers (Display check)",
        players: [
            { id: "bb1", name: "Walter White", buyIn: 1000000, cashOut: 2000000, profit: 1000000 },
            { id: "bb2", name: "Jesse", buyIn: 500000, cashOut: 1000000, profit: 500000 },
            { id: "bb3", name: "Saul", buyIn: 100000, cashOut: 0, profit: -100000 },
            { id: "bb4", name: "Gus Fring", buyIn: 1400000, cashOut: 0, profit: -1400000 },
        ],
    },
];
