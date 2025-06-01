//=============================================================================
// RPG Maker MZ - Local Map Variables and Switches
//=============================================================================

/*:
 * @target MZ
 * @plugindesc System to manage local map variables and switches.
 * @author Vitor Fabre Eltermann
 * 
 * @param LocalMapVariablesStart
 * @text Local Map Variables Start
 * @desc The start index for local map variables.
 * @type number
 * @default 0
 * 
 * @param LocalMapVariablesEnd
 * @text Local Map Variables End
 * @desc The end index for local map variables.
 * @type number
 * @default 0
 * 
 * @param LocalMapSwitchesStart
 * @text Local Map Switches Start
 * @desc The start index for local map switches.
 * @type number
 * @default 0
 * 
 * @param LocalMapSwitchesEnd
 * @text Local Map Switches End
 * @desc The end index for local map switches.
 * @type number
 * @default 0
 *
 * @help
 * This plugin allows you to manage local map variables and switches
 * defining a range for their indices.
 * 
 * License: MIT
 * Credit appreciated if you modify this code: Vitor Fabre Eltermann
 * Copyright (c) 2025 Vitor Fabre Eltermann
 * See LICENSE file for full license text.
 *
 */

/*:pt
 * @target MZ
 * @plugindesc Sistema para gerenciar variáveis e switches locais do mapa.
 * @author Vitor Fabre Eltermann
 * 
 * @param LocalMapVariablesStart
 * @text Início das Variáveis Locais do Mapa
 * @desc O índice inicial para variáveis locais do mapa.
 * @type number
 * @default 0
 * 
 * @param LocalMapVariablesEnd
 * @text Fim das Variáveis Locais do Mapa
 * @desc O índice final para variáveis locais do mapa.
 * @type number
 * @default 0
 * 
 * @param LocalMapSwitchesStart
 * @text Início dos Switches Locais do Mapa
 * @desc O índice inicial para switches locais do mapa.
 * @type number
 * @default 0
 * 
 * @param LocalMapSwitchesEnd
 * @text Fim dos Switches Locais do Mapa
 * @desc O índice final para switches locais do mapa.
 * @type number
 * @default 0
 * 
 * @help
 * Este plugin permite gerenciar variáveis e switches locais do mapa
 * definindo um intervalo para seus índices.
 * 
 * Licença: MIT
 * Crédito apreciado se você modificar este código: Vitor Fabre Eltermann
 * Copyright (c) 2025 Vitor Fabre Eltermann
 * Veja o arquivo LICENSE para o texto completo da licença.
 *
 */

(() => {
    const pluginName = "VFEPlugins_LocalMapVariablesAndSwitches";
    const parameters = PluginManager.parameters(pluginName);

    const localMapVariablesStart = Number(parameters["LocalMapVariablesStart"] || 0);
    const localMapVariablesEnd = Number(parameters["LocalMapVariablesEnd"] || 0);
    const localMapSwitchesStart = Number(parameters["LocalMapSwitchesStart"] || 0);
    const localMapSwitchesEnd = Number(parameters["LocalMapSwitchesEnd"] || 0);

    //=============================================================================
    // Game_Variables
    //=============================================================================
    Game_Variables.prototype.clear = function() {
        this._data = [];
        for (let i = localMapVariablesStart; i <= localMapVariablesEnd; i++) {
            this._data[i] = [];
        }
    };

    Game_Variables.prototype.value = function(variableId) {
        return variableId >= localMapVariablesStart && variableId <= localMapVariablesEnd ?
            this._data[variableId][$gameMap.mapId()] || 0 :
            this._data[variableId] || 0;
    };

    Game_Variables.prototype.setValue = function(variableId, value) {
        if (variableId > 0 && variableId < $dataSystem.variables.length) {
            if (typeof value === "number") {
                value = Math.floor(value);
            }
            if (variableId >= localMapSwitchesStart && variableId <= localMapSwitchesEnd) {
                this._data[variableId][$gameMap.mapId()] = value;
            } else {
                this._data[variableId] = value;
            }
            this.onChange();
        }
    };

    //=============================================================================
    // Game_Switches
    //=============================================================================
    Game_Switches.prototype.clear = function() {
        this._data = [];
        for (let i = localMapSwitchesStart; i <= localMapSwitchesEnd; i++) {
            this._data[i] = [];
        }
    };

    Game_Switches.prototype.value = function(switchId) {
        return switchId >= localMapSwitchesStart && switchId <= localMapSwitchesEnd ?
            !!this._data[switchId][$gameMap.mapId()] :
            !!this._data[switchId];
    };

    Game_Switches.prototype.setValue = function(switchId, value) {
        if (switchId > 0 && switchId < $dataSystem.switches.length) {
            if (switchId >= localMapSwitchesStart && switchId <= localMapSwitchesEnd) {
                this._data[switchId][$gameMap.mapId()] = value;
            } else {
                this._data[switchId] = value;
            }
            this.onChange();
        }
    };
})();