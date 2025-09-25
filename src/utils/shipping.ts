/**
 * Calculate volumetric weight based on package dimensions
 * Formula: (length * width * height) / 6000
 * @param length Length in cm
 * @param width Width in cm
 * @param height Height in cm
 * @returns Volumetric weight in grams
 */
export function calculateVolumetricWeight(length: number, width: number, height: number): number {
  return Math.ceil(((length * width * height) / 6000) * 1000) // Convert to grams
}

/**
 * Determine which weight to use for shipping calculation
 * @param actualWeight Actual weight in grams
 * @param volumetricWeight Volumetric weight in grams
 * @returns The greater of actual weight or volumetric weight
 */
export function getShippingWeight(actualWeight: number, volumetricWeight: number): number {
  return Math.max(actualWeight, volumetricWeight)
}

/**
 * Format currency to IDR
 * @param value Amount to format
 * @returns Formatted currency string
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value)
}
