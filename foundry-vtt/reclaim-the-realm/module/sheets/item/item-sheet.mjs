const { api, sheets, ux, apps } = foundry.applications;

/**
 * Extend the basic ItemSheet with some very simple modifications
 * @extends {ItemSheetV2}
 */
export class RtRItemSheet extends api.HandlebarsApplicationMixin(
  sheets.ItemSheetV2
) {
  constructor(options = {}) {
    super(options);
    this.#dragDrop = this.#createDragDropHandlers();
  }

  /** @override */
  static DEFAULT_OPTIONS = {
    classes: ['reclaim-the-realm', 'item'],
    position: {
      width: 480,
    },
    window: {
      resizable: true
    },
    actions: {
      onEditImage: this._onEditImage,
      unlockEdit: this._onUnlockEdit,
      lockEdit: this._onLockEdit,
      addTag: this._onAddTag,
      deleteTag: this._onDeleteTag,
      editPerkRequirements: this._onEditPerkRequirements,
      editAbilityRequirements: this._onEditAbilityRequirements,
    },
    form: {
      submitOnChange: true,
    },
    // Custom property that's merged into `this.options`
    dragDrop: [{ dragSelector: '[data-drag]', dropSelector: null }],
  };

  /* -------------------------------------------- */

  /** @override */
  static PARTS = {
    header: {
      template: 'systems/reclaim-the-realm/templates/item/header.hbs',
    },
    tabs: {
      // Foundry-provided generic template
      template: 'templates/generic/tab-navigation.hbs',
    },
    description: {
      template: 'systems/reclaim-the-realm/templates/item/description.hbs',
    },
    perk: {
      template: 'systems/reclaim-the-realm/templates/item/perk.hbs',
    },
    equipment: {
      template: 'systems/reclaim-the-realm/templates/item/equipment.hbs',
    },
    ability: {
      template: 'systems/reclaim-the-realm/templates/item/ability.hbs',
    },
    spell: {
      template: 'systems/reclaim-the-realm/templates/item/spell.hbs',
    },
    species: {
      template: 'systems/reclaim-the-realm/templates/item/species.hbs',
    },
    classcorefeature: {
      template: 'systems/reclaim-the-realm/templates/item/class-core-feature.hbs',
    },
    classcorevalues: {
      template: 'systems/reclaim-the-realm/templates/item/class-core-values.hbs',
    },
    npctrait: {
      template: 'systems/reclaim-the-realm/templates/item/npc-trait.hbs',
    }
  };

  /** @override */
  _configureRenderOptions(options) {
    super._configureRenderOptions(options);
    // Not all parts always render
    options.parts = ['header', 'tabs'];
    // Don't show the other tabs if only limited view
    if (this.document.limited) return;
    // Control which parts show based on document subtype
    switch (this.document.type) {
      case 'perk':
        options.parts.push('perk',);
        break;
      case 'equipment':
        options.parts.push('equipment');
        break;
      case 'ability':
      case 'npcAbility':
      case 'classTechnique':
      case 'martialManeuver':
        options.parts.push('ability');
        break;
      case 'spell':
        options.parts.push('spell');
        break;
      case 'species':
        options.parts.push('species');
        break;
      case 'class':
        options.parts.push('classcorefeature', 'classcorevalues');
        break;
      case 'npcTrait':
        options.parts.push('npctrait');
        break;
    }
  }

  /* -------------------------------------------- */

  /** @override */
  async _prepareContext(options) {
    const context = {
      // Validates both permissions and compendium status
      editable: this.isEditable,
      owner: this.document.isOwner,
      limited: this.document.limited,
      // Add the item document.
      item: this.item,
      // Adding system and flags for easier access
      system: this.item.system,
      flags: this.item.flags,
      // Adding a pointer to CONFIG.RTR
      config: CONFIG.RTR,
      // You can factor out context construction to helper functions
      tabs: this._getTabs(options.parts),
      // Necessary for formInput and formFields helpers
      fields: this.document.schema.fields,
      systemFields: this.document.system.schema.fields,
    };

    return context;
  }

  /** @override */
  async _preparePartContext(partId, context) {
    switch (partId) {
      case 'equipment':
      case 'perk':
      case 'ability':
      case 'spell':
      case 'description':
      case 'species':
      case 'classcorefeature':
      case 'npctrait':
        context.tab = context.tabs[partId];
        // Enrich description info for display
        // Enrichment turns text like `[[/r 1d20]]` into buttons
        context.enrichedDescription = await ux.TextEditor.enrichHTML(
          this.item.system.description,
          {
            // Whether to show secret blocks in the finished html
            secrets: this.document.isOwner,
            // Data to fill in for inline rolls
            rollData: this.item.getRollData(),
            // Relative UUID resolution
            relativeTo: this.item,
          }
        );
        break;
      case 'classcorevalues':
        context.tab = context.tabs[partId];
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
    if (!this.tabGroups[tabGroup]) {
      if (this.document.type === 'ability' || this.document.type === 'martialManeuver' || this.document.type === 'classTechnique' || this.document.type === 'npcAbility') {
        this.tabGroups[tabGroup] = 'ability';
      } else if (this.document.type === 'spell') {
        this.tabGroups[tabGroup] = 'spell';
      } else if (this.document.type === 'perk') {
        this.tabGroups[tabGroup] = 'perk';
      } else if (this.document.type === 'equipment') {
        this.tabGroups[tabGroup] = 'equipment';
      } else if (this.document.type === 'species') {
        this.tabGroups[tabGroup] = 'species';
      } else if (this.document.type === 'class') {
        this.tabGroups[tabGroup] = 'classcorefeature';
      } else if (this.document.type === 'npcTrait') {
        this.tabGroups[tabGroup] = 'npctrait';
      } else {
        this.tabGroups[tabGroup] = 'description';
      }
    }
    return parts.reduce((tabs, partId) => {
      const tab = {
        cssClass: '',
        group: tabGroup,
        // Matches tab property to
        id: '',
        // FontAwesome Icon, if you so choose
        icon: '',
        // Run through localization
        label: 'RTR.Item.Tabs.',
      };
      switch (partId) {
        case 'header':
        case 'tabs':
          return tabs;
        case 'description':
          tab.id = 'description';
          tab.label += 'Description';
          break;
        case 'equipment':
          tab.id = 'equipment';
          tab.label += 'Equipment';
          break;
        case 'ability':
          tab.id = 'ability';
          tab.label += 'Ability';
          break;
        case 'spell':
          tab.id = 'spell';
          tab.label += 'Spell';
          break;
        case 'perk':
          tab.id = 'perk';
          tab.label += 'Perk';
          break;
        case 'species':
          tab.id = 'species';
          tab.label += 'Species';
          break;
        case 'classcorefeature':
          tab.id = 'classcorefeature';
          tab.label += 'ClassCoreFeature';
          break;
        case 'classcorevalues':
          tab.id = 'classcorevalues';
          tab.label += 'ClassCoreValues';
          break;
        case 'npctrait':
          tab.id = 'npctrait';
          tab.label += 'Trait';
          break;
      }
      if (this.tabGroups[tabGroup] === tab.id) tab.cssClass = 'active';
      tabs[partId] = tab;
      return tabs;
    }, {});
  }

  /**
   * Actions performed after any render of the Application.
   * Post-render steps are not awaited by the render process.
   * @param {ApplicationRenderContext} context      Prepared context data
   * @param {RenderOptions} options                 Provided render options
   * @protected
   */
  _onRender(context, options) {
    this.#dragDrop.forEach((d) => d.bind(this.element));

    // bind equipment type selector
    if (this.document.type === 'equipment') {
      const equipmentTypeSelectors = this.element.querySelectorAll('.equipment-type-selector')
      for (const equipmentTypeSelector of equipmentTypeSelectors) {
        equipmentTypeSelector.addEventListener("change", (e) => {
          e.preventDefault();
          e.stopImmediatePropagation();
          const name = e.target.name;
          const equipmentType = e.target.value;
          let updatePayload = {};
          updatePayload[name]=equipmentType;
          this.document.update(updatePayload)
            .then(v => this.render());
        })
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
      updatePayload['system.editLock'] = true;
      this.document.update(updatePayload);
  }

  /**************
   *
   *   ACTIONS
   *
   **************/

  /**
   * Handle changing a Document's image.
   *
   * @this RtRItemSheet
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
   * Unlock Item Editing
   *
   * @this RtRActorSheet
   * @param {PointerEvent} event   The originating click event
   * @param {HTMLElement} target   The capturing HTML element which defined a [data-action]
   * @protected
   */
  static async _onUnlockEdit(event, target) {
      event.preventDefault();
      if (!this.isEditable) {
          console.error("No Edit permission for " + this.name);
          return;
      }
      let updatePayload = {};
      updatePayload['system.editLock'] = false;
      this.document.update(updatePayload).then(v => this.render());
  }

  /**
   * Lock Item Editing
   *
   * @this RtRActorSheet
   * @param {PointerEvent} event   The originating click event
   * @param {HTMLElement} target   The capturing HTML element which defined a [data-action]
   * @protected
   */
  static async _onLockEdit(event, target) {
      event.preventDefault();
      let updatePayload = {};
      updatePayload['system.editLock'] = true;
      this.document.update(updatePayload).then(v => this.render());
  }

  /**
   * Add new tag
   * @this RtRActorSheet
   * @param {PointerEvent} event   The originating click event
   * @param {HTMLElement} target   The capturing HTML element which defined a [data-action]
   * @protected
   */
  static async _onAddTag(event, target) {
      event.preventDefault();

      const result = await api.DialogV2.input({
          rejectClose: false,
          modal: true,
          content: `<input type="text" value="" name="tag">`,
          window: { title: "Add Tag"},
          ok: { label: "Add Tag" }
      });
      if (!result || !result.tag) {
          return;
      }

      const existingResistance = this.document.system.tags.find(t => t === result.tag);
      let updatedTags = [];
      if (existingResistance) {
          return;
      } else {
          updatedTags = [
              ...foundry.utils.deepClone(this.document.system.tags), 
              result.tag
          ];
      }

      this.document.update({"system.tags": updatedTags}).then(v => this.render());
  }

  /**
   * Delete tag
   * @this RtRActorSheet
   * @param {PointerEvent} event   The originating click event
   * @param {HTMLElement} target   The capturing HTML element which defined a [data-action]
   * @protected
   */
  static async _onDeleteTag(event, target) {
      event.preventDefault();
      const tag = target.dataset.tag;
      const updatePayload = { 
          "system.tags": foundry.utils.deepClone(this.document.system.tags.filter(t => t !== tag))
      };
      this.document.update(updatePayload).then(v => this.render());
  }

  /**
   * Edit Perk Requirements
   * @this RtRActorSheet
   * @param {PointerEvent} event   The originating click event
   * @param {HTMLElement} target   The capturing HTML element which defined a [data-action]
   * @protected
   */
  static async _onEditPerkRequirements(event, target) {
      event.preventDefault();
      const result = await api.DialogV2.input({
          rejectClose: false,
          modal: true,
          classes: ['reclaim-the-realm'],
          content: `
          <div class="compact-grid grid-2col">
            <h6 style="margin-top: 0px;" class="grid-span-2">Level Requirement</h6>
            <label for="minlevel" class="compact-input">Minimum LEVEL</label><input type="number" name="minlevel" class="compact-input" id="minlevel" value="${this.document.system.requirements.minimumLevel}">
            <label for="minmartiallevel" class="compact-input">Minimum MARTIAL LEVEL</label><input type="number" name="minmartiallevel" class="compact-input" id="minmartiallevel" value="${this.document.system.requirements.minimumMartialLevel}">
            <label for="minspelllevel" class="compact-input">Minimum SPELL LEVEL</label><input type="number" name="minspelllevel" class="compact-input" id="minspelllevel" value="${this.document.system.requirements.minimumSpellLevel}">

            <h6 style="margin-top: 6px;" class="grid-span-2">Attribute Requirements</h6>
            <label for="minstr" class="compact-input">Minimum STR</label><input type="number" class="compact-input" name="minstr" id="minstr" value="${this.document.system.requirements.minimumStr}">
            <label for="minagi" class="compact-input">Minimum AGI</label><input type="number" class="compact-input" name="minagi" id="minagi" value="${this.document.system.requirements.minimumAgi}">
            <label for="mincon" class="compact-input">Minimum CON</label><input type="number" class="compact-input" name="mincon" id="mincon" value="${this.document.system.requirements.minimumCon}">
            <label for="minint" class="compact-input">Minimum INT</label><input type="number" class="compact-input" name="minint" id="minint" value="${this.document.system.requirements.minimumInt}">
            <label for="minspi" class="compact-input">Minimum SPI</label><input type="number" class="compact-input" name="minspi" id="minspi" value="${this.document.system.requirements.minimumSpi}">
            <label for="minper" class="compact-input">Minimum PER</label><input type="number" class="compact-input" name="minper" id="minper" value="${this.document.system.requirements.minimumPer}">
            <label for="mincha" class="compact-input">Minimum CHA</label><input type="number" class="compact-input" name="mincha" id="mincha" value="${this.document.system.requirements.minimumCha}">

            <h6 style="margin-top: 6px;" class="grid-span-2">Skill Requirement</h6>
            <label for="skill" class="compact-input">Skill</label><input type="text" name="skill" class="compact-input" id="skill" value="${this.document.system.requirements.skillRankRequirement.skill ?? ''}">
            <label for="skillrank" class="compact-input">Skill Rank</label><input type="number" name="skillrank" class="compact-input" id="skillrank" value="${this.document.system.requirements.skillRankRequirement.rank}">

            <h6 style="margin-top: 6px;" class="grid-span-2">Class and Perk Requirement</h6>
            <label for="requiredClass" class="compact-input">Required Class</label><input type="text" name="requiredClass" class="compact-input" id="requiredClass" value="${this.document.system.requirements.requiredClass ?? ''}">
            <label for="requiredPerk" class="compact-input">Required Perk</label><input type="text" name="requiredPerk" class="compact-input" id="requiredPerk" value="${this.document.system.requirements.requiredPerk ?? ''}">
            <label for="requiredNotSelectedPerk" class="compact-input">Required Not Selected Perk</label><input type="text" name="requiredNotSelectedPerk" class="compact-input" id="requiredNotSelectedPerk" value="${this.document.system.requirements.requiredNotSelectedPerk ?? ''}">

            <h6 style="margin-top: 6px;" class="grid-span-2">Other Requirements</h6>
            <input class="grid-span-2 compact-input" type="text" name="otherRequirements" id="otherRequirements" value="${this.document.system.requirements.otherRequirements ?? ''}">
          </div>
          `,
          window: { title: "Edit Perk Requirements"},
          ok: { label: "Confirm" }
      });
      if (!result) {
          return;
      }
      let updatePayload = {};
      if (result.minlevel) {
        updatePayload['system.requirements.minimumLevel'] = parseInt(result.minlevel);
      } else {
        updatePayload['system.requirements.minimumLevel'] = 0;
      }
      if (result.minmartiallevel) {
        updatePayload['system.requirements.minimumMartialLevel'] = parseInt(result.minmartiallevel);
      } else {
        updatePayload['system.requirements.minimumMartialLevel'] = 0;
      }
      if (result.minspelllevel) {
        updatePayload['system.requirements.minimumSpellLevel'] = parseInt(result.minspelllevel);
      } else {
        updatePayload['system.requirements.minimumSpellLevel'] = 0;
      }
      if (result.minstr) {
        updatePayload['system.requirements.minimumStr'] = parseInt(result.minstr);
      } else {
        updatePayload['system.requirements.minimumStr'] = 0;
      }
      if (result.minagi) {
        updatePayload['system.requirements.minimumAgi'] = parseInt(result.minagi);
      } else {
        updatePayload['system.requirements.minimumAgi'] = 0;
      }
      if (result.mincon) {
        updatePayload['system.requirements.minimumCon'] = parseInt(result.mincon);
      } else {
        updatePayload['system.requirements.minimumCon'] = 0;
      }
      if (result.minint) {
        updatePayload['system.requirements.minimumInt'] = parseInt(result.minint);
      } else {
        updatePayload['system.requirements.minimumInt'] = 0;
      }
      if (result.minspi) {
        updatePayload['system.requirements.minimumSpi'] = parseInt(result.minspi);
      } else {
        updatePayload['system.requirements.minimumSpi'] = 0;
      }
      if (result.minper) {
        updatePayload['system.requirements.minimumPer'] = parseInt(result.minper);
      } else {
        updatePayload['system.requirements.minimumPer'] = 0;
      }
      if (result.mincha) {
        updatePayload['system.requirements.minimumCha'] = parseInt(result.mincha);
      } else {
        updatePayload['system.requirements.minimumCha'] = 0;
      }
      if (result.skill && result.skill.trim() !== '') {
        updatePayload['system.requirements.skillRankRequirement.skill'] = result.skill;
      } else {
        updatePayload['system.requirements.skillRankRequirement.skill'] = '';
      }
      if (result.skillrank) {
        updatePayload['system.requirements.skillRankRequirement.rank'] = parseInt(result.skillrank);
      } else {
        updatePayload['system.requirements.skillRankRequirement.rank'] = 0;
      }
      if (result.requiredClass && result.requiredClass.trim() !== '') {
        updatePayload['system.requirements.requiredClass'] = result.requiredClass;
      } else {
        updatePayload['system.requirements.requiredClass'] = '';
      }
      if (result.requiredPerk && result.requiredPerk.trim() !== '') {
        console.log('Setting requiredPerk', result.requiredPerk);
        updatePayload['system.requirements.requiredPerk'] = result.requiredPerk;
      } else {
        updatePayload['system.requirements.requiredPerk'] = '';
      }
      if (result.requiredNotSelectedPerk && result.requiredNotSelectedPerk.trim() !== '') {
        updatePayload['system.requirements.requiredNotSelectedPerk'] = result.requiredNotSelectedPerk;
      } else {
        updatePayload['system.requirements.requiredNotSelectedPerk'] = '';
      }
      if (result.otherRequirements && result.otherRequirements.trim() !== '') {
        updatePayload['system.requirements.otherRequirements'] = result.otherRequirements;
      } else {
        updatePayload['system.requirements.otherRequirements'] = '';
      }

      this.document.update(updatePayload).then(v => this.render());
  }

  /**
   * Edit Abiltiy Requirements
   * @this RtRActorSheet
   * @param {PointerEvent} event   The originating click event
   * @param {HTMLElement} target   The capturing HTML element which defined a [data-action]
   * @protected
   */
  static async _onEditAbilityRequirements(event, target) {
      event.preventDefault();
  }

  /** Helper Functions */
  /**
   *
   * DragDrop
   *
   */

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
    const li = event.currentTarget;
    if ('link' in event.target.dataset) return;

    console.log('Drag Start Event', event);
    let dragData = null;

    if (!dragData) return;

    // Set data transfer
    event.dataTransfer.setData('text/plain', JSON.stringify(dragData));
  }

  /**
   * Callback actions which occur when a dragged element is over a drop target.
   * @param {DragEvent} event       The originating DragEvent
   * @protected
   */
  _onDragOver(event) {
    console.log('Drag Over Event', event);
  }

  /**
   * Callback actions which occur when a dragged element is dropped on a target.
   * @param {DragEvent} event       The originating DragEvent
   * @protected
   */
  async _onDrop(event) {
    const data = ux.TextEditor.getDragEventData(event);
    const item = this.item;
    console.log('On Drop Event', event);

    const allowed = Hooks.call('dropItemSheetData', item, this, data);
    if (allowed === false) return;

    // Handle different data types
    switch (data.type) {
      case 'Actor':
        return this._onDropActor(event, data);
      case 'Item':
        return this._onDropItem(event, data);
      case 'Folder':
        return this._onDropFolder(event, data);
    }
  }

  /* -------------------------------------------- */

  /**
   * Handle dropping of an Actor data onto another Actor sheet
   * @param {DragEvent} event            The concluding DragEvent which contains drop data
   * @param {object} data                The data transfer extracted from the event
   * @returns {Promise<object|boolean>}  A data object which describes the result of the drop, or false if the drop was
   *                                     not permitted.
   * @protected
   */
  async _onDropActor(event, data) {
    if (!this.item.isOwner) return false;
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
    if (!this.item.isOwner) return false;
  }

  /* -------------------------------------------- */

  /**
   * Handle dropping of a Folder on an Actor Sheet.
   * The core sheet currently supports dropping a Folder of Items to create all items as owned items.
   * @param {DragEvent} event     The concluding DragEvent which contains drop data
   * @param {object} data         The data transfer extracted from the event
   * @returns {Promise<Item[]>}
   * @protected
   */
  async _onDropFolder(event, data) {
    if (!this.item.isOwner) return [];
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
}
