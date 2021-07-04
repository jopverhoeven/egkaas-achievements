import AchievementCollection from "../../abstraction/achievementcollection.enum";
import AchievementName from "../../abstraction/achievementname.enum";
import AchievementType from "../../abstraction/achievementtype.enum";

interface Achievement {
    collection: AchievementCollection;
    type: AchievementType;
    name: AchievementName;
}

export default Achievement;