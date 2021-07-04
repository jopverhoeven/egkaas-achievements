interface Scoreboard {
    collection: string;
    type: 'tijd' | 'gewicht';
    direction: 'asc' | 'desc';
    limit: 10 | 25;
    name: 'Atjes' | 'Rietas' | 'Zwaargewichten';
    load?: Boolean;
}

export default Scoreboard;