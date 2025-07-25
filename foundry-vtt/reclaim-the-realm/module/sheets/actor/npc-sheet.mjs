import RtRBaseHandlebarsActorSheet from './base-handlebars-actor-sheet.mjs';

const { ux } = foundry.applications;

/**
 * @extends {RtRBaseHandlebarsActorSheet}
 */
export class RtRNpcSheet extends RtRBaseHandlebarsActorSheet {

    /** @override */
    static DEFAULT_OPTIONS = {
        ...super.DEFAULT_OPTIONS,
        actions: {
            ...super.DEFAULT_OPTIONS.actions,
        }
    };

    /** @override */
    static PARTS = {
        ...super.PARTS,
        npcoverview: {
            template: 'systems/reclaim-the-realm/templates/actor/npc-overview.hbs',
        },
        data: {
            template: 'systems/reclaim-the-realm/templates/actor/data.hbs',
        },
        effects: {
            template: 'systems/reclaim-the-realm/templates/actor/effects.hbs',
        },
        skills: {
            template: 'systems/reclaim-the-realm/templates/actor/skills.hbs',
        },
        biography: {
            template: 'systems/reclaim-the-realm/templates/actor/biography.hbs'
        }
    };

    /** @override */
    _configureRenderOptions(options) {
        super._configureRenderOptions(options);
        options.parts.push('npcoverview', 'data', 'skills', 'effects', 'biography');
    }

    /** @override */
    async _prepareContext(options) {
        const context = super.getBaseContext();
        context.tabs = this._getTabs(options.parts),

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
            this.tabGroups[tabGroup] = 'npcoverview';
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
                case 'npcoverview':
                    tab.id = 'npcoverview';
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
                case 'effects':
                    tab.id = 'effects';
                    tab.label += 'Effects';
                    break;
                case 'biography':
                    tab.id = 'biography';
                    tab.label += 'Biography';
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
        const npcTraits = [];
        const npcAbilities = [];

        // Iterate through items, allocating to containers
        for (let i of this.document.items) {
            if (i.type === 'npcTrait') {
                npcTraits.push(i);
            } else if (i.type === 'npcAbility') {
                npcAbilities.push(i);
            } else {
                console.error(`Unknown Item Type ${i.type} found in Actor ${this.actor.name}`);
            }
        }


        // Sort then assign
        context.npcTraits = npcTraits.sort((a, b) => (a.sort || 0) - (b.sort || 0));
        context.npcAbilities = npcAbilities.sort((a, b) => (a.sort || 0) - (b.sort || 0));
    }

    /** @override */
    async _preparePartContext(partId, context) {
        super._preparePartContext(partId, context);
        switch (partId) {
            case 'data':
            case 'skills':
            case 'npcoverview':
                context.tab = context.tabs[partId];
                break;
            case 'effects':
                context.tab = context.tabs[partId];
                context.effects = super.getAllStatusEffects();
                break;
            case 'biography':
                context.tab = context.tabs[partId];
                context.enrichedBiography = await ux.TextEditor.enrichHTML(
                    this.actor.system.biography ?? "",
                    {
                        secrets: this.document.isOwner,
                        rollData: this.actor.getRollData(),
                        relativeTo: this.actor,
                    }
                );
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

    /**************
     *
     *   ACTIONS
     *
     **************/


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

        // Handle item sorting within the same Actor
        if (this.actor.uuid === item.parent?.uuid)
            return super.onSortItem(event, item);

        // Create the owned item
        return super.onDropItemCreate(item, event);
    }

    _isItemDropAllowed(itemType) {
        if (itemType === 'npcTrait' || itemType === 'npcAbility') {
            return true;
        }
        ui.notifications.warn(`Item type ${itemType} not Allowed for Actor Type ${this.actor.type}`, {console: true});
    }
}