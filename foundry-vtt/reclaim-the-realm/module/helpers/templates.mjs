/**
 * Define a set of template paths to pre-load
 * Pre-loaded templates are compiled and cached for fast access when rendering
 * @return {Promise}
 */
export const preloadHandlebarsTemplates = async function () {
  return foundry.applications.handlebars.loadTemplates([
    // Actor partials.
    'systems/reclaim-the-realm/templates/actor/parts/actor-features.hbs',
    'systems/reclaim-the-realm/templates/actor/parts/actor-items.hbs',
    'systems/reclaim-the-realm/templates/actor/parts/actor-spells.hbs',
    'systems/reclaim-the-realm/templates/actor/parts/actor-effects.hbs',
    // Item partials
    'systems/reclaim-the-realm/templates/item/parts/item-effects.hbs',
  ]);
};
