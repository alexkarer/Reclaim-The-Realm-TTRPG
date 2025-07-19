import RtRBaseHandlebarsActorSheet from './base-handlebars-actor-sheet.mjs';

const { api, ux } = foundry.applications;

/**
 * @extends {RtRBaseHandlebarsActorSheet}
 */
export class RtRCharacterSheet extends RtRBaseHandlebarsActorSheet {

    /** @override */
    static DEFAULT_OPTIONS = {
        ...super.DEFAULT_OPTIONS,
        actions: {
            ...super.DEFAULT_OPTIONS.actions,
            increaseStamina: this._onIncreaseStamina,
            decreaseStamina: this._onDecreaseStamina,
            increaseArcana: this._onIncreaseArcana,
            decreaseArcana: this._onDecreaseArcana,
            addXp: this._onAddXP,

            setClassAttribute: this._onSetClassAttribute,
            unSetClassAttribute: this._onUnSetClassAttribute,
            resetAttributes: this._onResetAttributes,
            increaseAttribute: this._onIncreaseAttribute,

            resetSkillPoints: this._onResetSkillRanks,
            setAsClassSkill: this._onSetAsClassSKill,
            unSetAsClassSkill: this._unSetAsClassSkill,
            increaseSkillRank: this._onIncreaseSkillRank,
            decreaseSkillRank: this._onDecreaseSkillRank,

            shortRestHpRecovery: this._onShortRestHpRecovery,
            shortRestArcanaRecovery: this._onSortRestArcanaRecovery,
            shortRestExhaustionRecovery: this._onShortRestExhaustionRecovery,
            longRestRecovery: this._onLongRestRecovery,

            unlockSkillsEdit: this._onUnlockSkillsEdit,
            lockSkillsEdit: this._onLockSkillsEdit,
            unlockDataEdit: this._onUnlockDataEdit,
            lockDataEdit: this._onLockDataEdit,

            attributeTest: this._attributeTest,
            skillTest: this._skillTest,
            saveTest: this._saveTest,
            meleeMartialAttack: this._meleeMartialAttack,
            rangedMartialAttack: this._rangedMartialAttack,
            meleeSpellAttack: this._meleeSpellAttack,
            rangedSpellAttack: this._rangedSpellAttack,
            castSpell: this._castSpell
        }
    };

    /** @override */
    static PARTS = {
        ...super.PARTS,
        characteroverview: {
            template: 'systems/reclaim-the-realm/templates/actor/character-overview.hbs',
        },
        data: {
            template: 'systems/reclaim-the-realm/templates/actor/data.hbs',
        },
        equipment: {
            template: 'systems/reclaim-the-realm/templates/actor/equipment.hbs',
        },
        abilities: {
            template: 'systems/reclaim-the-realm/templates/actor/abilities.hbs',
        },
        effects: {
            template: 'systems/reclaim-the-realm/templates/actor/effects.hbs',
        },
        skills: {
            template: 'systems/reclaim-the-realm/templates/actor/skills.hbs',
        },
        perks: {
            template: 'systems/reclaim-the-realm/templates/actor/perks.hbs'
        }
    };

    /** @override */
    _configureRenderOptions(options) {
        super._configureRenderOptions(options);
        options.parts.push('characteroverview', 'data', 'perks', 'skills', 'equipment', 'abilities', 'effects');
    }

    /** @override */
    async _prepareContext(options) {
        const context = super.getBaseContext();
        context.tabs = this._getTabs(options.parts);

        this._prepareItems(context);

        return context;
    }

    /**
     * Generates the data for the generic tab navigation template
     * @param {string[]} parts An array of named template parts to render
     * @returns {Record<string, Partial<ApplicationTab>>}
     * @protected
     */
    _getTabs(parts) {
        // If you have sub-tabs this is necessary to change
        const tabGroup = 'primary';
        // Default tab for first time it's rendered this session
        if (!this.tabGroups[tabGroup]) {
            this.tabGroups[tabGroup] = 'characteroverview';
        }
        return parts.reduce((tabs, partId) => {
            const tab = {
                cssClass: '',
                group: tabGroup,
                id: '',
                icon: '',
                label: 'RTR.Actor.Tabs.',
            };
            switch (partId) {
                case 'header':
                case 'tabs':
                    return tabs;
                case 'characteroverview':
                    tab.id = 'characteroverview';
                    tab.label += 'Overview';
                    break;
                case 'data':
                    tab.id = 'data';
                    tab.label += 'Data';
                    break;
                case 'skills':
                    tab.id = 'skills';
                    tab.label += 'Skills';
                    break;
                case 'perks':
                    tab.id = 'perks';
                    tab.label += 'Perks';
                    break;
                case 'equipment':
                    tab.id = 'equipment';
                    tab.label += 'Equipment';
                    break;
                case 'abilities':
                    tab.id = 'abilities';
                    tab.label += 'Abilities';
                    break;
                case 'effects':
                    tab.id = 'effects';
                    tab.label += 'Effects';
                    break;
            }
            if (this.tabGroups[tabGroup] === tab.id) tab.cssClass = 'active';
            tabs[partId] = tab;
            return tabs;
        }, {});
    }

    /**
     * Organize and classify Items for Actor sheets.
     *
     * @param {object} context The context object to mutate
     */
    _prepareItems(context) {
        const equipment = [];
        const perks = [];
        const abilities = [];
        const classTechniques = [];
        const martialManeuvers = [];
        const spells = [];
        let species = undefined;
        let playerClass = undefined;

        // Iterate through items, allocating to containers
        for (let i of this.document.items) {
            if (i.type === 'equipment') {
                equipment.push(i);
            } else if (i.type === 'perk') {
                perks.push(i);
            } else if (i.type === 'ability') {
                abilities.push(i);
            } else if (i.type === 'classTechnique') {
                classTechniques.push(i);
            } else if (i.type === 'martialManeuver') {
                martialManeuvers.push(i);
            } else if (i.type === 'spell') {
                spells.push(i);
            } else if (i.type === 'species') {
                species = i;
            } else if (i.type === 'class') {
                playerClass = i;
            } else {
                console.error(`Unknown Item Type ${i.type} found in Actor ${this.actor.name}`);
            }
        }

        // Sort then assign
        context.equipment = equipment.sort((a, b) => (a.sort || 0) - (b.sort || 0));
        context.carriedWeightGramm = equipment.reduce((sum, current) => sum + current.system.quantity * current.system.totalWeightGramm, 0);
        context.carriedWeightGramm += 5 * this.actor.system.inventory.bc + 5 * this.actor.system.inventory.sc + 5 * this.actor.system.inventory.gc;

        context.totalPerkPointsUsed = perks.reduce((sum, current) => sum + current.system.perkPointsCost, 0);
        context.perks = perks.sort((a, b) => (a.sort || 0) - (b.sort || 0));

        context.abilities = abilities.sort((a, b) => (a.sort || 0) - (b.sort || 0));
        context.classTechniques = classTechniques.sort((a, b) => (a.sort || 0) - (b.sort || 0));
        context.martialManeuvers = martialManeuvers.sort((a, b) => (a.sort || 0) - (b.sort || 0));
        context.spells = spells.sort((a, b) => (a.sort || 0) - (b.sort || 0));

        context.species = species;
        context.playerClass = playerClass;
    }

    /** @override */
    async _preparePartContext(partId, context) {
        switch (partId) {
            case 'data':
            case 'abilities':
            case 'skills':
            case 'equipment':
            case 'perks':
                context.tab = context.tabs[partId];
                break;
            case 'characteroverview':
                context.tab = context.tabs[partId];
                // Enrich overview info for display
                // Enrichment turns text like `[[/r 1d20]]` into buttons
                context.enrichedBiography = await ux.TextEditor.enrichHTML(
                    this.actor.system.biography,
                    {
                        // Whether to show secret blocks in the finished html
                        secrets: this.document.isOwner,
                        // Data to fill in for inline rolls
                        rollData: this.actor.getRollData(),
                        // Relative UUID resolution
                        relativeTo: this.actor,
                    }
                );
                break;
            case 'effects':
                context.tab = context.tabs[partId];
                context.effects = super.getAllStatusEffects();
                break;
        }
        return context;
    }

    /**
     * Actions performed after any render of the Application.
     * Post-render steps are not awaited by the render process.
     * @param {ApplicationRenderContext} context      Prepared context data
     * @param {RenderOptions} options                 Provided render options
     * @protected
     * @override
     */
    _onRender(context, options) {
        super._onRender();

        // bind skill attribute Bonus Change
        const skillAttributeBonuses = this.element.querySelectorAll('.skill-attribute-bonus')
        for (const skillAttributeBonus of skillAttributeBonuses) {
            skillAttributeBonus.addEventListener("change", (e) => {
                e.preventDefault();
                e.stopImmediatePropagation();
                const name = e.target.name;
                const attr = e.target.value;
                let updatePayload = {};
                updatePayload[name] = attr;
                this.actor.update(updatePayload)
                    .then(v => this.render());
            })
        }
    }

    /**
     * Lock edit lockers upon close
     * @param options
     * @protected
     * @override
     */
    _onClose(options) {
        let updatePayload = {};
        updatePayload['system.editLockers.skillsEditLocked'] = true;
        updatePayload['system.editLockers.dataEditLocked'] = true;
        this.actor.update(updatePayload);
    }

    /**************
     *
     *   ACTIONS
     *
     **************/

    /**
     * Handle increasing Stamina by 1.
     *
     * @this RtRActorSheet
     * @param {PointerEvent} event   The originating click event
     * @param {HTMLElement} target   The capturing HTML element which defined a [data-action]
     * @protected
     */
    static async _onIncreaseStamina(event, target) {
        event.preventDefault();
        let newStamina = Math.min(this.actor.system.stamina.max, this.actor.system.stamina.value + 1);
        this.actor.update({ "system.stamina.value": newStamina }).then(v => this.render());
    }

    /**
     * Handle decreasing Stamina by 1.
     *
     * @this RtRActorSheet
     * @param {PointerEvent} event   The originating click event
     * @param {HTMLElement} target   The capturing HTML element which defined a [data-action]
     * @protected
     */
    static async _onDecreaseStamina(event, target) {
        event.preventDefault();
        let newStamina = Math.max(0, this.actor.system.stamina.value - 1);
        this.actor.update({ "system.stamina.value": newStamina }).then(v => this.render());
    }

    /**
     * Handle increasing Arcana by 1.
     *
     * @this RtRActorSheet
     * @param {PointerEvent} event   The originating click event
     * @param {HTMLElement} target   The capturing HTML element which defined a [data-action]
     * @protected
     */
    static async _onIncreaseArcana(event, target) {
        event.preventDefault();
        let newArcana = Math.min(this.actor.system.arcana.max, this.actor.system.arcana.value + 1);
        this.actor.update({ "system.arcana.value": newArcana }).then(v => this.render());
    }

    /**
     * Handle decreasing Arcana by 1.
     *
     * @this RtRActorSheet
     * @param {PointerEvent} event   The originating click event
     * @param {HTMLElement} target   The capturing HTML element which defined a [data-action]
     * @protected
     */
    static async _onDecreaseArcana(event, target) {
        event.preventDefault();
        let newArcana = Math.max(0, this.actor.system.arcana.value - 1);
        this.actor.update({ "system.arcana.value": newArcana }).then(v => this.render());
    }

    /**
     * Add XP
     *
     * @this RtRActorSheet
     * @param {PointerEvent} event   The originating click event
     * @param {HTMLElement} target   The capturing HTML element which defined a [data-action]
     * @protected
     */
    static async _onAddXP(event, target) {
        event.preventDefault();

        const result = await api.DialogV2.input({
            rejectClose: false,
            modal: true,
            content: `<input type="number" value="0" name="xp">`,
            window: { title: "Add XP" },
            ok: {
                label: "Add XP",
            }
        });

        if (result && result.xp) {
            let xp = this.actor.system.xp.total + result.xp;
            this.actor.update({ "system.xp.total": xp })
                .then(v => this.render());
        }
    }

    /**
     * Set an Attribute as a Class Attribute
     *
     * @this RtRActorSheet
     * @param {PointerEvent} event   The originating click event
     * @param {HTMLElement} target   The capturing HTML element which defined a [data-action]
     * @protected
     */
    static async _onSetClassAttribute(event, target) {
        event.preventDefault();
        let updatePayload = {};

        const attributeName = target.name.split('.')[2];
        let attribute = Object.entries(this.actor.system.attributes).filter(k => k[0] === attributeName)[0][1];
        if (!attribute) {
            console.error('Unable to find attribute: ' + attributeName);
            return;
        }

        if (attribute.classAttribute === true) {
            return;
        }

        updatePayload['system.attributes.' + attributeName + '.value'] = attribute.value + 2;
        updatePayload['system.attributes.' + attributeName + '.classAttribute'] = true;
        updatePayload['system.attributes.' + attributeName + '.attributeMaximum'] = attribute.attributeMaximum;

        this.actor.update(updatePayload).then(v => this.render());
    }

    /**
     * Unset an Attribute as a Class Attribute
     *
     * @this RtRActorSheet
     * @param {PointerEvent} event   The originating click event
     * @param {HTMLElement} target   The capturing HTML element which defined a [data-action]
     * @protected
     */
    static async _onUnSetClassAttribute(event, target) {
        event.preventDefault();
        let updatePayload = {};

        const attributeName = target.name.split('.')[2];
        let attribute = Object.entries(this.actor.system.attributes).filter(k => k[0] === attributeName)[0][1];
        if (!attribute) {
            console.error('Unable to find attribute: ' + attributeName);
            return;
        }

        if (attribute.classAttribute === false) {
            return;
        }

        updatePayload['system.attributes.' + attributeName + '.value'] = attribute.value - 2;
        updatePayload['system.attributes.' + attributeName + '.classAttribute'] = false;
        updatePayload['system.attributes.' + attributeName + '.attributeMaximum'] = attribute.attributeMaximum - 2;

        this.actor.update(updatePayload).then(v => this.render());
    }

    /**
     * Reset all attributes
     *
     * @this RtRActorSheet
     * @param {PointerEvent} event   The originating click event
     * @param {HTMLElement} target   The capturing HTML element which defined a [data-action]
     * @protected
     */
    static async _onResetAttributes(event, target) {
        event.preventDefault();
        let updatePayload = {};
        const confirm = await api.DialogV2.confirm({
            content: "Are you sure?",
            window: { title: "Reset Attributes", icon: "fa-solid fa-triangle-exclamation" },
            rejectClose: false,
            modal: true
        });

        if (confirm) {
            Object.entries(this.actor.system.attributes).forEach(s => updatePayload['system.attributes.' + s[0] + '.value'] = (s[1].classAttribute ? 0 : -2));
            this.actor.update(updatePayload)
                .then(v => this.render());
        }
    }

    /**
     * Increase Attribute by 1.
     *
     * @this RtRActorSheet
     * @param {PointerEvent} event   The originating click event
     * @param {HTMLElement} target   The capturing HTML element which defined a [data-action]
     * @protected
     */
    static async _onIncreaseAttribute(event, target) {
        event.preventDefault();
        let updatePayload = {};
        const attributeName = target.name.split('.')[2];
        let attribute = Object.entries(this.actor.system.attributes).filter(k => k[0] === attributeName)[0][1];
        if (!attribute) {
            console.error('Unable to find attribute: ' + attributeName);
            return;
        }
        updatePayload['system.attributes.' + attributeName + '.value'] = attribute.value + 1;
        this.actor.update(updatePayload).then(v => this.render());
    }

    /**
     * Reset all assigned skill ranks
     *
     * @this RtRActorSheet
     * @param {PointerEvent} event   The originating click event
     * @param {HTMLElement} target   The capturing HTML element which defined a [data-action]
     * @protected
     */
    static async _onResetSkillRanks(event, target) {
        event.preventDefault();
        let updatePayload = {};
        const confirm = await api.DialogV2.confirm({
            content: "Are you sure?",
            window: { title: "Reset Skill Ranks", icon: "fa-solid fa-triangle-exclamation" },
            rejectClose: false,
            modal: true
        });

        if (confirm) {
            Object.entries(this.actor.system.skills).forEach(s => updatePayload['system.skills.' + s[0] + '.rank'] = (s[1].classSkill ? 2 : 0));
            this.actor.update(updatePayload)
                .then(v => this.render());
        }
    }

    /**
     * Set a Skill as a Class SKill
     *
     * @this RtRActorSheet
     * @param {PointerEvent} event   The originating click event
     * @param {HTMLElement} target   The capturing HTML element which defined a [data-action]
     * @protected
     */
    static async _onSetAsClassSKill(event, target) {
        event.preventDefault();
        let updatePayload = {};

        const skillName = target.name.split('.')[2];
        let skill = Object.entries(this.actor.system.skills).filter(k => k[0] === skillName)[0][1];
        if (!skill) {
            console.error('Unable to find skill: ' + skillName);
            return;
        }

        updatePayload['system.skills.' + skillName + '.classSkill'] = true;
        updatePayload['system.skills.' + skillName + '.rank'] = skill.rank + 2

        this.actor.update(updatePayload).then(v => this.render());
    }

    /**
     * unset a Skill as a Class SKill
     *
     * @this RtRActorSheet
     * @param {PointerEvent} event   The originating click event
     * @param {HTMLElement} target   The capturing HTML element which defined a [data-action]
     * @protected
     */
    static async _unSetAsClassSkill(event, target) {
        event.preventDefault();
        let updatePayload = {};

        const skillName = target.name.split('.')[2];
        let skill = Object.entries(this.actor.system.skills).filter(k => k[0] === skillName)[0][1];
        if (!skill) {
            console.error('Unable to find skill: ' + skillName);
            return;
        }

        updatePayload['system.skills.' + skillName + '.classSkill'] = false;
        updatePayload['system.skills.' + skillName + '.rank'] = skill.rank - 2

        this.actor.update(updatePayload).then(v => this.render());
    }

    /**
     * Increase Rank of Skill by 1.
     *
     * @this RtRActorSheet
     * @param {PointerEvent} event   The originating click event
     * @param {HTMLElement} target   The capturing HTML element which defined a [data-action]
     * @protected
     */
    static async _onIncreaseSkillRank(event, target) {
        event.preventDefault();
        let updatePayload = {};
        const skillName = target.name.split('.')[2];
        let skill = Object.entries(this.actor.system.skills).filter(k => k[0] === skillName)[0][1];
        if (!skill) {
            console.error('Unable to find skill: ' + skillName);
            return;
        }
        updatePayload['system.skills.' + skillName + '.rank'] = skill.rank + 1;
        this.actor.update(updatePayload).then(v => this.render());
    }

    /**
     * Decrease Rank of Skill by 1.
     *
     * @this RtRActorSheet
     * @param {PointerEvent} event   The originating click event
     * @param {HTMLElement} target   The capturing HTML element which defined a [data-action]
     * @protected
     */
    static async _onDecreaseSkillRank(event, target) {
        event.preventDefault();
        let updatePayload = {};
        const skillName = target.name.split('.')[2];
        let skill = Object.entries(this.actor.system.skills).filter(k => k[0] === skillName)[0][1];
        if (!skill) {
            console.error('Unable to find skill: ' + skillName);
            return;
        }
        updatePayload['system.skills.' + skillName + '.rank'] = skill.rank - 1;
        this.actor.update(updatePayload).then(v => this.render());
    }

    /**
     * Recover HP during a short Rest.
     *
     * @this RtRActorSheet
     * @param {PointerEvent} event   The originating click event
     * @param {HTMLElement} target   The capturing HTML element which defined a [data-action]
     * @protected
     */
    static async _onShortRestHpRecovery(event, target) {
        event.preventDefault();
        let updatePayload = {};
        if (this.actor.system.stamina.value === 0) {
            console.warn("Can't perform short rest without Stamina.");
            return;
        }

        let dice = Math.max(1, Math.floor(this.actor.system.attributes.con.value / 3) + 1);
        let formula = `${dice}d6+${this.actor.system.levels.level}`;
        let roll = new Roll(formula, this.actor.getRollData());
        await roll.toMessage({
            speaker: ChatMessage.getSpeaker({ actor: this.actor }),
            flavor: 'Short Rest HP Recovery',
            rollMode: game.settings.get('core', 'rollMode'),
        });

        updatePayload['system.stamina.value'] = this.actor.system.stamina.value - 1;
        let newHP = Math.min(this.actor.system.hp.max, this.actor.system.hp.value + roll.total);
        updatePayload['system.hp.value'] = newHP;
        this.actor.update(updatePayload).then(v => this.render());
        return roll;
    }

    /**
     * Recover Arcana during a short rest
     *
     * @this RtRActorSheet
     * @param {PointerEvent} event   The originating click event
     * @param {HTMLElement} target   The capturing HTML element which defined a [data-action]
     * @protected
     */
    static async _onSortRestArcanaRecovery(event, target) {
        event.preventDefault();
        let updatePayload = {};
        if (this.actor.system.stamina.value === 0) {
            console.warn("Can't perform short rest without Stamina.")
            return;
        }
        updatePayload['system.stamina.value'] = this.actor.system.stamina.value - 1;
        let newArcana = Math.min(this.actor.system.arcana.max, this.actor.system.arcana.value + 1 + Math.floor(this.actor.system.levels.spellLevel / 3));
        updatePayload['system.arcana.value'] = newArcana;
        this.actor.update(updatePayload).then(v => this.render());
    }

    /**
     * Remove Exhaustion during a short rest
     *
     * @this RtRActorSheet
     * @param {PointerEvent} event   The originating click event
     * @param {HTMLElement} target   The capturing HTML element which defined a [data-action]
     * @protected
     */
    static async _onShortRestExhaustionRecovery(event, target) {
        event.preventDefault();
        let updatePayload = {};
        if (this.actor.system.stamina.value === 0 || this.actor.system.stamina.value === 1) {
            console.warn("Can't perform short rest without Stamina.")
            return;
        }
        updatePayload['system.stamina.value'] = this.actor.system.stamina.value - 2;
        updatePayload['system.exhaustion'] = Math.max(this.actor.system.exhaustion - 1, 0);
        this.actor.update(updatePayload).then(v => this.render());
    }

    /**
     * Recover Arcana during a short rest
     *
     * @this RtRActorSheet
     * @param {PointerEvent} event   The originating click event
     * @param {HTMLElement} target   The capturing HTML element which defined a [data-action]
     * @protected
     */
    static async _onLongRestRecovery(event, target) {
        event.preventDefault();
        let updatePayload = {};

        const confirm = await api.DialogV2.confirm({
            content: "Perform Long Rest?",
            rejectClose: false,
            modal: true
        });
        if (!confirm) {
            return;
        }

        updatePayload['system.tempHp'] = 0;

        let newHP = Math.min(this.actor.system.hp.max, this.actor.system.hp.value + Math.floor(this.actor.system.hp.max / 3));
        updatePayload['system.hp.value'] = newHP;

        let newStamina = Math.min(this.actor.system.stamina.max, this.actor.system.stamina.value + Math.floor(this.actor.system.stamina.max / 3));
        updatePayload['system.stamina.value'] = newStamina;

        let newArcana = Math.min(this.actor.system.arcana.max, this.actor.system.arcana.value + Math.floor(this.actor.system.arcana.max / 3));
        updatePayload['system.arcana.value'] = newArcana;

        updatePayload['system.exhaustion'] = Math.max(this.actor.system.exhaustion - 1, 0);

        this.actor.update(updatePayload).then(v => this.render());
    }

    /**
     * Unlocks Skills for editing
     *
     * @this RtRActorSheet
     * @param {PointerEvent} event   The originating click event
     * @param {HTMLElement} target   The capturing HTML element which defined a [data-action]
     * @protected
     */
    static async _onUnlockSkillsEdit(event, target) {
        event.preventDefault();
        if (!this.isEditable) {
            console.error("No Edit permission for " + this.name);
            return;
        }
        let updatePayload = {};
        updatePayload['system.editLockers.skillsEditLocked'] = false;
        this.actor.update(updatePayload).then(v => this.render());
    }

    /**
     * Lock Skills for editing
     *
     * @this RtRActorSheet
     * @param {PointerEvent} event   The originating click event
     * @param {HTMLElement} target   The capturing HTML element which defined a [data-action]
     * @protected
     */
    static async _onLockSkillsEdit(event, target) {
        event.preventDefault();
        let updatePayload = {};
        updatePayload['system.editLockers.skillsEditLocked'] = true;
        this.actor.update(updatePayload).then(v => this.render());
    }

    /**
     * Unlocks Data for editing
     *
     * @this RtRActorSheet
     * @param {PointerEvent} event   The originating click event
     * @param {HTMLElement} target   The capturing HTML element which defined a [data-action]
     * @protected
     */
    static async _onUnlockDataEdit(event, target) {
        event.preventDefault();
        if (!this.isEditable) {
            console.error("No Edit permission for " + this.name);
            return;
        }
        let updatePayload = {};
        updatePayload['system.editLockers.dataEditLocked'] = false;
        this.actor.update(updatePayload).then(v => this.render());
    }

    /**
     * Lock Data for editing
     *
     * @this RtRActorSheet
     * @param {PointerEvent} event   The originating click event
     * @param {HTMLElement} target   The capturing HTML element which defined a [data-action]
     * @protected
     */
    static async _onLockDataEdit(event, target) {
        event.preventDefault();
        let updatePayload = {};
        updatePayload['system.editLockers.dataEditLocked'] = true;
        this.actor.update(updatePayload).then(v => this.render());
    }

    /**
     * Attribute Test
     *
     * @this RtRActorSheet
     * @param {PointerEvent} event   The originating click event
     * @param {HTMLElement} target   The capturing HTML element which defined a [data-action]
     * @protected
     */
    static async _attributeTest(event, target) {
        event.preventDefault();
        let attr = target.dataset.attribute;
        this.actor.attributeTest({attribute: attr, advantage: event.ctrlKey, disadvantage: event.shiftKey});
    }

    /**
     * Skill Test
     *
     * @this RtRActorSheet
     * @param {PointerEvent} event   The originating click event
     * @param {HTMLElement} target   The capturing HTML element which defined a [data-action]
     * @protected
     */
    static async _skillTest(event, target) {
        event.preventDefault();
        let attr = target.dataset.attribute;
        let skill = target.dataset.skill;
        this.actor.skillTest({attribute: attr, skill: skill, advantage: event.ctrlKey, disadvantage: event.shiftKey});
    }

    /**
     * Save Test
     *
     * @this RtRActorSheet
     * @param {PointerEvent} event   The originating click event
     * @param {HTMLElement} target   The capturing HTML element which defined a [data-action]
     * @protected
     */
    static async _saveTest(event, target) {
        event.preventDefault();
        let saveType = target.dataset.save;
        this.actor.saveTest({save: saveType, advantage: event.ctrlKey, disadvantage: event.shiftKey});
    }

    /**
     * Melee Martial Attack
     *
     * @this RtRActorSheet
     * @param {PointerEvent} event   The originating click event
     * @param {HTMLElement} target   The capturing HTML element which defined a [data-action]
     * @protected
     */
    static async _meleeMartialAttack(event, target) {
        event.preventDefault();
        this.actor.meleeMartialAttack({advantage: event.ctrlKey, disadvantage: event.shiftKey});
    }

    /**
     * Ranged Martial Attack
     *
     * @this RtRActorSheet
     * @param {PointerEvent} event   The originating click event
     * @param {HTMLElement} target   The capturing HTML element which defined a [data-action]
     * @protected
     */
    static async _rangedMartialAttack(event, target) {
        event.preventDefault();
        this.actor.rangedMartialAttack({advantage: event.ctrlKey, disadvantage: event.shiftKey});
    }

    /**
     * Melee Spell Attack
     *
     * @this RtRActorSheet
     * @param {PointerEvent} event   The originating click event
     * @param {HTMLElement} target   The capturing HTML element which defined a [data-action]
     * @protected
     */
    static async _meleeSpellAttack(event, target) {
        event.preventDefault();
        this.actor.meleeSpellAttack({advantage: event.ctrlKey, disadvantage: event.shiftKey});
    }

    /**
     * Ranged Spell Attack
     *
     * @this RtRActorSheet
     * @param {PointerEvent} event   The originating click event
     * @param {HTMLElement} target   The capturing HTML element which defined a [data-action]
     * @protected
     */
    static async _rangedSpellAttack(event, target) {
        event.preventDefault();
        this.actor.rangedSpellAttack({advantage: event.ctrlKey, disadvantage: event.shiftKey});
    }
    /**
     * Cast a Spell
     *
     * @this RtRActorSheet
     * @param {PointerEvent} event   The originating click event
     * @param {HTMLElement} target   The capturing HTML element which defined a [data-action]
     * @protected
     */
    static async _castSpell(event, target) {
        event.preventDefault();

        const spell = this._getEmbeddedDocument(target);
        if (!spell) {
            console.error("Spell not found", event, target);
            ui.notifications.error(`Unable to find Spell to cast`, {console: true});
        }

        let spellDifficulty = spell.system.spellDifficulty;
        let label = `Casting Spell ${spell.name}`
        let roll = new Roll('2d6+@spellCastBonus', this.actor.getRollData())
        let speaker = ChatMessage.getSpeaker({ actor: this.actor });

        await roll.toMessage({
            speaker: speaker,
            flavor: label,
            rollMode: game.settings.get('core', 'rollMode'),
        }).then(result => {
            let text = '';
            let doubleOnes = (result.rolls[0].terms[0].results[0].result === 1) && (result.rolls[0].terms[0].results[1].result === 1);
            if ((result.rolls[0].total >= spellDifficulty) && !doubleOnes) {
                text = `<span style="color:green">Spell ${spell.name} was successfuly cast</span>`;
            } else if (result.rolls[0].total >= (spellDifficulty - 5)) {
                text = `<span style="color:yellow">Spell ${spell.name} was cast with mishap</span>`;
            } else {
                text = `<span style="color:red">Spell ${spell.name} Cast was unsuccessful and mishap occurs</span>`;
            }

            ChatMessage.create({
                speaker: speaker,
                content: text,
                style: CONST.CHAT_MESSAGE_STYLES.OOC
            });

        });
        return roll;
    }

    /***************
     *
     * Helper Functions
     *
     ***************/

    /**
     * Fetches the embedded document representing the containing HTML element
     *  Unfortunately has to be copied from base class, but surely there is a way to do this better
     * @param {HTMLElement} target    The element subject to search
     * @returns {Item | ActiveEffect} The embedded Item or ActiveEffect
     * @private
    */
    _getEmbeddedDocument(target) {
        let docRow = target.closest('li[data-document-class]');
        if (!docRow) {
            docRow = target.closest('tr[data-document-class]');
        }
        if (!docRow) {
            docRow = target.closest('div[data-document-class]');
        }
        if (docRow.dataset.documentClass === 'Item') {
            return this.actor.items.get(docRow.dataset.itemId);
        } else if (docRow.dataset.documentClass === 'ActiveEffect') {
            const parent =
                docRow.dataset.parentId === this.actor.id
                    ? this.actor
                    : this.actor.items.get(docRow?.dataset.parentId);
            return parent.effects.get(docRow?.dataset.effectId);
        } else return console.warn('Could not find document class');
    }

    /***************
     *
     * Drag and Drop
     *
     ***************/

    /**
     * Handle dropping of an item reference or item data onto an Actor Sheet
     * @param {DragEvent} event            The concluding DragEvent which contains drop data
     * @param {object} data                The data transfer extracted from the event
     * @returns {Promise<Item[]|boolean>}  The created or updated Item instances, or false if the drop was not permitted.
     * @protected
     */
    async _onDropItem(event, data) {
        if (!this.actor.isOwner) return false;

        const item = await Item.implementation.fromDropData(data);

        if (!this._isItemDropAllowed(item.type)) return false;

        if (item.type === 'species') {
            let existingSpecies = this.document.items.find(i => i.type === 'species');
            if (existingSpecies !== undefined) {
                console.log('Overriding existing Species ' + existingSpecies.name + ' with ' + item.name);
                await existingSpecies.delete();
            }
        } else if (item.type === 'class') {
            let existingClass = this.document.items.find(i => i.type === 'class');
            if (existingClass !== undefined) {
                console.log('Overriding existing Class ' + existingClass.name + ' with ' + item.name);
                await existingClass.delete();
            }
        }

        // Handle item sorting within the same Actor
        if (this.actor.uuid === item.parent?.uuid)
            return super.onSortItem(event, item);

        // Create the owned item
        return super.onDropItemCreate(item, event);
    }

    _isItemDropAllowed(itemType) {
        if (itemType === 'species' ||
            itemType === 'class' ||
            itemType === 'martialManeuver' ||
            itemType === 'spell' ||
            itemType === 'classTechnique' ||
            itemType === 'ability' ||
            itemType === 'perk' ||
            itemType === 'equipment') {
                return true;
        }
        ui.notifications.warn(`Item type ${itemType} not Allowed for Actor Type ${this.actor.type}`, {console: true});
    }
}