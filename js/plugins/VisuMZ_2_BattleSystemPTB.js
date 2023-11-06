//=============================================================================
// VisuStella MZ - Battle System - PTB - Press Turn Battle
// VisuMZ_2_BattleSystemPTB.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_BattleSystemPTB = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BattleSystemPTB = VisuMZ.BattleSystemPTB || {};
VisuMZ.BattleSystemPTB.version = 1.07;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.07] [BattleSystemPTB]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Battle_System_-_PTB_VisuStella_MZ
 * @base VisuMZ_0_CoreEngine
 * @base VisuMZ_1_BattleCore
 * @base VisuMZ_1_ItemsEquipsCore
 * @base VisuMZ_1_SkillsStatesCore
 * @orderAfter VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_ItemsEquipsCore
 * @orderAfter VisuMZ_1_SkillsStatesCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Press Turn Battle (PTB) is a team-based battle system made for RPG Maker MZ
 * where the teams for actors and enemies take turns attacking one another as
 * a whole, consuming press actions in the process. When press actions have
 * been emptied, the turn switches over to the opposite team and it repeats.
 * Depending on the results of actions, Press Actions may consume a full action
 * or be converted into a half action, allowing for more actions per turn. This
 * is a battle system that rewards skillful play and punishes bad strategies.
 * 
 * *NOTE* To use this battle system, you will need the updated version of
 * VisuStella's Core Engine. Go into its Plugin Parameters and change the
 * "Battle System" plugin parameter to "ptb".
 *
 * Features include all (but not limited to) the following:
 * 
 * * Actor and enemy teams take turns attacking each other as a whole.
 * * Press action counts are given to each team at the start of each turn to
 *   utilize individual actions for.
 * * Good strategies such as hitting weaknesses, guarding, or landing critical
 *   hits will convert a full action into a half action, allowing for more
 *   actions to be used per turn.
 * * Bad strategies such as hitting resistances, missing attacks, or getting an
 *   attack reflected will punish the team by removing press actions available.
 * * A system of scenarios, outcomes, with varying priority levels will allow
 *   you to fine tune the results of an action to your liking.
 * * Alter the mechanics of the Battle System PTB to your liking through the
 *   Plugin Parameters.
 * * A Press Count Display is shown for each side to relay information to the
 *   player about the current state of each turn.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Required Plugin List ------
 *
 * * VisuMZ_0_CoreEngine
 * * VisuMZ_1_BattleCore
 * * VisuMZ_1_ItemsEquipsCore
 * * VisuMZ_1_SkillsStatesCore
 *
 * This plugin requires the above listed plugins to be installed inside your
 * game's Plugin Manager list in order to work. You cannot start your game with
 * this plugin enabled without the listed plugins.
 *
 * ------ Tier 2 ------
 *
 * This plugin is a Tier 2 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 * 
 * Surprise Attacks and Preemptive Bonuses
 * 
 * Due to the nature of a team-based battle system, surprise attacks and
 * preemptive bonuses no longer prevent the other team from being able to act
 * for a turn as that gives the initiating team too much advantage. Instead,
 * a surprise attack means the enemy team will always start first for each turn
 * while a preemptive bonus means the actor team will always start first for
 * each turn.
 * 
 * ---
 * 
 * Agility and Speed
 * 
 * When there is no surprise attack or preemptive bonus, aka a neutral battle
 * initiative, then the team that goes first is determined by their Agility
 * value at the start of battle (unless determined otherwise through the Plugin
 * Parameters).
 * 
 * As there is no free-range switching like with other team-based battle
 * systems, the turn order in which the actors can perform actions will be
 * based on their agility values. Battlers with higher AGI will go earlier
 * while those with lower AGI go later.
 * 
 * Agility, however, can influence Press Counts through buffs and debuffs if
 * enabled through the Plugin Parameters. Each stack of Agility buffs will
 * raise the Press Count for a team while each stack of Agility debuffs will
 * decrease them for subsequent turns.
 * 
 * ---
 * 
 * Action Orders
 * 
 * As team-based battle systems always have teams go between each other, the
 * standard action orders seen for turn-based and tick-based battle systems no
 * longer exist. However, in the event the actor team has berserk, confused, or
 * autobattlers, the actions will be performed in the following order:
 * 
 * 1. Berserk, confused, and auto battlers go first.
 * 2. If any actions are left, inputtable actors go next.
 * 3. If any actions are left, but there are no inputtable actors, berserk,
 *    confused, and auto battlers use up the remaining actions.
 * 4. Switch to the next team.
 * 
 * For enemy teams, enemies will always go in order from highest-to-lowest AGI
 * for both front view or right-to-left for sideview. If there are actions
 * left, the enemy team will cycle back to the first acting enemy.
 * 
 * ---
 *
 * Turn Structure
 * 
 * Each battle turn is dedicated to one team or the other. You need to design
 * your turns with this in mind. When one team finishes its actions, the next
 * turn will have the other team perform theirs.
 * 
 * As a result, both teams will not benefit from their turn end activities such
 * as regeneration at the end of each battle turn. Instead, they will only
 * occur at the end of their own respective turns.
 * 
 * However, for states and buffs, this is slightly different. States and buffs
 * update at the end of the opposing team's turn. This is so that 1 turn states
 * like Guard will last until the opponent's turn is over instead of being over
 * immediately after the player's turn ends (rendering the effect useless).
 * 
 * The state and buff turn updates can be disabled in the Plugin Parameters.
 * However, the durations must be accounted for if disabled (ie. making Guard
 * last two turns instead of 1).
 * 
 * ---
 * 
 * ============================================================================
 * How Press Mechanics Work
 * ============================================================================
 * 
 * This section will explain how the Press Mechanics work.
 * 
 * ---
 * 
 * === Press Action Counts ===
 * 
 * Each turn, the active team is given a number of actions they can perform.
 * These actions can be divided up into full actions or half actions. Each team
 * member that can act will generate a full action at the start of each turn.
 * 
 * Attacking, defending, skill usage, or item usage will consume actions. If
 * there are half actions available, those will be consumed first. Otherwise,
 * full actions will be consumed.
 * 
 * Once all full and half actions are consumed, the team's turn ends and it
 * becomes the opposing team's turn to attack.
 * 
 * ---
 * 
 * === Scenarios ===
 * 
 * Here are the various scenarios on what will happen. This is assuming that
 * none of the settings in the Plugin Parameters have changed in regards to
 * these scenarios.
 * 
 * If a scenario's outcome becomes permanent, it can no longer be changed from
 * any other scenarios that happen later. Otherwise, the last scenario that
 * happens will take priority.
 * 
 * Scenarios have priority levels. Whenever a scenario outcome with a higher
 * priority occurs, that outcome's effects will take over. Priorities of equal
 * or lower level will not override the current outcome settings.
 * 
 * Below are the scenarios listed from lowest to highest priority level:
 * 
 * ---
 * 
 * Scenario: Performing any action with a "normal" outcome (hit) and dealing
 * damage without hitting any weaknesses, resistances, immunities, absorptions,
 * or reflections.
 * 
 * Outcome: (Consume) If there is a half action, consume the half action.
 * Otherwise, consume one full action if there is no half action.
 * 
 * Priority: 0
 * 
 * ---
 * 
 * Scenario: Performing an action that inflicts a state. This can be tricky.
 * The state effect can miss and still be considered "normal", but if the
 * action itself misses, this scenario is no longer valid.
 * 
 * Outcome: (Consume) If there is a half action, consume the half action.
 * Otherwise, consume one full action if there is no half action.
 * 
 * Priority: 0
 * 
 * ---
 * 
 * Scenario: An action lands a critical hit!
 * 
 * Outcome: (Convert) If there is a full action, convert that full action into
 * a half action. Otherwise, consume the half action if no full action exists.
 * This is a temporary outcome by will override a "normal" outcome.
 * 
 * Priority: 50
 * 
 * ---
 * 
 * Scenario: An action deals elemental damage and hits a weakness!
 * 
 * Outcome: (Convert) If there is a full action, convert that full action into
 * a half action. Otherwise, consume the half action if no full action exists.
 * This is a temporary outcome by will override a "normal" outcome.
 * 
 * Priority: 60
 * 
 * ---
 * 
 * Scenario: An action completely misses. This does not refer to a state effect
 * missing, but instead, the action's own success rate failing the dice roll or
 * an enemy evades it.
 * 
 * Outcome: (Consume) If there are 2 half actions, consume both half actions.
 * If there is a half and full action remaining, consume one of each. Otherwise
 * consume two full actions. This outcome becomes the permanent outcome.
 * 
 * Priority: 80
 * 
 * ---
 * 
 * Scenario: An action deals elemental damage and hits a resistance!
 * 
 * Outcome: (Consume) If there are 2 half actions, consume both half actions.
 * If there is a half and full action remaining, consume one of each. Otherwise
 * consume two full actions. This outcome becomes the permanent outcome.
 * 
 * Priority: 70
 * 
 * ---
 * 
 * Scenario: An action tries to do elemental damage but hits an immunity!
 * 
 * Outcome: (Consume) Consumes all half actions and full actions. This outcome
 * becomes the permanent outcome.
 * 
 * Priority: 90
 * 
 * ---
 * 
 * Scenario: An action tries to do elemental damage but is absorbed!
 * 
 * Outcome: (Consume) Consumes all half actions and full actions. This outcome
 * becomes the permanent outcome.
 * 
 * Priority: 90
 * 
 * ---
 * 
 * Scenario: An action tries to do elemental damage but is reflected!
 * 
 * Outcome: (Consume) Consumes all half actions and full actions. This outcome
 * becomes the permanent outcome.
 * 
 * Priority: 90
 * 
 * ---
 * 
 * Scenario: Using the Guard action.
 * 
 * Outcome: (Compress) If there is a half action, consume the half action.
 * Otherwise, convert one full action into a half action. This outcome becomes
 * the permanent outcome.
 * 
 * Priority: 100
 * 
 * ---
 * 
 * As you can see, the scenario and outcome mechanic will favor punishment over
 * reward, but will also favor reward over normal. The priority system is set
 * up so that certain scenarios will not undo others. For example, a multi-hit
 * attack that lands a critical hit but also a miss will still favor the miss.
 * 
 * These settings can be altered in the Plugin Parameters if they're not to
 * your liking.
 * 
 * ---
 * 
 * === Post-Gains ===
 * 
 * Once changes are made to the full actions and half actions, it's time to end
 * the action. However, not before some post-gains to be made. Some notetag
 * effects allow actions to gain full actions and half actions after the fact.
 * 
 * As scenario outcomes cannot make turns go into the negatives (it always caps
 * at zero), any post-gains made will always prolong a turn.
 * 
 * For example, let's assume there is a skill called "Phoenix Eye". It consumes
 * an action but will grant 3 Half Actions.
 * 
 * In a scenario where a team has only a half action or full action left,
 * "Phoenix Eye" will consume that action and return 3 Half Actions, still
 * allowing the team to continue acting for the remainder of that turn.
 * 
 * ---
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * ---
 * 
 * === General PTB-Related Notetags ===
 * 
 * These notetags are general purpose notetags that have became available
 * through this plugin.
 * 
 * ---
 * 
 * <PTB Help>
 *  description
 *  description
 * </PTB Help>
 *
 * - Used for: Skill, Item Notetags
 * - If your game happens to support the ability to change battle systems, this
 *   notetag lets you change how the skill/item's help description text will
 *   look under PTB.
 * - This is primarily used if the skill behaves differently in PTB versus any
 *   other battle system.
 * - Replace 'description' with help text that's only displayed if the game's
 *   battle system is set to PTB.
 *
 * ---
 * 
 * === Press Action Cost-Related Notetags ===
 * 
 * ---
 *
 * <PTB Press Consume: x>
 *
 * - Used for: Skill, Item Notetags
 * - Changes the PTB press action cost of this skill/item to consume 'x'.
 * - Replace 'x' with a number value representing the press action cost
 *   required to perform the skill.
 * - When consuming press actions, it will consume half actions before full
 *   actions.
 * - The consume/convert type can be altered by the skill results.
 *
 * ---
 *
 * <PTB Press Convert: x>
 *
 * - Used for: Skill, Item Notetags
 * - Changes the PTB press action cost of this skill/item to convert 'x'.
 * - Replace 'x' with a number value representing the press action cost
 *   required to perform the skill.
 * - When converting press actions, it will convert full actions into half
 *   actions. If there are no full actions to convert, it will instead consume
 *   half actions.
 * - The consume/convert type can be altered by the skill results.
 *
 * ---
 *
 * <PTB Press Compress: x>
 *
 * - Used for: Skill, Item Notetags
 * - Changes the PTB press action cost of this skill/item to compress 'x'.
 * - Replace 'x' with a number value representing the press action cost
 *   required to perform the skill.
 * - When converting press actions, it will consume any half actions. If there
 *   are no half actions, it will convert full actions into half actions.
 * - The consume/convert type can be altered by the skill results.
 *
 * ---
 *
 * <PTB Press Force Consume: x>
 *
 * - Used for: Skill, Item Notetags
 * - Changes the PTB press action cost of this skill/item to consume 'x'.
 * - Replace 'x' with a number value representing the press action cost
 *   required to perform the skill.
 * - When consuming press actions, it will consume half actions before full
 *   actions.
 * - The consume/convert type CANNOT be altered by the skill results.
 *
 * ---
 *
 * <PTB Press Force Convert: x>
 *
 * - Used for: Skill, Item Notetags
 * - Changes the PTB press action cost of this skill/item to convert 'x'.
 * - Replace 'x' with a number value representing the press action cost
 *   required to perform the skill.
 * - When converting press actions, it will convert full actions into half
 *   actions. If there are no full actions to convert, it will instead consume
 *   half actions.
 * - The consume/convert type CANNOT be altered by the skill results.
 *
 * ---
 *
 * <PTB Press Force Compress: x>
 *
 * - Used for: Skill, Item Notetags
 * - Changes the PTB press action cost of this skill/item to compress 'x'.
 * - Replace 'x' with a number value representing the press action cost
 *   required to perform the skill.
 * - When converting press actions, it will consume any half actions. If there
 *   are no half actions, it will convert full actions into half actions.
 * - The consume/convert type CANNOT be altered by the skill results.
 *
 * ---
 *
 * <PTB Hide Press Cost>
 *
 * - Used for: Skill, Item Notetags
 * - Makes the PTB press cost for this skill/item hidden regardless of Plugin
 *   Parameter settings.
 *
 * ---
 *
 * <PTB Show Press Cost>
 *
 * - Used for: Skill, Item Notetags
 * - Makes the PTB press cost for this skill/item visible regardless of Plugin
 *   Parameter settings.
 *
 * ---
 * 
 * === Post Gain-Related Notetags ===
 * 
 * ---
 * 
 * <PTB Post-Gain Full Actions: +x>
 * <PTB Post-Lose Full Actions: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Causes the user's team to gain full actions AFTER paying the action costs.
 * - Replace 'x' with a number representing the amount of full actions to gain
 *   or lose.
 * 
 * ---
 * 
 * <PTB Post-Gain Half Actions: +x>
 * <PTB Post-Lose Half Actions: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Causes the user's team to gain half actions AFTER paying the action costs.
 * - Replace 'x' with a number representing the amount of half actions to gain
 *   or lose.
 * 
 * ---
 * 
 * === Mechanics-Related Notetags ===
 * 
 * ---
 *
 * <PTB Pass Turn>
 *
 * - Used for: Skill, Item Notetags
 * - If a battler uses this skill/item, then even if there are actions left for
 *   the team to perform, that battler would no longer be able to input as they
 *   have already passed their turn.
 *
 * ---
 *
 * <PTB Full Actions: +x>
 * <PTB Full Actions: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Battlers associated with these trait objects can increase or decrease the
 *   maximum number of full actions performed each turn.
 * - Replace 'x' with a number representing the increase or decrease in action
 *   count per turn.
 * - Depending on the Plugin Parameters, altering the max value can result in
 *   gaining or losing remaining actions for the current turn.
 *
 * ---
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: PTB Press Count Visibility
 * - Determine the visibility of the PTB Press Count Display.
 *
 *   Visibility:
 *   - Changes the visibility of the PTB Press Count Display.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * Determines the general settings of the PTB Battle System. These settings
 * range from determining how the Press Count resources and costs are
 * displayed to the text that appear during team shifting.
 *
 * ---
 *
 * Press Counts
 * 
 *   Full Name:
 *   - What is the full name of "Press Counts" in your game?
 * 
 *   Abbreviation:
 *   - What is the abbreviation of "Press Counts" in your game?
 * 
 *   Cost Format:
 *   - How are Press Count costs displayed?
 *   - %1 - Cost, %2 - Abbr Text, %3 - Icon
 *
 * ---
 *
 * Icons
 * 
 *   Cost Icons
 * 
 *     Consume Icon:
 *     - What icon is used to represent consumed costs?
 * 
 *     Convert Icon:
 *     - What icon is used to represent converted costs?
 * 
 *     Compress Icon:
 *     - What icon is used to represent compressed costs?
 * 
 *   Actors
 * 
 *     Full Action Icon:
 *     - What icon is used to represent actor full actions?
 * 
 *     Half Action Icon:
 *     - What icon is used to represent actor half actions?
 * 
 *   Enemies
 * 
 *     Full Action Icon:
 *     - What icon is used to represent actor full actions?
 * 
 *     Half Action Icon:
 *     - What icon is used to represent actor half actions?
 * 
 *   Empty Action Icon:
 *   - What icon is used to represent empty actions?
 *
 * ---
 *
 * Team Shift
 * 
 *   Party's Turn:
 *   - Text that appears when it's the party's turn.
 *   - %1 - Party Name
 * 
 *   Enemy's Turn:
 *   - Text that appears when it's the enemy's turn.
 * 
 *   Wait Frames:
 *   - How many frames to wait in between team changes?
 *
 * ---
 *
 * Displayed Costs
 * 
 *   Cost Position Front?:
 *   - Put the action cost at the front of skill/item costs?
 * 
 *   Show Cost: Attack:
 *   - Show the action cost for the Attack command?
 * 
 *   Show Cost: Guard:
 *   - Show the action cost for the Guard command?
 * 
 *   Show Cost: 0 Action:
 *   - Show the action cost when the cost is 0 action?
 * 
 *   Show Cost: 1 Action:
 *   - Show the action cost when the cost is 1 action?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * Determines the mechanics of the PTB Battle System. From here, you can
 * enable or disable core mechanics, determine how to determine turn advantage,
 * and how the various supporting mechanics operate.
 *
 * ---
 *
 * Main Mechanics
 * 
 *   Guard > Pass Turn?:
 *   - Does guarding cause a battler to pass turn?
 * 
 *   Gain Differences?:
 *   - If the max Action Count for a team changes, gain the difference in
 *     value if positive?
 * 
 *   Lose Differences?:
 *   - If the max Action Count for a team changes, lose the difference in
 *     value if negative?
 * 
 *   State/Buff Updates:
 *   - If enabled, update state/buff turns only on opponent turns.
 *   - Otherwise, they occur every turn.
 *
 * ---
 *
 * Turn Advantage
 * 
 *   Neutral Advantage:
 *   - For a neutral advantage battle, what determines which team goes first?
 *     - Random - 50% chance on which team goes first
 *     - Player - Player's team always goes first.
 *     - Lowest AGI - Battler with lowest AGI's team goes first
 *     - Average AGI - Team with the highest average AGI goes first
 *     - Highest AGI - Battler with highest AGI's team goes first
 *     - Total AGI - Team with highest total AGI goes first
 *
 * ---
 *
 * Action Generation
 * 
 *   Base:
 *   - What is the starting base number of actions that are generated per
 *     battler each turn?
 * 
 *   AGI Buff Influence?:
 *   - Do AGI buffs give +1 for each stack?
 * 
 *   AGI Debuff Influence?:
 *   - Do AGI debuffs give -1 for each stack?
 * 
 *   Maximum Actions:
 *   - What is the absolute maximum number of actions a team can have
 *     each turn?
 * 
 *   Minimum Actions:
 *   - What is the bare minimum number of actions a team can have each turn?
 * 
 *   Allow Overflow?:
 *   - Allow current actions to overflow?
 *   - Or let them cap at the current team max?
 *
 * ---
 *
 * Default Press Costs
 * 
 *   Skills:
 * 
 *     Cost Type:
 *     - What is the default press cost type for skills?
 * 
 *     Cost Value:
 *     - What is the default press cost value for skills?
 * 
 *   Items:
 * 
 *     Cost Type:
 *     - What is the default press cost type for items?
 * 
 *     Cost Value:
 *     - What is the default press cost value for items?
 *
 * ============================================================================
 * Plugin Parameters: Press Mechanics
 * ============================================================================
 *
 * More indepth control over how the Press Count mechanics work for various
 * scenarios during battle.
 *
 * ---
 *
 * Guarding
 * 
 *   Alter Changeability:
 *   - Allow the cost type and value to be changeable?
 *     - Unchanged - Cost type is unchanged after this effect
 *     - Permanent - Cost type can no longer be changed after
 *     - Temporary - Cost type can still be changed after
 * 
 *   Alter Cost Type:
 *   - Change the cost type to this scenario.
 *   - Use 'Unchanged' for no changes.
 *     - Unchanged - No changes are made
 *     - Consume - Removes half, otherwise consumes full
 *     - Convert - Converts full => half, otherwise consumes half
 *     -Compress - Consumes half, otherwise converts full => half
 * 
 *   Alter Cost Value:
 *   - What is the default action cost for this scenario?
 * 
 *   Priority:
 *   - What is this scenario's priority? Scenario outcomes with equal or lower
 *     priorities cannot override types and costs.
 *
 * ---
 *
 * Miss an Attack
 * 
 *   Alter Changeability:
 *   - Allow the cost type and value to be changeable?
 *     - Unchanged - Cost type is unchanged after this effect
 *     - Permanent - Cost type can no longer be changed after
 *     - Temporary - Cost type can still be changed after
 * 
 *   Alter Cost Type:
 *   - Change the cost type to this scenario.
 *   - Use 'Unchanged' for no changes.
 *     - Unchanged - No changes are made
 *     - Consume - Removes half, otherwise consumes full
 *     - Convert - Converts full => half, otherwise consumes half
 *     -Compress - Consumes half, otherwise converts full => half
 * 
 *   Alter Cost Value:
 *   - What is the default action cost for this scenario?
 * 
 *   Priority:
 *   - What is this scenario's priority? Scenario outcomes with equal or lower
 *     priorities cannot override types and costs.
 *
 * ---
 *
 * Critical Hit!
 * 
 *   Alter Changeability:
 *   - Allow the cost type and value to be changeable?
 *     - Unchanged - Cost type is unchanged after this effect
 *     - Permanent - Cost type can no longer be changed after
 *     - Temporary - Cost type can still be changed after
 * 
 *   Alter Cost Type:
 *   - Change the cost type to this scenario.
 *   - Use 'Unchanged' for no changes.
 *     - Unchanged - No changes are made
 *     - Consume - Removes half, otherwise consumes full
 *     - Convert - Converts full => half, otherwise consumes half
 *     -Compress - Consumes half, otherwise converts full => half
 * 
 *   Alter Cost Value:
 *   - What is the default action cost for this scenario?
 * 
 *   Priority:
 *   - What is this scenario's priority? Scenario outcomes with equal or lower
 *     priorities cannot override types and costs.
 *
 * ---
 *
 * Elemental Resist!
 * 
 *   Maximum Rate:
 *   - What is the maximum elemental rate for an attack to be considered
 *     a resistance?
 * 
 *   Alter Changeability:
 *   - Allow the cost type and value to be changeable?
 *     - Unchanged - Cost type is unchanged after this effect
 *     - Permanent - Cost type can no longer be changed after
 *     - Temporary - Cost type can still be changed after
 * 
 *   Alter Cost Type:
 *   - Change the cost type to this scenario.
 *   - Use 'Unchanged' for no changes.
 *     - Unchanged - No changes are made
 *     - Consume - Removes half, otherwise consumes full
 *     - Convert - Converts full => half, otherwise consumes half
 *     -Compress - Consumes half, otherwise converts full => half
 * 
 *   Alter Cost Value:
 *   - What is the default action cost for this scenario?
 * 
 *   Priority:
 *   - What is this scenario's priority? Scenario outcomes with equal or lower
 *     priorities cannot override types and costs.
 *
 * ---
 *
 * Elemental Weakness!
 * 
 *   Minimum Rate:
 *   - What is the minimum elemental rate for an attack to be considered
 *     a weakness?
 * 
 *   Alter Changeability:
 *   - Allow the cost type and value to be changeable?
 *     - Unchanged - Cost type is unchanged after this effect
 *     - Permanent - Cost type can no longer be changed after
 *     - Temporary - Cost type can still be changed after
 * 
 *   Alter Cost Type:
 *   - Change the cost type to this scenario.
 *   - Use 'Unchanged' for no changes.
 *     - Unchanged - No changes are made
 *     - Consume - Removes half, otherwise consumes full
 *     - Convert - Converts full => half, otherwise consumes half
 *     -Compress - Consumes half, otherwise converts full => half
 * 
 *   Alter Cost Value:
 *   - What is the default action cost for this scenario?
 * 
 *   Priority:
 *   - What is this scenario's priority? Scenario outcomes with equal or lower
 *     priorities cannot override types and costs.
 *
 * ---
 *
 * Element Immunity!
 * 
 *   Alter Changeability:
 *   - Allow the cost type and value to be changeable?
 *     - Unchanged - Cost type is unchanged after this effect
 *     - Permanent - Cost type can no longer be changed after
 *     - Temporary - Cost type can still be changed after
 * 
 *   Alter Cost Type:
 *   - Change the cost type to this scenario.
 *   - Use 'Unchanged' for no changes.
 *     - Unchanged - No changes are made
 *     - Consume - Removes half, otherwise consumes full
 *     - Convert - Converts full => half, otherwise consumes half
 *     -Compress - Consumes half, otherwise converts full => half
 * 
 *   Alter Cost Value:
 *   - What is the default action cost for this scenario?
 * 
 *   Priority:
 *   - What is this scenario's priority? Scenario outcomes with equal or lower
 *     priorities cannot override types and costs.
 *
 * ---
 *
 * Absorb Element!
 * 
 *   Alter Changeability:
 *   - Allow the cost type and value to be changeable?
 *     - Unchanged - Cost type is unchanged after this effect
 *     - Permanent - Cost type can no longer be changed after
 *     - Temporary - Cost type can still be changed after
 * 
 *   Alter Cost Type:
 *   - Change the cost type to this scenario.
 *   - Use 'Unchanged' for no changes.
 *     - Unchanged - No changes are made
 *     - Consume - Removes half, otherwise consumes full
 *     - Convert - Converts full => half, otherwise consumes half
 *     -Compress - Consumes half, otherwise converts full => half
 * 
 *   Alter Cost Value:
 *   - What is the default action cost for this scenario?
 * 
 *   Priority:
 *   - What is this scenario's priority? Scenario outcomes with equal or lower
 *     priorities cannot override types and costs.
 *
 * ---
 *
 * Reflect Attack!
 * 
 *   Alter Changeability:
 *   - Allow the cost type and value to be changeable?
 *     - Unchanged - Cost type is unchanged after this effect
 *     - Permanent - Cost type can no longer be changed after
 *     - Temporary - Cost type can still be changed after
 * 
 *   Alter Cost Type:
 *   - Change the cost type to this scenario.
 *   - Use 'Unchanged' for no changes.
 *     - Unchanged - No changes are made
 *     - Consume - Removes half, otherwise consumes full
 *     - Convert - Converts full => half, otherwise consumes half
 *     -Compress - Consumes half, otherwise converts full => half
 * 
 *   Alter Cost Value:
 *   - What is the default action cost for this scenario?
 * 
 *   Priority:
 *   - What is this scenario's priority? Scenario outcomes with equal or lower
 *     priorities cannot override types and costs.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Sound Feedback
 * ============================================================================
 *
 * Sound effects for player feedback on in-battle changes to Press Counts.
 * These sound effects are played only when certain results have happened in
 * order to proc the correct sound effect. If multiple things happen at a time,
 * the sound effect priority list will go as follows from top to bottom:
 * 
 * 1. Lose >1 Full Action
 * 2. Lose >1 Half Action
 * 3. Gain Full Action
 * 4. Gain Half Action
 *
 * ---
 *
 * Gain Full Action
 * 
 * Gain Half Action
 *
 * Lose >1 Full Action
 * 
 * Lose >1 Half Action
 * 
 *   Filename:
 *   - Filename of the sound effect played.
 * 
 *   Volume:
 *   - Volume of the sound effect played.
 * 
 *   Pitch:
 *   - Pitch of the sound effect played.
 * 
 *   Pan:
 *   - Pan of the sound effect played.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Press Count Display Settings
 * ============================================================================
 *
 * Adjust the settings for the Press Count Display. They appear in the upper
 * or lower corners of the screen for the player party and the enemy troop.
 *
 * ---
 *
 * Display Settings
 * 
 *   Draw Horizontally?:
 *   - Which direction do you want the Press Count Display to go?
 * 
 *   Bottom Position?:
 *   - Place the Press Count Display towards the bottom of the screen?
 * 
 *     Offset Top Log Y?:
 *     - If using the top position, offset the log window's Y position.
 * 
 *     Reposition for Help?:
 *     - If using the top position, reposition the display when the help window
 *       is open?
 *
 * ---
 *
 * Reposition For Help
 * 
 *   Repostion X By:
 *   Repostion Y By:
 *   - Reposition the display's X/Y coordinates by this much when the
 *     Help Window is visible.
 *
 * ---
 *
 * Picture Settings
 * 
 *   Actors:
 * 
 *     Full Action Picture:
 *     - Optional. Place an image for an actor full action instead of an icon?
 * 
 *     Half Action Picture:
 *     - Optional. Place an image for an actor half action instead of an icon?
 * 
 *   Enemies:
 * 
 *     Full Action Picture:
 *     - Optional. Place an image for an enemy full action instead of an icon?
 * 
 *     Half Action Picture:
 *     - Optional. Place an image for an enemy half action instead of an icon?
 * 
 *   Empty Action Picture:
 *   - Optional. Place an image for an empty action instead of an icon?
 *
 * ---
 *
 * Coordinates
 * 
 *   Screen Buffer X:
 *   Screen Buffer Y:
 *   - Buffer from the the edge of the screen's X/Y by this much.
 * 
 *   Actor Offset X:
 *   Actor Offset Y:
 *   Enemy Offset X:
 *   Enemy Offset Y:
 *   - Offset the actor/enemy images' X/Y by this much.
 *
 * ---
 *
 * Draw Settings
 * 
 *   Max Actions Visible:
 *   - How many action slots max should be drawn for each team?
 * 
 *   Image Size:
 *   - What is the size of the icons or pictures for the action slots?
 * 
 *   Gap Distance:
 *   - How wide should the gab between each slot be in pixels?
 * 
 *   Icon Smoothing?:
 *   - Smooth the display for icons?
 *   - Or pixelate them?
 * 
 *   Picture Smoothing?:
 *   - Smooth the display for pictures?
 *   - Or pixelate them?
 *
 * ---
 *
 * Turns Remaining
 * 
 *   Show Number?:
 *   - Show a number to display the actions remaining?
 * 
 *   Font Size:
 *   - What font size should be used for this number?
 * 
 *   Offset X:
 *   Offset Y:
 *   - Offset the remaining actions number X/Y.
 *
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 * 
 * 7. If this VisuStella MZ plugin is a paid product, all project team members
 * must purchase their own individual copies of the paid product if they are to
 * use it. Usage includes working on related game mechanics, managing related
 * code, and/or using related Plugin Commands and features. Redistribution of
 * the plugin and/or its code to other members of the team is NOT allowed
 * unless they own the plugin itself as that conflicts with Article 4.
 * 
 * 8. Any extensions and/or addendums made to this plugin's Terms of Use can be
 * found on VisuStella.com and must be followed.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 * 
 * Team VisuStella
 * * Yanfly
 * * Olivia
 * * Arisu
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.07: January 20, 2023
 * * Bug Fixes!
 * ** Custom graphics for press turn icons should now be working properly.
 *    Fix made by Olivia.
 * 
 * Version 1.06: October 20, 2022
 * * Bug Fixes!
 * ** Fixed problem with the Action Count Display's Actor Offset Y not working
 *    properly. Fix made by Arisu.
 * 
 * Version 1.05: June 2, 2022
 * * Bug Fixes!
 * ** Fixed a bug where Force Actions do not work when there's only one action
 *    left for the turn. Fix made by Olivia.
 * 
 * Version 1.04: April 21, 2022
 * * Bug Fixes!
 * ** Fixed a bug that prevents the battle system from shifting back to the
 *    default battle system after an enemy counter attack. Fix made by Olivia.
 * 
 * Version 1.03: April 14, 2022
 * * Compatibility Update!
 * ** Now works more compatible with counters. Update made by Olivia.
 * 
 * Verison 1.02: March 17, 2022
 * * Bug Fixes!
 * ** Death by slip damage will now perform the proper death animation.
 *    Fix made by Olivia.
 * 
 * Version 1.01: October 28, 2021
 * * Feature Update!
 * ** Plugin now more closely fits the original source material.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.00 Official Release Date: November 1, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemActionCountVisibility
 * @text System: PTB Press Count Visibility
 * @desc Determine the visibility of the PTB Press Count Display.
 *
 * @arg Visible:eval
 * @text Visibility
 * @type boolean
 * @on Visible
 * @off Hidden
 * @desc Changes the visibility of the PTB Press Count Display.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param BattleSystemPTB
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param General:struct
 * @text General Settings
 * @type struct<General>
 * @desc Determines the general settings of the PTB Battle System.
 * @default {"ActionCounts":"","ActionCountFull:str":"Press Count","ActionCountAbbr:str":"PC","ActionCountCostFmt:str":"\\FS[22]\\C[0]×%1%3\\C[0]","Icons":"","CostIcons":"","CostConsumeIcon:num":"165","CostConvertIcon:num":"170","CostCompressIcon:num":"170","ActorIcons":"","ActorActionsIcon:num":"165","ActorHalfActionsIcon:num":"170","EnemyIcons":"","EnemyActionsIcon:num":"162","EnemyHalfActionsIcon:num":"169","EmptyActionsIcon:num":"161","TeamShift":"","PartyTeamShiftFmt:str":"%1's Turn!","TroopTeamShiftFmt:str":"Opponent's Turn!","TeamShiftWait:num":"60","DisplayedCosts":"","CostPosition:eval":"false","ShowCostForAttack:eval":"false","ShowCostForGuard:eval":"false","Show_0_Action_Cost:eval":"true","Show_1_Action_Cost:eval":"true"}
 *
 * @param Mechanics:struct
 * @text Mechanics Settings
 * @type struct<Mechanics>
 * @desc Determines the mechanics of the PTB Battle System.
 * @default {"Main":"","GuardPass:eval":"true","GainDiff:eval":"true","LoseDiff:eval":"false","StateBuffUpdate:eval":"true","TurnAdvantage":"","NeutralAdvantage:str":"average agi","ActionGeneration":"","GenerateBase:num":"1","AgiBuff:eval":"true","AgiDebuff:eval":"false","MaxActions:num":"99","MinActions:num":"1","AllowOverflow:eval":"true","DefaultCost":"","SkillCosts":"","DefaultCostTypeSkill:str":"consume","DefaultCostSkill:num":"1","ItemCosts":"","DefaultCostTypeItem:str":"consume","DefaultCostItem:num":"1"}
 *
 * @param Press:struct
 * @text Press Mechanics
 * @parent Mechanics:struct
 * @type struct<Press>
 * @desc More indepth control over how the Press Count mechanics work for various scenarios during battle.
 * @default {"Guard":"","guardChange:str":"permanent","guardType:str":"compress","guardCost:num":"+0","guardPriority:num":"100","Miss":"","missChange:str":"temporary","missType:str":"consume","missCost:num":"+1","missPriority:num":"80","Critical":"","criticalChange:str":"temporary","criticalType:str":"convert","criticalCost:num":"+0","criticalPriority:num":"50","Resist":"","resistMaximumRate:num":"0.95","resistChange:str":"permanent","resistType:str":"consume","resistCost:num":"+0","resistPriority:num":"70","Weakness":"","weaknessMinimumRate:num":"1.05","weaknessChange:str":"temporary","weaknessType:str":"convert","weaknessCost:num":"+0","weaknessPriority:num":"60","Immune":"","immuneChange:str":"permanent","immuneType:str":"consume","immuneCost:num":"+200","immunePriority:num":"90","Absorb":"","absorbChange:str":"permanent","absorbType:str":"consume","absorbCost:num":"+200","absorbPriority:num":"90","Reflect":"","reflectChange:str":"permanent","reflectType:str":"consume","reflectCost:num":"+200","reflectPriority:num":"90"}
 *
 * @param Sound:struct
 * @text Sound Feedback
 * @parent Mechanics:struct
 * @type struct<Sound>
 * @desc Sound effects for player feedback on in-battle changes to Press Counts.
 * @default {"GainFull":"","GainFullName:str":"Skill3","GainFullVolume:num":"90","GainFullPitch:num":"100","GainFullPan:num":"0","GainHalf":"","GainHalfName:str":"Skill3","GainHalfVolume:num":"90","GainHalfPitch:num":"120","GainHalfPan:num":"0","LoseFull":"","LoseFullName:str":"Shot3","LoseFullVolume:num":"90","LoseFullPitch:num":"100","LoseFullPan:num":"0","LoseHalf":"","LoseHalfName:str":"Shot3","LoseHalfVolume:num":"90","LoseHalfPitch:num":"120","LoseHalfPan:num":"0"}
 *
 * @param ActionCountDisplay:struct
 * @text Action Count Display
 * @type struct<ActionCountDisplay>
 * @desc Adjust the settings for the Action Count Display.
 * @default {"Display":"","DrawHorz:eval":"true","BottomPosition:eval":"true","LogWindowTopOffsetY:num":"40","RepositionTopForHelp:eval":"true","Reposition":"","RepositionTopHelpX:num":"0","RepositionTopHelpY:num":"160","Pictures":"","ActorPictures":"","ActorActionFullPicture:str":"","ActorActionHalfPicture:str":"","EnemyPictures":"","EnemyActionFullPicture:str":"","EnemyActionHalfPicture:str":"","EmptyActionPicture:str":"","Coordinates":"","ScreenBufferX:num":"16","ScreenBufferY:num":"16","ActorOffsetX:num":"0","ActorOffsetY:num":"0","EnemyOffsetX:num":"0","EnemyOffsetY:num":"0","DrawSettings":"","MaxVisible:num":"10","ImageSize:num":"32","ImageGapDistance:num":"2","IconSmoothing:eval":"false","PictureSmoothing:eval":"true","TurnsRemaining":"","DrawActionsRemaining:eval":"true","ActionsRemainingFontSize:num":"26","ActionsRemainingOffsetX:num":"0","ActionsRemainingOffsetY:num":"0"}
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * General Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~General:
 *
 * @param ActionCounts
 * @text Press Counts
 *
 * @param ActionCountFull:str
 * @text Full Name
 * @parent ActionCounts
 * @desc What is the full name of "Press Counts" in your game?
 * @default Press Count
 *
 * @param ActionCountAbbr:str
 * @text Abbreviation
 * @parent ActionCounts
 * @desc What is the abbreviation of "Press Counts" in your game?
 * @default PC
 *
 * @param ActionCountCostFmt:str
 * @text Cost Format
 * @parent ActionCounts
 * @desc How are Press Count costs displayed?
 * %1 - Cost, %2 - Abbr Text, %3 - Icon
 * @default \FS[22]\C[0]×%1%3\C[0]
 *
 * @param Icons
 * 
 * @param CostIcons
 * @text Cost Icons
 * @parent Icons
 *
 * @param CostConsumeIcon:num
 * @text Consume Icon
 * @parent CostIcons
 * @desc What icon is used to represent consumed costs?
 * @default 165
 *
 * @param CostConvertIcon:num
 * @text Convert Icon
 * @parent CostIcons
 * @desc What icon is used to represent converted costs?
 * @default 170
 *
 * @param CostCompressIcon:num
 * @text Compress Icon
 * @parent CostIcons
 * @desc What icon is used to represent compressed costs?
 * @default 170
 * 
 * @param ActorIcons
 * @text Actors
 * @parent Icons
 *
 * @param ActorActionsIcon:num
 * @text Full Action Icon
 * @parent ActorIcons
 * @desc What icon is used to represent actor full actions?
 * @default 165
 *
 * @param ActorHalfActionsIcon:num
 * @text Half Action Icon
 * @parent ActorIcons
 * @desc What icon is used to represent actor half actions?
 * @default 170
 * 
 * @param EnemyIcons
 * @text Enemies
 * @parent Icons
 *
 * @param EnemyActionsIcon:num
 * @text Full Action Icon
 * @parent EnemyIcons
 * @desc What icon is used to represent enemy full actions?
 * @default 162
 *
 * @param EnemyHalfActionsIcon:num
 * @text Half Action Icon
 * @parent EnemyIcons
 * @desc What icon is used to represent enemy half actions?
 * @default 169
 *
 * @param EmptyActionsIcon:num
 * @text Empty Action Icon
 * @parent Icons
 * @desc What icon is used to represent empty actions?
 * @default 161
 *
 * @param TeamShift
 * @text Team Shift
 *
 * @param PartyTeamShiftFmt:str
 * @text Party's Turn
 * @parent TeamShift
 * @desc Text that appears when it's the party's turn.
 * %1 - Party Name
 * @default %1's Turn!
 *
 * @param TroopTeamShiftFmt:str
 * @text Enemy's Turn
 * @parent TeamShift
 * @desc Text that appears when it's the enemy's turn.
 * @default Opponent's Turn!
 *
 * @param TeamShiftWait:num
 * @text Wait Frames
 * @parent TeamShift
 * @type number
 * @desc How many frames to wait in between team changes?
 * @default 60
 *
 * @param DisplayedCosts
 * @text Displayed Costs
 *
 * @param CostPosition:eval
 * @text Cost Position Front?
 * @parent DisplayedCosts
 * @type boolean
 * @on Front
 * @off Back
 * @desc Put the action cost at the front of skill/item costs?
 * @default false
 *
 * @param ShowCostForAttack:eval
 * @text Show Cost: Attack
 * @parent DisplayedCosts
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the action cost for the Attack command?
 * @default false
 *
 * @param ShowCostForGuard:eval
 * @text Show Cost: Guard
 * @parent DisplayedCosts
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the action cost for the Guard command?
 * @default false
 *
 * @param Show_0_Action_Cost:eval
 * @text Show Cost: 0 Action
 * @parent DisplayedCosts
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the action cost when the cost is 0 action?
 * @default true
 *
 * @param Show_1_Action_Cost:eval
 * @text Show Cost: 1 Action
 * @parent DisplayedCosts
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the action cost when the cost is 1 action?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Mechanics Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Mechanics:
 *
 * @param Main
 * @text Main Mechanics
 *
 * @param GuardPass:eval
 * @text Guard > Pass Turn?
 * @parent Main
 * @type boolean
 * @on Pass Turn
 * @off Don't Pass
 * @desc Does guarding cause a battler to pass turn?
 * @default true
 *
 * @param GainDiff:eval
 * @text Gain Differences?
 * @parent Main
 * @type boolean
 * @on Gain Differences
 * @off Keep Same
 * @desc If the max Action Count for a team changes,
 * gain the difference in value if positive?
 * @default true
 *
 * @param LoseDiff:eval
 * @text Lose Differences?
 * @parent Main
 * @type boolean
 * @on Lose Differences
 * @off Keep Same
 * @desc If the max Action Count for a team changes,
 * lose the difference in value if negative?
 * @default false
 *
 * @param StateBuffUpdate:eval
 * @text State/Buff Updates
 * @parent Main
 * @type boolean
 * @on Opponent Turns Only
 * @off All Turns
 * @desc If enabled, update state/buff turns only on opponent
 * turns. Otherwise, they occur every turn.
 * @default true
 *
 * @param TurnAdvantage
 * @text Turn Advantage
 *
 * @param NeutralAdvantage:str
 * @text Neutral Advantage
 * @parent TurnAdvantage
 * @type select
 * @option Random - 50% chance on which team goes first
 * @value random
 * @option Player - Player's team always goes first
 * @value player
 * @option Enemy - Enemy's team always goes first
 * @value enemy
 * @option Lowest AGI - Battler with lowest AGI's team goes first
 * @value lowest agi
 * @option Average AGI - Team with the highest average AGI goes first
 * @value average agi
 * @option Highest AGI - Battler with highest AGI's team goes first
 * @value highest agi
 * @option Total AGI - Team with highest total AGI goes first
 * @value total agi
 * @desc For a neutral advantage battle, what determines which team goes first?
 * @default average agi
 *
 * @param ActionGeneration
 * @text Action Generation
 *
 * @param GenerateBase:num
 * @text Base
 * @parent ActionGeneration
 * @type number
 * @desc What is the starting base number of actions that are generated per battler each turn?
 * @default 1
 *
 * @param AgiBuff:eval
 * @text AGI Buff Influence?
 * @parent ActionGeneration
 * @type boolean
 * @on Influence
 * @off No Influence
 * @desc Do AGI buffs give +1 for each stack?
 * @default true
 *
 * @param AgiDebuff:eval
 * @text AGI Debuff Influence?
 * @parent ActionGeneration
 * @type boolean
 * @on Influence
 * @off No Influence
 * @desc Do AGI debuffs give -1 for each stack?
 * @default false
 *
 * @param MaxActions:num
 * @text Maximum Actions
 * @parent ActionGeneration
 * @type number
 * @desc What is the absolute maximum number of actions a team can have each turn?
 * @default 99
 *
 * @param MinActions:num
 * @text Minimum Actions
 * @parent ActionGeneration
 * @type number
 * @desc What is the bare minimum number of actions a team can have each turn?
 * @default 1
 *
 * @param AllowOverflow:eval
 * @text Allow Overflow?
 * @parent ActionGeneration
 * @type boolean
 * @on Allow
 * @off Cap to Max
 * @desc Allow current actions to overflow?
 * Or let them cap at the current team max?
 * @default true
 *
 * @param DefaultCost
 * @text Default Press Costs
 * 
 * @param SkillCosts
 * @text Skills
 * @parent DefaultCost
 *
 * @param DefaultCostTypeSkill:str
 * @text Cost Type
 * @parent SkillCosts
 * @type select
 * @option Consume - Removes half, otherwise consumes full
 * @value consume
 * @option Convert - Converts full => half, otherwise consumes half
 * @value convert
 * @option Compress - Consumes half, otherwise converts full => half
 * @value compress
 * @desc What is the default press cost type for skills?
 * @default consume
 *
 * @param DefaultCostSkill:num
 * @text Cost Value
 * @parent SkillCosts
 * @type number
 * @desc What is the default press cost value for skills?
 * @default 1
 * 
 * @param ItemCosts
 * @text Items
 * @parent DefaultCost
 *
 * @param DefaultCostTypeItem:str
 * @text Cost Type
 * @parent ItemCosts
 * @type select
 * @option Consume - Removes half, otherwise consumes full
 * @value consume
 * @option Convert - Converts full => half, otherwise consumes half
 * @value convert
 * @option Compress - Consumes half, otherwise converts full => half
 * @value compress
 * @desc What is the default press cost type for items?
 * @default consume
 *
 * @param DefaultCostItem:num
 * @text Cost Value
 * @parent ItemCosts
 * @type number
 * @desc What is the default action cost for items?
 * @default 1
 * 
 */
/* ----------------------------------------------------------------------------
 * Press Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Press:
 *
 * @param Guard
 * @text Guarding
 *
 * @param guardChange:str
 * @text Alter Changeability
 * @parent Guard
 * @type select
 * @option Unchanged - Cost type is unchanged after this effect
 * @value unchanged
 * @option Permanent - Cost type can no longer be changed after
 * @value permanent
 * @option Temporary - Cost type can still be changed after
 * @value temporary
 * @desc Allow the cost type and value to be changeable?
 * @default permanent
 *
 * @param guardType:str
 * @text Alter Cost Type
 * @parent Guard
 * @type select
 * @option Unchanged - No changes are made
 * @value unchanged
 * @option Consume - Removes half, otherwise consumes full
 * @value consume
 * @option Convert - Converts full => half, otherwise consumes half
 * @value convert
 * @option Compress - Consumes half, otherwise converts full => half
 * @value compress
 * @desc Change the cost type to this scenario.
 * Use 'Unchanged' for no changes.
 * @default compress
 *
 * @param guardCost:num
 * @text Alter Cost Value
 * @parent Guard
 * @desc What is the default action cost for this scenario?
 * @default +0
 *
 * @param guardPriority:num
 * @text Priority
 * @parent Guard
 * @type number
 * @desc What is this scenario's priority? Scenario outcomes with
 * equal or lower priorities cannot override types and costs.
 * @default 100
 *
 * @param Miss
 * @text Miss an Attack
 *
 * @param missChange:str
 * @text Alter Changeability
 * @parent Miss
 * @type select
 * @option Unchanged - Cost type is unchanged after this effect
 * @value unchanged
 * @option Permanent - Cost type can no longer be changed after
 * @value permanent
 * @option Temporary - Cost type can still be changed after
 * @value temporary
 * @desc Allow the cost type and value to be changeable?
 * @default temporary
 *
 * @param missType:str
 * @text Alter Cost Type
 * @parent Miss
 * @type select
 * @option Unchanged - No changes are made
 * @value unchanged
 * @option Consume - Removes half, otherwise consumes full
 * @value consume
 * @option Convert - Converts full => half, otherwise consumes half
 * @value convert
 * @option Compress - Consumes half, otherwise converts full => half
 * @value compress
 * @desc Change the cost type to this scenario.
 * Use 'Unchanged' for no changes.
 * @default consume
 *
 * @param missCost:num
 * @text Alter Cost Value
 * @parent Miss
 * @desc What is the default action cost for this scenario?
 * @default +1
 *
 * @param missPriority:num
 * @text Priority
 * @parent Miss
 * @type number
 * @desc What is this scenario's priority? Scenario outcomes with
 * equal or lower priorities cannot override types and costs.
 * @default 80
 *
 * @param Critical
 * @text Critical Hit!
 *
 * @param criticalChange:str
 * @text Alter Changeability
 * @parent Critical
 * @type select
 * @option Unchanged - Cost type is unchanged after this effect
 * @value unchanged
 * @option Permanent - Cost type can no longer be changed after
 * @value permanent
 * @option Temporary - Cost type can still be changed after
 * @value temporary
 * @desc Allow the cost type and value to be changeable?
 * @default temporary
 *
 * @param criticalType:str
 * @text Alter Cost Type
 * @parent Critical
 * @type select
 * @option Unchanged - No changes are made
 * @value unchanged
 * @option Consume - Removes half, otherwise consumes full
 * @value consume
 * @option Convert - Converts full => half, otherwise consumes half
 * @value convert
 * @option Compress - Consumes half, otherwise converts full => half
 * @value compress
 * @desc Change the cost type to this scenario.
 * Use 'Unchanged' for no changes.
 * @default convert
 *
 * @param criticalCost:num
 * @text Alter Cost Value
 * @parent Critical
 * @desc What is the default action cost for this scenario?
 * @default +0
 *
 * @param criticalPriority:num
 * @text Priority
 * @parent Critical
 * @type number
 * @desc What is this scenario's priority? Scenario outcomes with
 * equal or lower priorities cannot override types and costs.
 * @default 50
 *
 * @param Resist
 * @text Element Resist!
 *
 * @param resistMaximumRate:num
 * @text Maximum Rate
 * @parent Resist
 * @desc What is the maximum elemental rate for an attack to be considered a resistance?
 * @default 0.95
 *
 * @param resistChange:str
 * @text Alter Changeability
 * @parent Resist
 * @type select
 * @option Unchanged - Cost type is unchanged after this effect
 * @value unchanged
 * @option Permanent - Cost type can no longer be changed after
 * @value permanent
 * @option Temporary - Cost type can still be changed after
 * @value temporary
 * @desc Allow the cost type and value to be changeable?
 * @default permanent
 *
 * @param resistType:str
 * @text Alter Cost Type
 * @parent Resist
 * @type select
 * @option Unchanged - No changes are made
 * @value unchanged
 * @option Consume - Removes half, otherwise consumes full
 * @value consume
 * @option Convert - Converts full => half, otherwise consumes half
 * @value convert
 * @option Compress - Consumes half, otherwise converts full => half
 * @value compress
 * @desc Change the cost type to this scenario.
 * Use 'Unchanged' for no changes.
 * @default consume
 *
 * @param resistCost:num
 * @text Alter Cost Value
 * @parent Resist
 * @desc What is the default action cost for this scenario?
 * @default +0
 *
 * @param resistPriority:num
 * @text Priority
 * @parent Resist
 * @type number
 * @desc What is this scenario's priority? Scenario outcomes with
 * equal or lower priorities cannot override types and costs.
 * @default 70
 *
 * @param Weakness
 * @text Element Weakness!
 *
 * @param weaknessMinimumRate:num
 * @text Minimum Rate
 * @parent Weakness
 * @desc What is the minimum elemental rate for an attack to be considered a weakness?
 * @default 1.05
 *
 * @param weaknessChange:str
 * @text Alter Changeability
 * @parent Weakness
 * @type select
 * @option Unchanged - Cost type is unchanged after this effect
 * @value unchanged
 * @option Permanent - Cost type can no longer be changed after
 * @value permanent
 * @option Temporary - Cost type can still be changed after
 * @value temporary
 * @desc Allow the cost type and value to be changeable?
 * @default temporary
 *
 * @param weaknessType:str
 * @text Alter Cost Type
 * @parent Weakness
 * @type select
 * @option Unchanged - No changes are made
 * @value unchanged
 * @option Consume - Removes half, otherwise consumes full
 * @value consume
 * @option Convert - Converts full => half, otherwise consumes half
 * @value convert
 * @option Compress - Consumes half, otherwise converts full => half
 * @value compress
 * @desc Change the cost type to this scenario.
 * Use 'Unchanged' for no changes.
 * @default convert
 *
 * @param weaknessCost:num
 * @text Alter Cost Value
 * @parent Weakness
 * @desc What is the default action cost for this scenario?
 * @default +0
 *
 * @param weaknessPriority:num
 * @text Priority
 * @parent Weakness
 * @type number
 * @desc What is this scenario's priority? Scenario outcomes with
 * equal or lower priorities cannot override types and costs.
 * @default 60
 *
 * @param Immune
 * @text Element Immunity!
 *
 * @param immuneChange:str
 * @text Alter Changeability
 * @parent Immune
 * @type select
 * @option Unchanged - Cost type is unchanged after this effect
 * @value unchanged
 * @option Permanent - Cost type can no longer be changed after
 * @value permanent
 * @option Temporary - Cost type can still be changed after
 * @value temporary
 * @desc Allow the cost type and value to be changeable?
 * @default permanent
 *
 * @param immuneType:str
 * @text Alter Cost Type
 * @parent Immune
 * @type select
 * @option Unchanged - No changes are made
 * @value unchanged
 * @option Consume - Removes half, otherwise consumes full
 * @value consume
 * @option Convert - Converts full => half, otherwise consumes half
 * @value convert
 * @option Compress - Consumes half, otherwise converts full => half
 * @value compress
 * @desc Change the cost type to this scenario.
 * Use 'Unchanged' for no changes.
 * @default consume
 *
 * @param immuneCost:num
 * @text Alter Cost Value
 * @parent Immune
 * @desc What is the default action cost for this scenario?
 * @default +200
 *
 * @param immunePriority:num
 * @text Priority
 * @parent Immune
 * @type number
 * @desc What is this scenario's priority? Scenario outcomes with
 * equal or lower priorities cannot override types and costs.
 * @default 90
 *
 * @param Absorb
 * @text Absorb Element!
 *
 * @param absorbChange:str
 * @text Alter Changeability
 * @parent Absorb
 * @type select
 * @option Unchanged - Cost type is unchanged after this effect
 * @value unchanged
 * @option Permanent - Cost type can no longer be changed after
 * @value permanent
 * @option Temporary - Cost type can still be changed after
 * @value temporary
 * @desc Allow the cost type and value to be changeable?
 * @default permanent
 *
 * @param absorbType:str
 * @text Alter Cost Type
 * @parent Absorb
 * @type select
 * @option Unchanged - No changes are made
 * @value unchanged
 * @option Consume - Removes half, otherwise consumes full
 * @value consume
 * @option Convert - Converts full => half, otherwise consumes half
 * @value convert
 * @option Compress - Consumes half, otherwise converts full => half
 * @value compress
 * @desc Change the cost type to this scenario.
 * Use 'Unchanged' for no changes.
 * @default consume
 *
 * @param absorbCost:num
 * @text Alter Cost Value
 * @parent Absorb
 * @desc What is the default action cost for this scenario?
 * @default +200
 *
 * @param absorbPriority:num
 * @text Priority
 * @parent Absorb
 * @type number
 * @desc What is this scenario's priority? Scenario outcomes with
 * equal or lower priorities cannot override types and costs.
 * @default 90
 *
 * @param Reflect
 * @text Reflect Attack!
 *
 * @param reflectChange:str
 * @text Alter Changeability
 * @parent Reflect
 * @type select
 * @option Unchanged - Cost type is unchanged after this effect
 * @value unchanged
 * @option Permanent - Cost type can no longer be changed after
 * @value permanent
 * @option Temporary - Cost type can still be changed after
 * @value temporary
 * @desc Allow the cost type and value to be changeable?
 * @default permanent
 *
 * @param reflectType:str
 * @text Alter Cost Type
 * @parent Reflect
 * @type select
 * @option Unchanged - No changes are made
 * @value unchanged
 * @option Consume - Removes half, otherwise consumes full
 * @value consume
 * @option Convert - Converts full => half, otherwise consumes half
 * @value convert
 * @option Compress - Consumes half, otherwise converts full => half
 * @value compress
 * @desc Change the cost type to this scenario.
 * Use 'Unchanged' for no changes.
 * @default consume
 *
 * @param reflectCost:num
 * @text Alter Cost Value
 * @parent Reflect
 * @desc What is the default action cost for this scenario?
 * @default +200
 *
 * @param reflectPriority:num
 * @text Priority
 * @parent Reflect
 * @type number
 * @desc What is this scenario's priority? Scenario outcomes with
 * equal or lower priorities cannot override types and costs.
 * @default 90
 *
 */
/* ----------------------------------------------------------------------------
 * Sound Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Sound:
 *
 * @param GainFull
 * @text Gain Full Action
 *
 * @param GainFullName:str
 * @text Filename
 * @parent GainFull
 * @type file
 * @dir audio/se/
 * @require 1
 * @desc Filename of the sound effect played.
 * @default Skill3
 *
 * @param GainFullVolume:num
 * @text Volume
 * @parent GainFull
 * @type number
 * @max 100
 * @desc Volume of the sound effect played.
 * @default 90
 *
 * @param GainFullPitch:num
 * @text Pitch
 * @parent GainFull
 * @type number
 * @desc Pitch of the sound effect played.
 * @default 100
 *
 * @param GainFullPan:num
 * @text Pan
 * @parent GainFull
 * @desc Pan of the sound effect played.
 * @default 0
 *
 * @param GainHalf
 * @text Gain Half Action
 *
 * @param GainHalfName:str
 * @text Filename
 * @parent GainHalf
 * @type file
 * @dir audio/se/
 * @require 1
 * @desc Filename of the sound effect played.
 * @default Skill3
 *
 * @param GainHalfVolume:num
 * @text Volume
 * @parent GainHalf
 * @type number
 * @max 100
 * @desc Volume of the sound effect played.
 * @default 90
 *
 * @param GainHalfPitch:num
 * @text Pitch
 * @parent GainHalf
 * @type number
 * @desc Pitch of the sound effect played.
 * @default 120
 *
 * @param GainHalfPan:num
 * @text Pan
 * @parent GainHalf
 * @desc Pan of the sound effect played.
 * @default 0
 *
 * @param LoseFull
 * @text Lose >1 Full Action
 *
 * @param LoseFullName:str
 * @text Filename
 * @parent LoseFull
 * @type file
 * @dir audio/se/
 * @require 1
 * @desc Filename of the sound effect played.
 * @default Shot3
 *
 * @param LoseFullVolume:num
 * @text Volume
 * @parent LoseFull
 * @type number
 * @max 100
 * @desc Volume of the sound effect played.
 * @default 90
 *
 * @param LoseFullPitch:num
 * @text Pitch
 * @parent LoseFull
 * @type number
 * @desc Pitch of the sound effect played.
 * @default 100
 *
 * @param LoseFullPan:num
 * @text Pan
 * @parent LoseFull
 * @desc Pan of the sound effect played.
 * @default 0
 *
 * @param LoseHalf
 * @text Lose >1 Half Action
 *
 * @param LoseHalfName:str
 * @text Filename
 * @parent LoseHalf
 * @type file
 * @dir audio/se/
 * @require 1
 * @desc Filename of the sound effect played.
 * @default Shot3
 *
 * @param LoseHalfVolume:num
 * @text Volume
 * @parent LoseHalf
 * @type number
 * @max 100
 * @desc Volume of the sound effect played.
 * @default 90
 *
 * @param LoseHalfPitch:num
 * @text Pitch
 * @parent LoseHalf
 * @type number
 * @desc Pitch of the sound effect played.
 * @default 120
 *
 * @param LoseHalfPan:num
 * @text Pan
 * @parent LoseHalf
 * @desc Pan of the sound effect played.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Action Count Display Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ActionCountDisplay:
 *
 * @param Display
 * @text Display Settings
 *
 * @param DrawHorz:eval
 * @text Draw Horizontally?
 * @parent Display
 * @type boolean
 * @on Horizontal
 * @off Vertical
 * @desc Which direction do you want the Press Count Display to go?
 * @default true
 *
 * @param BottomPosition:eval
 * @text Bottom Position?
 * @parent Display
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Place the Press Count Display towards the bottom of the screen?
 * @default true
 *
 * @param LogWindowTopOffsetY:num
 * @text Offset Top Log Y?
 * @parent BottomPosition:eval
 * @type number
 * @desc If using the top position, offset the log window's Y position.
 * @default 40
 *
 * @param RepositionTopForHelp:eval
 * @text Reposition for Help?
 * @parent BottomPosition:eval
 * @type boolean
 * @on Reposition
 * @off Stay
 * @desc If using the top position, reposition the display when the help window is open?
 * @default true
 *
 * @param Reposition
 * @text Reposition For Help
 *
 * @param RepositionTopHelpX:num
 * @text Repostion X By
 * @parent Reposition
 * @desc Reposition the display's X coordinates by this much when
 * the Help Window is visible.
 * @default 0
 *
 * @param RepositionTopHelpY:num
 * @text Repostion Y By
 * @parent Reposition
 * @desc Reposition the display's Y coordinates by this much when
 * the Help Window is visible.
 * @default 160
 *
 * @param Pictures
 * @text Picture Settings
 * 
 * @param ActorPictures
 * @text Actors
 * @parent Pictures
 *
 * @param ActorActionFullPicture:str
 * @text Full Action Picture
 * @parent ActorPictures
 * @type file
 * @dir img/pictures/
 * @desc Optional. Place an image for an actor full action instead of an icon?
 * @default 
 *
 * @param ActorActionHalfPicture:str
 * @text Half Action Picture
 * @parent ActorPictures
 * @type file
 * @dir img/pictures/
 * @desc Optional. Place an image for an actor half action instead of an icon?
 * @default 
 * 
 * @param EnemyPictures
 * @text Enemies
 * @parent Pictures
 *
 * @param EnemyActionFullPicture:str
 * @text Full Action Picture
 * @parent EnemyPictures
 * @type file
 * @dir img/pictures/
 * @desc Optional. Place an image for an enemy full action instead of an icon?
 * @default 
 *
 * @param EnemyActionHalfPicture:str
 * @text Half Action Picture
 * @parent EnemyPictures
 * @type file
 * @dir img/pictures/
 * @desc Optional. Place an image for an enemy half action instead of an icon?
 * @default 
 *
 * @param EmptyActionPicture:str
 * @text Empty Action Picture
 * @parent Pictures
 * @type file
 * @dir img/pictures/
 * @desc Optional. Place an image for an empty action instead of an icon?
 * @default 
 *
 * @param Coordinates
 *
 * @param ScreenBufferX:num
 * @text Screen Buffer X
 * @parent Coordinates
 * @desc Buffer from the the edge of the screen's X by this much.
 * @default 16
 *
 * @param ScreenBufferY:num
 * @text Screen Buffer Y
 * @parent Coordinates
 * @desc Buffer from the the edge of the screen's Y by this much.
 * @default 16
 *
 * @param ActorOffsetX:num
 * @text Actor Offset X
 * @parent Coordinates
 * @desc Offset the actor images' X by this much.
 * @default 0
 *
 * @param ActorOffsetY:num
 * @text Actor Offset Y
 * @parent Coordinates
 * @desc Offset the actor images' Y by this much.
 * @default 0
 *
 * @param EnemyOffsetX:num
 * @text Enemy Offset X
 * @parent Coordinates
 * @desc Offset the enemy images' X by this much.
 * @default 0
 *
 * @param EnemyOffsetY:num
 * @text Enemy Offset Y
 * @parent Coordinates
 * @desc Offset the enemy images' Y by this much.
 * @default 0
 *
 * @param DrawSettings
 * @text Draw Settings
 *
 * @param MaxVisible:num
 * @text Max Actions Visible
 * @parent DrawSettings
 * @desc How many action slots max should be drawn for each team?
 * @default 10
 *
 * @param ImageSize:num
 * @text Image Size
 * @parent DrawSettings
 * @desc What is the size of the icons or pictures for the action slots?
 * @default 32
 *
 * @param ImageGapDistance:num
 * @text Gap Distance
 * @parent DrawSettings
 * @desc How wide should the gab between each slot be in pixels?
 * @default 2
 *
 * @param IconSmoothing:eval
 * @text Icon Smoothing?
 * @parent DrawSettings
 * @type boolean
 * @on Smooth
 * @off Pixelate
 * @desc Smooth the display for icons?
 * Or pixelate them?
 * @default false
 *
 * @param PictureSmoothing:eval
 * @text Picture Smoothing?
 * @parent DrawSettings
 * @type boolean
 * @on Smooth
 * @off Pixelate
 * @desc Smooth the display for pictures?
 * Or pixelate them?
 * @default true
 *
 * @param TurnsRemaining
 * @text Turns Remaining
 *
 * @param DrawActionsRemaining:eval
 * @text Show Number?
 * @parent TurnsRemaining
 * @type boolean
 * @on Show Number
 * @off Don't Show
 * @desc Show a number to display the actions remaining?
 * @default true
 *
 * @param ActionsRemainingFontSize:num
 * @text Font Size
 * @parent DrawActionsRemaining:eval
 * @desc What font size should be used for this number?
 * @default 26
 *
 * @param ActionsRemainingOffsetX:num
 * @text Offset X
 * @parent DrawActionsRemaining:eval
 * @desc Offset the remaining actions number X.
 * @default 0
 *
 * @param ActionsRemainingOffsetY:num
 * @text Offset Y
 * @parent DrawActionsRemaining:eval
 * @desc Offset the remaining actions number Y.
 * @default 0
 *
 */
//=============================================================================

const _0x6201f2=_0x22a1;(function(_0x2f185e,_0x4c2aa4){const _0x7f5563=_0x22a1,_0x33d3b7=_0x2f185e();while(!![]){try{const _0x15ca82=parseInt(_0x7f5563(0x364))/0x1*(parseInt(_0x7f5563(0x358))/0x2)+parseInt(_0x7f5563(0x366))/0x3+-parseInt(_0x7f5563(0x3d5))/0x4+-parseInt(_0x7f5563(0x27d))/0x5*(parseInt(_0x7f5563(0x210))/0x6)+parseInt(_0x7f5563(0x337))/0x7+parseInt(_0x7f5563(0x356))/0x8*(parseInt(_0x7f5563(0x2d9))/0x9)+parseInt(_0x7f5563(0x21d))/0xa*(-parseInt(_0x7f5563(0x33f))/0xb);if(_0x15ca82===_0x4c2aa4)break;else _0x33d3b7['push'](_0x33d3b7['shift']());}catch(_0x3e1fba){_0x33d3b7['push'](_0x33d3b7['shift']());}}}(_0x26f9,0x3f715));function _0x22a1(_0x307c7b,_0x2ec806){const _0x26f928=_0x26f9();return _0x22a1=function(_0x22a1e0,_0x268b51){_0x22a1e0=_0x22a1e0-0x1c9;let _0x2e85d9=_0x26f928[_0x22a1e0];return _0x2e85d9;},_0x22a1(_0x307c7b,_0x2ec806);}var label=_0x6201f2(0x250),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x6201f2(0x23e)](function(_0x2b5cbb){const _0x413e9a=_0x6201f2;return _0x2b5cbb[_0x413e9a(0x2a8)]&&_0x2b5cbb[_0x413e9a(0x397)][_0x413e9a(0x41a)]('['+label+']');})[0x0];function _0x26f9(){const _0x353946=['setBackgroundType','_phase','turnCount','OTrvi','LYary','EnemyActionsIcon','BattleManager_isTpb','CTyZM','weakness','loseHalfActionsPTB','_statusWindow','xADMf','min','status','PTB_MINIMUM_WEAKNESS_RATE','_PTB_ACTION_BASE','ActorOffsetX','Window_Base_makeAdditionalSkillCostText','stepForward','AgiBuff','_ptbPartyActionCountWindow','CostConvertIcon','decideRandomTarget','makeAdditionalSkillCostText','close','_actorCommandWindow','TQVdD','Ecyjj','_ptbTeamOdd','-----------------\x20end\x20-----------------','gainHalfActionsPTB','STR','qMMpF','_PTB_FREE_CHANGE','endTurnPTB','contents','friendsUnit','IuKmx','sbAQS','_unit','removeState','Game_Battler_removeBuff','_windowLayer','loseCurrentActionsPTB','useItem','sort','processTouch','Game_Enemy_transform','Game_Battler_addDebuff','DrawHorz','dWMfQ','_PTB_COST_SHOW_1','ptbCompressCostIcon','reduceActionsPTB','endTurn','enemy','EnemyHalf','%1Name','ssxgu','commandCancel','ActionsRemainingFontSize','isItem','9iRVZdS','Lbcyx','EmptyActionsIcon','updateBuffTurns','commandFight','result','STRUCT','max','ptbLowestAgility','LZade','FUNC','EnemyActionPicture','isAlive','playPtbGainFullAction','removeBuff','iconHeight','createAllWindows','%1Volume','consume','_action','_PTB_KEEP_PREV_ACTOR','RAPan','executeDamage','getNextSubject','endAllBattlersTurn','_inBattle','fyhoN','Mechanics','innerHeight','EnemyActionFullPicture','startTurnPTB','dhWYD','Game_Action_speed','sKYto','GainHalf','cursorRight','_ptbTroopActionCountWindow','tlPjy','changeEquip','TGVVn','AZjEE','loadSystem','log','LogWindowTopOffsetY','canActPTB','SRapX','Empty','SZFxt','innerWidth','changeEquipById','isHit','removeActionBattlersPTB','stepBack','Game_Battler_performCollapse','ISLTu','eOcUg','_actor','Nmosq','EnemyActionHalfPicture','EwyhN','_forcedBattlers','Game_Battler_removeState','skillCostSeparator','BattleManager_endAction','unchanged','JpQHT','_PTB_COST_SHOW_0','selectNextCommand','name','setUnit','zllEF','ActionsRemainingOffsetX','LoseFull','resetFontSettings','BattleManager_startBattle','Scene_Battle_commandCancel','ActorActionPicture','ShowCostForGuard','_maxActions','DefaultCostItem','Game_Actor_changeEquip','_context','----------------\x20begin\x20----------------','IDFsE','MinActions','_PTB_MIN_ACTIONS','playPtbLoseFullAction','ptbCheckElementalResults','updateStateTurns','immune','processTurnPTB','repositionLogWindowPTB','isActiveTpb','addBuff','3246593nVLeqn','DTB','Game_BattlerBase_clearStates','_ptbActionsMax','canMove','canDrawActionsRemaining','canInput','dLDsM','55esxGFh','setup','JSON','startActorCommandSelection','isDead','_forceAction','BattleManager_finishActorInput','_PTB_MAX_ACTIONS','ActionPointCompress','Game_Actor_discardEquip','xrlEu','registerActionCostPTB','drawPicture','%1Cost','aqDvz','processSwitchActors','loadPicture','wEPBo','getMaxActionsPTB','_inputting','Fwghw','isTurnBased','_PTB_ACTION_AGI_BUFF','3262664qSLZNt','Window_Selectable_cursorRight','2uncszZ','drawActionsRemaining','Scene_Battle_commandFight','drawItemNumberPTB','Window_Selectable_cursorPagedown','addDebuff','createActionsPTB','isBattleSystemPTBActionCountVisible','imageSmoothingEnabled','%1ActionPicture','absorb','OmwGH','240774uxWdpo','VgYuV','1313694GszObC','applyGlobal','GainDiff','playStaticSe','maxCols','_actionBattlers','createActionCountWindowsPTB','meetEndTurnConditionsPTB','parse','constructor','WAyrs','MTbSk','ptbPartyTeamShift','toLowerCase','xHYlX','TJsJP','fontSize','fCCxl','Half','Game_BattlerBase_hide','total\x20agi','EmptyActionPicture','ItemQuantityFmt','ActorActionsIcon','Game_BattlerBase_updateStateTurns','changeable','note','Settings','lowest\x20agi','SlEru','_PTB_RECALC_ADD_DIFF','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','canActorBeSelectedPTB','numItems','playPtbLoseHalfAction','cursorPagedown','ImageSize','VBXys','updateTurn','TeamShiftWait','BattleManager_forceAction','_currentActor','isTriggered','PictureSmoothing','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','temporary','makeActions','PostHalfActionChange','updatePosition','description','player','applyResultsPTB','ItemsEquipsCore','CostConsumeIcon','nloAb','Game_Actor_selectNextCommand','finishActorInput','match','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','_PTB_COST_POSITION','fWUOI','eNXrD','MaxActions','_ptbActionCountVisible','RepositionTopHelpX','padding','tMSef','isPassingTurnPTB','forceAction','GenerateBase','aliveMembers','_PTB_BETWEEN_TEAMS_WAIT','ptbTroopTeamShift','_storedBitmaps','ZWwvG','PostFullActionChange','_ptbCurrentUnit','recalculateActionsPTB','Window_Selectable_processTouch','checkNeedsUpdate','getActionTypeChangeablePTB','_PTB_NEUTRAL_TURN_ADVANTAGE','_PTB_RECALC_SUB_DIFF','PTB','ActionPointForceCompress','updateVisibility','_halfActions','BattleManager_invokeMagicReflection','LoseHalf','_PTB_COST_SHOW_ATTACK','ptbCostFormat','textWidth','startBattle','height','qARFl','addLoadListener','Scene_Battle_createActorCommandWindow','attackSkillId','ptbCreateTeamSwitchText','_PTB_COST_SHOW_GUARD','textSizeEx','invokeCounterAttack','hffKX','EnemyOffsetY','ActorFull','postGainPTB','VajCZ','CHKOo','_buffs','BattleManager_invokeCounterAttack','waitCount','1920452WUOlpA','width','Game_Unit_onBattleStart','Game_Action_apply','cost','_doubleTouch','createContentsArray','clearPassTurnPTB','round','eJnBu','PakRk','Game_Action_applyGlobal','RegExp','MaxVisible','onTurnEnd','AllowOverflow','reduce','discardEquip','pop','GainFull','length','EnemyFull','changeClass','agi','BattleManager_endTurn','setItem','ActorFullActionPicture','hide','%1Change','ptbActionPointsAbbr','Game_Actor_forceChangeEquip','startDamagePopup','_preemptive','critical','active','ptbActionCount','createStartingCoordinates','battleSys','Game_Battler_onTurnEnd','BattleManager_makeActionOrders','bniBZ','ptbConsumeCostIcon','initialize','setBattleSystemPTBActionCountVisible','isPTB','BattleManager_startInput','playPtbSfx','HLGxo','clearStates','sxTDw','endActionPTB','speed','getFullActionsPTB','HideActionPointCost','startActorInput','IconSmoothing','playPtbGainHalfAction','tWBMQ','_surprise','TroopTeamShiftFmt','exit','push','startInput','cursorPageup','ptbTotalAgility','OeSCL','%1Pan','createActorCommandWindow','ptbEnemyHalfActionsIcon','includes','_passedTurnPTB','center','ItemQuantityFontSize','prototype','Game_Actor_releaseUnequippableItems','isDrawItemNumber','bgClU','appear','Game_Battler_useItem','makeActionOrders','RepositionTopForHelp','Game_Battler_forceAction','cdZRf','PassTurn','ActorActionHalfPicture','vKYrL','BattleManager_isTeamBased','processPressCountChange','releaseUnequippableItems','addState','grAFw','ActionPointConsume','_subject','reflect','visible','Show_1_Action_Cost','makeActionOrdersPTB','ItemScene','iOVCG','lhbwj','_PTB_ACTION_AGI_DEBUFF','format','ptbActionPointsFull','forceChangeEquip','processTouchPTB','ARRAYSTR','dpVOk','currentAction','yNOHU','getChildIndex','_handlers','BattleManager_setup','average\x20agi','EnemyHalfActionsIcon','getHalfActionsPTB','AVkJv','%1Pitch','opacity','ptbConvertCostIcon','ptbSwitchActorDirection','dsfzU','drawText','RANhS','guvvP','Window_Selectable_cursorPageup','Window_Selectable_cursorLeft','canUsePTB','battleEnd','ActorOffsetY','_PTB_GUARD_PASS','actors','bfxDP','isUnitTurn','Full','bbzrw','onBattleStart','startBattlePTB','ScreenBufferY','compress','Wfsvs','zENVE','ptbEnemyFullActionsIcon','initMembers','Show_0_Action_Cost','PbHEe','%1Type','Scene_Battle_createAllWindows','unshift','processTurn','setHalfActionsPTB','_ptbActionsCur','full:%1','selectNextActorPTB','Window_Base_drawItemNumber','_fullActions','_ptbActionCost','BattleManager_startTurn','BattleManager_processTurn','payActionCostPTB','resistMinimumRate','OdLAi','zDAbq','BattleManager_selectNextActor','map','drawImage','vRqVP','ptbHighestAgility','EIxkV','makeDeepCopy','index','isTeamBased','drawItemNumber','Game_Actor_changeEquipById','3005370uTosmN','updateStateTurnsPTB','DefaultCostSkill','item','RepositionTopHelpY','_actions','tlrVZ','sMBVV','canAlterActionCostPTB','forceActionPTB','convert','setSkill','clamp','618870MDnbEg','gainFullActionsPTB','guardSkillId','ActionPointForceConsume','_ptbTurnAdvantageUnit','ptb%1ActionsIcon','floor','%1Priority','ActorHalfActionPicture','Nothing','apply','windowRect','BattleManager_isActiveTpb','passTurnPTB','SehRS','battleMembers','call','startInputPTB','applyGlobalPTB','CostPosition','PTB_MINIMUM_RESIST_RATE','endAction','drawBigIcon','Game_Battler_addBuff','SystemActionCountVisibility','blt','_logWindow','startTurn','initMembersPTB','ActionPointForceConvert','setBattleSystem','miss','ActionCountCostFmt','filter','IconSet','shift','random','Game_BattlerBase_appear','priority','playCursorSound','isSceneBattle','StateBuffUpdate','inBattle','UPlDH','Window_Help_setItem','iqXHN','BottomPosition','cancel','isTpb','performTurnEndPTB','_lastTargetIndex','BattleSystemPTB','refresh','selectNextActor','getBattleSystem','_PTB_STATE_BUFF_TURN_UPDATES_ONLY_ON_OPPONENT_TURNS','_bypassStateTurnUpdatesPTB','ptbAliveMembers','ptbFreeRangeSwitch','BattleManager_isTurnBased','members','MYnXo','cUHxj','update','addChildAt','Game_Battler_addState','isActor','Game_Actor_changeClass','type','_ptb%1Action','trim','performCollapse','createActorCommandWindowPTB','ActorHalf','QiDGC','ARRAYNUM','BattleManager_battleSys','ScreenBufferX','UFOqe','isSkill','Game_Action_executeDamage','gQfrO','ShowCostForAttack','subject','_ptbLastIndex','DrawActionsRemaining','clear','concat','Press','_ptbHalfActions','enemies','version','_scene','ARRAYEVAL','addText','NeutralAdvantage','5JapKOT','Game_System_initialize','makeAdditionalCostTextPTB','setText','isPartyCommandWindowDisabled','NiZNB','VbGCT','ActionPointConvert','Game_BattlerBase_updateBuffTurns','battler','ZEhVV','some','Sound','setLastPtbIndex','NxWxV','uptmX','getActionCostTypePTB','keepPrevSubjectPTB','ImageGapDistance','_PTB_RESET_INDEX','Game_BattlerBase_canUse','wmuoR','General','getActionCostValuePTB','setTarget','initBattleSystemPTB','ptbEmptyActionsIcon','BFlTg','ConvertParams','_ptbTeamEven'];_0x26f9=function(){return _0x353946;};return _0x26f9();}VisuMZ[label][_0x6201f2(0x381)]=VisuMZ[label][_0x6201f2(0x381)]||{},VisuMZ[_0x6201f2(0x299)]=function(_0x5080f3,_0xb6c41a){const _0xd5fe7f=_0x6201f2;for(const _0x5ebb52 in _0xb6c41a){if(_0x5ebb52[_0xd5fe7f(0x39f)](/(.*):(.*)/i)){if(_0xd5fe7f(0x365)!==_0xd5fe7f(0x365))this['_bypassStateTurnUpdatesPTB']=_0x3fc925['isPTB']()&&_0x4c76b0[_0xd5fe7f(0x254)],_0x49bce1[_0xd5fe7f(0x250)]['Game_Battler_onTurnEnd'][_0xd5fe7f(0x22d)](this),delete this[_0xd5fe7f(0x255)];else{const _0x494147=String(RegExp['$1']),_0xc2f3af=String(RegExp['$2'])['toUpperCase']()[_0xd5fe7f(0x263)]();let _0x566956,_0x5af746,_0x14f46c;switch(_0xc2f3af){case'NUM':_0x566956=_0xb6c41a[_0x5ebb52]!==''?Number(_0xb6c41a[_0x5ebb52]):0x0;break;case _0xd5fe7f(0x268):_0x5af746=_0xb6c41a[_0x5ebb52]!==''?JSON[_0xd5fe7f(0x36e)](_0xb6c41a[_0x5ebb52]):[],_0x566956=_0x5af746['map'](_0x2a0f05=>Number(_0x2a0f05));break;case'EVAL':_0x566956=_0xb6c41a[_0x5ebb52]!==''?eval(_0xb6c41a[_0x5ebb52]):null;break;case _0xd5fe7f(0x27a):_0x5af746=_0xb6c41a[_0x5ebb52]!==''?JSON[_0xd5fe7f(0x36e)](_0xb6c41a[_0x5ebb52]):[],_0x566956=_0x5af746['map'](_0x471c66=>eval(_0x471c66));break;case _0xd5fe7f(0x341):_0x566956=_0xb6c41a[_0x5ebb52]!==''?JSON['parse'](_0xb6c41a[_0x5ebb52]):'';break;case'ARRAYJSON':_0x5af746=_0xb6c41a[_0x5ebb52]!==''?JSON[_0xd5fe7f(0x36e)](_0xb6c41a[_0x5ebb52]):[],_0x566956=_0x5af746[_0xd5fe7f(0x206)](_0x411440=>JSON[_0xd5fe7f(0x36e)](_0x411440));break;case _0xd5fe7f(0x2e3):_0x566956=_0xb6c41a[_0x5ebb52]!==''?new Function(JSON[_0xd5fe7f(0x36e)](_0xb6c41a[_0x5ebb52])):new Function('return\x200');break;case'ARRAYFUNC':_0x5af746=_0xb6c41a[_0x5ebb52]!==''?JSON[_0xd5fe7f(0x36e)](_0xb6c41a[_0x5ebb52]):[],_0x566956=_0x5af746[_0xd5fe7f(0x206)](_0x59499e=>new Function(JSON[_0xd5fe7f(0x36e)](_0x59499e)));break;case _0xd5fe7f(0x2ba):_0x566956=_0xb6c41a[_0x5ebb52]!==''?String(_0xb6c41a[_0x5ebb52]):'';break;case _0xd5fe7f(0x1cc):_0x5af746=_0xb6c41a[_0x5ebb52]!==''?JSON[_0xd5fe7f(0x36e)](_0xb6c41a[_0x5ebb52]):[],_0x566956=_0x5af746['map'](_0x361dd2=>String(_0x361dd2));break;case _0xd5fe7f(0x2df):_0x14f46c=_0xb6c41a[_0x5ebb52]!==''?JSON['parse'](_0xb6c41a[_0x5ebb52]):{},_0x566956=VisuMZ[_0xd5fe7f(0x299)]({},_0x14f46c);break;case'ARRAYSTRUCT':_0x5af746=_0xb6c41a[_0x5ebb52]!==''?JSON[_0xd5fe7f(0x36e)](_0xb6c41a[_0x5ebb52]):[],_0x566956=_0x5af746[_0xd5fe7f(0x206)](_0x86f79d=>VisuMZ[_0xd5fe7f(0x299)]({},JSON[_0xd5fe7f(0x36e)](_0x86f79d)));break;default:continue;}_0x5080f3[_0x494147]=_0x566956;}}}return _0x5080f3;},(_0x573c00=>{const _0x1f4710=_0x6201f2,_0x439a41=_0x573c00[_0x1f4710(0x31d)];for(const _0x51fe9a of dependencies){if(!Imported[_0x51fe9a]){if(_0x1f4710(0x3a8)!==_0x1f4710(0x3a8))return!![];else{alert(_0x1f4710(0x385)[_0x1f4710(0x43a)](_0x439a41,_0x51fe9a)),SceneManager[_0x1f4710(0x411)]();break;}}}const _0x51f7b8=_0x573c00[_0x1f4710(0x397)];if(_0x51f7b8[_0x1f4710(0x39f)](/\[Version[ ](.*?)\]/i)){if(_0x1f4710(0x1e9)!==_0x1f4710(0x1e9))this['commandCancelPTB']();else{const _0x3432b5=Number(RegExp['$1']);_0x3432b5!==VisuMZ[label][_0x1f4710(0x278)]&&(_0x1f4710(0x26e)===_0x1f4710(0x26e)?(alert(_0x1f4710(0x392)[_0x1f4710(0x43a)](_0x439a41,_0x3432b5)),SceneManager[_0x1f4710(0x411)]()):(_0x26382c['BattleSystemPTB']['BattleManager_endTurn'][_0x1f4710(0x22d)](this),this[_0x1f4710(0x2bd)]()));}}if(_0x51f7b8['match'](/\[Tier[ ](\d+)\]/i)){if(_0x1f4710(0x2d5)!==_0x1f4710(0x33e)){const _0x1c4db7=Number(RegExp['$1']);_0x1c4db7<tier?(alert(_0x1f4710(0x3a0)[_0x1f4710(0x43a)](_0x439a41,_0x1c4db7,tier)),SceneManager[_0x1f4710(0x411)]()):tier=Math[_0x1f4710(0x2e0)](_0x1c4db7,tier);}else{if(!_0x5f49df[_0x1f4710(0x401)]())return;this['_ptbCurrentUnit']=_0x550a4b,_0xe2c1c8[_0x1f4710(0x2f7)](),_0x40286f[_0x1f4710(0x2f7)]();}}VisuMZ[_0x1f4710(0x299)](VisuMZ[label][_0x1f4710(0x381)],_0x573c00['parameters']);})(pluginData),PluginManager['registerCommand'](pluginData['name'],_0x6201f2(0x235),_0x3449ba=>{const _0x525bd3=_0x6201f2;VisuMZ[_0x525bd3(0x299)](_0x3449ba,_0x3449ba);const _0x1984dd=_0x3449ba['Visible'];$gameSystem['setBattleSystemPTBActionCountVisible'](_0x1984dd);}),VisuMZ[_0x6201f2(0x250)]['RegExp']={'ActionPointConsume':/<PTB (?:PC|ACTION|PRESS) CONSUME:[ ](\d+)>/i,'ActionPointConvert':/<PTB (?:PC|ACTION|PRESS) CONVERT:[ ](\d+)>/i,'ActionPointCompress':/<PTB (?:PC|ACTION|PRESS) COMPRESS:[ ](\d+)>/i,'ActionPointForceConsume':/<PTB (?:PC|ACTION|PRESS) FORCE CONSUME:[ ](\d+)>/i,'ActionPointForceConvert':/<PTB (?:PC|ACTION|PRESS) FORCE CONVERT:[ ](\d+)>/i,'ActionPointForceCompress':/<PTB (?:PC|ACTION|PRESS) FORCE COMPRESS:[ ](\d+)>/i,'PostFullActionChange':/<PTB POST-(?:GAIN|LOSE) (?:PC|FULL ACTION|FULL ACTIONS):[ ]([\+\-]\d+)>/i,'PostHalfActionChange':/<PTB POST-(?:GAIN|LOSE) (?:PC|HALF ACTION|HALF ACTIONS):[ ]([\+\-]\d+)>/i,'HideActionPointCost':/<PTB HIDE (?:PC|ACTION|PRESS) COST>/i,'ShowActionPointCost':/<PTB SHOW (?:PC|ACTION|PRESS) COST>/i,'PassTurn':/<PTB PASS TURN>/i,'ActionPointTraitPlus':/<PTB (?:PC|FULL ACTION|FULL ACTIONS|PRESS):[ ]([\+\-]\d+)>/i},DataManager[_0x6201f2(0x3b6)]=function(_0x198d02){const _0x399b7=_0x6201f2;if(!_0x198d02)return!![];const _0x1f72e7=VisuMZ[_0x399b7(0x250)][_0x399b7(0x3e1)],_0x3e8e58=_0x198d02[_0x399b7(0x380)];if(_0x3e8e58[_0x399b7(0x39f)](_0x1f72e7[_0x399b7(0x430)])){if(_0x399b7(0x406)===_0x399b7(0x216))this['x']=_0x31a051['RepositionTopHelpX']||0x0,this['y']=_0x42d6a4['RepositionTopHelpY']||0x0;else return!![];}else{if(_0x3e8e58[_0x399b7(0x39f)](_0x1f72e7[_0x399b7(0x284)])){if('Lbcyx'===_0x399b7(0x2da))return!![];else{if(_0x3b6f24<0x0)return _0x3c0326;}}else{if(_0x3e8e58['match'](_0x1f72e7['ActionPointCompress']))return!![];else{if(_0x3e8e58['match'](_0x1f72e7[_0x399b7(0x220)])){if(_0x399b7(0x29f)===_0x399b7(0x29f))return![];else{const _0x161cbf=_0x45de0e[_0x399b7(0x215)][_0x399b7(0x23e)](_0x33f82c=>_0x33f82c[_0x399b7(0x344)]);_0x1c1b81['makeActions']();if(_0x161cbf){let _0x4fbe0f=_0x161cbf[_0x399b7(0x3e9)];while(_0x4fbe0f--){_0xa3015c[_0x399b7(0x215)][_0x399b7(0x3e7)]();}_0x416261['_actions']=_0x161cbf['concat'](_0x203da5[_0x399b7(0x215)]);}}}else{if(_0x3e8e58[_0x399b7(0x39f)](_0x1f72e7[_0x399b7(0x23a)])){if(_0x399b7(0x2bb)!==_0x399b7(0x2bb)){_0x190706=this[_0x399b7(0x2f5)]-_0x57564c-_0x41c867[_0x399b7(0x1ec)]-_0x3591ca,_0x539dfc=_0x405b9a?this[_0x399b7(0x309)]-_0x4c88e3['ScreenBufferX']-_0x4dfbe1:_0x1759ad[_0x399b7(0x26a)];if(_0x2b0e40&&_0x591427)_0x452b46-=_0x3ae08b;else!_0x35dfab&&(_0x5d2622-=_0x34987d);}else return![];}else{if(_0x3e8e58['match'](_0x1f72e7[_0x399b7(0x3ba)]))return![];else{if(_0x399b7(0x1cf)!==_0x399b7(0x2c1))return!![];else{const _0x26c375='Nothing';_0x4b0142?_0x5ea426['push'](_0x26c375):_0x4e4f8a[_0x399b7(0x1f6)](_0x26c375);}}}}}}}},DataManager['getActionCostTypePTB']=function(_0x44eeb7){const _0x23b5be=_0x6201f2;if(!_0x44eeb7)return _0x23b5be(0x2eb);const _0x37e2f9=VisuMZ['BattleSystemPTB']['Settings'][_0x23b5be(0x2f4)],_0x3f0f16=VisuMZ[_0x23b5be(0x250)]['RegExp'],_0x58e66d=_0x44eeb7[_0x23b5be(0x380)];if(_0x58e66d[_0x23b5be(0x39f)](_0x3f0f16[_0x23b5be(0x430)]))return _0x23b5be(0x2eb);else{if(_0x58e66d[_0x23b5be(0x39f)](_0x3f0f16[_0x23b5be(0x284)])){if(_0x23b5be(0x308)!=='NbKit')return _0x23b5be(0x21a);else{this['resetFontSettings']();const _0x5b2027=_0x3ae81c[_0x23b5be(0x381)],_0x3537a4=new _0x11a5e9(_0x1dd959,_0x2ec53f,_0x5b2027[_0x23b5be(0x38a)],_0x5b2027[_0x23b5be(0x38a)]);_0x3537a4['x']+=_0x5b2027[_0x23b5be(0x320)],_0x3537a4['y']+=_0x5b2027['ActionsRemainingOffsetY'];const _0x1b3176=this[_0x23b5be(0x2c2)][_0x23b5be(0x409)]()+this[_0x23b5be(0x2c2)][_0x23b5be(0x1d5)]();this[_0x23b5be(0x2be)][_0x23b5be(0x376)]=_0x5b2027[_0x23b5be(0x2d7)],this[_0x23b5be(0x2be)]['drawText'](_0x1b3176,_0x3537a4['x'],_0x3537a4['y'],_0x3537a4[_0x23b5be(0x3d6)],_0x3537a4['height'],_0x23b5be(0x41c)),this[_0x23b5be(0x322)]();}}else{if(_0x58e66d[_0x23b5be(0x39f)](_0x3f0f16[_0x23b5be(0x347)]))return'compress';else{if(_0x58e66d[_0x23b5be(0x39f)](_0x3f0f16['ActionPointForceConsume']))return _0x23b5be(0x2eb);else{if(_0x58e66d[_0x23b5be(0x39f)](_0x3f0f16[_0x23b5be(0x23a)])){if('vIQnO'!==_0x23b5be(0x416))return _0x23b5be(0x21a);else{const _0x42a956=_0x41f42f[_0x23b5be(0x401)]();if(_0x42a956)_0x3cbf87[_0x23b5be(0x23b)]('DTB');_0xd24dae[_0x23b5be(0x250)][_0x23b5be(0x3d3)][_0x23b5be(0x22d)](this,_0x6f39c8,_0x52bd44);if(_0x42a956)_0x353c74[_0x23b5be(0x23b)](_0x23b5be(0x3b9));}}else{if(_0x58e66d[_0x23b5be(0x39f)](_0x3f0f16[_0x23b5be(0x3ba)]))return _0x23b5be(0x1ed);else{if(DataManager[_0x23b5be(0x26c)](_0x44eeb7))return _0x37e2f9['DefaultCostTypeSkill'];else return DataManager['isItem'](_0x44eeb7)?'AIWoP'==='ewnsy'?0x0:_0x37e2f9['DefaultCostTypeItem']:_0x23b5be(0x2eb);}}}}}}},DataManager['getActionCostValuePTB']=function(_0x45f2d7){const _0x3a8f97=_0x6201f2;if(!_0x45f2d7)return 0x0;const _0x8149f=VisuMZ[_0x3a8f97(0x250)][_0x3a8f97(0x381)][_0x3a8f97(0x2f4)],_0x4fe881=VisuMZ[_0x3a8f97(0x250)][_0x3a8f97(0x3e1)],_0x3f5c76=_0x45f2d7['note'];if(_0x3f5c76['match'](_0x4fe881[_0x3a8f97(0x430)])){if('WAyrs'!==_0x3a8f97(0x370))this['_subject']&&(!this[_0x3a8f97(0x36b)]['includes'](this[_0x3a8f97(0x431)])&&this[_0x3a8f97(0x36b)][_0x3a8f97(0x1f6)](this[_0x3a8f97(0x431)])),this['_subject']=this[_0x3a8f97(0x2f0)]();else return Number(RegExp['$1']);}else{if(_0x3f5c76[_0x3a8f97(0x39f)](_0x4fe881[_0x3a8f97(0x284)]))return Number(RegExp['$1']);else{if(_0x3f5c76[_0x3a8f97(0x39f)](_0x4fe881[_0x3a8f97(0x347)]))return Number(RegExp['$1']);else{if(_0x3f5c76['match'](_0x4fe881[_0x3a8f97(0x220)]))return Number(RegExp['$1']);else{if(_0x3f5c76[_0x3a8f97(0x39f)](_0x4fe881[_0x3a8f97(0x23a)]))return Number(RegExp['$1']);else{if(_0x3f5c76[_0x3a8f97(0x39f)](_0x4fe881[_0x3a8f97(0x3ba)]))return Number(RegExp['$1']);else{if(DataManager[_0x3a8f97(0x26c)](_0x45f2d7))return _0x8149f[_0x3a8f97(0x212)];else return DataManager[_0x3a8f97(0x2d8)](_0x45f2d7)?_0x8149f[_0x3a8f97(0x328)]:0x0;}}}}}}},ImageManager[_0x6201f2(0x3fe)]=VisuMZ[_0x6201f2(0x250)]['Settings'][_0x6201f2(0x293)][_0x6201f2(0x39b)],ImageManager[_0x6201f2(0x1d9)]=VisuMZ[_0x6201f2(0x250)][_0x6201f2(0x381)]['General'][_0x6201f2(0x2b0)],ImageManager[_0x6201f2(0x2cf)]=VisuMZ['BattleSystemPTB'][_0x6201f2(0x381)][_0x6201f2(0x293)]['CostCompressIcon'],ImageManager['ptbActorFullActionsIcon']=VisuMZ['BattleSystemPTB']['Settings']['General'][_0x6201f2(0x37d)],ImageManager['ptbActorHalfActionsIcon']=VisuMZ[_0x6201f2(0x250)][_0x6201f2(0x381)][_0x6201f2(0x293)]['ActorHalfActionsIcon'],ImageManager[_0x6201f2(0x1f0)]=VisuMZ[_0x6201f2(0x250)][_0x6201f2(0x381)]['General'][_0x6201f2(0x2a0)],ImageManager[_0x6201f2(0x419)]=VisuMZ[_0x6201f2(0x250)][_0x6201f2(0x381)][_0x6201f2(0x293)][_0x6201f2(0x1d4)],ImageManager[_0x6201f2(0x297)]=VisuMZ[_0x6201f2(0x250)][_0x6201f2(0x381)][_0x6201f2(0x293)][_0x6201f2(0x2db)],SoundManager[_0x6201f2(0x403)]=function(_0x179312){const _0x2b20f2=_0x6201f2;if(!this['_ptb%1Action'[_0x2b20f2(0x43a)](_0x179312)]){if(_0x2b20f2(0x267)==='QiDGC'){const _0x368353=VisuMZ[_0x2b20f2(0x250)][_0x2b20f2(0x381)][_0x2b20f2(0x289)];this['_ptb%1Action'[_0x2b20f2(0x43a)](_0x179312)]={'name':_0x368353[_0x2b20f2(0x2d4)['format'](_0x179312)]??'','volume':_0x368353[_0x2b20f2(0x2ea)[_0x2b20f2(0x43a)](_0x179312)]??0x5a,'pitch':_0x368353[_0x2b20f2(0x1d7)[_0x2b20f2(0x43a)](_0x179312)]??0x64,'pan':_0x368353[_0x2b20f2(0x417)[_0x2b20f2(0x43a)](_0x179312)]??0x0};}else{let _0x1a42a2=_0x55e9ca[_0x2b20f2(0x31d)]();_0x1af298=_0x136218['ptbPartyTeamShift'][_0x2b20f2(0x43a)](_0x1a42a2);}}AudioManager[_0x2b20f2(0x369)](this[_0x2b20f2(0x262)[_0x2b20f2(0x43a)](_0x179312)]);},SoundManager[_0x6201f2(0x2e6)]=function(){this['playPtbSfx']('GainFull');},SoundManager['playPtbGainHalfAction']=function(){const _0x41b8a5=_0x6201f2;this[_0x41b8a5(0x403)](_0x41b8a5(0x2fb));},SoundManager[_0x6201f2(0x32f)]=function(){const _0x4799d5=_0x6201f2;this[_0x4799d5(0x403)](_0x4799d5(0x321));},SoundManager[_0x6201f2(0x388)]=function(){const _0x32b18a=_0x6201f2;this[_0x32b18a(0x403)](_0x32b18a(0x3be));},TextManager[_0x6201f2(0x1c9)]=VisuMZ[_0x6201f2(0x250)][_0x6201f2(0x381)][_0x6201f2(0x293)]['ActionCountFull'],TextManager[_0x6201f2(0x3f2)]=VisuMZ[_0x6201f2(0x250)]['Settings'][_0x6201f2(0x293)]['ActionCountAbbr'],TextManager[_0x6201f2(0x3c0)]=VisuMZ[_0x6201f2(0x250)]['Settings'][_0x6201f2(0x293)][_0x6201f2(0x23d)],TextManager['ptbPartyTeamShift']=VisuMZ[_0x6201f2(0x250)][_0x6201f2(0x381)]['General']['PartyTeamShiftFmt'],TextManager[_0x6201f2(0x3ae)]=VisuMZ['BattleSystemPTB'][_0x6201f2(0x381)][_0x6201f2(0x293)][_0x6201f2(0x410)],SceneManager[_0x6201f2(0x245)]=function(){const _0x1bfe8f=_0x6201f2;return this[_0x1bfe8f(0x279)]&&this[_0x1bfe8f(0x279)][_0x1bfe8f(0x36f)]===Scene_Battle;},BattleManager[_0x6201f2(0x2bc)]=![],BattleManager[_0x6201f2(0x2ed)]=![],BattleManager['_PTB_RESET_INDEX']=![],BattleManager[_0x6201f2(0x1e4)]=VisuMZ[_0x6201f2(0x250)][_0x6201f2(0x381)][_0x6201f2(0x2f4)]['GuardPass'],BattleManager[_0x6201f2(0x384)]=VisuMZ[_0x6201f2(0x250)][_0x6201f2(0x381)]['Mechanics'][_0x6201f2(0x368)],BattleManager[_0x6201f2(0x3b8)]=VisuMZ[_0x6201f2(0x250)][_0x6201f2(0x381)]['Mechanics']['LoseDiff'],BattleManager[_0x6201f2(0x3b7)]=VisuMZ[_0x6201f2(0x250)][_0x6201f2(0x381)][_0x6201f2(0x2f4)][_0x6201f2(0x27c)],BattleManager[_0x6201f2(0x3ad)]=VisuMZ[_0x6201f2(0x250)][_0x6201f2(0x381)][_0x6201f2(0x293)][_0x6201f2(0x38d)],BattleManager['_PTB_STATE_BUFF_TURN_UPDATES_ONLY_ON_OPPONENT_TURNS']=VisuMZ[_0x6201f2(0x250)]['Settings'][_0x6201f2(0x2f4)][_0x6201f2(0x246)],VisuMZ['BattleSystemPTB'][_0x6201f2(0x269)]=BattleManager['battleSys'],BattleManager[_0x6201f2(0x3fa)]=function(){const _0x119f45=_0x6201f2;if(this[_0x119f45(0x401)]())return'PTB';return VisuMZ[_0x119f45(0x250)][_0x119f45(0x269)][_0x119f45(0x22d)](this);},BattleManager['isPTB']=function(){const _0x7854a6=_0x6201f2;return $gameSystem[_0x7854a6(0x253)]()===_0x7854a6(0x3b9);},VisuMZ[_0x6201f2(0x250)]['BattleManager_isTpb']=BattleManager['isTpb'],BattleManager[_0x6201f2(0x24d)]=function(){const _0x3661ef=_0x6201f2;if(this[_0x3661ef(0x401)]())return![];return VisuMZ[_0x3661ef(0x250)][_0x3661ef(0x2a1)][_0x3661ef(0x22d)](this);},VisuMZ[_0x6201f2(0x250)][_0x6201f2(0x229)]=BattleManager[_0x6201f2(0x335)],BattleManager['isActiveTpb']=function(){const _0x5f5413=_0x6201f2;if(this[_0x5f5413(0x401)]())return![];return VisuMZ[_0x5f5413(0x250)][_0x5f5413(0x229)][_0x5f5413(0x22d)](this);},VisuMZ[_0x6201f2(0x250)]['BattleManager_isTurnBased']=BattleManager[_0x6201f2(0x354)],BattleManager[_0x6201f2(0x354)]=function(){const _0x3d9a59=_0x6201f2;if(this[_0x3d9a59(0x401)]())return!![];return VisuMZ['BattleSystemPTB'][_0x3d9a59(0x258)]['call'](this);},VisuMZ[_0x6201f2(0x250)][_0x6201f2(0x42b)]=BattleManager[_0x6201f2(0x20d)],BattleManager[_0x6201f2(0x20d)]=function(){const _0x45ad54=_0x6201f2;if(this[_0x45ad54(0x401)]())return!![];return VisuMZ[_0x45ad54(0x250)]['BattleManager_isTeamBased'][_0x45ad54(0x22d)](this);},VisuMZ[_0x6201f2(0x250)][_0x6201f2(0x402)]=BattleManager['startInput'],BattleManager[_0x6201f2(0x413)]=function(){const _0x15a7e4=_0x6201f2;if(this[_0x15a7e4(0x401)]())this[_0x15a7e4(0x40f)]=![];VisuMZ[_0x15a7e4(0x250)][_0x15a7e4(0x402)][_0x15a7e4(0x22d)](this);if(this[_0x15a7e4(0x401)]()&&$gameParty[_0x15a7e4(0x33d)]())this[_0x15a7e4(0x22e)]();},BattleManager[_0x6201f2(0x22e)]=function(){const _0x774eaa=_0x6201f2;this[_0x774eaa(0x238)]();},VisuMZ['BattleSystemPTB']['BattleManager_processTurn']=BattleManager[_0x6201f2(0x1f7)],BattleManager[_0x6201f2(0x1f7)]=function(){const _0x265bf3=_0x6201f2;this['isPTB']()?this[_0x265bf3(0x333)]():_0x265bf3(0x3d0)===_0x265bf3(0x3d0)?VisuMZ['BattleSystemPTB'][_0x265bf3(0x200)][_0x265bf3(0x22d)](this):(_0x8bacfa[_0x265bf3(0x250)][_0x265bf3(0x3e0)][_0x265bf3(0x22d)](this),this[_0x265bf3(0x22f)]());},BattleManager[_0x6201f2(0x333)]=function(){const _0x182b5c=_0x6201f2,_0x5e7c42=this[_0x182b5c(0x431)];if(_0x5e7c42&&!_0x5e7c42[_0x182b5c(0x2bf)]()['canActPTB']())this['endAction'](),this['_subject']=null,this[_0x182b5c(0x38c)](![]);else{if(_0x5e7c42&&_0x5e7c42[_0x182b5c(0x25f)]()&&_0x5e7c42[_0x182b5c(0x33d)]()){const _0x507414=_0x5e7c42[_0x182b5c(0x1ce)]();if(!_0x507414){if(_0x182b5c(0x301)==='kzfqM'){if(!_0x1358e7)return;const _0x202093=_0xd0640e[_0x182b5c(0x213)]();if(!_0x202093)return;const _0x2b2d93=_0x595454['BattleSystemPTB'][_0x182b5c(0x3e1)],_0xccaf04=_0x202093[_0x182b5c(0x380)];if(_0xccaf04[_0x182b5c(0x39f)](_0x2b2d93['PostFullActionChange'])){let _0x2a0512=_0x5df791(_0x3a53d9['$1']);this[_0x182b5c(0x21e)](_0x2a0512);}if(_0xccaf04[_0x182b5c(0x39f)](_0x2b2d93[_0x182b5c(0x395)])){let _0x1f673f=_0x1ca743(_0x1ba25f['$1']);this[_0x182b5c(0x2b9)](_0x1f673f);}}else VisuMZ[_0x182b5c(0x250)]['BattleManager_processTurn'][_0x182b5c(0x22d)](this);}else{if(_0x507414[_0x182b5c(0x344)]){if(_0x182b5c(0x1cd)!==_0x182b5c(0x1cd)){const _0x2cf805=_0x5405d2[_0x182b5c(0x222)[_0x182b5c(0x43a)](_0x582593)];this['drawBigIcon'](_0x2cf805,_0x450a24,_0x118c64),this[_0x182b5c(0x33c)](_0xd53b1d)&&this['drawActionsRemaining'](_0x454990,_0x143215);}else VisuMZ[_0x182b5c(0x250)][_0x182b5c(0x200)][_0x182b5c(0x22d)](this);}else{if(_0x182b5c(0x375)!==_0x182b5c(0x1e6))this[_0x182b5c(0x38f)]=_0x5e7c42,this[_0x182b5c(0x40b)]();else{if(this[_0x182b5c(0x401)]())return!![];return _0x7f9d0a[_0x182b5c(0x250)][_0x182b5c(0x42b)]['call'](this);}}}}else VisuMZ[_0x182b5c(0x250)][_0x182b5c(0x200)][_0x182b5c(0x22d)](this);}},VisuMZ[_0x6201f2(0x250)][_0x6201f2(0x345)]=BattleManager[_0x6201f2(0x39e)],BattleManager['finishActorInput']=function(){const _0x18d075=_0x6201f2;if(this[_0x18d075(0x401)]()){if(_0x18d075(0x3df)===_0x18d075(0x1dd)){let _0x2123d3=_0x23d53c[_0x18d075(0x256)]()['filter'](_0x252708=>_0x252708[_0x18d075(0x33b)]()&&!_0x252708[_0x18d075(0x33d)]()),_0x3c4698=_0x953a78[_0x18d075(0x256)]()[_0x18d075(0x23e)](_0x4cb370=>_0x4cb370['canMove']()&&_0x4cb370[_0x18d075(0x33d)]());_0x3a2b29=_0x5c2b37[_0x18d075(0x274)](_0x2123d3),_0x4b21d0=_0x4e3da9[_0x18d075(0x346)];while(_0x39975c--){_0x535765=_0x64a453[_0x18d075(0x274)](_0x3c4698);}_0x3aac4e=_0x2037fd[_0x18d075(0x346)]-0x1;while(_0x4829ac--){_0x34e96d=_0x24da7b['concat'](_0x2123d3);}}else VisuMZ['BattleSystemPTB'][_0x18d075(0x200)][_0x18d075(0x22d)](this);}else VisuMZ[_0x18d075(0x250)][_0x18d075(0x345)]['call'](this);},VisuMZ[_0x6201f2(0x250)][_0x6201f2(0x205)]=BattleManager[_0x6201f2(0x252)],BattleManager[_0x6201f2(0x252)]=function(){const _0x3b8118=_0x6201f2;this[_0x3b8118(0x401)]()?this[_0x3b8118(0x1fb)]():VisuMZ['BattleSystemPTB']['BattleManager_selectNextActor'][_0x3b8118(0x22d)](this);},BattleManager[_0x6201f2(0x1fb)]=function(){const _0x4569fb=_0x6201f2;this['_currentActor']=null,this[_0x4569fb(0x352)]=![];},VisuMZ[_0x6201f2(0x250)][_0x6201f2(0x318)]=BattleManager[_0x6201f2(0x232)],BattleManager[_0x6201f2(0x232)]=function(){const _0x79ce92=_0x6201f2,_0x31bc11=this[_0x79ce92(0x431)];VisuMZ[_0x79ce92(0x250)][_0x79ce92(0x318)][_0x79ce92(0x22d)](this),this[_0x79ce92(0x407)](_0x31bc11);},BattleManager['endActionPTB']=function(_0x188a2f){const _0x2a7dbc=_0x6201f2;if(!this[_0x2a7dbc(0x401)]())return;_0x188a2f['friendsUnit']()[_0x2a7dbc(0x201)](),_0x188a2f[_0x2a7dbc(0x2bf)]()[_0x2a7dbc(0x3cf)](this[_0x2a7dbc(0x2ec)]);if(_0x188a2f){if(_0x2a7dbc(0x20a)==='EIxkV'){const _0x525127=_0x188a2f['_actions']['filter'](_0x5d4d25=>_0x5d4d25[_0x2a7dbc(0x344)]);_0x188a2f[_0x2a7dbc(0x394)]();if(_0x525127){if('tKwWC'===_0x2a7dbc(0x26b))_0x20ddc5[_0x2a7dbc(0x250)][_0x2a7dbc(0x348)][_0x2a7dbc(0x22d)](this,_0x5d5822),this[_0x2a7dbc(0x2bf)]()[_0x2a7dbc(0x3b3)]();else{let _0x214172=_0x525127[_0x2a7dbc(0x3e9)];while(_0x214172--){if(_0x2a7dbc(0x25b)===_0x2a7dbc(0x28b)){if(!_0x121250)return![];if(!_0x12b0d4[_0x2a7dbc(0x33b)]())return![];if(!_0x3862c5[_0x2a7dbc(0x33d)]())return![];if(_0x35c391[_0x2a7dbc(0x3a9)]())return![];return!![];}else _0x188a2f[_0x2a7dbc(0x215)][_0x2a7dbc(0x3e7)]();}_0x188a2f[_0x2a7dbc(0x215)]=_0x525127['concat'](_0x188a2f[_0x2a7dbc(0x215)]);}}}else return _0x3188b7[_0x2a7dbc(0x328)];}if(this[_0x2a7dbc(0x315)][_0x2a7dbc(0x3e9)]>0x0)this[_0x2a7dbc(0x431)]&&(_0x2a7dbc(0x2f8)==='bmGpC'?_0x11dea4[_0x2a7dbc(0x388)]():!this[_0x2a7dbc(0x36b)][_0x2a7dbc(0x41a)](this[_0x2a7dbc(0x431)])&&this[_0x2a7dbc(0x36b)][_0x2a7dbc(0x1f6)](this['_subject'])),this[_0x2a7dbc(0x431)]=this[_0x2a7dbc(0x2f0)]();else this[_0x2a7dbc(0x28e)](_0x188a2f)&&(_0x2a7dbc(0x3d1)==='TOGwf'?this[_0x2a7dbc(0x403)](_0x2a7dbc(0x321)):this[_0x2a7dbc(0x431)]=_0x188a2f);_0x188a2f[_0x2a7dbc(0x2bf)]()[_0x2a7dbc(0x28a)](_0x188a2f);},BattleManager[_0x6201f2(0x28e)]=function(_0x32e19d){const _0x33fc80=_0x6201f2;if(!_0x32e19d)return![];if(!_0x32e19d[_0x33fc80(0x25f)]())return![];if(!_0x32e19d[_0x33fc80(0x33b)]())return![];if(!_0x32e19d['canInput']())return![];if(_0x32e19d[_0x33fc80(0x3a9)]())return![];return BattleManager['_PTB_FREE_CHANGE']&&BattleManager[_0x33fc80(0x2ed)];},VisuMZ[_0x6201f2(0x250)][_0x6201f2(0x323)]=BattleManager[_0x6201f2(0x3c2)],BattleManager['startBattle']=function(){const _0x2229e1=_0x6201f2;VisuMZ['BattleSystemPTB'][_0x2229e1(0x323)][_0x2229e1(0x22d)](this),this[_0x2229e1(0x1eb)]();},BattleManager[_0x6201f2(0x1eb)]=function(){const _0x44901f=_0x6201f2;if(!this[_0x44901f(0x401)]())return;if(this[_0x44901f(0x3f5)])_0x44901f(0x22b)===_0x44901f(0x1db)?_0x17dff8[_0x44901f(0x250)][_0x44901f(0x35a)][_0x44901f(0x22d)](this):this[_0x44901f(0x221)]=_0x44901f(0x1e5);else{if(this[_0x44901f(0x40f)]){if(_0x44901f(0x1ee)!==_0x44901f(0x1ee)){if(!_0x206bac[_0x44901f(0x401)]())return;if(!_0x62bb3e)return;const _0x2a5a7d=_0x4bc44f['result']();!_0x2a5a7d['isHit']()&&this[_0x44901f(0x2bf)]()[_0x44901f(0x42c)]('miss'),_0x2a5a7d[_0x44901f(0x3f6)]&&this[_0x44901f(0x2bf)]()[_0x44901f(0x42c)]('critical');}else this[_0x44901f(0x221)]=_0x44901f(0x277);}else _0x44901f(0x3b0)===_0x44901f(0x3b0)?this['_ptbTurnAdvantageUnit']=BattleManager[_0x44901f(0x3b7)]:_0x38d93d[_0x44901f(0x250)][_0x44901f(0x1e0)][_0x44901f(0x22d)](this,_0x3f7e38);}this[_0x44901f(0x221)]=this[_0x44901f(0x221)]||_0x44901f(0x241);let _0x2475f8=0x0,_0x349e3b=0x0;switch(this['_ptbTurnAdvantageUnit'][_0x44901f(0x373)]()['trim']()){case _0x44901f(0x241):let _0x21a5f3=[_0x44901f(0x1e5),'enemies'];this[_0x44901f(0x221)]=_0x21a5f3[Math['randomInt'](_0x21a5f3['length'])];break;case _0x44901f(0x398):this['_ptbTurnAdvantageUnit']=_0x44901f(0x1e5);break;case _0x44901f(0x2d2):this[_0x44901f(0x221)]=_0x44901f(0x277);break;case _0x44901f(0x382):_0x2475f8=$gameParty[_0x44901f(0x2e1)](),_0x349e3b=$gameTroop['ptbLowestAgility'](),this['_ptbTurnAdvantageUnit']=_0x2475f8>=_0x349e3b?_0x44901f(0x1e5):_0x44901f(0x277);break;case _0x44901f(0x1d3):_0x2475f8=$gameParty['agility'](),_0x349e3b=$gameTroop['agility'](),this[_0x44901f(0x221)]=_0x2475f8>=_0x349e3b?_0x44901f(0x1e5):_0x44901f(0x277);break;case'highest\x20agi':_0x2475f8=$gameParty['ptbHighestAgility'](),_0x349e3b=$gameTroop[_0x44901f(0x209)](),this[_0x44901f(0x221)]=_0x2475f8>=_0x349e3b?_0x44901f(0x1e5):_0x44901f(0x277);break;case _0x44901f(0x37a):_0x2475f8=$gameParty[_0x44901f(0x415)](),_0x349e3b=$gameTroop[_0x44901f(0x415)](),this[_0x44901f(0x221)]=_0x2475f8>=_0x349e3b?_0x44901f(0x1e5):_0x44901f(0x277);break;}this[_0x44901f(0x2b7)]=this[_0x44901f(0x221)]===_0x44901f(0x1e5)?$gameParty:$gameTroop,this[_0x44901f(0x29a)]=this[_0x44901f(0x221)]==='actors'?$gameTroop:$gameParty;},VisuMZ['BattleSystemPTB'][_0x6201f2(0x3fc)]=BattleManager['makeActionOrders'],BattleManager[_0x6201f2(0x424)]=function(){const _0x53dcc4=_0x6201f2;this[_0x53dcc4(0x401)]()?this[_0x53dcc4(0x435)]():VisuMZ[_0x53dcc4(0x250)][_0x53dcc4(0x3fc)][_0x53dcc4(0x22d)](this);},BattleManager[_0x6201f2(0x435)]=function(){const _0x4ff067=_0x6201f2;let _0x190172=[],_0x65f8ba=[],_0x1e5dc9=0x0;const _0x185d36=$gameTroop['turnCount']();let _0x565e43=_0x185d36%0x2===0x0?this[_0x4ff067(0x29a)]:this[_0x4ff067(0x2b7)];this[_0x4ff067(0x3b2)]=_0x565e43;if(_0x565e43===$gameParty){if(_0x4ff067(0x28c)!=='uptmX')this[_0x4ff067(0x2bf)]()[_0x4ff067(0x42c)]('immune');else{let _0x53f3d7=$gameParty[_0x4ff067(0x256)]()[_0x4ff067(0x23e)](_0xd4f87=>_0xd4f87[_0x4ff067(0x33b)]()&&!_0xd4f87[_0x4ff067(0x33d)]()),_0x3d721e=$gameParty['ptbAliveMembers']()['filter'](_0x17dd10=>_0x17dd10['canMove']()&&_0x17dd10[_0x4ff067(0x33d)]());_0x190172=_0x190172[_0x4ff067(0x274)](_0x53f3d7),_0x1e5dc9=Game_Unit[_0x4ff067(0x346)];while(_0x1e5dc9--){'dLqZk'!==_0x4ff067(0x40e)?_0x190172=_0x190172['concat'](_0x3d721e):(_0x2c314b--,_0x23d323++);}_0x1e5dc9=Game_Unit[_0x4ff067(0x346)]-0x1;while(_0x1e5dc9--){_0x190172=_0x190172[_0x4ff067(0x274)](_0x53f3d7);}}}if(_0x565e43===$gameTroop){let _0x3e2c06=$gameTroop[_0x4ff067(0x256)]()[_0x4ff067(0x23e)](_0x422224=>_0x422224[_0x4ff067(0x33b)]());_0x3e2c06[_0x4ff067(0x2c8)]((_0x2209e2,_0x535a5a)=>_0x535a5a[_0x4ff067(0x3ec)]-_0x2209e2['agi']),_0x1e5dc9=Game_Unit[_0x4ff067(0x346)];while(_0x1e5dc9--){if('zvOiv'!==_0x4ff067(0x1de))_0x65f8ba=_0x65f8ba[_0x4ff067(0x274)](_0x3e2c06);else{this[_0x4ff067(0x322)]();const _0x3882ec=_0x45f23e[_0x4ff067(0x39a)][_0x4ff067(0x381)][_0x4ff067(0x436)];this[_0x4ff067(0x2be)][_0x4ff067(0x376)]=_0x3882ec['ItemQuantityFontSize'];if(_0x1c8e23){const _0x50cb70=_0x3882ec[_0x4ff067(0x37c)],_0x11c54f=_0x50cb70[_0x4ff067(0x43a)](_0x2ed544[_0x4ff067(0x387)](_0xb0aed3)),_0x2a80e2=this[_0x4ff067(0x3c1)](_0x11c54f+this['skillCostSeparator']());_0x180d86-=_0x2a80e2;}else _0x1fff62-=this[_0x4ff067(0x3c1)](this[_0x4ff067(0x317)]())+_0x26d333;_0x17c75d[_0x4ff067(0x250)][_0x4ff067(0x1fc)]['call'](this,_0x2a765b,_0x2e1445,_0x18613f,_0x11355c);}}$gameTroop[_0x4ff067(0x394)]();}this[_0x4ff067(0x36b)]=_0x190172[_0x4ff067(0x274)](_0x65f8ba);},BattleManager[_0x6201f2(0x30c)]=function(){const _0x7a403a=_0x6201f2;if(!this[_0x7a403a(0x401)]())return;this['_actionBattlers']=this[_0x7a403a(0x36b)]||[],this[_0x7a403a(0x36b)]=this['_actionBattlers']['filter'](_0x116605=>_0x116605[_0x7a403a(0x33b)]()&&!_0x116605[_0x7a403a(0x3a9)]());},VisuMZ['BattleSystemPTB']['BattleManager_setup']=BattleManager[_0x6201f2(0x340)],BattleManager[_0x6201f2(0x340)]=function(_0x3fb6d2,_0x26b042,_0x532a46){const _0x825767=_0x6201f2;VisuMZ[_0x825767(0x250)][_0x825767(0x1d2)][_0x825767(0x22d)](this,_0x3fb6d2,_0x26b042,_0x532a46),this[_0x825767(0x239)]();},BattleManager[_0x6201f2(0x239)]=function(){const _0x3c101c=_0x6201f2;if(!BattleManager[_0x3c101c(0x401)]())return;this[_0x3c101c(0x3b2)]=undefined,$gameParty[_0x3c101c(0x2f7)](),$gameTroop['startTurnPTB']();},VisuMZ[_0x6201f2(0x250)][_0x6201f2(0x1ff)]=BattleManager['startTurn'],BattleManager[_0x6201f2(0x238)]=function(){const _0x1f305d=_0x6201f2;this['startTurnPTB'](),VisuMZ[_0x1f305d(0x250)][_0x1f305d(0x1ff)]['call'](this),this[_0x1f305d(0x3c8)]();},BattleManager[_0x6201f2(0x2f7)]=function(){const _0x37c9f9=_0x6201f2;if(!BattleManager[_0x37c9f9(0x401)]())return;$gameParty[_0x37c9f9(0x3dc)](),$gameTroop[_0x37c9f9(0x3dc)]();const _0x434f97=$gameTroop[_0x37c9f9(0x29d)]()+0x1;let _0x437dab=_0x434f97%0x2===0x0?this[_0x37c9f9(0x29a)]:this[_0x37c9f9(0x2b7)],_0x424178=_0x434f97%0x2===0x0?this[_0x37c9f9(0x2b7)]:this[_0x37c9f9(0x29a)];_0x434f97>0x1&&('kRrxT'!==_0x37c9f9(0x32c)?_0x424178[_0x37c9f9(0x24e)]():this[_0x37c9f9(0x221)]='actors'),_0x437dab[_0x37c9f9(0x211)](),_0x437dab[_0x37c9f9(0x2f7)]();},VisuMZ[_0x6201f2(0x250)][_0x6201f2(0x3ed)]=BattleManager['endTurn'],BattleManager[_0x6201f2(0x2d1)]=function(){const _0x5f4d5c=_0x6201f2;VisuMZ[_0x5f4d5c(0x250)][_0x5f4d5c(0x3ed)]['call'](this),this[_0x5f4d5c(0x2bd)]();},BattleManager['endTurnPTB']=function(){const _0x3e5030=_0x6201f2;if(!BattleManager[_0x3e5030(0x401)]())return;},VisuMZ['BattleSystemPTB']['BattleManager_endAllBattlersTurn']=BattleManager[_0x6201f2(0x2f1)],BattleManager[_0x6201f2(0x2f1)]=function(){const _0xebd026=_0x6201f2;if(this[_0xebd026(0x401)]())return;VisuMZ[_0xebd026(0x250)]['BattleManager_endAllBattlersTurn'][_0xebd026(0x22d)](this);},BattleManager[_0x6201f2(0x3c8)]=function(){const _0x42ded8=_0x6201f2;if(!BattleManager[_0x42ded8(0x401)]())return;let _0x28fb78='';if(this[_0x42ded8(0x3b2)]===$gameParty){if(_0x42ded8(0x39c)!=='nloAb')_0x1e5979[_0x42ded8(0x250)][_0x42ded8(0x3b4)]['call'](this);else{let _0x20bc6d=$gameParty[_0x42ded8(0x31d)]();_0x28fb78=TextManager[_0x42ded8(0x372)]['format'](_0x20bc6d);}}else _0x28fb78=TextManager[_0x42ded8(0x3ae)];if(_0x28fb78!==''){if(_0x42ded8(0x2fa)===_0x42ded8(0x2fa)){this[_0x42ded8(0x237)][_0x42ded8(0x412)](_0x42ded8(0x27b),_0x28fb78);const _0x2787ce=BattleManager[_0x42ded8(0x3ad)];this['_logWindow'][_0x42ded8(0x412)](_0x42ded8(0x3d4),_0x2787ce),this[_0x42ded8(0x237)]['push']('clear');}else{if(!this[_0x42ded8(0x401)]())return;this[_0x42ded8(0x36b)]=this[_0x42ded8(0x36b)]||[],this['_actionBattlers']=this['_actionBattlers'][_0x42ded8(0x23e)](_0x5c5afa=>_0x5c5afa[_0x42ded8(0x33b)]()&&!_0x5c5afa['isPassingTurnPTB']());}}},VisuMZ[_0x6201f2(0x250)][_0x6201f2(0x3d3)]=BattleManager[_0x6201f2(0x3cb)],BattleManager[_0x6201f2(0x3cb)]=function(_0xdc8bc5,_0x4c85e3){const _0x52cbcf=_0x6201f2,_0x1fc609=BattleManager[_0x52cbcf(0x401)]();if(_0x1fc609)$gameSystem[_0x52cbcf(0x23b)](_0x52cbcf(0x338));VisuMZ[_0x52cbcf(0x250)][_0x52cbcf(0x3d3)]['call'](this,_0xdc8bc5,_0x4c85e3);if(_0x1fc609)$gameSystem['setBattleSystem'](_0x52cbcf(0x3b9));},VisuMZ[_0x6201f2(0x250)][_0x6201f2(0x27e)]=Game_System[_0x6201f2(0x41e)][_0x6201f2(0x3ff)],Game_System['prototype'][_0x6201f2(0x3ff)]=function(){const _0x3eb9ca=_0x6201f2;VisuMZ['BattleSystemPTB']['Game_System_initialize'][_0x3eb9ca(0x22d)](this),this[_0x3eb9ca(0x296)]();},Game_System[_0x6201f2(0x41e)][_0x6201f2(0x296)]=function(){const _0x4c651a=_0x6201f2;this[_0x4c651a(0x3a5)]=!![];},Game_System['prototype'][_0x6201f2(0x35f)]=function(){const _0x34bd4b=_0x6201f2;if(BattleManager[_0x34bd4b(0x29c)]===_0x34bd4b(0x1e2))return![];return this[_0x34bd4b(0x3a5)]===undefined&&this['initBattleSystemPTB'](),this[_0x34bd4b(0x3a5)];},Game_System['prototype'][_0x6201f2(0x400)]=function(_0x3a8d93){const _0x37f86a=_0x6201f2;this[_0x37f86a(0x3a5)]===undefined&&(_0x37f86a(0x306)===_0x37f86a(0x292)?this[_0x37f86a(0x401)]()?this[_0x37f86a(0x333)]():_0x1f6fb0[_0x37f86a(0x250)][_0x37f86a(0x200)][_0x37f86a(0x22d)](this):this[_0x37f86a(0x296)]()),this['_ptbActionCountVisible']=_0x3a8d93;},VisuMZ['BattleSystemPTB'][_0x6201f2(0x2f9)]=Game_Action['prototype'][_0x6201f2(0x408)],Game_Action[_0x6201f2(0x41e)][_0x6201f2(0x408)]=function(){const _0x138ece=_0x6201f2;if(BattleManager[_0x138ece(0x401)]())return 0x0;else{if(_0x138ece(0x2b6)==='FgGfe'){if(this['_unit']===_0x41ef21)_0x33c6b1=!_0xb6907d;}else return VisuMZ['BattleSystemPTB']['Game_Action_speed']['call'](this);}},VisuMZ[_0x6201f2(0x250)]['Game_Action_applyGlobal']=Game_Action[_0x6201f2(0x41e)][_0x6201f2(0x367)],Game_Action[_0x6201f2(0x41e)][_0x6201f2(0x367)]=function(){const _0x24d375=_0x6201f2;VisuMZ[_0x24d375(0x250)][_0x24d375(0x3e0)][_0x24d375(0x22d)](this),this[_0x24d375(0x22f)]();},Game_Action[_0x6201f2(0x41e)][_0x6201f2(0x22f)]=function(){const _0xccd9a4=_0x6201f2;if(!BattleManager[_0xccd9a4(0x401)]())return;if(!this[_0xccd9a4(0x270)]())return;if(!this[_0xccd9a4(0x213)]())return;this['isSkill']()&&this['item']()['id']===this[_0xccd9a4(0x270)]()[_0xccd9a4(0x21f)]()&&(BattleManager[_0xccd9a4(0x1e4)]&&(_0xccd9a4(0x298)!==_0xccd9a4(0x298)?(this[_0xccd9a4(0x271)]=_0x39d98f?_0xa9d2e3[_0xccd9a4(0x20c)]():0x0,this[_0xccd9a4(0x271)]++):this[_0xccd9a4(0x270)]()['passTurnPTB']()),this['friendsUnit']()[_0xccd9a4(0x42c)]('guard'));const _0x32fd20=VisuMZ[_0xccd9a4(0x250)][_0xccd9a4(0x3e1)],_0x28f6fd=this[_0xccd9a4(0x213)]()[_0xccd9a4(0x380)];_0x28f6fd['match'](_0x32fd20[_0xccd9a4(0x428)])&&this[_0xccd9a4(0x270)]()[_0xccd9a4(0x22a)]();},Game_Action[_0x6201f2(0x2a9)]=VisuMZ['BattleSystemPTB'][_0x6201f2(0x381)][_0x6201f2(0x275)]['weaknessMinimumRate'],Game_Action[_0x6201f2(0x231)]=VisuMZ['BattleSystemPTB'][_0x6201f2(0x381)][_0x6201f2(0x275)][_0x6201f2(0x202)],VisuMZ[_0x6201f2(0x250)]['Game_Action_apply']=Game_Action[_0x6201f2(0x41e)][_0x6201f2(0x227)],Game_Action[_0x6201f2(0x41e)][_0x6201f2(0x227)]=function(_0x1eca02){const _0x310e85=_0x6201f2;VisuMZ[_0x310e85(0x250)][_0x310e85(0x3d8)][_0x310e85(0x22d)](this,_0x1eca02),this[_0x310e85(0x399)](_0x1eca02);},Game_Action[_0x6201f2(0x41e)][_0x6201f2(0x399)]=function(_0x565964){const _0x3e463a=_0x6201f2;if(!BattleManager[_0x3e463a(0x401)]())return;if(!_0x565964)return;const _0x165782=_0x565964[_0x3e463a(0x2de)]();!_0x165782[_0x3e463a(0x30b)]()&&(_0x3e463a(0x287)==='ZEhVV'?this[_0x3e463a(0x2bf)]()[_0x3e463a(0x42c)](_0x3e463a(0x23c)):this['_ptbTurnAdvantageUnit']=_0x7a752a['_PTB_NEUTRAL_TURN_ADVANTAGE']),_0x165782['critical']&&this[_0x3e463a(0x2bf)]()[_0x3e463a(0x42c)](_0x3e463a(0x3f6));},VisuMZ[_0x6201f2(0x250)][_0x6201f2(0x26d)]=Game_Action[_0x6201f2(0x41e)]['executeDamage'],Game_Action[_0x6201f2(0x41e)][_0x6201f2(0x2ef)]=function(_0x3ffc2b,_0x5e0908){const _0x178712=_0x6201f2;VisuMZ[_0x178712(0x250)]['Game_Action_executeDamage']['call'](this,_0x3ffc2b,_0x5e0908),this[_0x178712(0x330)](_0x3ffc2b,_0x5e0908);},Game_Action['prototype'][_0x6201f2(0x330)]=function(_0x32be65,_0x3fe88e){const _0x2560bd=_0x6201f2;if(!BattleManager[_0x2560bd(0x401)]())return;if(!_0x32be65)return;const _0x3e13d0=this['calcElementRate'](_0x32be65);if(_0x3e13d0<0x0){if(_0x2560bd(0x208)!=='vRqVP')return _0x2560bd(0x1ed);else this['friendsUnit']()[_0x2560bd(0x42c)](_0x2560bd(0x362));}else{if(_0x3e13d0===0x0)this[_0x2560bd(0x2bf)]()[_0x2560bd(0x42c)](_0x2560bd(0x332));else{if(_0x3e13d0<=Game_Action[_0x2560bd(0x231)])'VbGCT'!==_0x2560bd(0x283)?_0x3932f7--:this[_0x2560bd(0x2bf)]()[_0x2560bd(0x42c)]('resist');else _0x3e13d0>=Game_Action['PTB_MINIMUM_WEAKNESS_RATE']&&this[_0x2560bd(0x2bf)]()[_0x2560bd(0x42c)](_0x2560bd(0x2a3));}}},VisuMZ['BattleSystemPTB'][_0x6201f2(0x3bd)]=BattleManager['invokeMagicReflection'],BattleManager['invokeMagicReflection']=function(_0x397e63,_0x4a899f){const _0x593bed=_0x6201f2;VisuMZ[_0x593bed(0x250)][_0x593bed(0x3bd)][_0x593bed(0x22d)](this,_0x397e63,_0x4a899f),_0x397e63[_0x593bed(0x2bf)]()[_0x593bed(0x42c)](_0x593bed(0x432));},VisuMZ[_0x6201f2(0x250)][_0x6201f2(0x379)]=Game_BattlerBase[_0x6201f2(0x41e)][_0x6201f2(0x3f0)],Game_BattlerBase['prototype'][_0x6201f2(0x3f0)]=function(){const _0x3a256d=_0x6201f2;VisuMZ[_0x3a256d(0x250)][_0x3a256d(0x379)][_0x3a256d(0x22d)](this),BattleManager[_0x3a256d(0x30c)](),this[_0x3a256d(0x2bf)]()[_0x3a256d(0x3b3)]();},VisuMZ['BattleSystemPTB'][_0x6201f2(0x242)]=Game_BattlerBase[_0x6201f2(0x41e)][_0x6201f2(0x422)],Game_BattlerBase['prototype'][_0x6201f2(0x422)]=function(){const _0x67810a=_0x6201f2;VisuMZ[_0x67810a(0x250)][_0x67810a(0x242)][_0x67810a(0x22d)](this),BattleManager[_0x67810a(0x30c)](),this[_0x67810a(0x2bf)]()[_0x67810a(0x3b3)]();},VisuMZ[_0x6201f2(0x250)][_0x6201f2(0x30e)]=Game_Battler[_0x6201f2(0x41e)]['performCollapse'],Game_Battler[_0x6201f2(0x41e)]['performCollapse']=function(){const _0x151908=_0x6201f2;VisuMZ[_0x151908(0x250)][_0x151908(0x30e)][_0x151908(0x22d)](this),BattleManager[_0x151908(0x30c)](),this['friendsUnit']()[_0x151908(0x3b3)]();},Game_BattlerBase['prototype'][_0x6201f2(0x22a)]=function(){const _0x418edf=_0x6201f2;this[_0x418edf(0x41b)]=!![],BattleManager[_0x418edf(0x30c)]();},Game_BattlerBase[_0x6201f2(0x41e)][_0x6201f2(0x3a9)]=function(){const _0x3c1cf4=_0x6201f2;return!!this[_0x3c1cf4(0x41b)];},Game_BattlerBase[_0x6201f2(0x2aa)]=VisuMZ[_0x6201f2(0x250)][_0x6201f2(0x381)][_0x6201f2(0x2f4)][_0x6201f2(0x3ab)],Game_BattlerBase[_0x6201f2(0x355)]=VisuMZ[_0x6201f2(0x250)][_0x6201f2(0x381)][_0x6201f2(0x2f4)][_0x6201f2(0x2ae)],Game_BattlerBase[_0x6201f2(0x439)]=VisuMZ['BattleSystemPTB'][_0x6201f2(0x381)][_0x6201f2(0x2f4)]['AgiDebuff'],Game_BattlerBase['prototype'][_0x6201f2(0x3f8)]=function(){const _0x1f8390=_0x6201f2;let _0x2002b7=Game_BattlerBase[_0x1f8390(0x2aa)];if(this[_0x1f8390(0x3d2)]===undefined)this['clearBuffs']();const _0xbdbb45=this[_0x1f8390(0x3d2)][0x6]||0x0;if(_0xbdbb45>0x0&&Game_BattlerBase['_PTB_ACTION_AGI_BUFF'])_0x1f8390(0x2c0)===_0x1f8390(0x383)?_0x29c57a[_0x1f8390(0x250)]['Window_Selectable_cursorRight'][_0x1f8390(0x22d)](this,_0x53c7f2):_0x2002b7+=_0xbdbb45;else _0xbdbb45<0x0&&Game_BattlerBase[_0x1f8390(0x439)]&&(_0x2002b7+=_0xbdbb45);const _0x5e6377=VisuMZ['BattleSystemPTB'][_0x1f8390(0x3e1)],_0xb5e1a4=this['traitObjects']();for(const _0x3719ba of _0xb5e1a4){if(!_0x3719ba)continue;const _0x11de03=_0x3719ba[_0x1f8390(0x380)];_0x11de03[_0x1f8390(0x39f)](_0x5e6377['ActionPointTraitPlus'])&&(_0x1f8390(0x3a3)===_0x1f8390(0x3a3)?_0x2002b7+=Number(RegExp['$1']):this[_0x1f8390(0x1da)](![]));}return Math[_0x1f8390(0x2e0)](0x0,_0x2002b7);},VisuMZ[_0x6201f2(0x250)][_0x6201f2(0x339)]=Game_BattlerBase[_0x6201f2(0x41e)][_0x6201f2(0x405)],Game_BattlerBase[_0x6201f2(0x41e)][_0x6201f2(0x405)]=function(){const _0x284a19=_0x6201f2;VisuMZ['BattleSystemPTB'][_0x284a19(0x339)]['call'](this),this[_0x284a19(0x2bf)]()[_0x284a19(0x3b3)]();},VisuMZ[_0x6201f2(0x250)][_0x6201f2(0x291)]=Game_BattlerBase[_0x6201f2(0x41e)]['canUse'],Game_BattlerBase[_0x6201f2(0x41e)]['canUse']=function(_0x47cf5d){const _0x589cfb=_0x6201f2;if(SceneManager[_0x589cfb(0x245)]()&&BattleManager[_0x589cfb(0x401)]()){if(!this['canUsePTB'](_0x47cf5d))return![];}return VisuMZ['BattleSystemPTB']['Game_BattlerBase_canUse'][_0x589cfb(0x22d)](this,_0x47cf5d);},Game_BattlerBase['prototype'][_0x6201f2(0x1e1)]=function(_0x2e72b0){const _0x5483e6=_0x6201f2,_0x21f385=DataManager[_0x5483e6(0x28d)](_0x2e72b0);let _0x5af7db=DataManager[_0x5483e6(0x294)](_0x2e72b0),_0x27baa3=this['friendsUnit']()[_0x5483e6(0x1d5)]();return _0x27baa3+=this[_0x5483e6(0x2bf)]()[_0x5483e6(0x409)]()*(_0x21f385==='consume'?0x1:0x2),_0x27baa3>=_0x5af7db;},VisuMZ[_0x6201f2(0x250)][_0x6201f2(0x423)]=Game_Battler[_0x6201f2(0x41e)][_0x6201f2(0x2c7)],Game_Battler[_0x6201f2(0x41e)]['useItem']=function(_0x2ce0fd){const _0x24e6ae=_0x6201f2;VisuMZ[_0x24e6ae(0x250)][_0x24e6ae(0x423)][_0x24e6ae(0x22d)](this,_0x2ce0fd),this[_0x24e6ae(0x34a)](_0x2ce0fd);},Game_Battler[_0x6201f2(0x41e)][_0x6201f2(0x34a)]=function(_0x153eb4){const _0x4ca787=_0x6201f2;if(!_0x153eb4)return;if(!SceneManager['isSceneBattle']())return;if(!BattleManager['isPTB']())return;const _0x47aba7=BattleManager['_action'];if(_0x47aba7&&_0x47aba7['_forceAction'])return;const _0xba462c=DataManager[_0x4ca787(0x3b6)](_0x153eb4),_0x46a8ab=DataManager[_0x4ca787(0x28d)](_0x153eb4),_0xbbdaca=DataManager['getActionCostValuePTB'](_0x153eb4);this[_0x4ca787(0x2bf)]()[_0x4ca787(0x34a)](_0xba462c,_0x46a8ab,_0xbbdaca);},VisuMZ[_0x6201f2(0x250)]['Game_Battler_onTurnEnd']=Game_Battler[_0x6201f2(0x41e)][_0x6201f2(0x3e3)],Game_Battler['prototype'][_0x6201f2(0x3e3)]=function(){const _0x2a458a=_0x6201f2;this[_0x2a458a(0x255)]=BattleManager[_0x2a458a(0x401)]()&&BattleManager[_0x2a458a(0x254)],VisuMZ[_0x2a458a(0x250)][_0x2a458a(0x3fb)][_0x2a458a(0x22d)](this),delete this[_0x2a458a(0x255)];},VisuMZ[_0x6201f2(0x250)][_0x6201f2(0x37e)]=Game_BattlerBase[_0x6201f2(0x41e)][_0x6201f2(0x331)],Game_BattlerBase[_0x6201f2(0x41e)][_0x6201f2(0x331)]=function(){const _0x231209=_0x6201f2;if(this['_bypassStateTurnUpdatesPTB'])return;VisuMZ[_0x231209(0x250)]['Game_BattlerBase_updateStateTurns'][_0x231209(0x22d)](this);},VisuMZ[_0x6201f2(0x250)][_0x6201f2(0x285)]=Game_BattlerBase[_0x6201f2(0x41e)][_0x6201f2(0x2dc)],Game_BattlerBase[_0x6201f2(0x41e)]['updateBuffTurns']=function(){const _0x12abc8=_0x6201f2;if(this[_0x12abc8(0x255)])return;VisuMZ[_0x12abc8(0x250)][_0x12abc8(0x285)][_0x12abc8(0x22d)](this);},VisuMZ['BattleSystemPTB'][_0x6201f2(0x25e)]=Game_Battler['prototype']['addState'],Game_Battler['prototype'][_0x6201f2(0x42e)]=function(_0x1e06ef){const _0x59112a=_0x6201f2;VisuMZ['BattleSystemPTB'][_0x59112a(0x25e)][_0x59112a(0x22d)](this,_0x1e06ef),this['friendsUnit']()[_0x59112a(0x3b3)]();},VisuMZ[_0x6201f2(0x250)]['Game_Battler_removeState']=Game_Battler['prototype'][_0x6201f2(0x2c3)],Game_Battler[_0x6201f2(0x41e)]['removeState']=function(_0x2e0799){const _0x1a0e8a=_0x6201f2;VisuMZ[_0x1a0e8a(0x250)][_0x1a0e8a(0x316)]['call'](this,_0x2e0799),this[_0x1a0e8a(0x2bf)]()[_0x1a0e8a(0x3b3)]();},VisuMZ[_0x6201f2(0x250)][_0x6201f2(0x234)]=Game_Battler['prototype']['addBuff'],Game_Battler[_0x6201f2(0x41e)][_0x6201f2(0x336)]=function(_0xf01d48,_0x37f3cf){const _0x5d97a0=_0x6201f2;VisuMZ[_0x5d97a0(0x250)]['Game_Battler_addBuff'][_0x5d97a0(0x22d)](this,_0xf01d48,_0x37f3cf),this[_0x5d97a0(0x2bf)]()['recalculateActionsPTB']();},VisuMZ[_0x6201f2(0x250)][_0x6201f2(0x2cb)]=Game_Battler[_0x6201f2(0x41e)][_0x6201f2(0x35d)],Game_Battler[_0x6201f2(0x41e)]['addDebuff']=function(_0x32c64c,_0x374f1c){const _0x63ae42=_0x6201f2;VisuMZ[_0x63ae42(0x250)][_0x63ae42(0x2cb)]['call'](this,_0x32c64c,_0x374f1c),this[_0x63ae42(0x2bf)]()['recalculateActionsPTB']();},VisuMZ[_0x6201f2(0x250)][_0x6201f2(0x2c4)]=Game_Battler[_0x6201f2(0x41e)][_0x6201f2(0x2e7)],Game_Battler[_0x6201f2(0x41e)][_0x6201f2(0x2e7)]=function(_0x5be7ce){const _0x14d22b=_0x6201f2;VisuMZ[_0x14d22b(0x250)][_0x14d22b(0x2c4)][_0x14d22b(0x22d)](this,_0x5be7ce),this[_0x14d22b(0x2bf)]()[_0x14d22b(0x3b3)]();},VisuMZ[_0x6201f2(0x250)][_0x6201f2(0x426)]=Game_Battler[_0x6201f2(0x41e)]['forceAction'],Game_Battler[_0x6201f2(0x41e)]['forceAction']=function(_0x2746b4,_0x38d96d){const _0x4b86ac=_0x6201f2;BattleManager[_0x4b86ac(0x401)]()?this[_0x4b86ac(0x219)](_0x2746b4,_0x38d96d):VisuMZ[_0x4b86ac(0x250)][_0x4b86ac(0x426)][_0x4b86ac(0x22d)](this,_0x2746b4,_0x38d96d);},Game_Battler[_0x6201f2(0x41e)][_0x6201f2(0x219)]=function(_0x66c573,_0x2154f3){const _0x36e826=_0x6201f2,_0x1279b5=new Game_Action(this,!![]);_0x1279b5[_0x36e826(0x21b)](_0x66c573),_0x1279b5[_0x36e826(0x344)]=!![];if(_0x2154f3===-0x2)_0x1279b5['setTarget'](this[_0x36e826(0x24f)]);else{if(_0x2154f3===-0x1){if('MYnXo'!==_0x36e826(0x25a)){if(this[_0x36e826(0x401)]())this[_0x36e826(0x40f)]=![];_0x454ce0['BattleSystemPTB'][_0x36e826(0x402)]['call'](this);if(this[_0x36e826(0x401)]()&&_0x406539[_0x36e826(0x33d)]())this[_0x36e826(0x22e)]();}else _0x1279b5[_0x36e826(0x2b1)]();}else _0x36e826(0x374)!==_0x36e826(0x374)?this[_0x36e826(0x2bf)]()[_0x36e826(0x42c)](_0x36e826(0x23c)):_0x1279b5[_0x36e826(0x295)](_0x2154f3);}this[_0x36e826(0x215)]['unshift'](_0x1279b5);},VisuMZ[_0x6201f2(0x250)][_0x6201f2(0x38e)]=BattleManager['forceAction'],BattleManager[_0x6201f2(0x3aa)]=function(_0x2af645){const _0x36fbaf=_0x6201f2;BattleManager['isPTB']()?'Dhclo'===_0x36fbaf(0x42a)?(this[_0x36fbaf(0x232)](),this['_subject']=null,this[_0x36fbaf(0x38c)](![])):this['forceActionPTB'](_0x2af645):VisuMZ[_0x36fbaf(0x250)][_0x36fbaf(0x38e)][_0x36fbaf(0x22d)](this,_0x2af645);},BattleManager[_0x6201f2(0x219)]=function(_0x54e7b1){const _0x59ce6a=_0x6201f2,_0x467143=JsonEx[_0x59ce6a(0x20b)](_0x54e7b1['currentAction']());this[_0x59ce6a(0x315)][_0x59ce6a(0x412)]([_0x54e7b1,_0x467143]);},VisuMZ['BattleSystemPTB'][_0x6201f2(0x39d)]=Game_Actor['prototype'][_0x6201f2(0x31c)],Game_Actor['prototype']['selectNextCommand']=function(){const _0x5ca1fc=_0x6201f2;if(BattleManager[_0x5ca1fc(0x401)]()){if(this[_0x5ca1fc(0x286)]())this[_0x5ca1fc(0x286)]()[_0x5ca1fc(0x2ad)]();return![];}return VisuMZ[_0x5ca1fc(0x250)][_0x5ca1fc(0x39d)][_0x5ca1fc(0x22d)](this);},VisuMZ[_0x6201f2(0x250)][_0x6201f2(0x329)]=Game_Actor[_0x6201f2(0x41e)][_0x6201f2(0x2ff)],Game_Actor['prototype'][_0x6201f2(0x2ff)]=function(_0x30b1e8,_0x30c4a0){const _0xd8b0b4=_0x6201f2;VisuMZ[_0xd8b0b4(0x250)][_0xd8b0b4(0x329)]['call'](this,_0x30b1e8,_0x30c4a0),this[_0xd8b0b4(0x2bf)]()[_0xd8b0b4(0x3b3)]();},VisuMZ[_0x6201f2(0x250)]['Game_Actor_forceChangeEquip']=Game_Actor[_0x6201f2(0x41e)][_0x6201f2(0x1ca)],Game_Actor['prototype'][_0x6201f2(0x1ca)]=function(_0x461b68,_0x38becc){const _0x2e8fee=_0x6201f2;VisuMZ[_0x2e8fee(0x250)][_0x2e8fee(0x3f3)][_0x2e8fee(0x22d)](this,_0x461b68,_0x38becc),this[_0x2e8fee(0x2bf)]()['recalculateActionsPTB']();},VisuMZ[_0x6201f2(0x250)]['Game_Actor_changeEquipById']=Game_Actor[_0x6201f2(0x41e)][_0x6201f2(0x30a)],Game_Actor['prototype'][_0x6201f2(0x30a)]=function(_0x226252,_0x379c86){const _0x25d592=_0x6201f2;VisuMZ['BattleSystemPTB'][_0x25d592(0x20f)]['call'](this,_0x226252,_0x379c86),this[_0x25d592(0x2bf)]()[_0x25d592(0x3b3)]();},VisuMZ[_0x6201f2(0x250)]['Game_Actor_discardEquip']=Game_Actor[_0x6201f2(0x41e)][_0x6201f2(0x3e6)],Game_Actor[_0x6201f2(0x41e)]['discardEquip']=function(_0x46e0b1){const _0x48cd16=_0x6201f2;VisuMZ[_0x48cd16(0x250)]['Game_Actor_discardEquip'][_0x48cd16(0x22d)](this,_0x46e0b1),this['friendsUnit']()[_0x48cd16(0x3b3)]();},VisuMZ['BattleSystemPTB'][_0x6201f2(0x41f)]=Game_Actor['prototype']['releaseUnequippableItems'],Game_Actor[_0x6201f2(0x41e)][_0x6201f2(0x42d)]=function(_0x5d0792){const _0x3775f3=_0x6201f2;VisuMZ[_0x3775f3(0x250)][_0x3775f3(0x41f)]['call'](this,_0x5d0792),this[_0x3775f3(0x2bf)]()[_0x3775f3(0x3b3)]();},VisuMZ[_0x6201f2(0x250)]['Game_Actor_changeClass']=Game_Actor['prototype'][_0x6201f2(0x3eb)],Game_Actor[_0x6201f2(0x41e)][_0x6201f2(0x3eb)]=function(_0x35dd47,_0x27e486){const _0x2b221d=_0x6201f2;VisuMZ[_0x2b221d(0x250)][_0x2b221d(0x260)][_0x2b221d(0x22d)](this,_0x35dd47,_0x27e486),this[_0x2b221d(0x2bf)]()[_0x2b221d(0x3b3)]();},VisuMZ[_0x6201f2(0x250)][_0x6201f2(0x2ca)]=Game_Enemy[_0x6201f2(0x41e)]['transform'],Game_Enemy[_0x6201f2(0x41e)]['transform']=function(_0x3ac47a){const _0x4215ce=_0x6201f2;VisuMZ[_0x4215ce(0x250)]['Game_Enemy_transform'][_0x4215ce(0x22d)](this,_0x3ac47a),this[_0x4215ce(0x2bf)]()['recalculateActionsPTB']();},Game_Unit[_0x6201f2(0x346)]=VisuMZ[_0x6201f2(0x250)][_0x6201f2(0x381)]['Mechanics'][_0x6201f2(0x3a4)],Game_Unit['_PTB_MIN_ACTIONS']=VisuMZ['BattleSystemPTB']['Settings'][_0x6201f2(0x2f4)][_0x6201f2(0x32d)],Game_Unit['_PTB_ACTION_OVERFLOW']=VisuMZ[_0x6201f2(0x250)][_0x6201f2(0x381)]['Mechanics'][_0x6201f2(0x3e4)],Game_Unit[_0x6201f2(0x41e)][_0x6201f2(0x2f7)]=function(){const _0x5ad492=_0x6201f2;this[_0x5ad492(0x35e)](),this[_0x5ad492(0x1f8)](0x0),this['setFullActionsPTB'](this['getMaxActionsPTB']());},Game_Unit[_0x6201f2(0x41e)][_0x6201f2(0x35e)]=function(){const _0x45186b=_0x6201f2;this[_0x45186b(0x2f2)]=!![];let _0x383655=0x0,_0x162d18=this['aliveMembers']()[_0x45186b(0x23e)](_0x40a2ad=>_0x40a2ad[_0x45186b(0x33b)]());_0x383655=_0x162d18[_0x45186b(0x3e5)]((_0x56e3fe,_0x1d7c59)=>_0x56e3fe+_0x1d7c59[_0x45186b(0x3f8)](),_0x383655),_0x383655=_0x383655[_0x45186b(0x21c)](Game_Unit[_0x45186b(0x32e)],Game_Unit['_PTB_MAX_ACTIONS']),this[_0x45186b(0x33a)]=_0x383655;},Game_Unit[_0x6201f2(0x41e)][_0x6201f2(0x3b3)]=function(){const _0x4887a7=_0x6201f2;if(!BattleManager[_0x4887a7(0x401)]())return;if(!$gameParty[_0x4887a7(0x247)]())return;const _0x43871c=this[_0x4887a7(0x351)]();this[_0x4887a7(0x35e)]();let _0x2731b1=this[_0x4887a7(0x409)]();const _0x408ad4=this[_0x4887a7(0x351)]()-_0x43871c;if(BattleManager['_PTB_RECALC_ADD_DIFF']&&_0x408ad4>0x0)_0x2731b1+=_0x408ad4;if(BattleManager[_0x4887a7(0x3b8)]&&_0x408ad4<0x0)_0x2731b1+=_0x408ad4;_0x2731b1=Math[_0x4887a7(0x2a7)](_0x2731b1,Game_Unit[_0x4887a7(0x346)]),this['setFullActionsPTB'](_0x2731b1);},Game_Unit[_0x6201f2(0x41e)][_0x6201f2(0x409)]=function(){const _0x26d538=_0x6201f2;return this[_0x26d538(0x1f9)]||0x0;},Game_Unit[_0x6201f2(0x41e)]['setFullActionsPTB']=function(_0x27144a){const _0x320187=_0x6201f2;this['_ptbActionsCur']=Math[_0x320187(0x3dd)](_0x27144a)[_0x320187(0x21c)](0x0,Game_Unit[_0x320187(0x346)]),!Game_Unit['_PTB_ACTION_OVERFLOW']&&(this[_0x320187(0x1f9)]=Math[_0x320187(0x2a7)](this['_ptbActionsCur'],this[_0x320187(0x351)]())),this['_ptbActionsCur']=Math['max'](0x0,this[_0x320187(0x1f9)]);},Game_Unit[_0x6201f2(0x41e)][_0x6201f2(0x21e)]=function(_0x2e3fbe){const _0x64e438=_0x6201f2;this['setFullActionsPTB'](this[_0x64e438(0x409)]()+_0x2e3fbe);},Game_Unit[_0x6201f2(0x41e)][_0x6201f2(0x2c6)]=function(_0x4b91ca){const _0x119fbe=_0x6201f2;this[_0x119fbe(0x21e)](-_0x4b91ca);},Game_Unit['prototype'][_0x6201f2(0x1d5)]=function(){const _0x41ba71=_0x6201f2;return this[_0x41ba71(0x276)]||0x0;},Game_Unit[_0x6201f2(0x41e)][_0x6201f2(0x1f8)]=function(_0x420caf){const _0x4aba63=_0x6201f2;this[_0x4aba63(0x276)]=_0x420caf,this[_0x4aba63(0x276)]=Math[_0x4aba63(0x2e0)](0x0,this[_0x4aba63(0x276)]);},Game_Unit[_0x6201f2(0x41e)][_0x6201f2(0x2b9)]=function(_0x327454){const _0x55f050=_0x6201f2;this['setHalfActionsPTB'](this[_0x55f050(0x1d5)]()+_0x327454);},Game_Unit[_0x6201f2(0x41e)][_0x6201f2(0x2a4)]=function(_0x20cc2e){const _0x4409af=_0x6201f2;this[_0x4409af(0x2b9)](-_0x20cc2e);},Game_Unit[_0x6201f2(0x41e)][_0x6201f2(0x351)]=function(){const _0x36946d=_0x6201f2;return this[_0x36946d(0x33a)]||0x0;},Game_Unit['prototype']['setMaxActionsPTB']=function(_0x3929b5){const _0x1d601b=_0x6201f2;this['_ptbActionsMax']=_0x3929b5[_0x1d601b(0x21c)](Game_Unit[_0x1d601b(0x32e)],Game_Unit[_0x1d601b(0x346)]);},Game_Unit[_0x6201f2(0x41e)][_0x6201f2(0x2d0)]=function(_0x5ae1e6){const _0x4af7a2=_0x6201f2;this[_0x4af7a2(0x2c6)](_0x5ae1e6);},Game_Unit[_0x6201f2(0x41e)][_0x6201f2(0x305)]=function(){const _0x3be3a5=_0x6201f2;if(BattleManager['_subject']){if(this[_0x3be3a5(0x259)]()[_0x3be3a5(0x41a)](BattleManager['_subject'])){const _0x212208=BattleManager[_0x3be3a5(0x431)][_0x3be3a5(0x1ce)]();if(_0x212208&&_0x212208[_0x3be3a5(0x344)])return!![];}}return this[_0x3be3a5(0x409)]()>0x0||this[_0x3be3a5(0x1d5)]()>0x0;},Game_Unit[_0x6201f2(0x41e)]['registerActionCostPTB']=function(_0x47472c,_0x2e0e70,_0x3475df){const _0x48d80a=_0x6201f2;this[_0x48d80a(0x1fe)]={'changeable':_0x47472c,'type':_0x2e0e70,'cost':_0x3475df,'priority':0x0,'sound':''};},Game_Unit[_0x6201f2(0x41e)]['processPressCountChange']=function(_0x5b57d2){const _0xfcff2f=_0x6201f2;if(!BattleManager[_0xfcff2f(0x401)]())return;if(!_0x5b57d2)return;if(!this[_0xfcff2f(0x218)]())return;_0x5b57d2=_0x5b57d2[_0xfcff2f(0x373)]()[_0xfcff2f(0x263)]();let _0x180ce7=![];if(_0x180ce7)console[_0xfcff2f(0x303)]('Key:\x20%1'[_0xfcff2f(0x43a)](_0x5b57d2));const _0x4c84bb=VisuMZ[_0xfcff2f(0x250)][_0xfcff2f(0x381)][_0xfcff2f(0x275)];this['alterActionCostPTB'](_0x4c84bb[_0xfcff2f(0x3f1)['format'](_0x5b57d2)]||'unchanged',_0x4c84bb[_0xfcff2f(0x1f4)[_0xfcff2f(0x43a)](_0x5b57d2)]||_0xfcff2f(0x319),_0x4c84bb[_0xfcff2f(0x34c)['format'](_0x5b57d2)]||0x0,_0x4c84bb[_0xfcff2f(0x224)[_0xfcff2f(0x43a)](_0x5b57d2)]||0x0,_0x4c84bb['%1Sound'[_0xfcff2f(0x43a)](_0x5b57d2)]||'');if(_0x180ce7)console[_0xfcff2f(0x303)](this[_0xfcff2f(0x1fe)]);},Game_Unit['prototype']['canAlterActionCostPTB']=function(){const _0x28f728=_0x6201f2;return this[_0x28f728(0x1fe)]=this['_ptbActionCost']||{},this['_ptbActionCost'][_0x28f728(0x37f)]??!![];},Game_Unit['prototype']['alterActionCostPTB']=function(_0x2eafa9,_0x448df0,_0x20286f,_0x5019e4){const _0x1297d0=_0x6201f2;this[_0x1297d0(0x1fe)]=this[_0x1297d0(0x1fe)]||{};if(this[_0x1297d0(0x1fe)][_0x1297d0(0x243)]>=_0x5019e4)return;this[_0x1297d0(0x1fe)][_0x1297d0(0x243)]=_0x5019e4;if(_0x448df0!==_0x1297d0(0x319)){if(_0x1297d0(0x2a2)===_0x1297d0(0x2a2)){if(_0x2eafa9==='permanent')_0x2eafa9=![];if(_0x2eafa9===_0x1297d0(0x393))_0x2eafa9=!![];this[_0x1297d0(0x1fe)][_0x1297d0(0x37f)]=_0x2eafa9;}else _0x1354ce[_0x1297d0(0x24e)]();}if(_0x448df0!==_0x1297d0(0x319)){if(_0x1297d0(0x353)!==_0x1297d0(0x353)){if(this[_0x1297d0(0x286)]())this[_0x1297d0(0x286)]()[_0x1297d0(0x2ad)]();return![];}else this[_0x1297d0(0x1fe)]['type']=_0x448df0;}this[_0x1297d0(0x1fe)][_0x1297d0(0x3d9)]=Math[_0x1297d0(0x2e0)]((this[_0x1297d0(0x1fe)][_0x1297d0(0x3d9)]||0x0)+_0x20286f,0x0);},Game_Unit[_0x6201f2(0x41e)][_0x6201f2(0x201)]=function(){const _0xfe857e=_0x6201f2;this[_0xfe857e(0x1fe)]=this[_0xfe857e(0x1fe)]||{},this[_0xfe857e(0x1fe)][_0xfe857e(0x261)]=this[_0xfe857e(0x1fe)][_0xfe857e(0x261)]||_0xfe857e(0x2eb),this[_0xfe857e(0x1fe)]['cost']=this['_ptbActionCost'][_0xfe857e(0x3d9)]||0x0;let _0x408cce=this[_0xfe857e(0x1fe)]['type'][_0xfe857e(0x373)]()[_0xfe857e(0x263)](),_0x3f2e48=Math[_0xfe857e(0x2e0)](this['_ptbActionCost'][_0xfe857e(0x3d9)],0x0),_0x42e8d6=this['getFullActionsPTB'](),_0x38c616=this[_0xfe857e(0x1d5)]();const _0x1aa88b=_0x42e8d6,_0x8fbd8b=_0x38c616;let _0x1a5bad=![];if(_0x1a5bad)console[_0xfe857e(0x303)](_0xfe857e(0x32b));while(_0x3f2e48--){if(_0xfe857e(0x30f)!=='ISLTu')_0x206d97[_0xfe857e(0x295)](_0x7da5bb);else{if(_0x42e8d6<=0x0&&_0x38c616<=0x0)break;if(_0x408cce===_0xfe857e(0x2eb))_0x38c616>0x0?_0x38c616--:_0x42e8d6--;else _0x408cce==='compress'?_0xfe857e(0x312)!=='Nmosq'?(this[_0xfe857e(0x38f)]=null,this[_0xfe857e(0x352)]=![]):_0x38c616>0x0?'uDHqT'==='uDHqT'?_0x38c616--:(_0xddbced[_0xfe857e(0x250)][_0xfe857e(0x25e)][_0xfe857e(0x22d)](this,_0x3b39d0),this[_0xfe857e(0x2bf)]()[_0xfe857e(0x3b3)]()):(_0x42e8d6--,_0x38c616++):_0xfe857e(0x2b5)===_0xfe857e(0x2b5)?_0x42e8d6>0x0?(_0x42e8d6--,_0x38c616++):_0x38c616--:delete _0x13fa58[_0xfe857e(0x1d1)][_0xfe857e(0x24c)];_0x1a5bad&&console['log']('times:%1/%2'['format'](_0x3f2e48,this[_0xfe857e(0x1fe)][_0xfe857e(0x3d9)]),_0xfe857e(0x1fa)['format'](_0x42e8d6),'half:%1'[_0xfe857e(0x43a)](_0x38c616));}}if(_0x1a5bad)console[_0xfe857e(0x303)](_0xfe857e(0x2b8));this['setFullActionsPTB'](_0x42e8d6),this['setHalfActionsPTB'](_0x38c616);if(_0x1aa88b-_0x42e8d6>0x1)SoundManager[_0xfe857e(0x32f)]();else{if(_0x8fbd8b-_0x38c616>0x1)'NuLzL'===_0xfe857e(0x363)?this['_subject']=_0x259b42:SoundManager['playPtbLoseHalfAction']();else{if(_0x42e8d6>_0x1aa88b)SoundManager[_0xfe857e(0x2e6)]();else _0x38c616>_0x8fbd8b&&(_0xfe857e(0x2ee)!=='plRAD'?SoundManager[_0xfe857e(0x40d)]():_0x43c5cf=_0x45b6a3+this[_0xfe857e(0x317)]()+_0x2df9b5);}}this[_0xfe857e(0x1fe)]={};},Game_Unit[_0x6201f2(0x41e)][_0x6201f2(0x3cf)]=function(_0x15ff46){const _0x9ba5e1=_0x6201f2;if(!_0x15ff46)return;const _0x4adc8f=_0x15ff46[_0x9ba5e1(0x213)]();if(!_0x4adc8f)return;const _0x7349b0=VisuMZ[_0x9ba5e1(0x250)][_0x9ba5e1(0x3e1)],_0x2dfb35=_0x4adc8f[_0x9ba5e1(0x380)];if(_0x2dfb35[_0x9ba5e1(0x39f)](_0x7349b0[_0x9ba5e1(0x3b1)])){let _0x28a4b7=Number(RegExp['$1']);this['gainFullActionsPTB'](_0x28a4b7);}if(_0x2dfb35[_0x9ba5e1(0x39f)](_0x7349b0[_0x9ba5e1(0x395)])){if('fyhoN'!==_0x9ba5e1(0x2f3))this[_0x9ba5e1(0x257)]()&&this[_0x9ba5e1(0x36a)]()===0x1?this[_0x9ba5e1(0x1da)](![]):_0x123f5b[_0x9ba5e1(0x250)][_0x9ba5e1(0x1e0)][_0x9ba5e1(0x22d)](this,_0x3c8370);else{let _0x5f048a=Number(RegExp['$1']);this[_0x9ba5e1(0x2b9)](_0x5f048a);}}},Game_Unit[_0x6201f2(0x41e)][_0x6201f2(0x24e)]=function(){const _0x2f4897=_0x6201f2;for(const _0x14f3a6 of this[_0x2f4897(0x259)]()){if(!_0x14f3a6)continue;const _0x323ba3=_0x14f3a6[_0x2f4897(0x2e5)]();_0x14f3a6[_0x2f4897(0x3e3)](),_0x14f3a6[_0x2f4897(0x3f4)](),_0x323ba3&&_0x14f3a6[_0x2f4897(0x343)]()&&_0x14f3a6[_0x2f4897(0x264)]();}},Game_Unit['prototype'][_0x6201f2(0x36d)]=function(){const _0x5d73a6=_0x6201f2;if(this['getFullActionsPTB']()<=0x0&&this[_0x5d73a6(0x1d5)]()<=0x0)return!![];if(!this[_0x5d73a6(0x3ac)]()[_0x5d73a6(0x288)](_0x130e6d=>_0x130e6d[_0x5d73a6(0x33b)]()))return!![];return![];},Game_Unit[_0x6201f2(0x41e)][_0x6201f2(0x211)]=function(){const _0x372cd1=_0x6201f2;for(const _0x19430b of this[_0x372cd1(0x259)]()){if(!_0x19430b)continue;_0x19430b['updateStateTurns'](),_0x19430b['removeStatesAuto'](0x2),_0x19430b[_0x372cd1(0x2dc)](),_0x19430b[_0x372cd1(0x3f4)]();}},Game_Unit[_0x6201f2(0x41e)][_0x6201f2(0x3dc)]=function(){const _0x2c6c55=_0x6201f2;for(const _0x1cbe9e of this[_0x2c6c55(0x259)]()){if(_0x2c6c55(0x31f)===_0x2c6c55(0x2fe))return![];else{if(!_0x1cbe9e)continue;_0x1cbe9e['_passedTurnPTB']=![];}}},Game_Unit[_0x6201f2(0x41e)][_0x6201f2(0x2e1)]=function(){const _0x38e4cb=_0x6201f2,_0x3b8a28=this[_0x38e4cb(0x259)]();return Math[_0x38e4cb(0x2a7)](..._0x3b8a28[_0x38e4cb(0x206)](_0x1675bb=>_0x1675bb[_0x38e4cb(0x3ec)]));},Game_Unit[_0x6201f2(0x41e)][_0x6201f2(0x209)]=function(){const _0x2e5440=_0x6201f2,_0xeef2e9=this[_0x2e5440(0x259)]();return Math[_0x2e5440(0x2e0)](..._0xeef2e9['map'](_0x12a6ac=>_0x12a6ac[_0x2e5440(0x3ec)]));},Game_Unit[_0x6201f2(0x41e)][_0x6201f2(0x415)]=function(){const _0x5327d8=_0x6201f2,_0xcacffa=this[_0x5327d8(0x259)]();return _0xcacffa[_0x5327d8(0x3e5)]((_0x11fb44,_0x2c9268)=>_0x11fb44+_0x2c9268['agi'],0x0);},VisuMZ['BattleSystemPTB']['Game_Unit_onBattleStart']=Game_Unit[_0x6201f2(0x41e)]['onBattleStart'],Game_Unit[_0x6201f2(0x41e)][_0x6201f2(0x1ea)]=function(_0x5598be){const _0x5cfdcc=_0x6201f2;VisuMZ['BattleSystemPTB'][_0x5cfdcc(0x3d7)][_0x5cfdcc(0x22d)](this,_0x5598be);if(BattleManager[_0x5cfdcc(0x401)]()){if(_0x5cfdcc(0x217)===_0x5cfdcc(0x38b)){let _0x558b42=_0x344a6c['ptbAliveMembers']()[_0x5cfdcc(0x23e)](_0x297b92=>_0x297b92[_0x5cfdcc(0x33b)]());_0x558b42['sort']((_0x42ef48,_0x209c99)=>_0x209c99['agi']-_0x42ef48['agi']),_0x2f88a9=_0x97f996['_PTB_MAX_ACTIONS'];while(_0x5a0754--){_0x5b4578=_0x20382f['concat'](_0x558b42);}_0x26f886[_0x5cfdcc(0x394)]();}else this[_0x5cfdcc(0x271)]=0x0;}},Game_Unit[_0x6201f2(0x41e)][_0x6201f2(0x256)]=function(){const _0x48a4f8=_0x6201f2,_0x3e64c1=this[_0x48a4f8(0x3ac)]();if(BattleManager[_0x48a4f8(0x290)])return _0x3e64c1;if(BattleManager[_0x48a4f8(0x2bc)])return _0x3e64c1;return _0x3e64c1['sort']((_0x4f9359,_0xb05bb0)=>_0xb05bb0[_0x48a4f8(0x3ec)]-_0x4f9359[_0x48a4f8(0x3ec)]),_0x3e64c1;},Game_Unit[_0x6201f2(0x41e)][_0x6201f2(0x28a)]=function(_0x46fa24){const _0x1427d4=_0x6201f2;this[_0x1427d4(0x271)]=_0x46fa24?_0x46fa24[_0x1427d4(0x20c)]():0x0,this['_ptbLastIndex']++;},VisuMZ['BattleSystemPTB'][_0x6201f2(0x3c6)]=Scene_Battle[_0x6201f2(0x41e)][_0x6201f2(0x418)],Scene_Battle[_0x6201f2(0x41e)][_0x6201f2(0x418)]=function(){const _0x229adc=_0x6201f2;VisuMZ[_0x229adc(0x250)][_0x229adc(0x3c6)][_0x229adc(0x22d)](this),BattleManager['isPTB']()&&this[_0x229adc(0x265)]();},Scene_Battle['prototype'][_0x6201f2(0x265)]=function(){const _0x366ec2=_0x6201f2,_0x1ab3bb=this[_0x366ec2(0x2b4)];this[_0x366ec2(0x281)]()&&(_0x366ec2(0x3de)!==_0x366ec2(0x3de)?this[_0x366ec2(0x238)]():delete _0x1ab3bb[_0x366ec2(0x1d1)][_0x366ec2(0x24c)]);},VisuMZ[_0x6201f2(0x250)][_0x6201f2(0x324)]=Scene_Battle[_0x6201f2(0x41e)][_0x6201f2(0x2d6)],Scene_Battle[_0x6201f2(0x41e)]['commandCancel']=function(){const _0x8aa0dd=_0x6201f2;BattleManager[_0x8aa0dd(0x401)]()?_0x8aa0dd(0x34d)===_0x8aa0dd(0x34d)?this['commandCancelPTB']():_0x3a4217>0x0?_0x2e5fab--:_0x123901--:_0x8aa0dd(0x349)===_0x8aa0dd(0x349)?VisuMZ[_0x8aa0dd(0x250)][_0x8aa0dd(0x324)][_0x8aa0dd(0x22d)](this):this[_0x8aa0dd(0x403)](_0x8aa0dd(0x3e8));},Scene_Battle[_0x6201f2(0x41e)]['commandCancelPTB']=function(){const _0x5946e0=_0x6201f2;this['_partyCommandWindow'][_0x5946e0(0x340)](),this[_0x5946e0(0x2b4)][_0x5946e0(0x2b3)]();},VisuMZ[_0x6201f2(0x250)][_0x6201f2(0x35a)]=Scene_Battle[_0x6201f2(0x41e)][_0x6201f2(0x2dd)],Scene_Battle[_0x6201f2(0x41e)][_0x6201f2(0x2dd)]=function(){const _0x40c7e3=_0x6201f2;BattleManager[_0x40c7e3(0x401)]()?this[_0x40c7e3(0x342)]():_0x40c7e3(0x3cc)!=='hffKX'?(this[_0x40c7e3(0x1fd)]=this[_0x40c7e3(0x2c2)][_0x40c7e3(0x409)](),this[_0x40c7e3(0x3bc)]=this[_0x40c7e3(0x2c2)][_0x40c7e3(0x1d5)](),this[_0x40c7e3(0x327)]=this[_0x40c7e3(0x2c2)][_0x40c7e3(0x351)](),this[_0x40c7e3(0x251)]()):VisuMZ[_0x40c7e3(0x250)][_0x40c7e3(0x35a)][_0x40c7e3(0x22d)](this);},VisuMZ[_0x6201f2(0x250)][_0x6201f2(0x1f5)]=Scene_Battle[_0x6201f2(0x41e)][_0x6201f2(0x2e9)],Scene_Battle['prototype'][_0x6201f2(0x2e9)]=function(){const _0x460e94=_0x6201f2;VisuMZ[_0x460e94(0x250)][_0x460e94(0x1f5)][_0x460e94(0x22d)](this),this['createActionCountWindowsPTB']();},Scene_Battle[_0x6201f2(0x41e)][_0x6201f2(0x36c)]=function(){const _0xcc9822=_0x6201f2;if(!BattleManager[_0xcc9822(0x401)]())return;const _0x2a332c=this[_0xcc9822(0x1d0)](this[_0xcc9822(0x2c5)]);this[_0xcc9822(0x2fd)]=new Window_PTB_ActionCount(),this[_0xcc9822(0x2fd)][_0xcc9822(0x31e)]($gameTroop),this[_0xcc9822(0x25d)](this[_0xcc9822(0x2fd)],_0x2a332c),this['_ptbPartyActionCountWindow']=new Window_PTB_ActionCount(),this[_0xcc9822(0x2af)][_0xcc9822(0x31e)]($gameParty),this['addChildAt'](this[_0xcc9822(0x2af)],_0x2a332c),this[_0xcc9822(0x334)]();},Scene_Battle[_0x6201f2(0x41e)][_0x6201f2(0x334)]=function(){const _0x24ed75=_0x6201f2;if(!BattleManager['isPTB']())return;if(!this[_0x24ed75(0x237)])return;const _0x52d13a=Window_PTB_ActionCount[_0x24ed75(0x381)];if(_0x52d13a[_0x24ed75(0x24b)])return;this[_0x24ed75(0x237)]['y']+=_0x52d13a[_0x24ed75(0x304)];},Window_Base[_0x6201f2(0x3a1)]=VisuMZ[_0x6201f2(0x250)][_0x6201f2(0x381)]['General'][_0x6201f2(0x230)],Window_Base[_0x6201f2(0x3bf)]=VisuMZ[_0x6201f2(0x250)][_0x6201f2(0x381)][_0x6201f2(0x293)][_0x6201f2(0x26f)],Window_Base[_0x6201f2(0x3c9)]=VisuMZ[_0x6201f2(0x250)][_0x6201f2(0x381)][_0x6201f2(0x293)][_0x6201f2(0x326)],Window_Base[_0x6201f2(0x31b)]=VisuMZ[_0x6201f2(0x250)][_0x6201f2(0x381)]['General'][_0x6201f2(0x1f2)],Window_Base[_0x6201f2(0x2ce)]=VisuMZ[_0x6201f2(0x250)]['Settings']['General'][_0x6201f2(0x434)],VisuMZ[_0x6201f2(0x250)][_0x6201f2(0x2ac)]=Window_Base['prototype'][_0x6201f2(0x2b2)],Window_Base[_0x6201f2(0x41e)][_0x6201f2(0x2b2)]=function(_0x4b79e5,_0x416109,_0x257e06){const _0x507d04=_0x6201f2;return _0x257e06=VisuMZ[_0x507d04(0x250)][_0x507d04(0x2ac)][_0x507d04(0x22d)](this,_0x4b79e5,_0x416109,_0x257e06),_0x257e06=this[_0x507d04(0x27f)](_0x4b79e5,_0x416109,_0x257e06),_0x257e06;},VisuMZ[_0x6201f2(0x250)][_0x6201f2(0x1fc)]=Window_Base['prototype'][_0x6201f2(0x20e)],Window_Base['prototype'][_0x6201f2(0x20e)]=function(_0x42d96f,_0x2927f0,_0x3efe4e,_0xb7c5f8){const _0x531a4e=_0x6201f2;if(BattleManager[_0x531a4e(0x401)]()&&this[_0x531a4e(0x36f)]===Window_BattleItem)this[_0x531a4e(0x35b)](_0x42d96f,_0x2927f0,_0x3efe4e,_0xb7c5f8);else{if(_0x531a4e(0x438)===_0x531a4e(0x248))return this['_ptbActionCost']=this[_0x531a4e(0x1fe)]||{},this[_0x531a4e(0x1fe)][_0x531a4e(0x37f)]??!![];else VisuMZ['BattleSystemPTB']['Window_Base_drawItemNumber'][_0x531a4e(0x22d)](this,_0x42d96f,_0x2927f0,_0x3efe4e,_0xb7c5f8);}this[_0x531a4e(0x322)]();},Window_Base[_0x6201f2(0x41e)][_0x6201f2(0x35b)]=function(_0x3ddc1d,_0x147168,_0x24dad8,_0xdaa27d){const _0x34169a=_0x6201f2,_0x46e965=BattleManager[_0x34169a(0x311)]||$gameParty['members']()[0x0],_0xa7785f=this[_0x34169a(0x27f)](_0x46e965,_0x3ddc1d,''),_0x3ba258=this[_0x34169a(0x3ca)](_0xa7785f)[_0x34169a(0x3d6)],_0x533ca5=Window_Base[_0x34169a(0x3a1)];let _0x10b6c4=_0x147168+_0xdaa27d-_0x3ba258;if(_0xa7785f==='')'LZade'===_0x34169a(0x2e2)?VisuMZ['BattleSystemPTB'][_0x34169a(0x1fc)][_0x34169a(0x22d)](this,_0x3ddc1d,_0x147168,_0x24dad8,_0xdaa27d):_0x135026=!![];else{if(this[_0x34169a(0x420)](_0x3ddc1d)){if(_0x34169a(0x404)===_0x34169a(0x404)){this['resetFontSettings']();const _0x2a9625=VisuMZ[_0x34169a(0x39a)][_0x34169a(0x381)]['ItemScene'];this['contents'][_0x34169a(0x376)]=_0x2a9625[_0x34169a(0x41d)];if(_0x533ca5){if(_0x34169a(0x282)!==_0x34169a(0x314)){const _0x3ba216=_0x2a9625['ItemQuantityFmt'],_0x5bfae1=_0x3ba216[_0x34169a(0x43a)]($gameParty[_0x34169a(0x387)](_0x3ddc1d)),_0x301ea4=this[_0x34169a(0x3c1)](_0x5bfae1+this[_0x34169a(0x317)]());_0x10b6c4-=_0x301ea4;}else return _0x31dcf0===0x0;}else _0x34169a(0x1f3)!==_0x34169a(0x1f3)?this[_0x34169a(0x219)](_0x556c96,_0x51587c):_0xdaa27d-=this[_0x34169a(0x3c1)](this[_0x34169a(0x317)]())+_0x3ba258;VisuMZ[_0x34169a(0x250)]['Window_Base_drawItemNumber'][_0x34169a(0x22d)](this,_0x3ddc1d,_0x147168,_0x24dad8,_0xdaa27d);}else{const _0x2cdd4d=this[_0x34169a(0x3ac)]();if(_0x1fab16[_0x34169a(0x290)])return _0x2cdd4d;if(_0xcdda1[_0x34169a(0x2bc)])return _0x2cdd4d;return _0x2cdd4d[_0x34169a(0x2c8)]((_0x467cfa,_0x47ae35)=>_0x47ae35['agi']-_0x467cfa[_0x34169a(0x3ec)]),_0x2cdd4d;}}}this['drawTextEx'](_0xa7785f,_0x10b6c4,_0x24dad8);},Window_Base[_0x6201f2(0x41e)][_0x6201f2(0x27f)]=function(_0x2d8fe8,_0x359339,_0x353316){const _0x17b184=_0x6201f2;if(!BattleManager[_0x17b184(0x401)]())return _0x353316;if(!_0x2d8fe8)return _0x353316;if(!_0x359339)return _0x353316;if(_0x359339['note'][_0x17b184(0x39f)](VisuMZ[_0x17b184(0x250)]['RegExp'][_0x17b184(0x40a)]))return _0x353316;let _0x3951c2=DataManager[_0x17b184(0x294)](_0x359339);const _0x538441=Window_Base[_0x17b184(0x3a1)],_0xa30e9d=Window_Base[_0x17b184(0x3bf)],_0x2b06bf=Window_Base[_0x17b184(0x3c9)],_0x2a0e1d=Window_Base['_PTB_COST_SHOW_0'],_0xb875c3=Window_Base['_PTB_COST_SHOW_1'];if(_0x359339[_0x17b184(0x380)][_0x17b184(0x39f)](VisuMZ[_0x17b184(0x250)][_0x17b184(0x3e1)]['ShowActionPointCost'])){if(_0x17b184(0x31a)===_0x17b184(0x421))_0x652f77[_0x17b184(0x250)][_0x17b184(0x249)][_0x17b184(0x22d)](this,_0x473a01);else{if(_0x3951c2<0x0)return _0x353316;}}else{if(_0x17b184(0x371)===_0x17b184(0x427))return this[_0x17b184(0x2c2)]&&this['_unit']===_0x458ec1[_0x17b184(0x3b2)];else{if(DataManager['isSkill'](_0x359339)&&this[_0x17b184(0x36f)]===Window_ActorCommand){if(!_0xa30e9d&&_0x359339['id']===_0x2d8fe8[_0x17b184(0x3c7)]())return _0x353316;if(!_0x2b06bf&&_0x359339['id']===_0x2d8fe8['guardSkillId']())return _0x353316;}if(_0x3951c2<0x0)return _0x353316;if(!_0x2a0e1d&&_0x3951c2===0x0)return _0x353316;if(!_0xb875c3&&_0x3951c2===0x1)return _0x353316;}}const _0x5d0b0c=DataManager[_0x17b184(0x28d)](_0x359339);let _0x137088=ImageManager['ptbConsumeCostIcon'];if(_0x5d0b0c===_0x17b184(0x21a))_0x137088=ImageManager['ptbConvertCostIcon'];if(_0x5d0b0c===_0x17b184(0x1ed))_0x137088=ImageManager[_0x17b184(0x2cf)];const _0x400281='\x5cI[%1]'[_0x17b184(0x43a)](_0x137088),_0x19b4a4=TextManager[_0x17b184(0x3f2)];let _0x583211=TextManager['ptbCostFormat'][_0x17b184(0x43a)](_0x3951c2,_0x19b4a4,_0x400281);if(_0x353316==='')_0x353316+=_0x583211;else{if(_0x538441){if(_0x17b184(0x377)===_0x17b184(0x3fd))return _0x3b66af['DefaultCostTypeItem'];else _0x353316=_0x583211+this[_0x17b184(0x317)]()+_0x353316;}else _0x353316=_0x353316+this[_0x17b184(0x317)]()+_0x583211;}return _0x353316;},VisuMZ[_0x6201f2(0x250)][_0x6201f2(0x249)]=Window_Help['prototype'][_0x6201f2(0x3ee)],Window_Help[_0x6201f2(0x41e)]['setItem']=function(_0x42eed9){const _0x415baf=_0x6201f2;BattleManager['isPTB']()&&_0x42eed9&&_0x42eed9['note']&&_0x42eed9['note']['match'](/<(?:PTB) HELP>\s*([\s\S]*)\s*<\/(?:PTB) HELP>/i)?this[_0x415baf(0x280)](String(RegExp['$1'])):VisuMZ[_0x415baf(0x250)][_0x415baf(0x249)][_0x415baf(0x22d)](this,_0x42eed9);},Window_Selectable[_0x6201f2(0x41e)]['ptbFreeRangeSwitch']=function(){const _0x2b3517=_0x6201f2;return this[_0x2b3517(0x36f)]===Window_ActorCommand&&BattleManager[_0x2b3517(0x401)]()&&BattleManager['_PTB_FREE_CHANGE'];},VisuMZ[_0x6201f2(0x250)][_0x6201f2(0x357)]=Window_Selectable[_0x6201f2(0x41e)][_0x6201f2(0x2fc)],Window_Selectable[_0x6201f2(0x41e)]['cursorRight']=function(_0x4bb5d3){const _0x43cdaf=_0x6201f2;this[_0x43cdaf(0x257)]()&&this['maxCols']()===0x1?this['ptbSwitchActorDirection'](!![]):VisuMZ[_0x43cdaf(0x250)][_0x43cdaf(0x357)][_0x43cdaf(0x22d)](this,_0x4bb5d3);},VisuMZ[_0x6201f2(0x250)][_0x6201f2(0x1e0)]=Window_Selectable[_0x6201f2(0x41e)]['cursorLeft'],Window_Selectable['prototype']['cursorLeft']=function(_0x582e91){const _0x3fd99c=_0x6201f2;if(this['ptbFreeRangeSwitch']()&&this['maxCols']()===0x1){if(_0x3fd99c(0x29e)!==_0x3fd99c(0x29e)){this[_0x3fd99c(0x237)][_0x3fd99c(0x412)](_0x3fd99c(0x27b),_0x13b023);const _0x186349=_0x355302['_PTB_BETWEEN_TEAMS_WAIT'];this[_0x3fd99c(0x237)][_0x3fd99c(0x412)]('waitCount',_0x186349),this['_logWindow']['push'](_0x3fd99c(0x273));}else this[_0x3fd99c(0x1da)](![]);}else VisuMZ[_0x3fd99c(0x250)][_0x3fd99c(0x1e0)][_0x3fd99c(0x22d)](this,_0x582e91);},VisuMZ['BattleSystemPTB'][_0x6201f2(0x35c)]=Window_Selectable['prototype'][_0x6201f2(0x389)],Window_Selectable[_0x6201f2(0x41e)][_0x6201f2(0x389)]=function(){const _0x120bca=_0x6201f2;this[_0x120bca(0x257)]()?this['ptbSwitchActorDirection'](!![]):VisuMZ[_0x120bca(0x250)][_0x120bca(0x35c)]['call'](this);},VisuMZ[_0x6201f2(0x250)][_0x6201f2(0x1df)]=Window_Selectable[_0x6201f2(0x41e)]['cursorPageup'],Window_Selectable[_0x6201f2(0x41e)][_0x6201f2(0x414)]=function(){const _0x4fb726=_0x6201f2;this[_0x4fb726(0x257)]()?this[_0x4fb726(0x1da)](![]):VisuMZ[_0x4fb726(0x250)][_0x4fb726(0x1df)][_0x4fb726(0x22d)](this);},Window_ActorCommand[_0x6201f2(0x41e)][_0x6201f2(0x1da)]=function(_0x83fdf0){const _0x518bca=_0x6201f2,_0x4d08e0=BattleManager['_currentActor'];let _0x4d53da=$gameParty['battleMembers']()['indexOf'](_0x4d08e0);const _0x17d7d1=$gameParty[_0x518bca(0x22c)]()[_0x518bca(0x3e9)]-0x1;let _0x28abc8=$gameParty[_0x518bca(0x22c)]()[_0x4d53da];for(;;){_0x4d53da+=_0x83fdf0?0x1:-0x1;if(_0x4d53da<0x0)_0x4d53da=_0x17d7d1;if(_0x4d53da>_0x17d7d1)_0x4d53da=0x0;_0x28abc8=$gameParty[_0x518bca(0x22c)]()[_0x4d53da];if(_0x28abc8&&_0x28abc8[_0x518bca(0x33d)]()&&!_0x28abc8['isPassingTurnPTB']())break;if(_0x28abc8===_0x4d08e0)break;}this[_0x518bca(0x34e)](_0x4d08e0,_0x28abc8);},Window_ActorCommand['prototype'][_0x6201f2(0x34e)]=function(_0x48dc04,_0x5ca9ab){const _0x3aa1ff=_0x6201f2;if(_0x48dc04===_0x5ca9ab)return;if(_0x48dc04['battler']())_0x48dc04[_0x3aa1ff(0x286)]()[_0x3aa1ff(0x30d)]();this[_0x3aa1ff(0x244)](),BattleManager[_0x3aa1ff(0x431)]=_0x5ca9ab,BattleManager[_0x3aa1ff(0x38f)]=_0x5ca9ab,BattleManager['startActorInput'](),SceneManager[_0x3aa1ff(0x279)]['startActorCommandSelection']();},VisuMZ['BattleSystemPTB']['Window_Selectable_processTouch']=Window_Selectable['prototype'][_0x6201f2(0x2c9)],Window_Selectable[_0x6201f2(0x41e)][_0x6201f2(0x2c9)]=function(){const _0x15bf2f=_0x6201f2;if(BattleManager[_0x15bf2f(0x401)]()&&BattleManager[_0x15bf2f(0x2bc)]&&this[_0x15bf2f(0x36f)]===Window_BattleStatus){if(_0x15bf2f(0x437)!==_0x15bf2f(0x1ef))this[_0x15bf2f(0x1cb)]();else{if(!_0x11d245[_0x15bf2f(0x401)]())return;let _0x476f0b='';if(this['_ptbCurrentUnit']===_0x1b7d27){let _0x43755c=_0xba779e[_0x15bf2f(0x31d)]();_0x476f0b=_0x2a9dba['ptbPartyTeamShift'][_0x15bf2f(0x43a)](_0x43755c);}else _0x476f0b=_0x519b64['ptbTroopTeamShift'];if(_0x476f0b!==''){this[_0x15bf2f(0x237)]['push']('addText',_0x476f0b);const _0x1d2316=_0xe90751[_0x15bf2f(0x3ad)];this[_0x15bf2f(0x237)][_0x15bf2f(0x412)]('waitCount',_0x1d2316),this[_0x15bf2f(0x237)][_0x15bf2f(0x412)](_0x15bf2f(0x273));}}}else VisuMZ[_0x15bf2f(0x250)][_0x15bf2f(0x3b4)][_0x15bf2f(0x22d)](this);},Window_BattleStatus[_0x6201f2(0x41e)][_0x6201f2(0x1cb)]=function(){const _0x9c9456=_0x6201f2;this['isOpen']()&&(TouchInput[_0x9c9456(0x390)]()&&this['onTouchSelectPTB'](!![]));},Window_BattleStatus[_0x6201f2(0x41e)]['onTouchSelectPTB']=function(_0x1fcd9f){const _0x58f3b6=_0x6201f2,_0x5905b6=SceneManager[_0x58f3b6(0x279)][_0x58f3b6(0x2b4)];if(!_0x5905b6)return;if(!_0x5905b6[_0x58f3b6(0x3f7)])return;this[_0x58f3b6(0x3da)]=![];const _0x2e4acd=this[_0x58f3b6(0x20c)](),_0x5e286d=this['hitIndex']();if(_0x5e286d>=0x0){const _0x12ae5b=$gameParty[_0x58f3b6(0x22c)]()[_0x2e4acd],_0x1339e4=$gameParty['battleMembers']()[_0x5e286d];this[_0x58f3b6(0x386)](_0x1339e4)&&(_0x5e286d===this[_0x58f3b6(0x20c)]()&&(this[_0x58f3b6(0x3da)]=!![]),this['select'](_0x5e286d),_0x5905b6[_0x58f3b6(0x34e)](_0x12ae5b,_0x1339e4));}},Window_BattleStatus[_0x6201f2(0x41e)][_0x6201f2(0x386)]=function(_0x1f88f5){const _0x6f0f3e=_0x6201f2;if(!_0x1f88f5)return![];if(!_0x1f88f5['canMove']())return![];if(!_0x1f88f5[_0x6f0f3e(0x33d)]())return![];if(_0x1f88f5[_0x6f0f3e(0x3a9)]())return![];return!![];};function Window_PTB_ActionCount(){const _0x266b97=_0x6201f2;this[_0x266b97(0x3ff)](...arguments);}Window_PTB_ActionCount[_0x6201f2(0x41e)]=Object['create'](Window_Base[_0x6201f2(0x41e)]),Window_PTB_ActionCount[_0x6201f2(0x41e)][_0x6201f2(0x36f)]=Window_PTB_ActionCount,Window_PTB_ActionCount[_0x6201f2(0x381)]=VisuMZ['BattleSystemPTB'][_0x6201f2(0x381)]['ActionCountDisplay'],Window_PTB_ActionCount['Settings'][_0x6201f2(0x225)]=Window_PTB_ActionCount[_0x6201f2(0x381)]['ActorActionFullPicture'],Window_PTB_ActionCount['Settings'][_0x6201f2(0x3ef)]=Window_PTB_ActionCount[_0x6201f2(0x381)][_0x6201f2(0x429)],Window_PTB_ActionCount[_0x6201f2(0x381)]['EnemyHalfActionPicture']=Window_PTB_ActionCount['Settings'][_0x6201f2(0x2f6)],Window_PTB_ActionCount[_0x6201f2(0x381)]['EnemyFullActionPicture']=Window_PTB_ActionCount[_0x6201f2(0x381)][_0x6201f2(0x313)],Window_PTB_ActionCount['Settings'][_0x6201f2(0x37b)]=Window_PTB_ActionCount[_0x6201f2(0x381)][_0x6201f2(0x37b)],Window_PTB_ActionCount[_0x6201f2(0x41e)]['initialize']=function(){const _0x3b1c8c=_0x6201f2,_0x3806cc=this[_0x3b1c8c(0x228)]();Window_Base[_0x3b1c8c(0x41e)][_0x3b1c8c(0x3ff)][_0x3b1c8c(0x22d)](this,_0x3806cc),this[_0x3b1c8c(0x29b)](0x0),this[_0x3b1c8c(0x1f1)](),this[_0x3b1c8c(0x1d8)]=0x0;},Window_PTB_ActionCount[_0x6201f2(0x41e)][_0x6201f2(0x228)]=function(){const _0x219254=_0x6201f2;return new Rectangle(0x0,0x0,Graphics[_0x219254(0x3d6)],Graphics[_0x219254(0x3c3)]);},Window_PTB_ActionCount[_0x6201f2(0x41e)][_0x6201f2(0x1f1)]=function(){const _0xcba119=_0x6201f2;this[_0xcba119(0x2c2)]=null,this['_fullActions']=0x0,this[_0xcba119(0x327)]=0x0;const _0x6008d7=Window_PTB_ActionCount['Settings'];this[_0xcba119(0x3af)]={'ActorPicture':_0x6008d7['ActorActionPicture']?ImageManager[_0xcba119(0x34f)](_0x6008d7[_0xcba119(0x325)]):'','EnemyPicture':_0x6008d7['EnemyActionPicture']?ImageManager[_0xcba119(0x34f)](_0x6008d7[_0xcba119(0x2e4)]):'','EmptyPicture':_0x6008d7[_0xcba119(0x37b)]?ImageManager[_0xcba119(0x34f)](_0x6008d7['EmptyActionPicture']):''};},Window_PTB_ActionCount[_0x6201f2(0x41e)]['updatePadding']=function(){const _0x4dfabb=_0x6201f2;this[_0x4dfabb(0x3a7)]=0x0;},Window_PTB_ActionCount[_0x6201f2(0x41e)][_0x6201f2(0x31e)]=function(_0x52e03d){const _0x501e15=_0x6201f2;this[_0x501e15(0x2c2)]=_0x52e03d,this[_0x501e15(0x25c)]();},Window_PTB_ActionCount[_0x6201f2(0x41e)][_0x6201f2(0x25c)]=function(){const _0xb5ca00=_0x6201f2;Window_Base['prototype'][_0xb5ca00(0x25c)][_0xb5ca00(0x22d)](this),this[_0xb5ca00(0x3b5)](),this[_0xb5ca00(0x396)](),this[_0xb5ca00(0x3bb)]();},Window_PTB_ActionCount[_0x6201f2(0x41e)]['checkNeedsUpdate']=function(){const _0x1b5829=_0x6201f2;if(!this[_0x1b5829(0x2c2)])return;let _0x1784f6=![];if(this[_0x1b5829(0x1fd)]!==this[_0x1b5829(0x2c2)][_0x1b5829(0x409)]()){if(_0x1b5829(0x203)===_0x1b5829(0x42f))return _0x3caa2d[_0x1b5829(0x2a8)]&&_0x250a5a[_0x1b5829(0x397)][_0x1b5829(0x41a)]('['+_0xf01367+']');else _0x1784f6=!![];}else{if(this[_0x1b5829(0x3bc)]!==this[_0x1b5829(0x2c2)][_0x1b5829(0x1d5)]()){if('HqeEM'===_0x1b5829(0x24a)){const _0x5861ac=_0x7720ad['BattleSystemPTB'][_0x1b5829(0x381)][_0x1b5829(0x289)];this['_ptb%1Action'[_0x1b5829(0x43a)](_0x5913ce)]={'name':_0x5861ac[_0x1b5829(0x2d4)[_0x1b5829(0x43a)](_0x2a5ff5)]??'','volume':_0x5861ac['%1Volume'[_0x1b5829(0x43a)](_0x457e30)]??0x5a,'pitch':_0x5861ac[_0x1b5829(0x1d7)['format'](_0x365c1b)]??0x64,'pan':_0x5861ac[_0x1b5829(0x417)[_0x1b5829(0x43a)](_0x4f023e)]??0x0};}else _0x1784f6=!![];}else this[_0x1b5829(0x327)]!==this[_0x1b5829(0x2c2)][_0x1b5829(0x351)]()&&(_0x1784f6=!![]);}_0x1784f6&&(this[_0x1b5829(0x1fd)]=this[_0x1b5829(0x2c2)][_0x1b5829(0x409)](),this[_0x1b5829(0x3bc)]=this[_0x1b5829(0x2c2)][_0x1b5829(0x1d5)](),this[_0x1b5829(0x327)]=this[_0x1b5829(0x2c2)][_0x1b5829(0x351)](),this['refresh']());},Window_PTB_ActionCount[_0x6201f2(0x41e)][_0x6201f2(0x3bb)]=function(){const _0x2b30df=_0x6201f2;if(this[_0x2b30df(0x1e7)]())this['visible']=$gameSystem[_0x2b30df(0x35f)]();else{if('NobDD'!=='NobDD')return _0x2b30df(0x21a);else this['visible']=![];}},Window_PTB_ActionCount['prototype'][_0x6201f2(0x1e7)]=function(){const _0x1f97a2=_0x6201f2;return this[_0x1f97a2(0x2c2)]&&this[_0x1f97a2(0x2c2)]===BattleManager[_0x1f97a2(0x3b2)];},Window_PTB_ActionCount[_0x6201f2(0x41e)][_0x6201f2(0x251)]=function(){const _0xc1c6b5=_0x6201f2;this[_0xc1c6b5(0x2be)][_0xc1c6b5(0x273)]();if(!this[_0xc1c6b5(0x2c2)])return;const _0x1681ff=Window_PTB_ActionCount[_0xc1c6b5(0x381)];if(!_0x1681ff)return;const _0x3dfe2f=this[_0xc1c6b5(0x3f9)](),_0x5437ed=this[_0xc1c6b5(0x3db)](),_0xf1eb46=_0x1681ff['ImageSize']+_0x1681ff[_0xc1c6b5(0x28f)],_0x103a8d=_0x1681ff[_0xc1c6b5(0x2cc)];let _0x3443b6=_0x3dfe2f['x'],_0x3ac9ab=_0x3dfe2f['y'];while(_0x5437ed[_0xc1c6b5(0x3e9)]>_0x1681ff[_0xc1c6b5(0x3e2)]){_0x5437ed['shift']();}while(_0x5437ed[_0xc1c6b5(0x3e9)]>0x0){const _0x57df75=_0x5437ed[_0xc1c6b5(0x240)]();this[_0xc1c6b5(0x207)](_0x57df75,_0x3443b6,_0x3ac9ab,_0x5437ed[_0xc1c6b5(0x3e9)]),_0x103a8d?_0x3443b6+=_0xf1eb46:_0x3ac9ab+=_0xf1eb46;}},Window_PTB_ActionCount[_0x6201f2(0x41e)]['createStartingCoordinates']=function(){const _0x426525=_0x6201f2,_0x15c9df=Window_PTB_ActionCount[_0x426525(0x381)],_0xa2e313=this[_0x426525(0x2c2)]===$gameParty,_0x5bd442=_0x15c9df['ImageSize'],_0x140ad9=_0x5bd442*(_0x15c9df[_0x426525(0x3e2)]-0x1)+_0x15c9df['ImageGapDistance']*(_0x15c9df[_0x426525(0x3e2)]-0x2),_0x257fa0=_0x15c9df[_0x426525(0x2cc)],_0x42c2ae=SceneManager['_scene'][_0x426525(0x2a5)][_0x426525(0x3c3)];let _0x83e98b=0x0,_0x227c03=0x0;const _0x3a9c48=_0x15c9df['BottomPosition'];if(_0x3a9c48){_0x227c03=this[_0x426525(0x2f5)]-_0x42c2ae-_0x15c9df['ScreenBufferY']-_0x5bd442,_0x83e98b=_0xa2e313?this[_0x426525(0x309)]-_0x15c9df[_0x426525(0x26a)]-_0x5bd442:_0x15c9df[_0x426525(0x26a)];if(_0x257fa0&&_0xa2e313){if(_0x426525(0x3a2)!==_0x426525(0x350))_0x83e98b-=_0x140ad9;else return'consume';}else!_0x257fa0&&(_0x426525(0x204)==='zDAbq'?_0x227c03-=_0x140ad9:this[_0x426525(0x403)](_0x426525(0x3be)));}else{if('jqUmr'!=='hqmcx')_0x227c03=_0x15c9df[_0x426525(0x1ec)],_0x83e98b=_0xa2e313?this[_0x426525(0x309)]-_0x15c9df['ScreenBufferX']-_0x5bd442:_0x15c9df[_0x426525(0x26a)],_0x257fa0&&_0xa2e313&&(_0x83e98b-=_0x140ad9);else{if(_0x499c9e===_0x426525(0x226))return;if(_0x1f4aa6===_0x426525(0x378))_0x8e7351=this[_0x426525(0x2c2)]===_0x4f768a?_0x426525(0x266):_0x426525(0x2d3);if(_0x590161===_0x426525(0x1e8))_0x522088=this['_unit']===_0x260956?_0x426525(0x3ce):'EnemyFull';const _0x132809=_0x1c424f[_0x426525(0x381)];if(_0x132809[_0x426525(0x361)['format'](_0x2bc897)]){const _0x2f5f8b=_0x132809[_0x426525(0x361)[_0x426525(0x43a)](_0x219f77)],_0x42c993=_0x3cbe56[_0x426525(0x34f)](_0x2f5f8b);_0x42c993[_0x426525(0x3c5)](this[_0x426525(0x34b)]['bind'](this,_0x42c993,_0x3b537b,_0x919472,_0x20f1a9));}else{const _0x381922=_0x113780['ptb%1ActionsIcon'['format'](_0x37c225)];this[_0x426525(0x233)](_0x381922,_0x3406bc,_0x54e055),this[_0x426525(0x33c)](_0xe16872)&&this[_0x426525(0x359)](_0x5d8e5d,_0x1deb59);}}}return _0x83e98b+=_0xa2e313?_0x15c9df[_0x426525(0x2ab)]:_0x15c9df['EnemyOffsetX'],_0x227c03+=_0xa2e313?_0x15c9df[_0x426525(0x1e3)]:_0x15c9df[_0x426525(0x3cd)],new Point(Math[_0x426525(0x3dd)](_0x83e98b),Math['round'](_0x227c03));},Window_PTB_ActionCount[_0x6201f2(0x41e)]['createContentsArray']=function(){const _0x309307=_0x6201f2,_0x59c10f=Window_PTB_ActionCount[_0x309307(0x381)];let _0x5bf73e=!![];if(_0x59c10f[_0x309307(0x2cc)]){if(_0x309307(0x3c4)!==_0x309307(0x310)){if(this['_unit']===$gameParty)_0x5bf73e=!_0x5bf73e;}else _0x5181b9--;}else _0x5bf73e=!_0x59c10f[_0x309307(0x24b)];let _0x5bf353=this[_0x309307(0x2c2)]['getHalfActionsPTB'](),_0x196129=this[_0x309307(0x2c2)][_0x309307(0x409)](),_0x26f7a3=Math[_0x309307(0x2e0)](0x0,this[_0x309307(0x2c2)][_0x309307(0x351)]()-_0x5bf353-_0x196129);const _0x47bb1a=[];while(_0x5bf353--){const _0x25431b=_0x309307(0x378);_0x47bb1a['push'](_0x25431b);}while(_0x196129--){const _0x548161='Full';_0x47bb1a[_0x309307(0x412)](_0x548161);}while(_0x26f7a3--){const _0x5ff9d1=_0x309307(0x307);_0x5bf73e?'dWMfQ'!==_0x309307(0x2cd)?this[_0x309307(0x403)](_0x309307(0x2fb)):_0x47bb1a[_0x309307(0x412)](_0x5ff9d1):_0x47bb1a[_0x309307(0x1f6)](_0x5ff9d1);}while(_0x47bb1a[_0x309307(0x3e9)]<0xa){const _0x13cf89=_0x309307(0x226);if(_0x5bf73e)_0x47bb1a['push'](_0x13cf89);else{if(_0x309307(0x300)!==_0x309307(0x1d6))_0x47bb1a[_0x309307(0x1f6)](_0x13cf89);else{if(_0x5d7a87['isPTB']()){if(this['battler']())this[_0x309307(0x286)]()[_0x309307(0x2ad)]();return![];}return _0x504d61[_0x309307(0x250)]['Game_Actor_selectNextCommand']['call'](this);}}}return _0x47bb1a;},Window_PTB_ActionCount[_0x6201f2(0x41e)][_0x6201f2(0x207)]=function(_0x19fa16,_0x4c6795,_0x77a555,_0x3b0c83){const _0x2398dd=_0x6201f2;if(_0x19fa16===_0x2398dd(0x226))return;if(_0x19fa16===_0x2398dd(0x378))_0x19fa16=this[_0x2398dd(0x2c2)]===$gameParty?_0x2398dd(0x266):_0x2398dd(0x2d3);if(_0x19fa16===_0x2398dd(0x1e8))_0x19fa16=this[_0x2398dd(0x2c2)]===$gameParty?_0x2398dd(0x3ce):_0x2398dd(0x3ea);const _0xfa9b08=Window_PTB_ActionCount[_0x2398dd(0x381)];if(_0xfa9b08[_0x2398dd(0x361)[_0x2398dd(0x43a)](_0x19fa16)]){if(_0x2398dd(0x2a6)!==_0x2398dd(0x2a6)){const _0x5ea57c=_0x100317['Settings'];if(_0x5ea57c[_0x2398dd(0x24b)])return;if(!_0x5ea57c[_0x2398dd(0x425)])return;const _0x57b9c3=_0x1c8088[_0x2398dd(0x279)]['_helpWindow'];if(!_0x57b9c3)return;_0x57b9c3['visible']?(this['x']=_0x5ea57c[_0x2398dd(0x3a6)]||0x0,this['y']=_0x5ea57c[_0x2398dd(0x214)]||0x0):(this['x']=0x0,this['y']=0x0);}else{const _0x57648f=_0xfa9b08[_0x2398dd(0x361)[_0x2398dd(0x43a)](_0x19fa16)],_0x8b0007=ImageManager[_0x2398dd(0x34f)](_0x57648f);_0x8b0007[_0x2398dd(0x3c5)](this[_0x2398dd(0x34b)]['bind'](this,_0x8b0007,_0x4c6795,_0x77a555,_0x3b0c83));}}else{const _0x1605eb=ImageManager[_0x2398dd(0x222)[_0x2398dd(0x43a)](_0x19fa16)];this[_0x2398dd(0x233)](_0x1605eb,_0x4c6795,_0x77a555),this[_0x2398dd(0x33c)](_0x3b0c83)&&this[_0x2398dd(0x359)](_0x4c6795,_0x77a555);}},Window_PTB_ActionCount[_0x6201f2(0x41e)][_0x6201f2(0x34b)]=function(_0x2b1a7c,_0x23a415,_0x4a173f,_0x149296){const _0x399825=_0x6201f2;if(!_0x2b1a7c)return;const _0x5e9990=Window_PTB_ActionCount[_0x399825(0x381)],_0x591a20=_0x5e9990[_0x399825(0x38a)],_0xd56985=_0x591a20/_0x2b1a7c['width'],_0x3b83e7=_0x591a20/_0x2b1a7c[_0x399825(0x3c3)],_0x554ea9=Math['min'](_0xd56985,_0x3b83e7,0x1),_0x55867d=_0x2b1a7c[_0x399825(0x3c3)],_0x590b77=_0x2b1a7c['height'],_0x3f5220=Math['round'](_0x55867d*_0x554ea9),_0x4ed570=Math[_0x399825(0x3dd)](_0x590b77*_0x554ea9),_0x1bdb4e=Math[_0x399825(0x3dd)](_0x23a415+(_0x591a20-_0x3f5220)/0x2),_0x2666d8=Math[_0x399825(0x3dd)](_0x4a173f+(_0x591a20-_0x4ed570)/0x2);this[_0x399825(0x2be)][_0x399825(0x32a)]['imageSmoothingEnabled']=_0x5e9990[_0x399825(0x391)],this[_0x399825(0x2be)]['blt'](_0x2b1a7c,0x0,0x0,_0x55867d,_0x590b77,_0x1bdb4e,_0x2666d8,_0x3f5220,_0x4ed570),this['contents'][_0x399825(0x32a)][_0x399825(0x360)]=!![],this[_0x399825(0x33c)](_0x149296)&&this[_0x399825(0x359)](_0x23a415,_0x4a173f);},Window_PTB_ActionCount[_0x6201f2(0x41e)][_0x6201f2(0x233)]=function(_0x13c43d,_0x46e730,_0xe608f3){const _0x6857f2=_0x6201f2,_0x54df4d=Window_PTB_ActionCount[_0x6857f2(0x381)];let _0x5cc75f=_0x54df4d[_0x6857f2(0x38a)];const _0x270915=ImageManager[_0x6857f2(0x302)](_0x6857f2(0x23f)),_0x29f905=ImageManager['iconWidth'],_0x1dd07a=ImageManager[_0x6857f2(0x2e8)],_0x168ace=_0x13c43d%0x10*_0x29f905,_0x4f466a=Math[_0x6857f2(0x223)](_0x13c43d/0x10)*_0x1dd07a;this[_0x6857f2(0x2be)][_0x6857f2(0x32a)][_0x6857f2(0x360)]=_0x54df4d[_0x6857f2(0x40c)],this['contents'][_0x6857f2(0x236)](_0x270915,_0x168ace,_0x4f466a,_0x29f905,_0x1dd07a,_0x46e730,_0xe608f3,_0x5cc75f,_0x5cc75f),this['contents'][_0x6857f2(0x32a)][_0x6857f2(0x360)]=!![];},Window_PTB_ActionCount['prototype'][_0x6201f2(0x396)]=function(){const _0x188cba=_0x6201f2,_0x9f1ad9=Window_PTB_ActionCount[_0x188cba(0x381)];if(_0x9f1ad9[_0x188cba(0x24b)])return;if(!_0x9f1ad9[_0x188cba(0x425)])return;const _0x292090=SceneManager[_0x188cba(0x279)]['_helpWindow'];if(!_0x292090)return;_0x292090[_0x188cba(0x433)]?(this['x']=_0x9f1ad9['RepositionTopHelpX']||0x0,this['y']=_0x9f1ad9[_0x188cba(0x214)]||0x0):(this['x']=0x0,this['y']=0x0);},Window_PTB_ActionCount[_0x6201f2(0x41e)][_0x6201f2(0x33c)]=function(_0x229eda){const _0x4f5b18=_0x6201f2,_0x184be3=Window_PTB_ActionCount[_0x4f5b18(0x381)];if(!_0x184be3[_0x4f5b18(0x272)])return![];const _0xb1fdf0=_0x184be3[_0x4f5b18(0x24b)],_0x3c8c65=_0x184be3[_0x4f5b18(0x2cc)],_0x1415f6=this[_0x4f5b18(0x2c2)]===$gameParty;if(_0x3c8c65)return _0x1415f6?_0x229eda===0x0:_0x229eda===_0x184be3[_0x4f5b18(0x3e2)]-0x1;else return _0xb1fdf0?_0x229eda===0x0:_0x229eda===_0x184be3['MaxVisible']-0x1;},Window_PTB_ActionCount[_0x6201f2(0x41e)][_0x6201f2(0x359)]=function(_0x5a0242,_0x363bb6){const _0x361a3c=_0x6201f2;this[_0x361a3c(0x322)]();const _0x191a9f=Window_PTB_ActionCount[_0x361a3c(0x381)],_0x207d8a=new Rectangle(_0x5a0242,_0x363bb6,_0x191a9f[_0x361a3c(0x38a)],_0x191a9f[_0x361a3c(0x38a)]);_0x207d8a['x']+=_0x191a9f[_0x361a3c(0x320)],_0x207d8a['y']+=_0x191a9f['ActionsRemainingOffsetY'];const _0x5e6dfb=this[_0x361a3c(0x2c2)][_0x361a3c(0x409)]()+this[_0x361a3c(0x2c2)][_0x361a3c(0x1d5)]();this['contents'][_0x361a3c(0x376)]=_0x191a9f['ActionsRemainingFontSize'],this[_0x361a3c(0x2be)][_0x361a3c(0x1dc)](_0x5e6dfb,_0x207d8a['x'],_0x207d8a['y'],_0x207d8a[_0x361a3c(0x3d6)],_0x207d8a[_0x361a3c(0x3c3)],_0x361a3c(0x41c)),this[_0x361a3c(0x322)]();};