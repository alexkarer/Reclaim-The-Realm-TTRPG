import { generateFvttId } from "../../utils.mjs";

const { api, sheets, ux, apps } = foundry.applications;

/**
 * @extends {sheets.ActorSheetV2}
 */
export default class RtRBaseHandlebarsActorSheet extends api.HandlebarsApplicationMixin(
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
            unlockEdit: this._onUnlockEdit,
            lockEdit: this._onLockEdit,
            increaseHp: this._onIncreaseHP,
            decreaseHp: this._onDecreaseHP,
            addDamageResistance: this._onAddDamageResistance,
            deleteDamageResistance: this._onDeleteDamageResistance
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
        }
    };

    /** @override */
    _configureRenderOptions(options) {
        super._configureRenderOptions(options);
        // Not all parts always render
        options.parts = ['header', 'tabs'];
        // Don't show the other tabs if only limited view
        if (this.document.limited) return;
    }

    /* -------------------------------------------- */

    /**
     * @returns common actor context
     * @protected
     */
    getBaseContext() {
        return {
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
            // Necessary for formInput and formFields helpers
            fields: this.document.schema.fields,
            systemFields: this.document.system.schema.fields,
        };
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
        this.actor.update(updatePayload);
    }

    /**************
     *
     *   ACTIONS
     *
     **************/

    /**
     * Handle changing a Document's image.
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
     * @this RtRActorSheet
     * @param {PointerEvent} event   The originating click event
     * @param {HTMLElement} target   The capturing HTML element which defined a [data-action]
     * @private
     */
    static async _toggleEffect(event, target) {
        const statusEffectId = target.closest("[data-condition-id]").dataset.conditionId;
        const existing = this.document.effects.get(generateFvttId(`RTR${statusEffectId}`));

        if (existing) return existing.delete();

        const effect = await ActiveEffect.implementation.fromStatusEffect(statusEffectId);
        return ActiveEffect.implementation.create(effect, { parent: this.document, keepId: true });
    }

    /**
     * Handle any custom roll.
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
     * Unlock Actor Editing
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
        this.actor.update(updatePayload).then(v => this.render());
    }

    /**
     * Lock Actor Editing
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
        this.actor.update(updatePayload).then(v => this.render());
    }

    /**
     * Handle increasing HP by 1.
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
     * Add new damage resistance
     * @this RtRActorSheet
     * @param {PointerEvent} event   The originating click event
     * @param {HTMLElement} target   The capturing HTML element which defined a [data-action]
     * @protected
     */
    static async _onAddDamageResistance(event, target) {
        event.preventDefault();

        const damageTypeOptions = Object.keys(CONFIG.RTR.damageTypes).map(type => `<option value="${type}">${type}</option>`).join();
        const result = await api.DialogV2.input({
            rejectClose: false,
            modal: true,
            content: `<select name="type">${damageTypeOptions}</select> <input type="number" value="0" name="value">`,
            window: { title: "Add Damage Resistance", icon: 'fa-solid fa-shield-halved'},
            ok: { label: "Add Damage Resistance" }
        });
        if (!result || result.value === 0) {
            return;
        }

        const existingResistance = this.actor.system.resistances.find(res => res.damageType === result.type);
        let updatedResistances = [];
        if (existingResistance) {
            updatedResistances = foundry.utils.deepClone(this.actor.system.resistances.filter(res => res.damageType !== result.type));
            updatedResistances.push({damageType: existingResistance.damageType, value: existingResistance.value + result.value});
        } else {
            updatedResistances = [
                ...foundry.utils.deepClone(this.actor.system.resistances), 
                {damageType: result.type, value: result.value}
            ];
        }

        this.actor.update({"system.resistances": updatedResistances}).then(v => this.render());
    }

    /**
     * Delete damage resistance
     * @this RtRActorSheet
     * @param {PointerEvent} event   The originating click event
     * @param {HTMLElement} target   The capturing HTML element which defined a [data-action]
     * @protected
     */
    static async _onDeleteDamageResistance(event, target) {
        event.preventDefault();
        const damageType = target.dataset.dmgtype;
        const updatePayload = { 
            "system.resistances": foundry.utils.deepClone(this.actor.system.resistances.filter(res => res.damageType !== damageType))
        };
        this.actor.update(updatePayload).then(v => this.render());
    }

    /**************
     *
     * Helper Functions
     *
     **************/

    /**
     * Fetches the embedded document representing the containing HTML element
     *
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

    /**
     * Retrieves all status effects for display in character sheet
     * @returns status effects
     * @protected
     */
    getAllStatusEffects() {
        return Object.entries(CONFIG.RTR.statusEffects).reduce((arr, [k, v]) => {
            const id = generateFvttId(`RTR${k}`);
            const existing = this.actor.effects.get(id);
            arr.push({
                id: k,
                disabled: !existing,
                ...v
            });
            return arr;
        }, []);
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
    _onDragOver(event) { }

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
                siblings.push(getEmbeddedDocument(el));
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
     * @protected
     */
    async onDropItemCreate(itemData, event) {
        itemData = itemData instanceof Array ? itemData : [itemData];
        return this.actor.createEmbeddedDocuments('Item', itemData);
    }

    /**
     * Handle a drop event for an existing embedded Item to sort that Item relative to its siblings
     * @param {Event} event
     * @param {Item} item
     * @protected
     */
    onSortItem(event, item) {
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
}
