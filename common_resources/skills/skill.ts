import regularSkillsJson from './regular_skills.json'
import loreSkillsJson from './lore_skills.json'
import toolSkillsJson from './tool_skills.json'

export const regularSkills: Skill[] = regularSkillsJson;
export const loreSkills: Skill[] = loreSkillsJson;
export const toolSkills: Skill[] = toolSkillsJson;

export type Skill = typeof regularSkillsJson[0] |  typeof loreSkillsJson[0] | typeof toolSkillsJson[0];