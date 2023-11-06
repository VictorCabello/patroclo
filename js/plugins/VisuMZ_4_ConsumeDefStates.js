//=============================================================================
// VisuStella MZ - Consumable Defensive States
// VisuMZ_4_ConsumeDefStates.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_ConsumeDefStates = true;

var VisuMZ = VisuMZ || {};
VisuMZ.ConsumeDefStates = VisuMZ.ConsumeDefStates || {};
VisuMZ.ConsumeDefStates.version = 1.01;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.01] [ConsumeDefStates]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Consumable_Defensive_States_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 * @orderAfter VisuMZ_1_SkillsStatesCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Consumable Defensive States are states that will protect its user once from
 * a specific element(s), skill type(s), or hit type(s) before automatically
 * removing itself. These defensive strategies can range from reflection,
 * evasion, or damage immunity. When utilized, these new state types can add a
 * whole new range of strategy to the battle system.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Consumable Defensive States will protect its user from specific types of
 *   attacks before self-removing, consuming itself in the process.
 * * The action, its damage, and its effects can be reflected back at the user
 *   of the action as the third defensive reaction measure.
 * * Defensive evasion reaction states will allow battlers to dodge even skills
 *   with 100% hit rates, as long as the conditions have been met.
 * * Damage immunity is another defensive reaction that can be utilized through
 *   these new state effects. This is different from nullification as this will
 *   proc any damage immunity-based effects.
 * * Those using the Skills and States Core will have access to extra features,
 *   such as additional charges that can be employed. Consumable Defensive
 *   States with additional charges will consume the charges first before
 *   consuming itself, allowing for additional usage.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 4 ------
 *
 * This plugin is a Tier 4 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Extra Features
 * ============================================================================
 *
 * There are some extra features found if other VisuStella MZ plugins are found
 * present in the Plugin Manager list.
 *
 * ---
 *
 * Skills and States Core
 * 
 * - With the VisuStella MZ Skills and States Core installed, Consumable
 * Defensive States no longer have to be one time uses. Instead, they can have
 * charges. Each time their defensive properties take effect, the charges are
 * reduced by 1. If the number of charges reach zero, the state is
 * automatically removed. Simple and intuitive, right?
 *
 * ---
 *
 * ============================================================================
 * VisuStella MZ Compatibility
 * ============================================================================
 *
 * While this plugin is compatible with the majority of the VisuStella MZ
 * plugin library, it is not compatible with specific plugins or specific
 * features. This section will highlight the main plugins/features that will
 * not be compatible with this plugin or put focus on how the make certain
 * features compatible.
 *
 * ---
 * 
 * Anti-Damage Barriers
 * 
 * - The VisuStella MZ Anti-Damage Barriers notetag effects cannot be used
 * together with the Consumable Defensive States notetag effects. They utilize
 * the same state display. Priority will be given to Anti-Damage Barriers if
 * both of them are detected on the same state.
 * 
 * - If you absolutely need for multiple effects from both to occur at the same
 * time, we recommend that you create them as separate states and apply both
 * (or more) states simultaneously.
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
 * === Reflection-Related Notetags ===
 * 
 * ---
 *
 * <1 Time Reflect Element: id>
 * <1 Time Reflect Elements: id, id, id>
 * <1 Time Reflect Element: name>
 * <1 Time Reflect Elements: name, name, name>
 *
 * <x Charges Reflect Element: id>
 * <x Charges Reflect Elements: id, id, id>
 * <x Charges Reflect Element: name>
 * <x Charges Reflect Elements: name, name, name>
 *
 * - Used for: State Notetags
 * - Turns the state into a Consumable Defensive State that will reflect the
 *   specific element until consumed.
 *   - Reflection will occur before Evasion and Damage Immunity.
 * - Replace 'id' with a number representing the element ID to be reflected.
 * - Replace 'name' with the name of the element to be reflected.
 *   - Remove any \I[x] text codes from it if present.
 * - If VisuMZ_1_SkillsStatesCore is installed, you may use the 'x' notetags.
 *   - Replace 'x' with the number of usable charges the state would have
 *     before being consumed. Usable charges go down by 1 each trigger.
 * - IMPORTANT: You cannot use other Consumable Defensive State notetags
 *   together in the same state.
 *
 * ---
 *
 * <1 Time Reflect SType: id>
 * <1 Time Reflect STypes: id, id, id>
 * <1 Time Reflect SType: name>
 * <1 Time Reflect STypes: name, name, name>
 *
 * <x Charges Reflect SType: id>
 * <x Charges Reflect STypes: id, id, id>
 * <x Charges Reflect SType: name>
 * <x Charges Reflect STypes: name, name, name>
 *
 * - Used for: State Notetags
 * - Turns the state into a Consumable Defensive State that will reflect a
 *   skill with the specific skill type until consumed.
 *   - Reflection will occur before Evasion and Damage Immunity.
 * - Replace 'id' with a number representing the skill type ID to be reflected.
 * - Replace 'name' with the name of the skill type to be reflected.
 *   - Remove any \I[x] text codes from it if present.
 * - If VisuMZ_1_SkillsStatesCore is installed, you may use the 'x' notetags.
 *   - Replace 'x' with the number of usable charges the state would have
 *     before being consumed. Usable charges go down by 1 each trigger.
 * - IMPORTANT: You cannot use other Consumable Defensive State notetags
 *   together in the same state.
 *
 * ---
 *
 * <1 Time Reflect Certain Hit Skills>
 * <1 Time Reflect Physical Hit Skills>
 * <1 Time Reflect Magical Hit Skills>
 * <1 Time Reflect All Skills>
 *
 * <x Charges Reflect Certain Hit Skills>
 * <x Charges Reflect Physical Hit Skills>
 * <x Charges Reflect Magical Hit Skills>
 * <x Charges Reflect All Skills>
 *
 * - Used for: State Notetags
 * - Turns the state into a Consumable Defensive State that will reflect a
 *   skill with the specific hit type until consumed.
 *   - Reflection will occur before Evasion and Damage Immunity.
 * - If VisuMZ_1_SkillsStatesCore is installed, you may use the 'x' notetags.
 *   - Replace 'x' with the number of usable charges the state would have
 *     before being consumed. Usable charges go down by 1 each trigger.
 * - IMPORTANT: You cannot use other Consumable Defensive State notetags
 *   together in the same state.
 *
 * ---
 *
 * <1 Time Reflect Certain Hit Items>
 * <1 Time Reflect Physical Hit Items>
 * <1 Time Reflect Magical Hit Items>
 * <1 Time Reflect All Items>
 *
 * <x Charges Reflect Certain Hit Items>
 * <x Charges Reflect Physical Hit Items>
 * <x Charges Reflect Magical Hit Items>
 * <x Charges Reflect All Items>
 *
 * - Used for: State Notetags
 * - Turns the state into a Consumable Defensive State that will reflect an
 *   item with the specific hit type until consumed.
 *   - Reflection will occur before Evasion and Damage Immunity.
 * - If VisuMZ_1_SkillsStatesCore is installed, you may use the 'x' notetags.
 *   - Replace 'x' with the number of usable charges the state would have
 *     before being consumed. Usable charges go down by 1 each trigger.
 * - IMPORTANT: You cannot use other Consumable Defensive State notetags
 *   together in the same state.
 *
 * ---
 *
 * <1 Time Reflect Certain Hit Actions>
 * <1 Time Reflect Physical Hit Actions>
 * <1 Time Reflect Magical Hit Actions>
 * <1 Time Reflect All Actions>
 *
 * <x Charges Reflect Certain Hit Actions>
 * <x Charges Reflect Physical Hit Actions>
 * <x Charges Reflect Magical Hit Actions>
 * <x Charges Reflect All Actions>
 *
 * - Used for: State Notetags
 * - Turns the state into a Consumable Defensive State that will reflect an
 *   action (skill and/or item) with the specific hit type until consumed.
 *   - Reflection will occur before Evasion and Damage Immunity.
 * - If VisuMZ_1_SkillsStatesCore is installed, you may use the 'x' notetags.
 *   - Replace 'x' with the number of usable charges the state would have
 *     before being consumed. Usable charges go down by 1 each trigger.
 * - IMPORTANT: You cannot use other Consumable Defensive State notetags
 *   together in the same state.
 *
 * ---
 * 
 * === Evasion-Related Notetags ===
 * 
 * ---
 *
 * <1 Time Evasion Element: id>
 * <1 Time Evasion Elements: id, id, id>
 * <1 Time Evasion Element: name>
 * <1 Time Evasion Elements: name, name, name>
 *
 * <x Charges Evasion Element: id>
 * <x Charges Evasion Elements: id, id, id>
 * <x Charges Evasion Element: name>
 * <x Charges Evasion Elements: name, name, name>
 *
 * - Used for: State Notetags
 * - Turns the state into a Consumable Defensive State that will evade the
 *   specific element until consumed.
 *   - Evasion will occur after Reflection and before Damage Immunity.
 * - Replace 'id' with a number representing the element ID to be evaded.
 * - Replace 'name' with the name of the element to be evaded.
 *   - Remove any \I[x] text codes from it if present.
 * - If VisuMZ_1_SkillsStatesCore is installed, you may use the 'x' notetags.
 *   - Replace 'x' with the number of usable charges the state would have
 *     before being consumed. Usable charges go down by 1 each trigger.
 * - IMPORTANT: You cannot use other Consumable Defensive State notetags
 *   together in the same state.
 *
 * ---
 *
 * <1 Time Evasion SType: id>
 * <1 Time Evasion STypes: id, id, id>
 * <1 Time Evasion SType: name>
 * <1 Time Evasion STypes: name, name, name>
 *
 * <x Charges Evasion SType: id>
 * <x Charges Evasion STypes: id, id, id>
 * <x Charges Evasion SType: name>
 * <x Charges Evasion STypes: name, name, name>
 *
 * - Used for: State Notetags
 * - Turns the state into a Consumable Defensive State that will evade a
 *   skill with the specific skill type until consumed.
 *   - Evasion will occur after Reflection and before Damage Immunity.
 * - Replace 'id' with a number representing the skill type ID to be evaded.
 * - Replace 'name' with the name of the skill type to be evaded.
 *   - Remove any \I[x] text codes from it if present.
 * - If VisuMZ_1_SkillsStatesCore is installed, you may use the 'x' notetags.
 *   - Replace 'x' with the number of usable charges the state would have
 *     before being consumed. Usable charges go down by 1 each trigger.
 * - IMPORTANT: You cannot use other Consumable Defensive State notetags
 *   together in the same state.
 *
 * ---
 *
 * <1 Time Evasion Certain Hit Skills>
 * <1 Time Evasion Physical Hit Skills>
 * <1 Time Evasion Magical Hit Skills>
 * <1 Time Evasion All Skills>
 *
 * <x Charges Evasion Certain Hit Skills>
 * <x Charges Evasion Physical Hit Skills>
 * <x Charges Evasion Magical Hit Skills>
 * <x Charges Evasion All Skills>
 *
 * - Used for: State Notetags
 * - Turns the state into a Consumable Defensive State that will evade a
 *   skill with the specific hit type until consumed.
 *   - Evasion will occur after Reflection and before Damage Immunity.
 * - If VisuMZ_1_SkillsStatesCore is installed, you may use the 'x' notetags.
 *   - Replace 'x' with the number of usable charges the state would have
 *     before being consumed. Usable charges go down by 1 each trigger.
 * - IMPORTANT: You cannot use other Consumable Defensive State notetags
 *   together in the same state.
 *
 * ---
 *
 * <1 Time Evasion Certain Hit Items>
 * <1 Time Evasion Physical Hit Items>
 * <1 Time Evasion Magical Hit Items>
 * <1 Time Evasion All Items>
 *
 * <x Charges Evasion Certain Hit Items>
 * <x Charges Evasion Physical Hit Items>
 * <x Charges Evasion Magical Hit Items>
 * <x Charges Evasion All Items>
 *
 * - Used for: State Notetags
 * - Turns the state into a Consumable Defensive State that will evade an
 *   item with the specific hit type until consumed.
 *   - Evasion will occur after Reflection and before Damage Immunity.
 * - If VisuMZ_1_SkillsStatesCore is installed, you may use the 'x' notetags.
 *   - Replace 'x' with the number of usable charges the state would have
 *     before being consumed. Usable charges go down by 1 each trigger.
 * - IMPORTANT: You cannot use other Consumable Defensive State notetags
 *   together in the same state.
 *
 * ---
 *
 * <1 Time Evasion Certain Hit Actions>
 * <1 Time Evasion Physical Hit Actions>
 * <1 Time Evasion Magical Hit Actions>
 * <1 Time Evasion All Actions>
 *
 * <x Charges Evasion Certain Hit Actions>
 * <x Charges Evasion Physical Hit Actions>
 * <x Charges Evasion Magical Hit Actions>
 * <x Charges Evasion All Actions>
 *
 * - Used for: State Notetags
 * - Turns the state into a Consumable Defensive State that will evade an
 *   action (skill and/or item) with the specific hit type until consumed.
 *   - Evasion will occur after Reflection and before Damage Immunity.
 * - If VisuMZ_1_SkillsStatesCore is installed, you may use the 'x' notetags.
 *   - Replace 'x' with the number of usable charges the state would have
 *     before being consumed. Usable charges go down by 1 each trigger.
 * - IMPORTANT: You cannot use other Consumable Defensive State notetags
 *   together in the same state.
 *
 * ---
 * 
 * === Immunity-Related Notetags ===
 * 
 * ---
 *
 * <1 Time Immunity Element: id>
 * <1 Time Immunity Elements: id, id, id>
 * <1 Time Immunity Element: name>
 * <1 Time Immunity Elements: name, name, name>
 *
 * <x Charges Immunity Element: id>
 * <x Charges Immunity Elements: id, id, id>
 * <x Charges Immunity Element: name>
 * <x Charges Immunity Elements: name, name, name>
 *
 * - Used for: State Notetags
 * - Turns the state into a Consumable Defensive State that will nullify damage
 *   from the specific element until consumed. Other effects may still occur.
 *   - Immunity will occur after Reflection and Evasion.
 * - Replace 'id' with a number representing the element ID to nullify.
 * - Replace 'name' with the name of the element to nullify.
 *   - Remove any \I[x] text codes from it if present.
 * - If VisuMZ_1_SkillsStatesCore is installed, you may use the 'x' notetags.
 *   - Replace 'x' with the number of usable charges the state would have
 *     before being consumed. Usable charges go down by 1 each trigger.
 * - IMPORTANT: You cannot use other Consumable Defensive State notetags
 *   together in the same state.
 *
 * ---
 *
 * <1 Time Immunity SType: id>
 * <1 Time Immunity STypes: id, id, id>
 * <1 Time Immunity SType: name>
 * <1 Time Immunity STypes: name, name, name>
 *
 * <x Charges Immunity SType: id>
 * <x Charges Immunity STypes: id, id, id>
 * <x Charges Immunity SType: name>
 * <x Charges Immunity STypes: name, name, name>
 *
 * - Used for: State Notetags
 * - Turns the state into a Consumable Defensive State that will nullify damage
 *   from a skill with the specific skill type until consumed. Other effects
 *   may still occur.
 *   - Immunity will occur after Reflection and Evasion.
 * - Replace 'id' with a number representing the skill type ID to nullify.
 * - Replace 'name' with the name of the skill type to nullify.
 *   - Remove any \I[x] text codes from it if present.
 * - If VisuMZ_1_SkillsStatesCore is installed, you may use the 'x' notetags.
 *   - Replace 'x' with the number of usable charges the state would have
 *     before being consumed. Usable charges go down by 1 each trigger.
 * - IMPORTANT: You cannot use other Consumable Defensive State notetags
 *   together in the same state.
 *
 * ---
 *
 * <1 Time Immunity Certain Hit Skills>
 * <1 Time Immunity Physical Hit Skills>
 * <1 Time Immunity Magical Hit Skills>
 * <1 Time Immunity All Skills>
 *
 * <x Charges Immunity Certain Hit Skills>
 * <x Charges Immunity Physical Hit Skills>
 * <x Charges Immunity Magical Hit Skills>
 * <x Charges Immunity All Skills>
 *
 * - Used for: State Notetags
 * - Turns the state into a Consumable Defensive State that will nullify damage
 *   from a skill with the specific hit type until consumed. Other effects may
 *   still occur.
 *   - Immunity will occur after Reflection and Evasion.
 * - If VisuMZ_1_SkillsStatesCore is installed, you may use the 'x' notetags.
 *   - Replace 'x' with the number of usable charges the state would have
 *     before being consumed. Usable charges go down by 1 each trigger.
 * - IMPORTANT: You cannot use other Consumable Defensive State notetags
 *   together in the same state.
 *
 * ---
 *
 * <1 Time Immunity Certain Hit Items>
 * <1 Time Immunity Physical Hit Items>
 * <1 Time Immunity Magical Hit Items>
 * <1 Time Immunity: All Items>
 *
 * <x Charges Immunity Certain Hit Items>
 * <x Charges Immunity Physical Hit Items>
 * <x Charges Immunity Magical Hit Items>
 * <x Charges Immunity: All Items>
 *
 * - Used for: State Notetags
 * - Turns the state into a Consumable Defensive State that will nullify damage
 *   from an item with the specific hit type until consumed. Other effects may
 *   still occur.
 *   - Immunity will occur after Reflection and Evasion.
 * - If VisuMZ_1_SkillsStatesCore is installed, you may use the 'x' notetags.
 *   - Replace 'x' with the number of usable charges the state would have
 *     before being consumed. Usable charges go down by 1 each trigger.
 * - IMPORTANT: You cannot use other Consumable Defensive State notetags
 *   together in the same state.
 *
 * ---
 *
 * <1 Time Immunity Certain Hit Actions>
 * <1 Time Immunity Physical Hit Actions>
 * <1 Time Immunity Magical Hit Actions>
 * <1 Time Immunity: All Actions>
 *
 * <x Charges Immunity Certain Hit Actions>
 * <x Charges Immunity Physical Hit Actions>
 * <x Charges Immunity Magical Hit Actions>
 * <x Charges Immunity: All Actions>
 *
 * - Used for: State Notetags
 * - Turns the state into a Consumable Defensive State that will nullify damage
 *   from an action (skill and/or item) with the specific hit type until
 *   consumed. Other effects may still occur.
 *   - Immunity will occur after Reflection and Evasion.
 * - If VisuMZ_1_SkillsStatesCore is installed, you may use the 'x' notetags.
 *   - Replace 'x' with the number of usable charges the state would have
 *     before being consumed. Usable charges go down by 1 each trigger.
 * - IMPORTANT: You cannot use other Consumable Defensive State notetags
 *   together in the same state.
 *
 * ---
 * 
 * === Stackable Charges-Related Notetags ===
 * 
 * ---
 *
 * <Max Stackable Charges: x>
 *
 * - State Notetags
 * - Requires VisuMZ_1_SkillsStatesCore!
 * - Allows the max stackable charges for the state to become 'x'.
 * - Replace 'x' with a number representing the maximum charges the state can
 *   potentially have. If 'x' is lower than the default charge amount, 'x' will
 *   become the default charge amount.
 * - This is not a Consumable Defensive State notetag and can therefore be used
 *   together with the above notetags.
 * - If this notetag is not present, whenever a Consumable Defensive State is
 *   reapplied, the charge number resets. With this notetag, the charges become
 *   stackable up to a maximum of 'x'.
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
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.01: October 28, 2021
 * * Bug Fixes!
 * ** Fixed documentation error that listed the incorrect way to parse notetags
 *    for the various Evasion, Reflect, and Immune effects.
 *    Fix made by Olivia.
 * * Documentation Update!
 * ** Help file updated for the correct notetag parsings.
 *
 * Version 1.00 Official Release Date: November 5, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 */
//=============================================================================

const _0x582514=_0x3830;(function(_0x5022d7,_0x41f130){const _0x610658=_0x3830,_0x26346a=_0x5022d7();while(!![]){try{const _0x724117=-parseInt(_0x610658(0x1a1))/0x1*(-parseInt(_0x610658(0x1b3))/0x2)+-parseInt(_0x610658(0x152))/0x3*(parseInt(_0x610658(0x1ab))/0x4)+parseInt(_0x610658(0x169))/0x5+-parseInt(_0x610658(0x14a))/0x6*(parseInt(_0x610658(0x19d))/0x7)+parseInt(_0x610658(0x194))/0x8+-parseInt(_0x610658(0x1b4))/0x9*(parseInt(_0x610658(0x143))/0xa)+parseInt(_0x610658(0x141))/0xb*(parseInt(_0x610658(0x1b7))/0xc);if(_0x724117===_0x41f130)break;else _0x26346a['push'](_0x26346a['shift']());}catch(_0x29e211){_0x26346a['push'](_0x26346a['shift']());}}}(_0x238f,0xc092d));function _0x3830(_0x16602f,_0x40f8d6){const _0x238fac=_0x238f();return _0x3830=function(_0x38302a,_0x4ee43a){_0x38302a=_0x38302a-0x137;let _0x5f154a=_0x238fac[_0x38302a];return _0x5f154a;},_0x3830(_0x16602f,_0x40f8d6);}function _0x238f(){const _0x4106f0=['_elementIDs','min','RegExp','test','item','Kpvbe','4gBVgnk','removeState','type','return\x200','ConEvade','consumableDefensiveStates','ConsumeDefStates','_stypeIDs','2MxlonT','3924ihlwyQ','itemHit','getStypeIdWithName','11147076vvbOxD','wnrog','uULBN','isItem','hBOJJ','parameters','subject','STR','_consumeDefStateInvoking','setStateDisplay','version','_tempBattler','WZpEp','name','11CTHCQX','filter','35180VemhfJ','consumeDefState','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','FUNC','getKeyByConsumeDefState','states','isSkill','1302HfCWuR','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','ConvertParams','xsFPq','constructor','STRUCT','ARRAYEVAL','calcElementRate','2347395dqefMd','_tempActor','_action','_scene','IfeUq','trim','matchConsumeDefStateReq','log','apply','VisuMZ_1_SkillsStatesCore','vbmCY','getStateDisplay','stypeId','bTFET','ARRAYJSON','addState','damage','XRSYQ','Game_Battler_addState','getSkillTypes','Game_Action_apply','himrv','_stateIDs','3560805EWKeil','exit','ARRAYFUNC','toUpperCase','setConsumeDefStateInvoking','KRJEc','dEsef','isStateAffected','match','Game_Action_itemMrf','description','attackElements','push','format','ConAny','elementId','hasAntiDmgBarriersNotetag','isCertainHit','VisuMZ_1_ElementStatusCore','pxvwk','map','ARRAYNUM','ARRAYSTR','status','initConsumeDefState','itemMrf','isMagical','isLegalConsumableDefensiveState','Game_Action_itemHit','StackableCharges','isPhysical','elements','ConReflect','JUESw','Game_Action_calcElementRate','ConNull','Settings','_cachedConsumeDefStateNull','split','getElementIdWithName','includes','max','parse','2049240TGezJR','BattleManager_invokeAction','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','EVAL','invokeAction','skillTypes','KMzxI','replace','note','350cYbory','call','hnBrM','qlQKy','1218705OUIdPj','%1\x20cannot\x20be\x20used\x20as\x20a\x20Consumable\x20Defensive\x20State.\x0aOnly\x20one\x20Consumable\x20Defensive\x20State\x20notetag\x20effect\x20can\x20be\x20used\x20per\x20state.','isSceneBattle','prototype'];_0x238f=function(){return _0x4106f0;};return _0x238f();}var label='ConsumeDefStates',tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x582514(0x142)](function(_0x10020d){const _0x56ef13=_0x582514;return _0x10020d[_0x56ef13(0x180)]&&_0x10020d[_0x56ef13(0x173)]['includes']('['+label+']');})[0x0];VisuMZ[label][_0x582514(0x18d)]=VisuMZ[label]['Settings']||{},VisuMZ['ConvertParams']=function(_0x46e182,_0x35d688){const _0x592507=_0x582514;for(const _0x24803f in _0x35d688){if(_0x592507(0x16e)!=='deush'){if(_0x24803f[_0x592507(0x171)](/(.*):(.*)/i)){const _0x178f26=String(RegExp['$1']),_0x1a5f10=String(RegExp['$2'])[_0x592507(0x16c)]()[_0x592507(0x157)]();let _0x2eadf7,_0x488956,_0x191859;switch(_0x1a5f10){case'NUM':_0x2eadf7=_0x35d688[_0x24803f]!==''?Number(_0x35d688[_0x24803f]):0x0;break;case _0x592507(0x17e):_0x488956=_0x35d688[_0x24803f]!==''?JSON[_0x592507(0x193)](_0x35d688[_0x24803f]):[],_0x2eadf7=_0x488956[_0x592507(0x17d)](_0x1731b7=>Number(_0x1731b7));break;case _0x592507(0x197):_0x2eadf7=_0x35d688[_0x24803f]!==''?eval(_0x35d688[_0x24803f]):null;break;case _0x592507(0x150):_0x488956=_0x35d688[_0x24803f]!==''?JSON[_0x592507(0x193)](_0x35d688[_0x24803f]):[],_0x2eadf7=_0x488956[_0x592507(0x17d)](_0x21391a=>eval(_0x21391a));break;case'JSON':_0x2eadf7=_0x35d688[_0x24803f]!==''?JSON[_0x592507(0x193)](_0x35d688[_0x24803f]):'';break;case _0x592507(0x160):_0x488956=_0x35d688[_0x24803f]!==''?JSON[_0x592507(0x193)](_0x35d688[_0x24803f]):[],_0x2eadf7=_0x488956[_0x592507(0x17d)](_0x127ff4=>JSON[_0x592507(0x193)](_0x127ff4));break;case _0x592507(0x146):_0x2eadf7=_0x35d688[_0x24803f]!==''?new Function(JSON['parse'](_0x35d688[_0x24803f])):new Function(_0x592507(0x1ae));break;case _0x592507(0x16b):_0x488956=_0x35d688[_0x24803f]!==''?JSON[_0x592507(0x193)](_0x35d688[_0x24803f]):[],_0x2eadf7=_0x488956[_0x592507(0x17d)](_0x18eb95=>new Function(JSON[_0x592507(0x193)](_0x18eb95)));break;case _0x592507(0x13a):_0x2eadf7=_0x35d688[_0x24803f]!==''?String(_0x35d688[_0x24803f]):'';break;case _0x592507(0x17f):_0x488956=_0x35d688[_0x24803f]!==''?JSON[_0x592507(0x193)](_0x35d688[_0x24803f]):[],_0x2eadf7=_0x488956[_0x592507(0x17d)](_0x332f12=>String(_0x332f12));break;case _0x592507(0x14f):_0x191859=_0x35d688[_0x24803f]!==''?JSON[_0x592507(0x193)](_0x35d688[_0x24803f]):{},_0x2eadf7=VisuMZ[_0x592507(0x14c)]({},_0x191859);break;case'ARRAYSTRUCT':_0x488956=_0x35d688[_0x24803f]!==''?JSON[_0x592507(0x193)](_0x35d688[_0x24803f]):[],_0x2eadf7=_0x488956[_0x592507(0x17d)](_0x2cd5d4=>VisuMZ['ConvertParams']({},JSON[_0x592507(0x193)](_0x2cd5d4)));break;default:continue;}_0x46e182[_0x178f26]=_0x2eadf7;}}else return!![];}return _0x46e182;},(_0xeba8c2=>{const _0x556db9=_0x582514,_0x3b39ae=_0xeba8c2[_0x556db9(0x140)];for(const _0x59f5a5 of dependencies){if(!Imported[_0x59f5a5]){if('JUESw'!==_0x556db9(0x18a))return!![];else{alert(_0x556db9(0x196)['format'](_0x3b39ae,_0x59f5a5)),SceneManager['exit']();break;}}}const _0x2c845e=_0xeba8c2[_0x556db9(0x173)];if(_0x2c845e[_0x556db9(0x171)](/\[Version[ ](.*?)\]/i)){const _0x497010=Number(RegExp['$1']);_0x497010!==VisuMZ[label]['version']&&(alert(_0x556db9(0x145)[_0x556db9(0x176)](_0x3b39ae,_0x497010)),SceneManager[_0x556db9(0x16a)]());}if(_0x2c845e[_0x556db9(0x171)](/\[Tier[ ](\d+)\]/i)){const _0x382517=Number(RegExp['$1']);if(_0x382517<tier){if(_0x556db9(0x14d)===_0x556db9(0x19f)){const _0x539c28=_0x510db0(_0x36dcea['$2']);if(this[_0x556db9(0x158)](_0x539c28))return _0xfa0dcb;}else alert(_0x556db9(0x14b)['format'](_0x3b39ae,_0x382517,tier)),SceneManager[_0x556db9(0x16a)]();}else tier=Math[_0x556db9(0x192)](_0x382517,tier);}VisuMZ[_0x556db9(0x14c)](VisuMZ[label]['Settings'],_0xeba8c2[_0x556db9(0x138)]);})(pluginData),VisuMZ['ConsumeDefStates']['RegExp']={'StackableCharges':/<(?:MAX STACK|MAX STACKABLE|STACK|STACKABLE)[ ](?:CHARGE|CHARGES):[ ](\d+)>/i,'ConAny':/<(\d+)[ ](?:TIME|TIMES|CHARGE|CHARGES)[ ](.*)>/gi,'ConReflect':/<(\d+)[ ](?:TIME|TIMES|CHARGE|CHARGES)[ ](?:REFLECT|REFLECTION|REPEL)[ ](.*)>/i,'ConEvade':/<(\d+)[ ](?:TIME|TIMES|CHARGE|CHARGES)[ ](?:EVADE|EVASION|DODGE)[ ](.*)>/i,'ConNull':/<(\d+)[ ](?:TIME|TIMES|CHARGE|CHARGES)[ ](?:IMMUNE|IMMUNITY|NULLIFY|NULL|VOID)[ ](.*)>/i},DataManager['getStateIdWithName']=function(_0x36555e){const _0xe26c88=_0x582514;_0x36555e=_0x36555e[_0xe26c88(0x16c)]()[_0xe26c88(0x157)](),this['_stateIDs']=this[_0xe26c88(0x168)]||{};if(this['_stateIDs'][_0x36555e])return this[_0xe26c88(0x168)][_0x36555e];for(const _0x1cfb64 of $dataStates){if(!_0x1cfb64)continue;this[_0xe26c88(0x168)][_0x1cfb64[_0xe26c88(0x140)][_0xe26c88(0x16c)]()['trim']()]=_0x1cfb64['id'];}return this[_0xe26c88(0x168)][_0x36555e]||0x0;},DataManager['getElementIdWithName']=function(_0x4aac6e){const _0x5e28ee=_0x582514;_0x4aac6e=_0x4aac6e[_0x5e28ee(0x16c)]()[_0x5e28ee(0x157)](),this['_elementIDs']=this[_0x5e28ee(0x1a5)]||{};if(this['_elementIDs'][_0x4aac6e])return this[_0x5e28ee(0x1a5)][_0x4aac6e];let _0x465c34=0x1;for(const _0x3c6333 of $dataSystem[_0x5e28ee(0x188)]){if(!_0x3c6333)continue;let _0x3dd02f=_0x3c6333[_0x5e28ee(0x16c)]();_0x3dd02f=_0x3dd02f[_0x5e28ee(0x19b)](/\x1I\[(\d+)\]/gi,''),_0x3dd02f=_0x3dd02f[_0x5e28ee(0x19b)](/\\I\[(\d+)\]/gi,''),this[_0x5e28ee(0x1a5)][_0x3dd02f]=_0x465c34,_0x465c34++;}return this[_0x5e28ee(0x1a5)][_0x4aac6e]||0x0;},DataManager[_0x582514(0x1b6)]=function(_0x4e53b6){const _0x97cd87=_0x582514;_0x4e53b6=_0x4e53b6[_0x97cd87(0x16c)]()[_0x97cd87(0x157)](),this[_0x97cd87(0x1b2)]=this[_0x97cd87(0x1b2)]||{};if(this['_stypeIDs'][_0x4e53b6])return this[_0x97cd87(0x1b2)][_0x4e53b6];for(let _0x1c1c17=0x1;_0x1c1c17<0x64;_0x1c1c17++){if(!$dataSystem['skillTypes'][_0x1c1c17])continue;let _0x171a5b=$dataSystem[_0x97cd87(0x199)][_0x1c1c17]['toUpperCase']()[_0x97cd87(0x157)]();_0x171a5b=_0x171a5b[_0x97cd87(0x19b)](/\x1I\[(\d+)\]/gi,''),_0x171a5b=_0x171a5b[_0x97cd87(0x19b)](/\\I\[(\d+)\]/gi,''),this[_0x97cd87(0x1b2)][_0x171a5b]=_0x1c1c17;}return this[_0x97cd87(0x1b2)][_0x4e53b6]||0x0;},DataManager['isLegalConsumableDefensiveState']=function(_0x2aac82){const _0x4b5f5d=_0x582514;if(!_0x2aac82)return![];const _0x2d81fc=VisuMZ[_0x4b5f5d(0x1b1)][_0x4b5f5d(0x1a7)],_0x21b98a=_0x2aac82[_0x4b5f5d(0x19c)]||'',_0x3ea2fb=_0x21b98a['match'](_0x2d81fc['ConAny']);if(_0x3ea2fb&&_0x3ea2fb['length']>0x1){if('wnrog'!==_0x4b5f5d(0x1b8))_0x1e21bb=[this[_0x4b5f5d(0x1a9)]()[_0x4b5f5d(0x162)][_0x4b5f5d(0x178)]];else return $gameTemp['isPlaytest']()&&console[_0x4b5f5d(0x159)](_0x4b5f5d(0x1a2)[_0x4b5f5d(0x176)](_0x2aac82[_0x4b5f5d(0x140)])),![];}return!![];},SceneManager['isSceneBattle']=function(){const _0x1f6fd5=_0x582514;return this[_0x1f6fd5(0x155)]&&this[_0x1f6fd5(0x155)][_0x1f6fd5(0x14e)]===Scene_Battle;},VisuMZ[_0x582514(0x1b1)][_0x582514(0x195)]=BattleManager['invokeAction'],BattleManager[_0x582514(0x198)]=function(_0x491d9f,_0x68c8ba){const _0x3efbf2=_0x582514;if(this[_0x3efbf2(0x154)])this[_0x3efbf2(0x154)]['setConsumeDefStateInvoking'](!![]);VisuMZ[_0x3efbf2(0x1b1)][_0x3efbf2(0x195)][_0x3efbf2(0x19e)](this,_0x491d9f,_0x68c8ba);if(this[_0x3efbf2(0x154)])this[_0x3efbf2(0x154)][_0x3efbf2(0x16d)](![]);},Game_Action[_0x582514(0x1a4)][_0x582514(0x16d)]=function(_0x3b96c3){const _0x3059cd=_0x582514;this[_0x3059cd(0x13b)]=_0x3b96c3;},VisuMZ[_0x582514(0x1b1)][_0x582514(0x185)]=Game_Action['prototype'][_0x582514(0x1b5)],Game_Action[_0x582514(0x1a4)][_0x582514(0x1b5)]=function(_0x5bc42a){const _0x2fd472=_0x582514;let _0x442c4e=VisuMZ['ConsumeDefStates'][_0x2fd472(0x185)][_0x2fd472(0x19e)](this,_0x5bc42a);if(_0x5bc42a[_0x2fd472(0x153)]||_0x5bc42a[_0x2fd472(0x13e)])return _0x442c4e;if(!this[_0x2fd472(0x13b)])return _0x442c4e;if(_0x442c4e>0x0){const _0x48b709=this[_0x2fd472(0x147)](_0x5bc42a,_0x2fd472(0x1af));_0x48b709>0x0&&(_0x5bc42a[_0x2fd472(0x144)](_0x48b709),_0x442c4e=0x0);}return _0x442c4e;},VisuMZ[_0x582514(0x1b1)][_0x582514(0x172)]=Game_Action[_0x582514(0x1a4)][_0x582514(0x182)],Game_Action[_0x582514(0x1a4)][_0x582514(0x182)]=function(_0x31c97b){const _0x571687=_0x582514;let _0x23b6b8=VisuMZ[_0x571687(0x1b1)][_0x571687(0x172)][_0x571687(0x19e)](this,_0x31c97b);if(_0x31c97b[_0x571687(0x153)]||_0x31c97b[_0x571687(0x13e)])return _0x23b6b8;if(!this[_0x571687(0x13b)])return _0x23b6b8;if(_0x23b6b8<0x1){const _0x590256=this['getKeyByConsumeDefState'](_0x31c97b,_0x571687(0x189));_0x590256>0x0&&(_0x31c97b[_0x571687(0x144)](_0x590256),_0x23b6b8=0x1);}return _0x23b6b8;},VisuMZ[_0x582514(0x1b1)][_0x582514(0x166)]=Game_Action[_0x582514(0x1a4)]['apply'],Game_Action['prototype'][_0x582514(0x15a)]=function(_0x40dfe4){const _0x57140d=_0x582514;this['_cachedConsumeDefStateNull']=undefined,VisuMZ[_0x57140d(0x1b1)]['Game_Action_apply'][_0x57140d(0x19e)](this,_0x40dfe4);},VisuMZ[_0x582514(0x1b1)][_0x582514(0x18b)]=Game_Action[_0x582514(0x1a4)][_0x582514(0x151)],Game_Action[_0x582514(0x1a4)][_0x582514(0x151)]=function(_0x2f3bdc){const _0xbad180=_0x582514;if(this[_0xbad180(0x18e)]===!![])return 0x0;let _0x1542eb=VisuMZ['ConsumeDefStates'][_0xbad180(0x18b)][_0xbad180(0x19e)](this,_0x2f3bdc);if(_0x2f3bdc[_0xbad180(0x153)]||_0x2f3bdc[_0xbad180(0x13e)])return _0x1542eb;if(!this['_consumeDefStateInvoking'])return _0x1542eb;if(_0x1542eb>0x0){const _0x41ced2=this[_0xbad180(0x147)](_0x2f3bdc,_0xbad180(0x18c));if(_0x41ced2>0x0){if(_0xbad180(0x167)!==_0xbad180(0x19a))_0x2f3bdc[_0xbad180(0x144)](_0x41ced2),this['_cachedConsumeDefStateNull']=!![],_0x1542eb=0x0;else{const _0x4c8616=_0xdbf097(_0x2e4166['$1']);_0x4c8616!==_0x486608[_0x2643da][_0xbad180(0x13d)]&&(_0x15c7b7(_0xbad180(0x145)['format'](_0x430761,_0x4c8616)),_0x253b69[_0xbad180(0x16a)]());}}}return _0x1542eb;},Game_Action[_0x582514(0x1a4)][_0x582514(0x147)]=function(_0x2ea8d0,_0x1f2a0e){const _0xc2b735=_0x582514;if(!SceneManager['isSceneBattle']())return 0x0;if(!_0x2ea8d0)return 0x0;if(this['isGuard']())return 0x0;const _0x179a99=VisuMZ[_0xc2b735(0x1b1)][_0xc2b735(0x1a7)],_0x47975b=_0x2ea8d0[_0xc2b735(0x1b0)]();for(const _0x18182d of _0x47975b){if(!_0x18182d)continue;const _0x382243=_0x18182d['id'];if(_0x18182d[_0xc2b735(0x19c)][_0xc2b735(0x171)](_0x179a99[_0x1f2a0e])){if(_0xc2b735(0x137)!==_0xc2b735(0x137))_0x88c356[_0xc2b735(0x159)]('%1\x20cannot\x20be\x20used\x20as\x20a\x20Consumable\x20Defensive\x20State.\x0aOnly\x20one\x20Consumable\x20Defensive\x20State\x20notetag\x20effect\x20can\x20be\x20used\x20per\x20state.'[_0xc2b735(0x176)](_0x596dab[_0xc2b735(0x140)]));else{const _0xd3efa2=String(RegExp['$2']);if(this[_0xc2b735(0x158)](_0xd3efa2)){if('QPhyi'==='QPhyi')return _0x382243;else _0x464e40(_0xc2b735(0x145)[_0xc2b735(0x176)](_0x286d22,_0x5946cd)),_0x5aff90[_0xc2b735(0x16a)]();}}}}return 0x0;},Game_Action[_0x582514(0x1a4)][_0x582514(0x158)]=function(_0x3b15d6){const _0xb0df85=_0x582514;if(this['item']()[_0xb0df85(0x162)][_0xb0df85(0x1ad)]>0x0&&_0x3b15d6[_0xb0df85(0x171)](/(?:ELE|ELEMENT|ELEMENTS):[ ](.*)/i)){let _0x20d0ce=[];if(Imported[_0xb0df85(0x17b)])_0x20d0ce=this[_0xb0df85(0x188)]();else{if(this[_0xb0df85(0x1a9)]()[_0xb0df85(0x162)][_0xb0df85(0x178)]<0x0){const _0x3de754=this[_0xb0df85(0x139)]();_0x20d0ce=_0x3de754[_0xb0df85(0x174)]();}else _0x20d0ce=[this['item']()['damage'][_0xb0df85(0x178)]];}const _0x321a35=RegExp['$1'][_0xb0df85(0x18f)](',')[_0xb0df85(0x17d)](_0x4cba2f=>_0x4cba2f['trim']());for(const _0x17c7cf of _0x321a35){const _0x6928bd=/^\d+$/['test'](_0x17c7cf);if(_0x6928bd){if(_0x20d0ce[_0xb0df85(0x191)](Number(_0x17c7cf)))return!![];}else{const _0x58605c=DataManager[_0xb0df85(0x190)](_0x17c7cf);if(_0x20d0ce[_0xb0df85(0x191)](_0x58605c))return!![];}}return![];}if(this[_0xb0df85(0x149)]()&&_0x3b15d6['match'](/(?:SKILL TYPE|SKILL TYPES|STYPE|STYPES):[ ](.*)/i)){const _0x19ac22=RegExp['$1'][_0xb0df85(0x18f)](',')[_0xb0df85(0x17d)](_0xd8fdd1=>_0xd8fdd1[_0xb0df85(0x157)]()),_0x492c50=[];for(const _0x338585 of _0x19ac22){const _0x1b85ab=/^\d+$/[_0xb0df85(0x1a8)](_0x338585);if(_0x1b85ab){if(_0xb0df85(0x13f)!=='WZpEp'){let _0x102c63=this[_0xb0df85(0x148)]()[_0xb0df85(0x142)](_0x6acc35=>_0x6acc35&&this[_0xb0df85(0x170)](_0x6acc35['id']));return _0x102c63=_0x102c63['filter'](_0x3f41cd=>_0x38a33b[_0xb0df85(0x184)](_0x3f41cd)),_0x102c63;}else _0x492c50[_0xb0df85(0x175)](Number(_0x338585));}else{if('ESjUb'===_0xb0df85(0x1a0))_0x421929['consumeDefState'](_0x19efb4),_0x324b74=0x0;else{const _0x415a1c=DataManager[_0xb0df85(0x1b6)](_0x338585);if(_0x415a1c)_0x492c50['push'](_0x415a1c);}}}let _0x2e4b4e=[this[_0xb0df85(0x1a9)]()[_0xb0df85(0x15e)]];if(Imported[_0xb0df85(0x15b)]){if(_0xb0df85(0x163)!==_0xb0df85(0x163)){let _0x703e17=_0x18bff4(_0x558ed4['$1'])||0x1;if(_0x3ab412[_0xb0df85(0x19c)][_0xb0df85(0x171)](_0x3edd61[_0xb0df85(0x186)])){const _0x4a837=_0x45657a[_0xb0df85(0x192)](_0x703e17,_0x48f192(_0x18476b['$1']));_0x703e17+=_0xb6f74c(this[_0xb0df85(0x15d)](_0x4a4f31))||0x0,_0x703e17=_0x438e4b[_0xb0df85(0x1a6)](_0x703e17,_0x4a837);}this[_0xb0df85(0x13c)](_0x239dd8,_0x703e17);}else _0x2e4b4e=DataManager[_0xb0df85(0x165)](this[_0xb0df85(0x1a9)]());}if(_0x492c50['filter'](_0x557ebc=>_0x2e4b4e[_0xb0df85(0x191)](_0x557ebc))['length']>0x0){if(_0xb0df85(0x156)===_0xb0df85(0x156))return!![];else{const _0x416037=_0x57d157[_0xb0df85(0x190)](_0x3d64e1);if(_0x4b63fa['includes'](_0x416037))return!![];}}return![];}if(this[_0xb0df85(0x149)]()){if(_0xb0df85(0x15f)!==_0xb0df85(0x15f))_0x516b6e[_0xb0df85(0x144)](_0x49729d),_0x469dbc=0x1;else{if(this['isCertainHit']()&&_0x3b15d6[_0xb0df85(0x171)](/(?:CERTAIN|CERTAIN HIT|ALL) (?:SKILL|SKILLS|TYPE|TYPES|ACTION|ACTIONS)/i))return!![];else{if(this[_0xb0df85(0x187)]()&&_0x3b15d6[_0xb0df85(0x171)](/(?:PHYSICAL|PHYSICAL HIT|ALL) (?:SKILL|SKILLS|TYPE|TYPES|ACTION|ACTIONS)/i))return!![];else{if(this['isMagical']()&&_0x3b15d6['match'](/(?:MAGICAL|MAGICAL HIT|ALL) (?:SKILL|SKILLS|TYPE|TYPES|ACTION|ACTIONS)/i))return!![];}}}}else{if(this[_0xb0df85(0x1ba)]()){if(this[_0xb0df85(0x17a)]()&&_0x3b15d6[_0xb0df85(0x171)](/(?:CERTAIN|CERTAIN HIT|ALL) (?:ITEM|ITEMS|TYPE|TYPES|ACTION|ACTIONS)/i))return!![];else{if(this[_0xb0df85(0x187)]()&&_0x3b15d6[_0xb0df85(0x171)](/(?:PHYSICAL|PHYSICAL HIT|ALL) (?:ITEM|ITEMS|TYPE|TYPES|ACTION|ACTIONS)/i))return!![];else{if(this[_0xb0df85(0x183)]()&&_0x3b15d6[_0xb0df85(0x171)](/(?:MAGICAL|MAGICAL HIT|ALL) (?:ITEM|ITEMS|TYPE|TYPES|ACTION|ACTIONS)/i))return!![];}}}}return![];},Game_BattlerBase[_0x582514(0x1a4)]['consumableDefensiveStates']=function(){const _0x1a6e9c=_0x582514;let _0x214001=this[_0x1a6e9c(0x148)]()['filter'](_0x189d5a=>_0x189d5a&&this['isStateAffected'](_0x189d5a['id']));return _0x214001=_0x214001[_0x1a6e9c(0x142)](_0x26c944=>DataManager['isLegalConsumableDefensiveState'](_0x26c944)),_0x214001;},VisuMZ[_0x582514(0x1b1)][_0x582514(0x164)]=Game_Battler[_0x582514(0x1a4)][_0x582514(0x161)],Game_Battler[_0x582514(0x1a4)]['addState']=function(_0x2f0ec4){const _0x1dc9ec=_0x582514;VisuMZ[_0x1dc9ec(0x1b1)][_0x1dc9ec(0x164)]['call'](this,_0x2f0ec4);if(SceneManager[_0x1dc9ec(0x1a3)]()&&this[_0x1dc9ec(0x170)](_0x2f0ec4)){if(_0x1dc9ec(0x16f)===_0x1dc9ec(0x15c))return _0x34f197;else this[_0x1dc9ec(0x181)](_0x2f0ec4);}},Game_Battler[_0x582514(0x1a4)][_0x582514(0x144)]=function(_0x30e1d0){const _0x38db41=_0x582514;if(!this[_0x38db41(0x170)](_0x30e1d0))return;if(Imported[_0x38db41(0x15b)]){if(_0x38db41(0x17c)===_0x38db41(0x17c)){let _0x55cf93=Number(this[_0x38db41(0x15d)](_0x30e1d0))||0x0;_0x55cf93-=0x1;if(_0x55cf93>0x0){if(_0x38db41(0x1aa)!=='DESzh'){this[_0x38db41(0x13c)](_0x30e1d0,_0x55cf93);return;}else{const _0x81bd32=this['getKeyByConsumeDefState'](_0x4d3665,_0x38db41(0x18c));_0x81bd32>0x0&&(_0x1ff363['consumeDefState'](_0x81bd32),this[_0x38db41(0x18e)]=!![],_0x3f4c88=0x0);}}}else{if(_0x54468e[_0x38db41(0x191)](_0x2df807(_0x19aaae)))return!![];}}this[_0x38db41(0x1ac)](_0x30e1d0);},Game_Battler['prototype'][_0x582514(0x181)]=function(_0x1e394b){const _0x10ce03=_0x582514;if(!this[_0x10ce03(0x170)](_0x1e394b))return;if(!Imported['VisuMZ_1_SkillsStatesCore'])return;const _0x5acb1d=$dataStates[_0x1e394b];if(!_0x5acb1d)return;if(Imported['VisuMZ_3_AntiDmgBarriers']&&DataManager[_0x10ce03(0x179)]){if('uULBN'===_0x10ce03(0x1b9)){if(DataManager[_0x10ce03(0x179)](_0x5acb1d))return;}else{const _0x3396aa=/^\d+$/[_0x10ce03(0x1a8)](_0x284ff0);if(_0x3396aa){if(_0x547f89['includes'](_0x9f93ec(_0x165768)))return!![];}else{const _0x548134=_0x319df3['getElementIdWithName'](_0x47448a);if(_0xc00235[_0x10ce03(0x191)](_0x548134))return!![];}}}const _0x3ec19e=VisuMZ['ConsumeDefStates'][_0x10ce03(0x1a7)];if(_0x5acb1d[_0x10ce03(0x19c)][_0x10ce03(0x171)](_0x3ec19e[_0x10ce03(0x177)])&&DataManager[_0x10ce03(0x184)](_0x5acb1d)){let _0x4336f5=Number(RegExp['$1'])||0x1;if(_0x5acb1d[_0x10ce03(0x19c)][_0x10ce03(0x171)](_0x3ec19e[_0x10ce03(0x186)])){const _0x5026c0=Math[_0x10ce03(0x192)](_0x4336f5,Number(RegExp['$1']));_0x4336f5+=Number(this[_0x10ce03(0x15d)](_0x1e394b))||0x0,_0x4336f5=Math[_0x10ce03(0x1a6)](_0x4336f5,_0x5026c0);}this[_0x10ce03(0x13c)](_0x1e394b,_0x4336f5);}};