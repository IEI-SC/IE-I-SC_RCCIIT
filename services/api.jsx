// services/api.js — frontend data layer (Supabase BaaS).
// No custom backend: every read/write below talks to Supabase directly
// with the publishable key. Tables: events, team_members, contact_messages.
// Media lives in Storage buckets: team-images, event-media.
import { supabase, storageUrl } from './supabaseClient';

export const api = {
  // All events, newest first
  getEvents: async () => {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: false });
    if (error) throw error;
    return data;
  },

  // All team members in roster order
  getTeam: async () => {
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .order('id');
    if (error) throw error;
    return data;
  },

  // Contact form submission (contact_messages has an anon-insert policy)
  submitContact: async ({ name, email, message }) => {
    const { data, error } = await supabase
      .from('contact_messages')
      .insert({ name, email, message })
      .select('id')
      .single();
    if (error) throw error;
    return data;
  },

  // --- media helpers (null when nothing stored) ---
  teamPhoto: (member) => storageUrl('team-images', member?.image || member?.imageUrl),
  eventThumb: (event) => storageUrl('event-media', event?.thumbnail),
  eventReport: (event) => storageUrl('event-media', event?.report_pdf),
};
