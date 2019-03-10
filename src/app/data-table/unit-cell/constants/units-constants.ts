/**
 * Units types
 */
export const WEIGHT_UNITS = 'weight';
export const VOLUME_UNITS = 'volume';
export const LENGTH_UNITS = 'length';
export const DENSITY_UNITS = 'density';


/**
 * Define your units here
 */

const weightUnits = [
  {
    value: 'Pounds',
    label: 'lb'
  }, {
    value: 'Kilograms',
    label: 'kg'
  }
];
const volumeUnits = [
  {
    value: 'Cubic CM',
    label: 'cm3'
  }, {
    value: 'Cubic Foot',
    label: 'ft3'
  }
];
const lengthUnits = [
  {
    value: 'Inches',
    label: 'In'
  }
];
const densityUnits = [
  {
    value: 'GM/CC',
    label: 'gm/cc'
  }
];


export default {
  [WEIGHT_UNITS]: weightUnits,
  [VOLUME_UNITS]: volumeUnits,
  [LENGTH_UNITS]: lengthUnits,
  [DENSITY_UNITS]: densityUnits
};
