import AchievementCollection from "../../abstraction/achievementcollection.enum";
import AchievementName from "../../abstraction/achievementname.enum";
import AchievementType from "../../abstraction/achievementtype.enum";

interface Scoreboard {
    collection: AchievementCollection;
    type: AchievementType;
    direction: 'asc' | 'desc';
    limit: 10 | 25;
    name: AchievementName;
}

export default Scoreboard;