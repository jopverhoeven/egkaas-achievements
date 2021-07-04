import AchievementCollection from "../../../abstraction/achievementcollection.enum";
import AchievementName from "../../../abstraction/achievementname.enum";
import AchievementType from "../../../abstraction/achievementtype.enum";

interface ScoreboardForm {
  collection: AchievementCollection;
  type: AchievementType;
  name: AchievementName;
}

export default ScoreboardForm;
