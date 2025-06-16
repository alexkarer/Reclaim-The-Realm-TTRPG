import { prepareActiveEffectCategories } from '../helpers/effects.mjs';
const { api, sheets, ux, apps } = foundry.applications;

/**
 * Extend the basic ActorSheet with some very simple modifications
 * @extends {ActorSheetV2}
 */
export class RtRActorSheet extends api.HandlebarsApplicationMixin(
  sheets.ActorSheetV2
) {
  constructor(options = {}) {
    super(options);
    this.#dragDrop = this.#createDragDropHandlers();
  }

  /** @override */
  static DEFAULT_OPTIONS = {
    classes: ['reclaim-the-realm', 'actor'],
    position: {
      width: 600,
      height: 800,
    },
    actions: {
      onEditImage: this._onEditImage,
      viewDoc: this._viewDoc,
      createDoc: this._createDoc,
      deleteDoc: this._deleteDoc,
      toggleEffect: this._toggleEffect,
      roll: this._onRoll,
      increaseHp: this._onIncreaseHP,
      decreaseHp: this._onDecreaseHP,
      increaseStamina: this._onIncreaseStamina,
      decreaseStamina: this._onDecreaseStamina,
      increaseArcana: this._onIncreaseArcana,
      decreaseArcana: this._onDecreaseArcana,
      addXp: this._onAddXP,
      resetSkillPoints: this._onResetSkillRanks,
      setAsClassSkill: this._onSetAsClassSKill,
      unSetAsClassSkill: this._unSetAsClassSkill,
      increaseSkillRank: this._onIncreaseSkillRank,
      decreaseSkillRank: this._onDecreaseSkillRank,
      setClassAttribute: this._onSetClassAttribute,
      unSetClassAttribute: this._onUnSetClassAttribute,
      resetAttributes: this._onResetAttributes,
      increaseAttribute: this._onIncreaseAttribute,
      shortRestHpRecovery: this._onShortRestHpRecovery,
      shortRestArcanaRecovery: this._onSortRestArcanaRecovery,
      shortRestExhaustionRecovery: this._onShortRestExhaustionRecovery,
      longRestRecovery: this._onLongRestRecovery,
      unlockSkillsEdit: this._onUnlockSkillsEdit,
      lockSkillsEdit: this._onLockSkillsEdit,
      unlockDataEdit: this._onUnlockDataEdit,
      lockDataEdit: this._onLockDataEdit,
      castSpell: this._castSpell
    },
    // Custom property that's merged into `this.options`
    dragDrop: [{ dragSelector: '[data-drag]', dropSelector: null }],
    form: {
      submitOnChange: true,
    },
  };

  /** @override */
  static PARTS = {
    header: {
      template: 'systems/reclaim-the-realm/templates/actor/header.hbs',
    },
    tabs: {
      // Foundry-provided generic template
      template: 'templates/generic/tab-navigation.hbs',
    },
    data: {
      template: 'systems/reclaim-the-realm/templates/actor/data.hbs',
    },
    overview: {
      template: 'systems/reclaim-the-realm/templates/actor/overview.hbs',
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
    // Not all parts always render
    options.parts = ['header', 'tabs', 'overview', 'data'];
    // Don't show the other tabs if only limited view
    if (this.document.limited) return;
    // Control which parts show based on document subtype
    switch (this.document.type) {
      case 'character':
        options.parts.push('perks', 'skills', 'equipment', 'abilities', 'effects');
        break;
      case 'npc':
        options.parts.push('perks', 'skills', 'abilities', 'effects');
        break;
    }
  }

  /* -------------------------------------------- */

  /** @override */
  async _prepareContext(options) {
    // Output initialization
    const context = {
      // Validates both permissions and compendium status
      editable: this.isEditable,
      owner: this.document.isOwner,
      limited: this.document.limited,
      // Add the actor document.
      actor: this.actor,
      // Add the actor's data to context.data for easier access, as well as flags.
      system: this.actor.system,
      flags: this.actor.flags,
      // Adding a pointer to CONFIG.RTR
      config: CONFIG.RTR,
      tabs: this._getTabs(options.parts),
      // Necessary for formInput and formFields helpers
      fields: this.document.schema.fields,
      systemFields: this.document.system.schema.fields,
    };

    // Offloading context prep to a helper function
    this._prepareItems(context);

    return context;
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
      case 'overview':
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
        // Prepare active effects
        context.effects = prepareActiveEffectCategories(
          // A generator that returns all effects stored on the actor
          // as well as any items
          this.actor.allApplicableEffects()
        );
        break;
    }
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
    if (!this.tabGroups[tabGroup]) this.tabGroups[tabGroup] = 'overview';
    return parts.reduce((tabs, partId) => {
      const tab = {
        cssClass: '',
        group: tabGroup,
        // Matches tab property to
        id: '',
        // FontAwesome Icon, if you so choose
        icon: '',
        // Run through localization
        label: 'RTR.Actor.Tabs.',
      };
      switch (partId) {
        case 'header':
        case 'tabs':
          return tabs;
        case 'overview':
          tab.id = 'overview';
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
    // Initialize containers.
    // You can just use `this.document.itemTypes` instead
    // if you don't need to subdivide a given type like
    // this sheet does with spells
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
      }
    }


    // Sort then assign
    context.equipment = equipment.sort((a, b) => (a.sort || 0) - (b.sort || 0));
    context.carriedWeightGramm = equipment.reduce((sum, current) => sum + current.system.quantity * current.system.totalWeightGramm, 0);
    if (this.document.type === 'character') {
      context.carriedWeightGramm += 5*this.actor.system.inventory.bc + 5*this.actor.system.inventory.sc + 5*this.actor.system.inventory.gc;
    }

    context.totalPerkPointsUsed = perks.reduce((sum, current) => sum + current.system.perkPointsCost, 0);
    context.perks = perks.sort((a, b) => (a.sort || 0) - (b.sort || 0));

    context.abilities = abilities.sort((a, b) => (a.sort || 0) - (b.sort || 0));
    context.classTechniques = classTechniques.sort((a, b) => (a.sort || 0) - (b.sort || 0));
    context.martialManeuvers = martialManeuvers.sort((a, b) => (a.sort || 0) - (b.sort || 0));
    context.spells = spells.sort((a, b) => (a.sort || 0) - (b.sort || 0));

    context.species = species;
    context.playerClass = playerClass;
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
    this.#dragDrop.forEach((d) => d.bind(this.element));
    this.#disableOverrides();

    // bind skill attribute Bonus Change
    const skillAttributeBonuses = this.element.querySelectorAll('.skill-attribute-bonus')
    for (const skillAttributeBonus of skillAttributeBonuses) {
      skillAttributeBonus.addEventListener("change", (e) => {
        e.preventDefault();
        e.stopImmediatePropagation();
        const name = e.target.name;
        const attr = e.target.value;
        let updatePayload = {};
        updatePayload[name]=attr;
        this.actor.update(updatePayload)
          .then(v => this.render());
      })
    }
  }

  /**************
   *
   *   ACTIONS
   *
   **************/

  /**
   * Handle changing a Document's image.
   *
   * @this RtRActorSheet
   * @param {PointerEvent} event   The originating click event
   * @param {HTMLElement} target   The capturing HTML element which defined a [data-action]
   * @returns {Promise}
   * @protected
   */
  static async _onEditImage(event, target) {
    const attr = target.dataset.edit;
    const current = foundry.utils.getProperty(this.document, attr);
    const { img } =
      this.document.constructor.getDefaultArtwork?.(this.document.toObject()) ??
      {};
    const fp = new apps.FilePicker({
      current,
      type: 'image',
      redirectToRoot: img ? [img] : [],
      callback: (path) => {
        this.document.update({ [attr]: path });
      },
      top: this.position.top + 40,
      left: this.position.left + 10,
    });
    return fp.browse();
  }

  /**
   * Renders an embedded document's sheet
   *
   * @this RtRActorSheet
   * @param {PointerEvent} event   The originating click event
   * @param {HTMLElement} target   The capturing HTML element which defined a [data-action]
   * @protected
   */
  static async _viewDoc(event, target) {
    const doc = this._getEmbeddedDocument(target);
    doc.sheet.render(true);
  }

  /**
   * Handles item deletion
   *
   * @this RtRActorSheet
   * @param {PointerEvent} event   The originating click event
   * @param {HTMLElement} target   The capturing HTML element which defined a [data-action]
   * @protected
   */
  static async _deleteDoc(event, target) {
    const doc = this._getEmbeddedDocument(target);
    await doc.delete();
  }

  /**
   * Handle creating a new Owned Item or ActiveEffect for the actor using initial data defined in the HTML dataset
   *
   * @this RtRActorSheet
   * @param {PointerEvent} event   The originating click event
   * @param {HTMLElement} target   The capturing HTML element which defined a [data-action]
   * @private
   */
  static async _createDoc(event, target) {
    // Retrieve the configured document class for Item or ActiveEffect
    const docCls = getDocumentClass(target.dataset.documentClass);
    // Prepare the document creation data by initializing it a default name.
    const docData = {
      name: docCls.defaultName({
        // defaultName handles an undefined type gracefully
        type: target.dataset.type,
        parent: this.actor,
      }),
    };
    // Loop through the dataset and add it to our docData
    for (const [dataKey, value] of Object.entries(target.dataset)) {
      // These data attributes are reserved for the action handling
      if (['action', 'documentClass'].includes(dataKey)) continue;
      // Nested properties require dot notation in the HTML, e.g. anything with `system`
      // An example exists in spells.hbs, with `data-system.spell-level`
      // which turns into the dataKey 'system.spellLevel'
      foundry.utils.setProperty(docData, dataKey, value);
    }

    // Finally, create the embedded document!
    await docCls.create(docData, { parent: this.actor });
  }

  /**
   * Determines effect parent to pass to helper
   *
   * @this RtRActorSheet
   * @param {PointerEvent} event   The originating click event
   * @param {HTMLElement} target   The capturing HTML element which defined a [data-action]
   * @private
   */
  static async _toggleEffect(event, target) {
    const effect = this._getEmbeddedDocument(target);
    await effect.update({ disabled: !effect.disabled });
  }

  /**
   * Handle clickable rolls.
   *
   * @this RtRActorSheet
   * @param {PointerEvent} event   The originating click event
   * @param {HTMLElement} target   The capturing HTML element which defined a [data-action]
   * @protected
   */
  static async _onRoll(event, target) {
    event.preventDefault();
    const dataset = target.dataset;

    // Handle item rolls.
    switch (dataset.rollType) {
      case 'item':
        const item = this._getEmbeddedDocument(target);
        if (item) return item.roll();
    }

    // Handle rolls that supply the formula directly.
    if (dataset.roll) {
      let label = dataset.label ? `[attribute] ${dataset.label}` : '';
      let roll = new Roll(dataset.roll, this.actor.getRollData());
      await roll.toMessage({
        speaker: ChatMessage.getSpeaker({ actor: this.actor }),
        flavor: label,
        rollMode: game.settings.get('core', 'rollMode'),
      });
      return roll;
    }
  }

  /**
   * Handle increasing HP by 1.
   *
   * @this RtRActorSheet
   * @param {PointerEvent} event   The originating click event
   * @param {HTMLElement} target   The capturing HTML element which defined a [data-action]
   * @protected
   */
  static async _onIncreaseHP(event, target) {
    event.preventDefault();
    let newHp;
    if (event.ctrlKey) {
      newHp = Math.min(this.actor.system.hp.max, this.actor.system.hp.value + 10);
    } else if (event.shiftKey) {
      newHp = Math.min(this.actor.system.hp.max, this.actor.system.hp.value + 5);
    } else {
      newHp = Math.min(this.actor.system.hp.max, this.actor.system.hp.value + 1);
    }
    this.actor.update({ "system.hp.value": newHp }).then(v => this.render());
  }

  /**
   * Handle decreasing HP by 1.
   *
   * @this RtRActorSheet
   * @param {PointerEvent} event   The originating click event
   * @param {HTMLElement} target   The capturing HTML element which defined a [data-action]
   * @protected
   */
  static async _onDecreaseHP(event, target) {
    event.preventDefault();
    let newHp;
    if (event.ctrlKey) {
      newHp = Math.max(0, this.actor.system.hp.value - 10);
    } else if (event.shiftKey) {
      newHp = Math.max(0, this.actor.system.hp.value - 5);
    } else {
      newHp = Math.max(0, this.actor.system.hp.value - 1);
    }
    this.actor.update({ "system.hp.value": newHp }).then(v => this.render());
  }

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
      Object.entries(this.actor.system.skills).forEach(s => updatePayload['system.skills.'+s[0]+'.rank'] = (s[1].classSkill ? 2 : 0));
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

    updatePayload['system.skills.'+skillName+'.classSkill']=true;
    updatePayload['system.skills.'+skillName+'.rank']=skill.rank+2
    
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

    updatePayload['system.skills.'+skillName+'.classSkill']=false;
    updatePayload['system.skills.'+skillName+'.rank']=skill.rank-2
    
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
    updatePayload['system.skills.'+skillName+'.rank']=skill.rank+1;
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
    updatePayload['system.skills.'+skillName+'.rank']=skill.rank-1;
    this.actor.update(updatePayload).then(v => this.render());
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

    updatePayload['system.attributes.'+attributeName+'.value'] = attribute.value + 2;
    updatePayload['system.attributes.'+attributeName+'.classAttribute'] = true;
    updatePayload['system.attributes.'+attributeName+'.attributeMaximum'] = attribute.attributeMaximum;
    
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
      Object.entries(this.actor.system.attributes).forEach(s => updatePayload['system.attributes.'+s[0]+'.value'] = (s[1].classAttribute ? 0 : -2));
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
    updatePayload['system.attributes.'+attributeName+'.value'] = attribute.value + 1;
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
    let roll = new Roll(dice + 'd6', this.actor.getRollData());
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
    if(!spell) {
      console.error("Spell not found", event, target);
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
        content: text
      });

    });
    return roll;
  }


  /** Helper Functions */

  /**
   * Fetches the embedded document representing the containing HTML element
   *
   * @param {HTMLElement} target    The element subject to search
   * @returns {Item | ActiveEffect} The embedded Item or ActiveEffect
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
   * Define whether a user is able to begin a dragstart workflow for a given drag selector
   * @param {string} selector       The candidate HTML selector for dragging
   * @returns {boolean}             Can the current user drag this selector?
   * @protected
   */
  _canDragStart(selector) {
    // game.user fetches the current user
    return this.isEditable;
  }

  /**
   * Define whether a user is able to conclude a drag-and-drop workflow for a given drop selector
   * @param {string} selector       The candidate HTML selector for the drop target
   * @returns {boolean}             Can the current user drop on this selector?
   * @protected
   */
  _canDragDrop(selector) {
    // game.user fetches the current user
    return this.isEditable;
  }

  /**
   * Callback actions which occur at the beginning of a drag start workflow.
   * @param {DragEvent} event       The originating DragEvent
   * @protected
   */
  _onDragStart(event) {
    let docRow = event.currentTarget.closest('li');
    if (!docRow) {
      docRow = event.currentTarget.closest('tr');
    }
    if ('link' in event.target.dataset) return;

    // Chained operation
    let dragData = this._getEmbeddedDocument(docRow)?.toDragData();

    if (!dragData) return;

    // Set data transfer
    event.dataTransfer.setData('text/plain', JSON.stringify(dragData));
  }

  /**
   * Callback actions which occur when a dragged element is over a drop target.
   * @param {DragEvent} event       The originating DragEvent
   * @protected
   */
  _onDragOver(event) {}

  /**
   * Callback actions which occur when a dragged element is dropped on a target.
   * @param {DragEvent} event       The originating DragEvent
   * @protected
   */
  async _onDrop(event) {
    const data = ux.TextEditor.getDragEventData(event);
    const actor = this.actor;
    const allowed = Hooks.call('dropActorSheetData', actor, this, data);
    if (allowed === false) return;

    // Handle different data types
    switch (data.type) {
      case 'ActiveEffect':
        return this._onDropActiveEffect(event, data);
      case 'Actor':
        return this._onDropActor(event, data);
      case 'Item':
        return this._onDropItem(event, data);
      case 'Folder':
        return this._onDropFolder(event, data);
    }
  }

  /**
   * Handle the dropping of ActiveEffect data onto an Actor Sheet
   * @param {DragEvent} event                  The concluding DragEvent which contains drop data
   * @param {object} data                      The data transfer extracted from the event
   * @returns {Promise<ActiveEffect|boolean>}  The created ActiveEffect object or false if it couldn't be created.
   * @protected
   */
  async _onDropActiveEffect(event, data) {
    const aeCls = getDocumentClass('ActiveEffect');
    const effect = await aeCls.fromDropData(data);
    if (!this.actor.isOwner || !effect) return false;
    if (effect.target === this.actor)
      return this._onSortActiveEffect(event, effect);
    return aeCls.create(effect, { parent: this.actor });
  }

  /**
   * Handle a drop event for an existing embedded Active Effect to sort that Active Effect relative to its siblings
   *
   * @param {DragEvent} event
   * @param {ActiveEffect} effect
   */
  async _onSortActiveEffect(event, effect) {
    /** @type {HTMLElement} */
    const dropTarget = event.target.closest('[data-effect-id]');
    if (!dropTarget) return;
    const target = this._getEmbeddedDocument(dropTarget);

    // Don't sort on yourself
    if (effect.uuid === target.uuid) return;

    // Identify sibling items based on adjacent HTML elements
    const siblings = [];
    for (const el of dropTarget.parentElement.children) {
      const siblingId = el.dataset.effectId;
      const parentId = el.dataset.parentId;
      if (
        siblingId &&
        parentId &&
        (siblingId !== effect.id || parentId !== effect.parent.id)
      )
        siblings.push(this._getEmbeddedDocument(el));
    }

    // Perform the sort
    const sortUpdates = SortingHelpers.performIntegerSort(effect, {
      target,
      siblings,
    });

    // Split the updates up by parent document
    const directUpdates = [];

    const grandchildUpdateData = sortUpdates.reduce((items, u) => {
      const parentId = u.target.parent.id;
      const update = { _id: u.target.id, ...u.update };
      if (parentId === this.actor.id) {
        directUpdates.push(update);
        return items;
      }
      if (items[parentId]) items[parentId].push(update);
      else items[parentId] = [update];
      return items;
    }, {});

    // Effects-on-items updates
    for (const [itemId, updates] of Object.entries(grandchildUpdateData)) {
      await this.actor.items
        .get(itemId)
        .updateEmbeddedDocuments('ActiveEffect', updates);
    }

    // Update on the main actor
    return this.actor.updateEmbeddedDocuments('ActiveEffect', directUpdates);
  }

  /**
   * Handle dropping of an Actor data onto another Actor sheet
   * @param {DragEvent} event            The concluding DragEvent which contains drop data
   * @param {object} data                The data transfer extracted from the event
   * @returns {Promise<object|boolean>}  A data object which describes the result of the drop, or false if the drop was
   *                                     not permitted.
   * @protected
   */
  async _onDropActor(event, data) {
    if (!this.actor.isOwner) return false;
  }

  /* -------------------------------------------- */

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

    if (!this._isItemAllowedForActorType(this.actor.type, item.type)) return false;

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
      return this._onSortItem(event, item);

    // Create the owned item
    return this._onDropItemCreate(item, event);
  }

  _isItemAllowedForActorType(actorType, itemType) {
    if (actorType === 'character') {
      return true;
    } else if (actorType === 'npc') {
      if (
        itemType === 'species' ||
        itemType === 'class' ||
        itemType === 'martialManeuver' ||
        itemType === 'spell' ||
        itemType === 'classTechnique'
      ) {
        return false;
      } else {
        return true;
      }
    } else {
      console.error(`Unkown Actor Type: ${actorType}`);
      return false;
    }
  } 

  /**
   * Handle dropping of a Folder on an Actor Sheet.
   * The core sheet currently supports dropping a Folder of Items to create all items as owned items.
   * @param {DragEvent} event     The concluding DragEvent which contains drop data
   * @param {object} data         The data transfer extracted from the event
   * @returns {Promise<Item[]>}
   * @protected
   */
  async _onDropFolder(event, data) {
    if (!this.actor.isOwner) return [];
    const folder = await Folder.implementation.fromDropData(data);
    if (folder.type !== 'Item') return [];
    const droppedItemData = await Promise.all(
      folder.contents.map(async (item) => {
        if (!(document instanceof Item)) item = await fromUuid(item.uuid);
        return item;
      })
    );
    return this._onDropItemCreate(droppedItemData, event);
  }

  /**
   * Handle the final creation of dropped Item data on the Actor.
   * This method is factored out to allow downstream classes the opportunity to override item creation behavior.
   * @param {object[]|object} itemData      The item data requested for creation
   * @param {DragEvent} event               The concluding DragEvent which provided the drop data
   * @returns {Promise<Item[]>}
   * @private
   */
  async _onDropItemCreate(itemData, event) {
    itemData = itemData instanceof Array ? itemData : [itemData];
    return this.actor.createEmbeddedDocuments('Item', itemData);
  }

  /**
   * Handle a drop event for an existing embedded Item to sort that Item relative to its siblings
   * @param {Event} event
   * @param {Item} item
   * @private
   */
  _onSortItem(event, item) {
    // Get the drag source and drop target
    const items = this.actor.items;
    const dropTarget = event.target.closest('[data-item-id]');
    if (!dropTarget) return;
    const target = items.get(dropTarget.dataset.itemId);

    // Don't sort on yourself
    if (item.id === target.id) return;

    // Identify sibling items based on adjacent HTML elements
    const siblings = [];
    for (let el of dropTarget.parentElement.children) {
      const siblingId = el.dataset.itemId;
      if (siblingId && siblingId !== item.id)
        siblings.push(items.get(el.dataset.itemId));
    }

    // Perform the sort
    const sortUpdates = SortingHelpers.performIntegerSort(item, {
      target,
      siblings,
    });
    const updateData = sortUpdates.map((u) => {
      const update = u.update;
      update._id = u.target._id;
      return update;
    });

    // Perform the update
    return this.actor.updateEmbeddedDocuments('Item', updateData);
  }

  /** The following pieces set up drag handling and are unlikely to need modification  */

  /**
   * Returns an array of DragDrop instances
   * @type {DragDrop[]}
   */
  get dragDrop() {
    return this.#dragDrop;
  }

  // This is marked as private because there's no real need
  // for subclasses or external hooks to mess with it directly
  #dragDrop;

  /**
   * Create drag-and-drop workflow handlers for this Application
   * @returns {DragDrop[]}     An array of DragDrop handlers
   * @private
   */
  #createDragDropHandlers() {
    return this.options.dragDrop.map((d) => {
      d.permissions = {
        dragstart: this._canDragStart.bind(this),
        drop: this._canDragDrop.bind(this),
      };
      d.callbacks = {
        dragstart: this._onDragStart.bind(this),
        dragover: this._onDragOver.bind(this),
        drop: this._onDrop.bind(this),
      };
      return new ux.DragDrop(d);
    });
  }

  /********************
   *
   * Actor Override Handling
   *
   ********************/

  /**
   * Submit a document update based on the processed form data.
   * @param {SubmitEvent} event                   The originating form submission event
   * @param {HTMLFormElement} form                The form element that was submitted
   * @param {object} submitData                   Processed and validated form data to be used for a document update
   * @returns {Promise<void>}
   * @protected
   * @override
   */
  async _processSubmitData(event, form, submitData) {
    const overrides = foundry.utils.flattenObject(this.actor.overrides);
    for (let k of Object.keys(overrides)) delete submitData[k];
    await this.document.update(submitData);
  }

  /**
   * Disables inputs subject to active effects
   */
  #disableOverrides() {
    const flatOverrides = foundry.utils.flattenObject(this.actor.overrides);
    for (const override of Object.keys(flatOverrides)) {
      const input = this.element.querySelector(`[name="${override}"]`);
      if (input) {
        input.disabled = true;
      }
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
}
