//=============================================================================
// VisuStella MZ - Battle Command - Talk
// VisuMZ_3_BattleCmdTalk.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_BattleCmdTalk = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BattleCmdTalk = VisuMZ.BattleCmdTalk || {};
VisuMZ.BattleCmdTalk.version = 1.02;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.02] [BattleCmdTalk]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Battle_Command_-_Talk_VisuStella_MZ
 * @base VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin allows actors to talk with enemies. When talking with an enemy,
 * a common event will run in place of the typical battle action, allow you,
 * the game dev, to have full control over how the conversation steers. A
 * variable tracker can be used to track how many times the player has started
 * up a conversation with that specific enemy to allow for more drawn out
 * talking if you, the game dev, so desires.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Adds the "Talk" command to the Actor Command Window, allowing the player
 *   to pick a target enemy to talk with.
 * * Enemies can offer different conversations through the usage of notetags to
 *   determine what Common Event is played for talking.
 * * A variable tracker is used to track the number of times the player has
 *   spoken to that specific enemy during the current battle and then stores
 *   that value to the specific variable.
 * * Includes Text Codes to quickly acquire the battle action's target, user,
 *   and action names.
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
 * * VisuMZ_1_BattleCore
 *
 * This plugin requires the above listed plugins to be installed inside your
 * game's Plugin Manager list in order to work. You cannot start your game with
 * this plugin enabled without the listed plugins.
 *
 * ------ Tier 3 ------
 *
 * This plugin is a Tier 3 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
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
 * === Enemy-Related Notetags ===
 * 
 * ---
 *
 * <Talk Common Event: x>
 *
 * - Used for: Enemy Notetags
 * - Determines the Common Event that will be ran when talking to this specific
 *   enemy.
 * - If this notetag is not used, the Common Event used will be whatever has
 *   been set up as default in the Plugin Parameters.
 * - Replace 'x' with a number representing the Common Event's ID to run.
 *
 * ---
 * 
 * === Talk-Related Notetags ===
 * 
 * ---
 *
 * <Battle Command Talk>
 *
 * - Used for: Actor, Class, Weapon, Armor, State Notetags
 * - Allows the affected actor to talk.
 * - This will bypass the default show Plugin Parameter.
 * - This does not bypass the leader-only Plugin Parameter.
 *
 * ---
 *
 * <No Battle Command Talk>
 *
 * - Used for: Actor, Class, Weapon, Armor, State Notetags
 * - Prevents the affected actor from being able to talk.
 * - This will bypass the default show Plugin Parameter.
 *
 * ---
 *
 * ============================================================================
 * Available Text Codes
 * ============================================================================
 *
 * The following are text codes that you may use with this plugin. 
 *
 * === Battle-Related Text Codes ===
 * 
 * ---
 *
 * ----------------------------   ---------------------------------------------
 * Text Code                      Effect (Battle Only)
 * ----------------------------   ---------------------------------------------
 * <Current Battle Target>        Replaces text code with the current target of
 *                                an action in battle.
 * <Current Battle User>          Replaces text code with the currently active
 *                                user in battle.
 * <Current Battle Action>        Replaces text code with the current battle
 *                                action's name with an icon in front.
 * <Current Battle Action Name>   Replaces text code with the current battle
 *                                action's name without an icon.
 * 
 * If there is no battle, no target, no user, or no action, then the text code
 * will just be replaced with no text.
 * 
 * These text codes are NOT recommended to be used inside of Help Descriptions.
 * They are best used with "Show Text" event commands.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * These are all of the settings required to control how the Talk Command works
 * in-battle. These settings cannot be ignored and should not be used as
 * default without any consideration.
 *
 * ---
 *
 * Default Talk Events
 * 
 *   Talk: Common Event:
 *   - Select a Common Event to refer to for default talking events.
 * 
 *   Variable Tracker:
 *   - Tracks the number of times the target enemy has been talked to.
 *   - Use 0 to not use this variable.
 *   - The first time you talk to an enemy will start with a value of 1.
 *
 * ---
 *
 * Accessibility
 * 
 *   Leader Only?:
 *   - Make the Talk Command available to the party leader only?
 * 
 *   Show Command?:
 *   - Show the Talk Command by default?
 *
 * ---
 *
 * Talk Command Settings
 * 
 *   Command Name:
 *   - What is the text displayed for the Talk Command?
 * 
 *   Icon Index:
 *   - What is the icon index used for the Talk Command?
 * 
 *   Help Description:
 *   - What is the help description associated with the Talk Command?
 * 
 *   Action Speed:
 *   - What action speed should the Talk Command have?
 *   - Positive is Faster.
 *   - Negative is slower.
 * 
 *   Message Lines:
 *   - What are the message lines displayed in the Battle Log?
 *   - %1 - User's name.
 *
 * ---
 *
 * Window_ActorCommand
 * 
 *   Auto Add?:
 *   - Automatically add the Talk Command after the Guard command?
 * 
 *   Hide Cost?:
 *   - For certain battle systems, hide the action cost of the Talk Command?
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
 * Version 1.02: September 14, 2023
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.01: October 28, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 *
 * Version 1.00 Official Release Date: November 3, 2021
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
 * @param BattleCmdTalk
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param TalkEvents
 * @text Default Talk Events
 * 
 * @param CommonEvent:num
 * @text Talk: Common Event
 * @parent TalkEvents
 * @type common_event
 * @desc Select a Common Event to refer to for default talking events.
 * @default 1
 * 
 * @param VariableTracker:num
 * @text Variable Tracker
 * @parent TalkEvents
 * @type variable
 * @desc Tracks the number of times the target enemy has been
 * talked to. Use 0 to not use this variable.
 * @default 0
 *
 * @param Access
 * @text Accessibility
 *
 * @param LeaderOnly:eval
 * @text Leader Only?
 * @parent Access
 * @type boolean
 * @on Leader Only
 * @off All Party Members
 * @desc Make the Talk Command available to the party leader only?
 * @default false
 *
 * @param TalkShow:eval
 * @text Show Command?
 * @parent Access
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the Talk Command by default?
 * @default true
 *
 * @param TalkCmd
 * @text Talk Command Settings
 *
 * @param Name:str
 * @text Command Name
 * @parent TalkCmd
 * @desc What is the text displayed for the Talk Command?
 * @default Talk
 *
 * @param IconIndex:num
 * @text Icon Index
 * @parent TalkCmd
 * @desc What is the icon index used for the Talk Command?
 * @default 4
 *
 * @param Help:json
 * @text Help Description
 * @parent TalkCmd
 * @desc What is the help description associated with the Talk Command?
 * @default "Talks to target enemy."
 *
 * @param ActionSpeed:num
 * @text Action Speed
 * @parent TalkCmd
 * @desc What action speed should the Talk Command have?
 * Positive is Faster. Negative is slower.
 * @default 0
 * 
 * @param Message
 * @text Message Lines
 * @parent TalkCmd
 *
 * @param Message1:str
 * @text Line 1
 * @parent Message
 * @desc What is the message line 1 displayed in the Battle Log?
 * %1 - User's name.
 * @default %1 talks to the enemy.
 *
 * @param Message2:str
 * @text Line 2
 * @parent Message
 * @desc What is the message line 2 displayed in the Battle Log?
 * %1 - User's name.
 * @default
 *
 * @param Window_ActorCommand
 *
 * @param AutoAdd:eval
 * @text Auto Add?
 * @parent Window_ActorCommand
 * @type boolean
 * @on Automatic
 * @off Manual
 * @desc Automatically add the Talk Command after the Guard command?
 * @default true
 *
 * @param HideCost:eval
 * @text Hide Cost?
 * @parent Window_ActorCommand
 * @type boolean
 * @on Hidden
 * @off Visible
 * @desc For certain battle systems, hide the action cost of the Talk Command?
 * @default false
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
//=============================================================================

const _0x3d9c76=_0x18f1;function _0x14fe(){const _0x665e59=['BattleCmdTalk','code','map','iconIndex','DJGMC','TalkShow','increaseTimesTalkedTo','applyGlobalBattleCommandTalk','setBattleCommandTalk','item','RegExp','parameters','applyGlobal','isBattleCommandTalk','length','jinRu','ActionSpeed','traitObjects','isEnemy','BATTLE_CMD_TALK_HIDE_ACTION_COST','317732vYnZDR','PYeEu','endActionBattleCommandTalk','TalkCommonEventID','12356410jEuLLa','description','Window_ActorCommand_makeCommandList','CommonEvent','isSceneBattle','removeBattleCommandTalk','IconIndex','onDatabaseLoaded','14364963xSjaUH','1778hHcThp','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','EFFECT_COMMON_EVENT','max','BATTLE_CMD_TALK_ICON','beJAC','isInputting','STR','eVKSh','AutoAdd','Settings','6201921EBErXd','8GPoJkv','setSkill','parse','BATTLE_CMD_TALK_MESSAGE_1','enemy','convertHardcodedEscapeReplacements','jMjzk','HideCost','some','battleTargetName','status','JSON','filter','BATTLE_CMD_TALK_DEFAULT_TALK_COMMON_EVENT','ConvertParams','call','setValue','Window_Base_convertHardcodedEscapeReplacements','259887tsrtgH','LrrQV','BATTLE_CMD_TALK_DESC','35nhdpyv','symbol','dataId','NUM','addBattleCommandTalk','_subject','Scene_Boot_onDatabaseLoaded','CanTalk','getTimesTalkedTo','push','Help','\x0a<ETB\x20Hide\x20Energy\x20Cost>','splice','format','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','_actor','canBattleCmdTalk','_list','prototype','BATTLE_CMD_TALK_VARIABLE_TRACKER','BATTLE_CMD_TALK_ACTION_SPEED','isSkill','Message2','singleSkill','effects','Gfdgn','BattleManager_endAction','CannotTalk','BATTLE_CMD_TALK_DEFAULT','match','BATTLE_CMD_TALK_AUTO_ADD','Name','Window_ActorCommand_addGuardCommand','commandStyle','replace','endAction','convertBattleCmdTalkReplacements','_target','battleUserName','Message1','BATTLE_CMD_TALK_LEADER_ONLY','VisuMZ_1_BattleCore','BATTLE_CMD_TALK_MESSAGE_2','exit','trim','BATTLE_CMD_TALK_TEXT','434VkZMUW','isActor','battleCommandTalkCommonEventID','rxvCT','subject','VariableTracker','toUpperCase','<Custom\x20Action\x20Sequence>\x0a<Cast\x20Animation:\x200>','Cbbbt','actor','EVAL','cDANV','Game_Action_applyGlobal','_targets','aPRhC','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','ARRAYJSON','addGuardCommand','94398ssWpmm','STRUCT','_battleCommandTalk_TimesTalkedTo','note','battleActionName','201IKPTHk','process_VisuMZ_BattleCmdTalk','performActionEndMembers','name','findTalkCommand','skillID','\x5cI[%1]%2'];_0x14fe=function(){return _0x665e59;};return _0x14fe();}function _0x18f1(_0x1e67b1,_0x35d983){const _0x14fea0=_0x14fe();return _0x18f1=function(_0x18f13b,_0x5a11b2){_0x18f13b=_0x18f13b-0x79;let _0x49e20a=_0x14fea0[_0x18f13b];return _0x49e20a;},_0x18f1(_0x1e67b1,_0x35d983);}(function(_0x2b8f7e,_0x39a717){const _0x5610fd=_0x18f1,_0x3b0584=_0x2b8f7e();while(!![]){try{const _0x59817f=-parseInt(_0x5610fd(0x101))/0x1*(-parseInt(_0x5610fd(0x9b))/0x2)+parseInt(_0x5610fd(0xb9))/0x3+parseInt(_0x5610fd(0x8e))/0x4*(parseInt(_0x5610fd(0xbc))/0x5)+-parseInt(_0x5610fd(0xfc))/0x6*(-parseInt(_0x5610fd(0xea))/0x7)+-parseInt(_0x5610fd(0xa7))/0x8*(parseInt(_0x5610fd(0x9a))/0x9)+parseInt(_0x5610fd(0x92))/0xa+-parseInt(_0x5610fd(0xa6))/0xb;if(_0x59817f===_0x39a717)break;else _0x3b0584['push'](_0x3b0584['shift']());}catch(_0x1b89b5){_0x3b0584['push'](_0x3b0584['shift']());}}}(_0x14fe,0xd5046));var label='BattleCmdTalk',tier=tier||0x0,dependencies=[_0x3d9c76(0xe5)],pluginData=$plugins[_0x3d9c76(0xb3)](function(_0x41f5a1){const _0x5b0511=_0x3d9c76;return _0x41f5a1[_0x5b0511(0xb1)]&&_0x41f5a1[_0x5b0511(0x93)]['includes']('['+label+']');})[0x0];VisuMZ[label][_0x3d9c76(0xa5)]=VisuMZ[label][_0x3d9c76(0xa5)]||{},VisuMZ['ConvertParams']=function(_0x31a924,_0x54dd39){const _0x1622bf=_0x3d9c76;for(const _0x192d16 in _0x54dd39){if(_0x1622bf(0xf5)!==_0x1622bf(0xf5))this[_0x1622bf(0xfe)]=this[_0x1622bf(0xfe)]||0x0,this['_battleCommandTalk_TimesTalkedTo']++;else{if(_0x192d16[_0x1622bf(0xd9)](/(.*):(.*)/i)){const _0x13b856=String(RegExp['$1']),_0x1f8d8c=String(RegExp['$2'])[_0x1622bf(0xf0)]()[_0x1622bf(0xe8)]();let _0xc19cf6,_0x18c624,_0x320bf6;switch(_0x1f8d8c){case _0x1622bf(0xbf):_0xc19cf6=_0x54dd39[_0x192d16]!==''?Number(_0x54dd39[_0x192d16]):0x0;break;case'ARRAYNUM':_0x18c624=_0x54dd39[_0x192d16]!==''?JSON['parse'](_0x54dd39[_0x192d16]):[],_0xc19cf6=_0x18c624['map'](_0x5ef64e=>Number(_0x5ef64e));break;case _0x1622bf(0xf4):_0xc19cf6=_0x54dd39[_0x192d16]!==''?eval(_0x54dd39[_0x192d16]):null;break;case'ARRAYEVAL':_0x18c624=_0x54dd39[_0x192d16]!==''?JSON['parse'](_0x54dd39[_0x192d16]):[],_0xc19cf6=_0x18c624[_0x1622bf(0x7c)](_0x5b65e9=>eval(_0x5b65e9));break;case _0x1622bf(0xb2):_0xc19cf6=_0x54dd39[_0x192d16]!==''?JSON[_0x1622bf(0xa9)](_0x54dd39[_0x192d16]):'';break;case _0x1622bf(0xfa):_0x18c624=_0x54dd39[_0x192d16]!==''?JSON[_0x1622bf(0xa9)](_0x54dd39[_0x192d16]):[],_0xc19cf6=_0x18c624['map'](_0x3d39c5=>JSON[_0x1622bf(0xa9)](_0x3d39c5));break;case'FUNC':_0xc19cf6=_0x54dd39[_0x192d16]!==''?new Function(JSON[_0x1622bf(0xa9)](_0x54dd39[_0x192d16])):new Function('return\x200');break;case'ARRAYFUNC':_0x18c624=_0x54dd39[_0x192d16]!==''?JSON['parse'](_0x54dd39[_0x192d16]):[],_0xc19cf6=_0x18c624['map'](_0x1eff60=>new Function(JSON[_0x1622bf(0xa9)](_0x1eff60)));break;case _0x1622bf(0xa2):_0xc19cf6=_0x54dd39[_0x192d16]!==''?String(_0x54dd39[_0x192d16]):'';break;case'ARRAYSTR':_0x18c624=_0x54dd39[_0x192d16]!==''?JSON[_0x1622bf(0xa9)](_0x54dd39[_0x192d16]):[],_0xc19cf6=_0x18c624[_0x1622bf(0x7c)](_0x552d9b=>String(_0x552d9b));break;case _0x1622bf(0xfd):_0x320bf6=_0x54dd39[_0x192d16]!==''?JSON[_0x1622bf(0xa9)](_0x54dd39[_0x192d16]):{},_0xc19cf6=VisuMZ['ConvertParams']({},_0x320bf6);break;case'ARRAYSTRUCT':_0x18c624=_0x54dd39[_0x192d16]!==''?JSON[_0x1622bf(0xa9)](_0x54dd39[_0x192d16]):[],_0xc19cf6=_0x18c624[_0x1622bf(0x7c)](_0x582cb0=>VisuMZ[_0x1622bf(0xb5)]({},JSON[_0x1622bf(0xa9)](_0x582cb0)));break;default:continue;}_0x31a924[_0x13b856]=_0xc19cf6;}}}return _0x31a924;},(_0x411816=>{const _0x5508b8=_0x3d9c76,_0x396d5b=_0x411816[_0x5508b8(0x104)];for(const _0x48b2d3 of dependencies){if(!Imported[_0x48b2d3]){if(_0x5508b8(0xa3)!=='eVKSh'){if(!_0x12010f['isSceneBattle']())return'';if(_0x5859cb[_0x5508b8(0xe1)])return _0x19dc2d[_0x5508b8(0xe1)]['name']();if(_0x18b779[_0x5508b8(0xf7)][0x0])return _0x547442['_targets'][0x0][_0x5508b8(0x104)]();return'';}else{alert(_0x5508b8(0x9c)['format'](_0x396d5b,_0x48b2d3)),SceneManager[_0x5508b8(0xe7)]();break;}}}const _0x4ef63e=_0x411816[_0x5508b8(0x93)];if(_0x4ef63e['match'](/\[Version[ ](.*?)\]/i)){const _0x17a0c3=Number(RegExp['$1']);_0x17a0c3!==VisuMZ[label]['version']&&(alert(_0x5508b8(0xca)[_0x5508b8(0xc9)](_0x396d5b,_0x17a0c3)),SceneManager[_0x5508b8(0xe7)]());}if(_0x4ef63e['match'](/\[Tier[ ](\d+)\]/i)){const _0x413394=Number(RegExp['$1']);if(_0x413394<tier)alert(_0x5508b8(0xf9)[_0x5508b8(0xc9)](_0x396d5b,_0x413394,tier)),SceneManager[_0x5508b8(0xe7)]();else{if(_0x5508b8(0xf8)!==_0x5508b8(0xf8))return _0x36767e(_0x32f1c0['$1'])||_0x5afdf1;else tier=Math['max'](_0x413394,tier);}}VisuMZ[_0x5508b8(0xb5)](VisuMZ[label][_0x5508b8(0xa5)],_0x411816[_0x5508b8(0x85)]);})(pluginData),VisuMZ['BattleCmdTalk'][_0x3d9c76(0x84)]={'CanTalk':/<(?:BATTLE TALK|BATTLE COMMAND TALK)>/i,'CannotTalk':/<NO (?:BATTLE TALK|BATTLE COMMAND TALK)>/i,'TalkCommonEventID':/<TALK (?:EVENT|COMMONEVENT|COMMON EVENT):[ ](\d+)>/i},VisuMZ['BattleCmdTalk'][_0x3d9c76(0xc2)]=Scene_Boot[_0x3d9c76(0xce)][_0x3d9c76(0x99)],Scene_Boot[_0x3d9c76(0xce)][_0x3d9c76(0x99)]=function(){const _0x29cab3=_0x3d9c76;VisuMZ[_0x29cab3(0x7a)][_0x29cab3(0xc2)]['call'](this),this[_0x29cab3(0x102)]();},Scene_Boot[_0x3d9c76(0xce)][_0x3d9c76(0x102)]=function(){const _0x555950=_0x3d9c76,_0x38d30a=$dataSkills[_0x555950(0x88)],_0x5e929e={'id':_0x38d30a,'animationId':0x0,'damage':{'critical':![],'elementId':0x0,'formula':'0','type':0x0,'variance':0x14},'description':Game_Action[_0x555950(0xbb)],'effects':[{'code':0x2c,'dataId':Game_Enemy[_0x555950(0xb4)],'value1':0x1,'value2':0x0}],'hitType':0x0,'iconIndex':Game_Action[_0x555950(0x9f)],'message1':Game_Action[_0x555950(0xaa)],'message2':Game_Action['BATTLE_CMD_TALK_MESSAGE_2'],'mpCost':0x0,'name':Game_Action[_0x555950(0xe9)],'note':_0x555950(0xf1),'occasion':0x1,'repeats':0x1,'requiredWtypeId1':0x0,'requiredWtypeId2':0x0,'scope':0x1,'speed':Game_Action[_0x555950(0xd0)],'stypeId':0x0,'successRate':0x64,'tpCost':0x0,'tpGain':0x0,'messageType':0x1};if(Window_ActorCommand[_0x555950(0x8d)]){if(_0x555950(0xed)!==_0x555950(0xd5))_0x5e929e[_0x555950(0xff)]+='\x0a<FTB\x20Hide\x20Action\x20Cost>',_0x5e929e[_0x555950(0xff)]+=_0x555950(0xc7),_0x5e929e[_0x555950(0xff)]+='\x0a<PTB\x20Hide\x20Press\x20Cost>';else{const _0x58a12b=this[_0x555950(0x105)]();this[_0x555950(0xcd)][_0x555950(0xc8)](_0x58a12b,0x1);}}$dataSkills[_0x555950(0xc5)](_0x5e929e),VisuMZ[_0x555950(0x7a)][_0x555950(0x106)]=_0x38d30a;},VisuMZ[_0x3d9c76(0x7a)][_0x3d9c76(0xd6)]=BattleManager[_0x3d9c76(0xdf)],BattleManager[_0x3d9c76(0xdf)]=function(){const _0x19a002=_0x3d9c76;this[_0x19a002(0x90)](),VisuMZ[_0x19a002(0x7a)][_0x19a002(0xd6)][_0x19a002(0xb6)](this);},BattleManager[_0x3d9c76(0x90)]=function(){const _0x5356fd=_0x3d9c76,_0x4f378d=this['_action'];if(!_0x4f378d)return;if(!_0x4f378d[_0x5356fd(0x87)]())return;if(!this[_0x5356fd(0xc1)])return;this[_0x5356fd(0xc1)][_0x5356fd(0x103)]();},Game_Action[_0x3d9c76(0xe9)]=VisuMZ['BattleCmdTalk'][_0x3d9c76(0xa5)][_0x3d9c76(0xdb)],Game_Action['BATTLE_CMD_TALK_ICON']=VisuMZ[_0x3d9c76(0x7a)][_0x3d9c76(0xa5)][_0x3d9c76(0x98)],Game_Action[_0x3d9c76(0xbb)]=VisuMZ[_0x3d9c76(0x7a)][_0x3d9c76(0xa5)][_0x3d9c76(0xc6)],Game_Action[_0x3d9c76(0xd0)]=VisuMZ[_0x3d9c76(0x7a)][_0x3d9c76(0xa5)][_0x3d9c76(0x8a)],Game_Action[_0x3d9c76(0xaa)]=VisuMZ[_0x3d9c76(0x7a)][_0x3d9c76(0xa5)][_0x3d9c76(0xe3)],Game_Action[_0x3d9c76(0xe6)]=VisuMZ['BattleCmdTalk']['Settings'][_0x3d9c76(0xd2)],Game_Action[_0x3d9c76(0xcf)]=VisuMZ[_0x3d9c76(0x7a)][_0x3d9c76(0xa5)][_0x3d9c76(0xef)],Game_Action[_0x3d9c76(0xce)][_0x3d9c76(0x82)]=function(){const _0x2d0f5d=_0x3d9c76;this[_0x2d0f5d(0xa8)](VisuMZ[_0x2d0f5d(0x7a)][_0x2d0f5d(0x106)]);},Game_Action[_0x3d9c76(0xce)][_0x3d9c76(0x87)]=function(){const _0x1f5dcd=_0x3d9c76;return this[_0x1f5dcd(0xd1)]()&&this[_0x1f5dcd(0x83)]()&&this['item']()['id']===VisuMZ[_0x1f5dcd(0x7a)]['skillID'];},VisuMZ['BattleCmdTalk'][_0x3d9c76(0xf6)]=Game_Action[_0x3d9c76(0xce)]['applyGlobal'],Game_Action['prototype'][_0x3d9c76(0x86)]=function(){const _0x15722c=_0x3d9c76;this[_0x15722c(0x81)](),VisuMZ[_0x15722c(0x7a)][_0x15722c(0xf6)][_0x15722c(0xb6)](this);},Game_Action['prototype'][_0x3d9c76(0x81)]=function(){const _0x3ebb6f=_0x3d9c76;if(!this['isBattleCommandTalk']())return;if(!this[_0x3ebb6f(0xee)]())return;if(!this['subject']()[_0x3ebb6f(0xeb)]())return;if(!SceneManager[_0x3ebb6f(0x96)]())return;const _0x47e6b3=BattleManager[_0x3ebb6f(0xf7)][0x0];if(!_0x47e6b3)return;if(!_0x47e6b3[_0x3ebb6f(0x8c)]())return;const _0x4570a4=_0x47e6b3[_0x3ebb6f(0xec)]();for(const _0x20f750 of this[_0x3ebb6f(0x83)]()['effects']){if(_0x3ebb6f(0x89)!=='jinRu')return!![];else _0x20f750[_0x3ebb6f(0x7b)]===Game_Action[_0x3ebb6f(0x9d)]&&(_0x20f750[_0x3ebb6f(0xbe)]=_0x4570a4);}_0x47e6b3[_0x3ebb6f(0x80)]();const _0x173324=Game_Action[_0x3ebb6f(0xcf)];if(_0x173324>0x0){if(_0x3ebb6f(0xa0)!==_0x3ebb6f(0xad)){const _0x5d2442=_0x47e6b3['getTimesTalkedTo']();$gameVariables[_0x3ebb6f(0xb7)](_0x173324,_0x5d2442);}else{if(!this['isBattleCommandTalk']())return;if(!this['subject']())return;if(!this[_0x3ebb6f(0xee)]()[_0x3ebb6f(0xeb)]())return;if(!_0x3b05e2[_0x3ebb6f(0x96)]())return;const _0xa571de=_0xd6ded1[_0x3ebb6f(0xf7)][0x0];if(!_0xa571de)return;if(!_0xa571de[_0x3ebb6f(0x8c)]())return;const _0x29433e=_0xa571de['battleCommandTalkCommonEventID']();for(const _0x16b806 of this['item']()[_0x3ebb6f(0xd4)]){_0x16b806['code']===_0x35b9f8[_0x3ebb6f(0x9d)]&&(_0x16b806['dataId']=_0x29433e);}_0xa571de[_0x3ebb6f(0x80)]();const _0x9a0cba=_0x58d476['BATTLE_CMD_TALK_VARIABLE_TRACKER'];if(_0x9a0cba>0x0){const _0x10ee95=_0xa571de[_0x3ebb6f(0xc4)]();_0x2ee52e[_0x3ebb6f(0xb7)](_0x9a0cba,_0x10ee95);}}}},Game_Actor[_0x3d9c76(0xe4)]=VisuMZ[_0x3d9c76(0x7a)][_0x3d9c76(0xa5)]['LeaderOnly'],Game_Actor[_0x3d9c76(0xd8)]=VisuMZ[_0x3d9c76(0x7a)][_0x3d9c76(0xa5)][_0x3d9c76(0x7f)],Game_Actor[_0x3d9c76(0xce)][_0x3d9c76(0xcc)]=function(){const _0x305c3c=_0x3d9c76;if(Game_Actor['BATTLE_CMD_TALK_LEADER_ONLY'])return this===$gameParty['leader']();const _0x27d097=VisuMZ[_0x305c3c(0x7a)]['RegExp'],_0x22e4c5=this[_0x305c3c(0x8b)]();if(_0x22e4c5['some'](_0x2c63cb=>_0x2c63cb&&_0x2c63cb[_0x305c3c(0xff)][_0x305c3c(0xd9)](_0x27d097[_0x305c3c(0xd7)])))return![];else{if(_0x22e4c5[_0x305c3c(0xaf)](_0x3d3647=>_0x3d3647&&_0x3d3647[_0x305c3c(0xff)][_0x305c3c(0xd9)](_0x27d097[_0x305c3c(0xc3)])))return!![];}return Game_Actor[_0x305c3c(0xd8)];},Game_Actor[_0x3d9c76(0xce)]['isBattleCmdTalkEnabled']=function(){return!![];},Game_Enemy[_0x3d9c76(0xb4)]=VisuMZ[_0x3d9c76(0x7a)][_0x3d9c76(0xa5)][_0x3d9c76(0x95)],Game_Enemy[_0x3d9c76(0xce)][_0x3d9c76(0xec)]=function(){const _0x5190eb=_0x3d9c76,_0x4f716f=VisuMZ[_0x5190eb(0x7a)]['RegExp'],_0x59264d=(this[_0x5190eb(0xab)]()?this[_0x5190eb(0xab)]()[_0x5190eb(0xff)]:'')||'',_0x4a0486=Game_Enemy[_0x5190eb(0xb4)];if(_0x59264d[_0x5190eb(0xd9)](_0x4f716f[_0x5190eb(0x91)])){if(_0x5190eb(0xba)!==_0x5190eb(0x8f))return Number(RegExp['$1'])||_0x4a0486;else _0x4cd986=_0x5836ba[_0x5190eb(0x9e)](_0x3c9df6,_0x4d5a6b);}else return _0x4a0486;},Game_Enemy[_0x3d9c76(0xce)][_0x3d9c76(0xc4)]=function(){const _0x719f16=_0x3d9c76;return this[_0x719f16(0xfe)]=this[_0x719f16(0xfe)]||0x0,this['_battleCommandTalk_TimesTalkedTo'];},Game_Enemy[_0x3d9c76(0xce)][_0x3d9c76(0x80)]=function(){const _0x306b33=_0x3d9c76;this[_0x306b33(0xfe)]=this[_0x306b33(0xfe)]||0x0,this['_battleCommandTalk_TimesTalkedTo']++;},VisuMZ['BattleCmdTalk'][_0x3d9c76(0xb8)]=Window_Base[_0x3d9c76(0xce)][_0x3d9c76(0xac)],Window_Base[_0x3d9c76(0xce)]['convertHardcodedEscapeReplacements']=function(_0x100048){const _0x1d8205=_0x3d9c76;return _0x100048=this[_0x1d8205(0xe0)](_0x100048),_0x100048=VisuMZ[_0x1d8205(0x7a)][_0x1d8205(0xb8)]['call'](this,_0x100048),_0x100048;},Window_Base['prototype'][_0x3d9c76(0xe0)]=function(_0x13a453){const _0x22e377=_0x3d9c76;return _0x13a453=_0x13a453['replace'](/\<(?:BATTLE|CURRENT BATTLE) TARGET\>/gi,(_0x4945de,_0x28cc3c)=>this['battleTargetName']()),_0x13a453=_0x13a453[_0x22e377(0xde)](/\<(?:BATTLE|CURRENT BATTLE) (?:USER|SUBJECT)\>/gi,(_0x3e329d,_0x35394d)=>this['battleUserName']()),_0x13a453=_0x13a453[_0x22e377(0xde)](/\<(?:BATTLE|CURRENT BATTLE) (?:ITEM|SKILL|ACTION)\>/gi,(_0xeccab0,_0x28dd0f)=>this[_0x22e377(0x100)](!![])),_0x13a453=_0x13a453[_0x22e377(0xde)](/\<(?:BATTLE|CURRENT BATTLE) (?:ITEM|SKILL|ACTION) NAME\>/gi,(_0x4e8485,_0x428c51)=>this['battleActionName'](![])),_0x13a453;},Window_Base['prototype'][_0x3d9c76(0xb0)]=function(){const _0x21f564=_0x3d9c76;if(!SceneManager[_0x21f564(0x96)]())return'';if(BattleManager[_0x21f564(0xe1)])return BattleManager[_0x21f564(0xe1)]['name']();if(BattleManager['_targets'][0x0])return BattleManager['_targets'][0x0][_0x21f564(0x104)]();return'';},Window_Base[_0x3d9c76(0xce)][_0x3d9c76(0xe2)]=function(){const _0x2d7880=_0x3d9c76;if(!SceneManager[_0x2d7880(0x96)]())return'';let _0x252496=null;return _0x252496=BattleManager[_0x2d7880(0xc1)],!_0x252496&&BattleManager[_0x2d7880(0xa1)]()&&(_0x252496=BattleManager[_0x2d7880(0xf3)]()),_0x252496?_0x252496[_0x2d7880(0x104)]():'';},Window_Base[_0x3d9c76(0xce)]['battleActionName']=function(_0x10d3ec){const _0x3f22e3=_0x3d9c76;if(!SceneManager[_0x3f22e3(0x96)]())return'';let _0x303f0b=BattleManager['_action']||null;!_0x303f0b&&BattleManager[_0x3f22e3(0xa1)]()&&(_0x303f0b=BattleManager['inputtingAction']());if(_0x303f0b&&_0x303f0b[_0x3f22e3(0x83)]()){let _0x3c4f65='';if(_0x10d3ec)_0x3c4f65+='\x1bI[%1]'[_0x3f22e3(0xc9)](_0x303f0b['item']()[_0x3f22e3(0x7d)]);return _0x3c4f65+=_0x303f0b[_0x3f22e3(0x83)]()[_0x3f22e3(0x104)],_0x3c4f65;}return'';},Window_ActorCommand['BATTLE_CMD_TALK_AUTO_ADD']=VisuMZ[_0x3d9c76(0x7a)][_0x3d9c76(0xa5)][_0x3d9c76(0xa4)],Window_ActorCommand[_0x3d9c76(0x8d)]=VisuMZ[_0x3d9c76(0x7a)][_0x3d9c76(0xa5)][_0x3d9c76(0xae)],Window_ActorCommand[_0x3d9c76(0xce)][_0x3d9c76(0x105)]=function(){const _0x3c3002=_0x3d9c76;return this['_list']['findIndex'](_0x1492e0=>_0x1492e0[_0x3c3002(0xbd)]==='singleSkill'&&_0x1492e0['ext']===VisuMZ[_0x3c3002(0x7a)][_0x3c3002(0x106)]);},VisuMZ[_0x3d9c76(0x7a)][_0x3d9c76(0x94)]=Window_ActorCommand[_0x3d9c76(0xce)]['makeCommandList'],Window_ActorCommand[_0x3d9c76(0xce)]['makeCommandList']=function(){const _0x55e08a=_0x3d9c76;VisuMZ[_0x55e08a(0x7a)][_0x55e08a(0x94)][_0x55e08a(0xb6)](this);if(!this[_0x55e08a(0xcb)])return;if(!Window_ActorCommand[_0x55e08a(0xda)])return;if(!this[_0x55e08a(0xcb)][_0x55e08a(0xcc)]())return;if(this[_0x55e08a(0x105)]()>=0x0)return;this[_0x55e08a(0xc0)]();},VisuMZ[_0x3d9c76(0x7a)]['Window_ActorCommand_addGuardCommand']=Window_ActorCommand[_0x3d9c76(0xce)][_0x3d9c76(0xfb)],Window_ActorCommand['prototype'][_0x3d9c76(0xfb)]=function(){const _0xfe126f=_0x3d9c76;VisuMZ[_0xfe126f(0x7a)][_0xfe126f(0xdc)][_0xfe126f(0xb6)](this);if(!this['_actor'])return;if(!Window_ActorCommand[_0xfe126f(0xda)])return;if(!this[_0xfe126f(0xcb)][_0xfe126f(0xcc)]())return;if(this[_0xfe126f(0x105)]()>=0x0)return;this[_0xfe126f(0xc0)]();},Window_ActorCommand[_0x3d9c76(0xce)][_0x3d9c76(0xc0)]=function(){const _0x43d25f=_0x3d9c76;if(this['findTalkCommand']()>=0x0){if(_0x43d25f(0xf2)===_0x43d25f(0x7e)){const _0x208291=_0x4fa9cb(_0x3a04d1['$1']);_0x208291<_0x17b058?(_0x1e5ae8(_0x43d25f(0xf9)['format'](_0x1e96d8,_0x208291,_0x5c6f0d)),_0x51ce1d['exit']()):_0x301ac5=_0x17fb12[_0x43d25f(0x9e)](_0x208291,_0x4abd14);}else this[_0x43d25f(0x97)]();}if(!this[_0x43d25f(0xcb)][_0x43d25f(0xcc)]())return;const _0x1c4fa0=this[_0x43d25f(0xdd)](),_0x15957f=Game_Action[_0x43d25f(0xe9)],_0x41a678=Game_Action['BATTLE_CMD_TALK_ICON'],_0x16d7e9=_0x1c4fa0==='text'?_0x15957f:_0x43d25f(0x79)[_0x43d25f(0xc9)](_0x41a678,_0x15957f),_0xf8e27b=VisuMZ[_0x43d25f(0x7a)][_0x43d25f(0x106)];this['addCommand'](_0x16d7e9,_0x43d25f(0xd3),!![],_0xf8e27b);},Window_ActorCommand[_0x3d9c76(0xce)][_0x3d9c76(0x97)]=function(){const _0x4f10c5=_0x3d9c76;while(this[_0x4f10c5(0x105)]()>=0x0){const _0x5d7e77=this[_0x4f10c5(0x105)]();this['_list']['splice'](_0x5d7e77,0x1);}};