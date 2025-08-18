import { supabase } from './supabase';

export interface Plant {
  id: string;
  user_id: string;
  name: string;
  type?: string;
  variety?: string;
  planting_date?: string;
  source?: 'Seed' | 'Seedling' | 'Established Plant';
  location?: string;
  status?: 'Sprouting' | 'Flowering' | 'Fruiting' | 'Harvest Ready' | 'Dormant';
  last_watered?: string;
  days_to_germination?: number;
  sowing_depth?: number;
  spacing?: number;
  sun_exposure?: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

export interface CreatePlantData {
  name: string;
  type?: string;
  variety?: string;
  planting_date?: string;
  source?: 'Seed' | 'Seedling' | 'Established Plant';
  location?: string;
  status?: 'Sprouting' | 'Flowering' | 'Fruiting' | 'Harvest Ready' | 'Dormant';
  days_to_germination?: number;
  sowing_depth?: number;
  spacing?: number;
  sun_exposure?: string;
  image_url?: string;
}

export interface UpdatePlantData extends Partial<CreatePlantData> {
  last_watered?: string;
}

// Get current user ID (for now, we'll use a mock user ID)
const getCurrentUserId = (): string => {
  // TODO: Replace with actual auth user ID
  // For development, we'll use a fixed UUID
  return '11111111-1111-1111-1111-111111111111';
};

// Get all plants for the current user
export async function getPlants(): Promise<Plant[]> {
  try {
    // For development, get all plants (bypass RLS)
    const { data, error } = await supabase
      .from('plants')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching plants:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Failed to fetch plants:', error);
    return [];
  }
}

// Create a new plant
export async function createPlant(plantData: CreatePlantData): Promise<Plant | null> {
  try {
    console.log('🔍 DEBUG: createPlant called with:', plantData);
    
    const newPlant = {
      ...plantData,
      status: plantData.status || 'Sprouting',
      source: plantData.source || 'Seed',
      planting_date: plantData.planting_date || new Date().toISOString().split('T')[0],
    };

    console.log('🔍 DEBUG: Final plant data to insert:', newPlant);

    const { data, error } = await supabase
      .from('plants')
      .insert([newPlant])
      .select()
      .single();

    if (error) {
      console.error('❌ DEBUG: Supabase error creating plant:', error);
      throw error;
    }

    console.log('✅ DEBUG: Plant created successfully:', data);
    return data;
  } catch (error) {
    console.error('❌ DEBUG: Failed to create plant:', error);
    return null;
  }
}

// Update a plant
export async function updatePlant(plantId: string, updates: UpdatePlantData): Promise<Plant | null> {
  try {
    const { data, error } = await supabase
      .from('plants')
      .update(updates)
      .eq('id', plantId)
      .eq('user_id', getCurrentUserId())
      .select()
      .single();

    if (error) {
      console.error('Error updating plant:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Failed to update plant:', error);
    return null;
  }
}

// Delete a plant
export async function deletePlant(plantId: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('plants')
      .delete()
      .eq('id', plantId)
      .eq('user_id', getCurrentUserId());

    if (error) {
      console.error('Error deleting plant:', error);
      throw error;
    }

    return true;
  } catch (error) {
    console.error('Failed to delete plant:', error);
    return false;
  }
}

// Water a plant (update last_watered timestamp)
export async function waterPlant(plantId: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('plants')
      .update({ last_watered: new Date().toISOString() })
      .eq('id', plantId)
      .eq('user_id', getCurrentUserId());

    if (error) {
      console.error('Error watering plant:', error);
      throw error;
    }

    return true;
  } catch (error) {
    console.error('Failed to water plant:', error);
    return false;
  }
}

// Get plant by ID
export async function getPlantById(plantId: string): Promise<Plant | null> {
  try {
    const { data, error } = await supabase
      .from('plants')
      .select('*')
      .eq('id', plantId)
      .eq('user_id', getCurrentUserId())
      .single();

    if (error) {
      console.error('Error fetching plant:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Failed to fetch plant:', error);
    return null;
  }
}

// Upload plant image to Supabase storage
export async function uploadPlantImage(file: File, plantId: string): Promise<string | null> {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${plantId}-${Date.now()}.${fileExt}`;
    const filePath = `${getCurrentUserId()}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('seed-packets')
      .upload(filePath, file);

    if (uploadError) {
      console.error('Error uploading image:', uploadError);
      throw uploadError;
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('seed-packets')
      .getPublicUrl(filePath);

    return publicUrl;
  } catch (error) {
    console.error('Failed to upload plant image:', error);
    return null;
  }
}

// Convert OCR result to plant data
export function ocrResultToPlantData(ocrResult: any): CreatePlantData {
  console.log('🔍 DEBUG: Converting OCR result:', ocrResult);
  
  // Handle the case where daysToGermination might be a range like "7-14"
  let daysToGermination: number | undefined = undefined;
  if (ocrResult.parsedData.daysToGermination) {
    const daysStr = ocrResult.parsedData.daysToGermination.toString();
    if (daysStr.includes('-')) {
      // Take the first number from range like "7-14"
      const firstNumber = parseInt(daysStr.split('-')[0]);
      daysToGermination = isNaN(firstNumber) ? undefined : firstNumber;
    } else {
      daysToGermination = parseInt(daysStr) || undefined;
    }
  }
  
  const plantData = {
    name: ocrResult.parsedData.plantName || 'Unknown Plant',
    type: ocrResult.parsedData.plantName || 'Unknown',
    variety: ocrResult.parsedData.variety || '',
    days_to_germination: daysToGermination,
    sowing_depth: parseFloat(ocrResult.parsedData.sowingDepth) || undefined,
    spacing: parseInt(ocrResult.parsedData.spacing) || undefined,
    sun_exposure: ocrResult.parsedData.sunExposure || '',
    source: 'Seed' as const,
    status: 'Sprouting' as const,
    location: 'Garden',
  };
  
  console.log('🔍 DEBUG: Converted plant data:', plantData);
  return plantData;
}
